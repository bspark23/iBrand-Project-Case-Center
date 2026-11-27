// OWNER: Tega - task W2-02. See docs/tasks/week-2/W2-02-tega-task-form-and-detail.md
import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Icon from '../../../../shared/ui/Icon.jsx';
import EmptyState from '../../../../shared/ui/EmptyState.jsx';
import ConfirmDialog from '../../../../shared/ui/ConfirmDialog.jsx';
import { useProjects } from '../../../m1-projects/store.js';
import { useTeam } from '../../../../shared/teamStore.js';
import { useTask, createTask, updateTask } from '../../taskStore.js';
import { EMPTY_TASK, TASK_STATUSES, TASK_TITLE_MAX, validateTask } from '../../taskRules.js';
import './tega.css';

// /tasks/new and /tasks/:id/edit - create or edit a task.
export default function TaskFormPage() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const task = useTask(id);
  const projects = useProjects();
  const team = useTeam();

  if (id && !task) {
    return (
      <div className="page tega-task">
        <Link to="/tasks" className="back-link">
          <Icon name="arrowLeft" size={16} />
          All tasks
        </Link>
        <EmptyState
          icon="alert"
          title="Task not found"
          action={<Link to="/tasks" className="btn btn-primary">See all tasks</Link>}
        >
          There is no task with this id to edit.
        </EmptyState>
      </div>
    );
  }

  if (!id && projects.length === 0) {
    return (
      <div className="page tega-task">
        <Link to="/tasks" className="back-link">
          <Icon name="arrowLeft" size={16} />
          All tasks
        </Link>
        <EmptyState
          icon="folder"
          title="Create a project first"
          action={<Link to="/projects/new" className="btn btn-primary">Create a project</Link>}
        >
          Every task belongs to a project.
        </EmptyState>
      </div>
    );
  }

  const presetProject = projects.some((p) => p.id === params.get('project')) ? params.get('project') : '';
  return (
    <TaskForm
      key={id ?? 'new'}
      task={task}
      projects={projects}
      team={team}
      presetProject={presetProject}
    />
  );
}

function TaskForm({ task, projects, team, presetProject }) {
  const navigate = useNavigate();
  const isEdit = Boolean(task);
  const [initial] = useState(() => isEdit
    ? {
        project_id: task.project_id,
        title: task.title,
        assignee_id: task.assignee_id ?? '',
        status: task.status,
        due_date: task.due_date ?? '',
      }
    : { ...EMPTY_TASK, project_id: presetProject });
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [triedSave, setTriedSave] = useState(false);
  const [askDiscard, setAskDiscard] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const errors = validateTask(values, { projects, team });
  const errorCount = Object.keys(errors).length;
  const isDirty = JSON.stringify(values) !== JSON.stringify(initial);
  const backTo = isEdit ? `/tasks/${task.id}` : '/tasks';

  const set = (name, value) => setValues((v) => ({ ...v, [name]: value }));
  const touch = (name) => setTouched((v) => ({ ...v, [name]: true }));
  const errorFor = (name) => (touched[name] || triedSave ? errors[name] : undefined);
  const inputProps = (name) => ({
    id: `task-${name}`,
    name,
    value: values[name],
    onChange: (event) => set(name, event.target.value),
    onBlur: () => touch(name),
    'aria-invalid': Boolean(errorFor(name)),
    'aria-describedby': errorFor(name) ? `task-${name}-error` : undefined,
  });

  function handleSubmit(event) {
    event.preventDefault();
    setTriedSave(true);
    if (errorCount > 0 || (isEdit && !isDirty)) return;
    try {
      const saved = isEdit ? updateTask(task.id, values) : createTask(values);
      navigate(`/tasks/${saved.id}`, {
        replace: true,
        state: { flash: isEdit ? 'Changes saved.' : 'Task created.' },
      });
    } catch (err) {
      setSaveError(err.message);
    }
  }

  function handleCancel() {
    if (isDirty) setAskDiscard(true);
    else navigate(backTo);
  }

  return (
    <div className="page tega-task">
      <Link to={backTo} className="back-link">
        <Icon name="arrowLeft" size={16} />
        {isEdit ? 'Back to task' : 'All tasks'}
      </Link>

      <header className="page-header">
        <div>
          <p className="eyebrow">{isEdit ? 'Edit task' : 'New task'}</p>
          <h1>{isEdit ? 'Edit task' : 'New task'}</h1>
          <p className="muted">
            {isEdit ? 'Update the details and save your changes.' : 'Add a job to a project and assign it to someone.'}
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} noValidate className="tega-form card">
        <Field name="title" label="Task title" error={errorFor('title')} counter={`${values.title.trim().length}/${TASK_TITLE_MAX}`}>
          <input type="text" className="input" placeholder="e.g. Book camera crew" maxLength={TASK_TITLE_MAX + 20} {...inputProps('title')} />
        </Field>

        <Field name="project_id" label="Project" error={errorFor('project_id')}>
          <select className="input" {...inputProps('project_id')}>
            <option value="">Choose a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.title}</option>
            ))}
          </select>
        </Field>

        <Field name="assignee_id" label="Person" error={errorFor('assignee_id')}>
          <select className="input" {...inputProps('assignee_id')}>
            <option value="">Unassigned</option>
            {team.map((member) => (
              <option key={member.id} value={member.id}>{member.display_name}</option>
            ))}
          </select>
        </Field>

        <fieldset className="field" aria-describedby={errorFor('status') ? 'task-status-error' : undefined}>
          <legend>Status</legend>
          <div className="tega-status-options">
            {TASK_STATUSES.map((status) => (
              <label key={status.value} className={`tega-status-option ${values.status === status.value ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="status"
                  value={status.value}
                  checked={values.status === status.value}
                  onChange={() => { set('status', status.value); touch('status'); }}
                />
                <span className="status-dot" />
                {status.label}
              </label>
            ))}
          </div>
          {errorFor('status') && <p className="field-error" id="task-status-error">{errorFor('status')}</p>}
        </fieldset>

        <Field name="due_date" label="Due date" error={errorFor('due_date')}>
          <input type="date" className="input" {...inputProps('due_date')} />
        </Field>

        {saveError && (
          <div className="alert alert-error" role="alert">
            <Icon name="alert" size={18} />
            <span>{saveError}</span>
          </div>
        )}

        <div className="tega-form-footer">
          <span className="tega-form-status">
            {triedSave && errorCount > 0 ? (
              <span className="text-error">
                <Icon name="alert" size={16} />
                Fix {errorCount} {errorCount === 1 ? 'field' : 'fields'} to save
              </span>
            ) : isEdit && !isDirty ? (
              <span className="muted">No changes yet</span>
            ) : isDirty ? (
              <span className="muted">Unsaved changes</span>
            ) : null}
          </span>
          <button type="button" className="btn" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={isEdit && !isDirty}>
            <Icon name="check" size={16} />
            {isEdit ? 'Save changes' : 'Create task'}
          </button>
        </div>
      </form>

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
        <label htmlFor={`task-${name}`}>{label}</label>
        {counter && <span className="field-counter">{counter}</span>}
      </div>
      {children}
      {error && <p className="field-error" id={`task-${name}-error`}>{error}</p>}
    </div>
  );
}
