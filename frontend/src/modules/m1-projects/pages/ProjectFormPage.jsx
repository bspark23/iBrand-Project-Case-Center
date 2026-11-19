// OWNER: Lead (@bspark23) â€“ task W1-03. See docs/tasks/week-1/W1-03-lead-project-form.md
import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Icon from '../../../shared/ui/Icon.jsx';
import EmptyState from '../../../shared/ui/EmptyState.jsx';
import ConfirmDialog from '../../../shared/ui/ConfirmDialog.jsx';
import { useProject, useClients, createProject, updateProject } from '../store.js';
import ClientFormDialog from '../components/ClientFormDialog.jsx';
import { pickEditable, validateProject, TITLE_MAX } from '../projectRules.js';
import { PROJECT_TYPES, PROJECT_STATUSES } from '../labels.js';
import { TYPE_ICONS } from '../components/TypeLabel.jsx';
import ProjectCard from '../components/ProjectCard.jsx';

const EMPTY = { title: '', client_id: '', type: '', status: 'planning', start_date: '', end_date: '' };

// /projects/new        -> empty form
// /projects/:id/edit   -> form filled with that project
export default function ProjectFormPage() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const project = useProject(id);
  const clients = useClients();
  const [addingClient, setAddingClient] = useState(false);

  if (id && !project) {
    return (
      <div className="page">
        <Link to="/projects" className="back-link"><Icon name="arrowLeft" size={16} />All projects</Link>
        <EmptyState icon="alert" title="Project not found" action={<Link to="/projects" className="btn btn-primary">See all projects</Link>}>
          There is no project with this id to edit.
        </EmptyState>
      </div>
    );
  }

  // A project needs a client, so ask for one first.
  if (!id && clients.length === 0) {
    return (
      <div className="page">
        <Link to="/projects" className="back-link"><Icon name="arrowLeft" size={16} />All projects</Link>
        <EmptyState
          icon="users"
          title="Add a client first"
          action={
            <button type="button" className="btn btn-primary" onClick={() => setAddingClient(true)}>
              <Icon name="plus" size={16} />
              Add a client
            </button>
          }
        >
          Every project belongs to a client. Add the company you're working with, then create the project.
        </EmptyState>
        <ClientFormDialog open={addingClient} onClose={() => setAddingClient(false)} />
      </div>
    );
  }

  // ?client=<id> (from the Clients page) picks that client for a new project.
  const presetClient = clients.some((c) => c.id === params.get('client')) ? params.get('client') : '';

  // key resets the form when moving between "new" and "edit".
  return <ProjectForm key={id ?? 'new'} project={project} clients={clients} presetClient={presetClient} />;
}

