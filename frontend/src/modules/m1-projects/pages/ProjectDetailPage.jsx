// OWNER: Lead (@bspark23) – task W1-02. See docs/tasks/week-1/W1-02-lead-project-detail.md
import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Icon from '../../../shared/ui/Icon.jsx';
import EmptyState from '../../../shared/ui/EmptyState.jsx';
import ConfirmDialog from '../../../shared/ui/ConfirmDialog.jsx';
import Menu from '../../../shared/ui/Menu.jsx';
import { useProject, publishProject, unpublishProject, setProjectStatus, deleteProject } from '../store.js';
import { useProjectTasks } from '../../m2-task-board/taskStore.js';
import { getPublishState } from '../projectRules.js';
import { PROJECT_STATUSES, formatDate, formatDateRange, formatDateTime, timingLabel } from '../labels.js';
import StatusBadge, { PublishedBadge } from '../components/StatusBadge.jsx';
import TypeLabel from '../components/TypeLabel.jsx';
import ClientAvatar from '../components/ClientAvatar.jsx';

// Tasks, Equipment and Media are built by other modules and plug in here later.
const TABS = [
  { key: 'overview', label: 'Overview', icon: 'home' },
  { key: 'tasks', label: 'Tasks', icon: 'kanban' },
  { key: 'equipment', label: 'Equipment', icon: 'box', module: 'M3 Equipment Registry' },
  { key: 'media', label: 'Media', icon: 'image', module: 'M4 Media Repository' },
];

// The main "move forward" button for each status.
const NEXT_STEP = {
  planning: { status: 'active', label: 'Start project', icon: 'play', flash: 'Project started. It is now Active.' },
  active: { status: 'delivered', label: 'Mark as done', icon: 'check', flash: 'Marked as done. The project is now Delivered.' },
  archived: { status: 'delivered', label: 'Restore', icon: 'archive', flash: 'Restored. The project is Delivered again.' },
};

const STEPS = ['planning', 'active', 'delivered', 'published'];
const STEP_LABELS = { planning: 'Planning', active: 'Active', delivered: 'Delivered', published: 'Published' };

