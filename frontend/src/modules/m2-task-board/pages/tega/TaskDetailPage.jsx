// OWNER: Tega - task W2-02. See docs/tasks/week-2/W2-02-tega-task-form-and-detail.md
import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Icon from '../../../../shared/ui/Icon.jsx';
import EmptyState from '../../../../shared/ui/EmptyState.jsx';
import ConfirmDialog from '../../../../shared/ui/ConfirmDialog.jsx';
import PersonAvatar from '../../../../shared/ui/PersonAvatar.jsx';
import { formatDate, formatDateTime } from '../../../m1-projects/labels.js';
import { useTask, moveTask, deleteTask } from '../../taskStore.js';
import { TASK_STATUSES } from '../../taskRules.js';
import TaskStatusBadge from '../../components/TaskStatusBadge.jsx';
import DueLabel from '../../components/DueLabel.jsx';
import './tega.css';

// /tasks/:id - one task in full.
export default function TaskDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const task = useTask(id);
  const [askDelete, setAskDelete] = useState(false);
  const [flash, setFlash] = useState(location.state?.flash ?? null);
  const [error, setError] = useState(null);

  if (!task) {
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
          No task has this id. It may have been removed, or the link is wrong.
        </EmptyState>
      </div>
    );
  }

  function changeStatus(status) {
    try {
      moveTask(task.id, status);
      setError(null);
      setFlash(`Status changed to ${TASK_STATUSES.find((item) => item.value === status)?.label ?? status}.`);
    } catch (err) {
      setFlash(null);
      setError(err.message);
    }
  }

  function handleDelete() {
    try {
      deleteTask(task.id);
      navigate(`/tasks/board/${task.project_id}`, {
        replace: true,
        state: { flash: `"${task.title}" was deleted.` },
      });
    } catch (err) {
      setAskDelete(false);
      setError(err.message);
    }
  }

  return (
    <div className="page tega-task">
      <Link to="/tasks" className="back-link">
        <Icon name="arrowLeft" size={16} />
        All tasks
      </Link>

      <header className="tega-detail-header card">
        <div className="tega-detail-title">
          <p className="eyebrow">Task</p>
          <h1>{task.title}</h1>
          <div className="tega-detail-tags">
            <TaskStatusBadge status={task.status} />
            <DueLabel task={task} />
          </div>
        </div>
        <div className="detail-actions">
          <Link to={`/tasks/${task.id}/edit`} className="btn">
            <Icon name="edit" size={16} />
            Edit
          </Link>
          <button type="button" className="btn btn-danger" onClick={() => setAskDelete(true)}>
            <Icon name="trash" size={16} />
            Delete
          </button>
        </div>
      </header>

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

      <section className="card tega-status-card">
        <h2>Change status</h2>
        <div className="tega-status-actions">
          {TASK_STATUSES.map((status) => (
            <button
              type="button"
              key={status.value}
              className={`tega-status-button ${task.status === status.value ? 'active' : ''}`}
              aria-pressed={task.status === status.value}
              onClick={() => changeStatus(status.value)}
            >
              <span className={`status-dot task-status-${status.value}`} />
              {status.label}
            </button>
          ))}
        </div>
      </section>

      <section className="card tega-detail-grid">
        <dl className="tega-facts">
          <Fact label="Project">
            <Link className="tega-project-link" to={`/projects/${task.project.id}`}>
              {task.project.title}
            </Link>
          </Fact>
          <Fact label="Client">{task.project.client?.name ?? 'Unknown client'}</Fact>
          <Fact label="Person">
            <span className="tega-person">
              <PersonAvatar person={task.assignee} size={28} />
              {task.assignee?.display_name ?? 'Unassigned'}
            </span>
          </Fact>
          <Fact label="Due date">{formatDate(task.due_date)}</Fact>
          <Fact label="Created">{formatDateTime(task.created_at)}</Fact>
          <Fact label="Last changed">{formatDateTime(task.updated_at)}</Fact>
        </dl>
      </section>

      <Link to={`/tasks/board/${task.project_id}`} className="btn btn-primary tega-board-link">
        <Icon name="kanban" size={16} />
        Open project board
      </Link>

      <ConfirmDialog
        open={askDelete}
        icon="trash"
        tone="danger"
        title="Are you sure?"
        confirmLabel="Delete task"
        onConfirm={handleDelete}
        onCancel={() => setAskDelete(false)}
      >
        "{task.title}" will be removed for good. This can't be undone.
      </ConfirmDialog>
    </div>
  );
}

function Fact({ label, children }) {
  return (
    <div className="tega-fact">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