function ProjectForm({ project, clients, presetClient }) {
  const navigate = useNavigate();
  const isEdit = Boolean(project);
  const [initial] = useState(() => (isEdit ? pickEditable(project) : { ...EMPTY, client_id: presetClient }));
  const [addingClient, setAddingClient] = useState(false);
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [triedSave, setTriedSave] = useState(false);
  const [askDiscard, setAskDiscard] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const isPublished = Boolean(project?.is_published);
  const errors = validateProject(values, { clients, isPublished });
  const errorCount = Object.keys(errors).length;
  const isDirty = JSON.stringify(values) !== JSON.stringify(initial);
  const backTo = isEdit ? `/projects/${project.id}` : '/projects';

  // Errors show after the user leaves a field, or after they try to save.
  const errorFor = (name) => (touched[name] || triedSave || (name === 'status' && isPublished) ? errors[name] : undefined);

  const set = (name, value) => setValues((v) => ({ ...v, [name]: value }));
  const touch = (name) => setTouched((t) => ({ ...t, [name]: true }));

  function handleSubmit(event) {
    event.preventDefault();
    setTriedSave(true);
    if (errorCount > 0 || (isEdit && !isDirty)) return;
    try {
      const saved = isEdit ? updateProject(project.id, values) : createProject(values);
      navigate(`/projects/${saved.id}`, { state: { flash: isEdit ? 'Changes saved.' : 'Project created.' } });
    } catch (err) {
      setSaveError(err.message);
    }
  }

  function handleCancel() {
    if (isDirty) setAskDiscard(true);
    else navigate(backTo);
  }

  const inputProps = (name) => ({
    id: `project-${name}`,
    name,
    value: values[name],
    onChange: (e) => set(name, e.target.value),
    onBlur: () => touch(name),
    'aria-invalid': Boolean(errorFor(name)),
    'aria-describedby': errorFor(name) ? `project-${name}-error` : undefined,
  });

  const preview = {
    ...values,
    id: project?.id ?? 'preview',
    is_published: isPublished,
    client: clients.find((c) => c.id === values.client_id) ?? null,
  };

  return (
    <div className="page project-form">
      <Link to={backTo} className="back-link">
        <Icon name="arrowLeft" size={16} />
        {isEdit ? 'Back to project' : 'All projects'}
      </Link>

      <header className="page-header">
        <div>
          <p className="eyebrow">{isEdit ? 'Edit project' : 'New project'}</p>
          <h1>{isEdit ? project.title : 'Start a new project'}</h1>
          <p className="muted">
            {isEdit ? 'Update the details below. Changes show everywhere straight away.' : 'Fill in the basics. You can add tasks, equipment and media after.'}
          </p>
        </div>
      </header>

      <div className="form-layout">
        <form onSubmit={handleSubmit} noValidate className="form-main">
          <section className="card form-section">
            <div className="form-section-head">
              <span className="form-step">1</span>
              <div>
                <h2>The basics</h2>
                <p className="muted">What is this project and who is it for?</p>
              </div>
            </div>

            <Field name="title" label="Project title" error={errorFor('title')} counter={`${values.title.trim().length}/${TITLE_MAX}`}>
              <input type="text" className="input" placeholder="e.g. Annual Gala 2027" maxLength={TITLE_MAX + 20} {...inputProps('title')} />
            </Field>

            <Field name="client_id" label="Client" error={errorFor('client_id')}>
              <select className="input" disabled={clients.length === 0} {...inputProps('client_id')}>
                <option value="">{clients.length ? 'Choose a client' : 'No clients yet'}</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <button type="button" className="link-button field-link" onClick={() => setAddingClient(true)}>
                <Icon name="plus" size={14} />
                Add a new client
              </button>
            </Field>

            <fieldset className="field" aria-describedby={errorFor('type') ? 'project-type-error' : undefined}>
              <legend>Project type</legend>
              <div className="type-tiles">
                {PROJECT_TYPES.map((t) => (
                  <label key={t.value} className={`type-tile ${values.type === t.value ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="type"
                      value={t.value}
                      checked={values.type === t.value}
                      onChange={() => { set('type', t.value); touch('type'); }}
                    />
                    <span className="type-tile-icon"><Icon name={TYPE_ICONS[t.value]} size={20} /></span>
                    <span>{t.label}</span>
                  </label>
                ))}
              </div>
              {errorFor('type') && <p className="field-error" id="project-type-error">{errorFor('type')}</p>}
            </fieldset>
          </section>

          <section className="card form-section">
            <div className="form-section-head">
              <span className="form-step">2</span>
              <div>
                <h2>Status and schedule</h2>
                <p className="muted">Where is the project now, and when does it run?</p>
              </div>
            </div>

            <fieldset className="field" aria-describedby={errorFor('status') ? 'project-status-error' : undefined}>
              <legend>Status</legend>
              <div className="segmented">
                {PROJECT_STATUSES.map((s) => (
                  <label key={s.value} className={`segment segment-${s.value} ${values.status === s.value ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="status"
                      value={s.value}
                      checked={values.status === s.value}
                      onChange={() => { set('status', s.value); touch('status'); }}
                    />
                    <span className="status-dot" />
                    {s.label}
                  </label>
                ))}
              </div>
              {isPublished && <p className="field-hint">This project is published, so it must stay Delivered.</p>}
              {errorFor('status') && <p className="field-error" id="project-status-error">{errorFor('status')}</p>}
            </fieldset>

            <div className="form-row">
              <Field name="start_date" label="Start date" error={errorFor('start_date')}>
                <input type="date" className="input" {...inputProps('start_date')} />
              </Field>
              <Field name="end_date" label="End date" error={errorFor('end_date')}>
                <input type="date" className="input" min={values.start_date || undefined} {...inputProps('end_date')} />
              </Field>
            </div>
          </section>

          {saveError && (
            <div className="alert alert-error" role="alert">
              <Icon name="alert" size={18} />
              <span>{saveError}</span>
            </div>
          )}

          <div className="form-footer card">
            <span className="form-footer-status">
              {triedSave && errorCount > 0 ? (
                <span className="text-error"><Icon name="alert" size={16} />Fix {errorCount} {errorCount === 1 ? 'field' : 'fields'} to save</span>
              ) : isEdit && !isDirty ? (
                <span className="muted">No changes yet</span>
              ) : isDirty ? (
                <span className="muted">Unsaved changes</span>
              ) : null}
            </span>
            <button type="button" className="btn" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isEdit && !isDirty}>
              <Icon name="check" size={16} />
              {isEdit ? 'Save changes' : 'Create project'}
            </button>
          </div>
        </form>

        <aside className="form-preview">
          <p className="section-title">Live preview</p>
          <ProjectCard project={preview} preview />
          <p className="muted preview-note">This is how the project will look in the list.</p>
        </aside>
      </div>

      <ClientFormDialog
        open={addingClient}
        onClose={() => setAddingClient(false)}
        onSaved={(client) => {
          set('client_id', client.id);
          touch('client_id');
        }}
      />

      <ConfirmDialog
        open={askDiscard}
        icon="alert"
        tone="danger"
        title="Discard your changes?"
        confirmLabel="Discard"
        cancelLabel="Keep editing"
        onConfirm={() => navigate(backTo)}
        onCancel={() => setAskDiscard(false)}
      >
        What you typed will be lost.
      </ConfirmDialog>
    </div>
  );
}

function Field({ name, label, error, counter, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <div className="field-label">
        <label htmlFor={`project-${name}`}>{label}</label>
        {counter && <span className="field-counter">{counter}</span>}
      </div>
      {children}
      {error && <p className="field-error" id={`project-${name}-error`}>{error}</p>}
    </div>
  );
}