export default function ProjectDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const project = useProject(id);
  const [tab, setTab] = useState('overview');
  const [confirming, setConfirming] = useState(false);
  const [askDelete, setAskDelete] = useState(false);
  const [askUnpublish, setAskUnpublish] = useState(false);
  const [flash, setFlash] = useState(location.state?.flash ?? null);
  const [error, setError] = useState(null);

  if (!project) {
    return (
      <div className="page">
        <BackLink />
        <EmptyState
          icon="alert"
          title="Project not found"
          action={<Link to="/projects" className="btn btn-primary">See all projects</Link>}
        >
          No project has this id. It may have been removed, or the link is wrong.
        </EmptyState>
      </div>
    );
  }

  const publish = getPublishState(project);
  const primary = project.client?.brand_colors?.primary ?? '#e30613';
  const secondary = project.client?.brand_colors?.secondary ?? '#0d1117';
  const timing = timingLabel(project);
  const activeTab = TABS.find((t) => t.key === tab);

  const next = NEXT_STEP[project.status];

  // Runs a store action and shows a message, or the error if a rule blocks it.
  function run(action, successText) {
    try {
      action();
      setError(null);
      setFlash(successText);
    } catch (err) {
      setFlash(null);
      setError(err.message);
    }
  }

  function handlePublish() {
    setConfirming(false);
    run(() => publishProject(project.id), 'Published! This project is now a case study in the Case Library.');
  }

  function handleDelete() {
    try {
      deleteProject(project.id);
      navigate('/projects', { replace: true, state: { flash: `"${project.title}" was deleted.` } });
    } catch (err) {
      setAskDelete(false);
      setError(err.message);
    }
  }

  const lockedReason = project.is_published ? 'Published projects must stay Delivered.' : undefined;
  const menuItems = [
    ...PROJECT_STATUSES.filter((s) => s.value !== project.status && s.value !== 'archived').map((s) => ({
      label: `Mark as ${s.label}`,
      icon: 'activity',
      disabled: project.is_published,
      hint: lockedReason,
      onClick: () => run(() => setProjectStatus(project.id, s.value), `Status changed to ${s.label}.`),
    })),
    ...(project.status !== 'archived'
      ? [{
          label: 'Archive project',
          icon: 'archive',
          disabled: project.is_published,
          hint: lockedReason,
          onClick: () => run(() => setProjectStatus(project.id, 'archived'), 'Project archived.'),
        }]
      : []),
    ...(project.is_published
      ? [{ label: 'Unpublish case', icon: 'globe', onClick: () => setAskUnpublish(true) }]
      : []),
    { divider: true },
    { label: 'Delete project', icon: 'trash', danger: true, onClick: () => setAskDelete(true) },
  ];

  return (
    <div className="page project-detail">
      <BackLink />

      <section className="detail-hero card">
        <div className="detail-cover" style={{ background: `linear-gradient(120deg, ${primary}, ${secondary})` }} />
        <div className="detail-hero-body">
          <div className="detail-identity">
            <span className="detail-avatar">
              <ClientAvatar client={project.client} size={64} />
            </span>
            <div>
              <p className="detail-client">{project.client?.name ?? 'Unknown client'}</p>
              <h1>{project.title}</h1>
              <div className="detail-tags">
                <StatusBadge status={project.status} />
                {project.is_published && <PublishedBadge />}
                <TypeLabel type={project.type} />
                <span className="meta-item">
                  <Icon name="calendar" size={15} />
                  {formatDateRange(project.start_date, project.end_date)}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-actions">
            <Link className="btn" to={`/projects/${project.id}/edit`}>
              <Icon name="edit" size={16} />
              Edit
            </Link>
            {next && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => run(() => setProjectStatus(project.id, next.status), next.flash)}
              >
                <Icon name={next.icon} size={16} />
                {next.label}
              </button>
            )}
            {project.status === 'delivered' && !project.is_published && (
              <button
                type="button"
                className="btn btn-primary"
                disabled={!publish.canPublish}
                title={publish.reason ?? 'Show this project in the public Case Library'}
                onClick={() => setConfirming(true)}
              >
                <Icon name="globe" size={16} />
                Publish as Case
              </button>
            )}
            <Menu label="More actions" items={menuItems} />
          </div>
        </div>

        <Lifecycle project={project} />
      </section>

      {flash && (
        <div className="alert alert-success" role="status">
          <Icon name="check" size={18} />
          <span>{flash}</span>
          <button type="button" className="alert-close" onClick={() => setFlash(null)} aria-label="Dismiss">
            <Icon name="x" size={16} />
          </button>
        </div>
      )}
      {error && (
        <div className="alert alert-error" role="alert">
          <Icon name="alert" size={18} />
          <span>{error}</span>
        </div>
      )}

      <nav className="detail-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            className={`detail-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            <Icon name={t.icon} size={16} />
            {t.label}
            {t.module && <span className="nav-soon">Soon</span>}
          </button>
        ))}
      </nav>

      {tab === 'tasks' ? (
        <TasksTab projectId={project.id} />
      ) : tab !== 'overview' ? (
        <EmptyState icon={activeTab.icon} title={`${activeTab.label} are coming soon`}>
          This tab will show the {activeTab.module} for this project.
        </EmptyState>
      ) : (
        <div className="detail-grid">
          <section className="card panel">
            <h2>Project details</h2>
            <dl className="facts">
              <Fact label="Client">
                <span className="fact-client">
                  <ClientAvatar client={project.client} size={24} />
                  {project.client?.name ?? 'Unknown client'}
                </span>
              </Fact>
              <Fact label="Type"><TypeLabel type={project.type} /></Fact>
              <Fact label="Status"><StatusBadge status={project.status} /></Fact>
              <Fact label="Start date">{formatDate(project.start_date)}</Fact>
              <Fact label="End date">{formatDate(project.end_date)}</Fact>
              {timing && (
                <Fact label="Timing">
                  <span className={`timing timing-${timing.tone}`}>
                    <Icon name="clock" size={14} />
                    {timing.text}
                  </span>
                </Fact>
              )}
            </dl>
          </section>

          <div className="detail-side">
            <CaseStudyPanel project={project} publish={publish} onPublish={() => setConfirming(true)} />

            <section className="card panel">
              <h2>History</h2>
              <ul className="history">
                {project.is_published && <HistoryItem tone="published" label="Published as case" date={project.published_at} />}
                <HistoryItem label="Last updated" date={project.updated_at} />
                <HistoryItem label="Created" date={project.created_at} />
              </ul>
            </section>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirming}
        icon="globe"
        tone="publish"
        title="Publish as a case study?"
        confirmLabel="Yes, publish"
        onConfirm={handlePublish}
        onCancel={() => setConfirming(false)}
      >
        "{project.title}" will appear in the public Case Library. Only an admin can unpublish it.
      </ConfirmDialog>

      <ConfirmDialog
        open={askUnpublish}
        icon="globe"
        tone="danger"
        title="Unpublish this case study?"
        confirmLabel="Unpublish"
        onConfirm={() => {
          setAskUnpublish(false);
          run(() => unpublishProject(project.id), 'Unpublished. It is no longer in the Case Library.');
        }}
        onCancel={() => setAskUnpublish(false)}
      >
        "{project.title}" will be removed from the public Case Library. You can publish it again later.
      </ConfirmDialog>

      <ConfirmDialog
        open={askDelete}
        icon="trash"
        tone="danger"
        title="Delete this project?"
        confirmLabel="Delete project"
        onConfirm={handleDelete}
        onCancel={() => setAskDelete(false)}
      >
        "{project.title}" will be removed for good{project.is_published ? ', including its case study' : ''}. This can't be undone.
      </ConfirmDialog>
    </div>
  );
}

// Short summary of this project's tasks, with links into the Task Board (M2).
function TasksTab({ projectId }) {
  const tasks = useProjectTasks(projectId);
  const count = (status) => tasks.filter((t) => t.status === status).length;
  const done = count('done');
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <section className="card panel tasks-summary">
      <div className="tasks-summary-head">
        <div>
          <h2>Tasks</h2>
          <p className="muted">
            {tasks.length === 0 ? 'No tasks yet.' : `${done} of ${tasks.length} done · ${percent}%`}
          </p>
        </div>
        <div className="detail-actions">
          <Link to={`/tasks/new?project=${projectId}`} className="btn">
            <Icon name="plus" size={16} />
            Add task
          </Link>
          <Link to={`/tasks/board/${projectId}`} className="btn btn-primary">
            <Icon name="kanban" size={16} />
            Open task board
          </Link>
        </div>
      </div>
      <div className="progress" aria-label={`${percent}% of tasks done`}>
        <span style={{ width: `${percent}%` }} />
      </div>
      <div className="client-stats">
        <span><strong>{count('todo')}</strong> to do</span>
        <span><strong>{count('in_progress')}</strong> in progress</span>
        <span><strong>{done}</strong> done</span>
      </div>
    </section>
  );
}

function BackLink() {
  return (
    <Link to="/projects" className="back-link">
      <Icon name="arrowLeft" size={16} />
      All projects
    </Link>
  );
}

// Planning → Active → Delivered → Published, with the current step highlighted.
function Lifecycle({ project }) {
  if (project.status === 'archived') {
    return (
      <div className="lifecycle lifecycle-archived">
        <Icon name="archive" size={16} />
        This project is archived. Click Restore to bring it back.
      </div>
    );
  }

  const current = project.is_published ? 'published' : project.status;
  const currentIndex = STEPS.indexOf(current);

  return (
    <ol className="lifecycle">
      {STEPS.map((step, i) => {
        const state = i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'todo';
        return (
          <li key={step} className={`step step-${state}`}>
            <span className="step-dot">{state === 'done' ? <Icon name="check" size={13} strokeWidth={2.6} /> : i + 1}</span>
            <span className="step-label">{STEP_LABELS[step]}</span>
          </li>
        );
      })}
    </ol>
  );
}

function CaseStudyPanel({ project, publish, onPublish }) {
  if (project.is_published) {
    return (
      <section className="card panel case-panel case-panel-live">
        <span className="case-icon"><Icon name="globe" size={20} /></span>
        <h2>Live in the Case Library</h2>
        <p>Published {formatDateTime(project.published_at)}. Clients and visitors can see it.</p>
      </section>
    );
  }

  return (
    <section className="card panel case-panel">
      <span className="case-icon"><Icon name="library" size={20} /></span>
      <h2>Case study</h2>
      {publish.canPublish ? (
        <>
          <p>This project is delivered. Publish it to show it to new clients.</p>
          <button type="button" className="btn btn-primary" onClick={onPublish}>
            <Icon name="globe" size={16} />
            Publish as Case
          </button>
        </>
      ) : (
        <p>{publish.reason} Once it is delivered, you can publish it with one click.</p>
      )}
    </section>
  );
}

function Fact({ label, children }) {
  return (
    <div className="fact">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function HistoryItem({ label, date, tone }) {
  return (
    <li className={tone ? `history-${tone}` : ''}>
      <span className="history-dot" />
      <span>
        <strong>{label}</strong>
        <span className="muted">{formatDateTime(date)}</span>
      </span>
    </li>
  );
}
