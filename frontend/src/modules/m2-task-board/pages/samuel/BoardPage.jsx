// OWNER: Samuel – task W2-01. See docs/tasks/week-2/W2-01-samuel-task-board.md

import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProject } from '../../../m1-projects/store.js';
import { useTeam } from '../../../../shared/teamStore.js';
import PersonAvatar from '../../../../shared/ui/PersonAvatar.jsx';
import DueLabel from '../../components/DueLabel.jsx';
import { moveTask, createTask, useProjectTasks } from '../../taskStore.js';
import { TASK_STATUSES } from '../../taskRules.js';
import './BoardPage.css';

export default function BoardPage() {
  const { projectId } = useParams();
  const project = useProject(projectId);
  const tasks = useProjectTasks(projectId);
  const team = useTeam();
  const navigate = useNavigate();

  const [assigneeFilter, setAssigneeFilter] = useState(null);
  const [drafts, setDrafts] = useState({});
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const [error, setError] = useState('');

  if (!project) {
    return (
      <main className="page">
        <Link to="/tasks/board" className="task-board-back">← Back to boards</Link>
        <section className="card task-board-empty">
          <h1>Project not found</h1>
          <p className="muted">It may have been deleted.</p>
        </section>
      </main>
    );
  }

  const visibleTasks = (status) =>
    tasks.filter(
      (task) =>
        task.status === status &&
        (assigneeFilter === null || task.assignee_id === assigneeFilter)
    );

  const startDrag = (event, task) => {
    setDraggedTaskId(task.id);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', task.id);
  };

  const getDropIndex = (event, status) => {
    const columnTasks = tasks.filter((task) => task.status === status);
    const remainingTasks = columnTasks.filter((task) => task.id !== draggedTaskId);

    const cards = Array.from(
      event.currentTarget.querySelectorAll('[data-task-id]')
    );

    for (let index = 0; index < cards.length; index += 1) {
      if (cards[index].dataset.taskId === draggedTaskId) continue;

      const rect = cards[index].getBoundingClientRect();
      if (event.clientY < rect.top + rect.height / 2) {
        const targetId = cards[index].dataset.taskId;
        const restIndex = remainingTasks.findIndex((task) => task.id === targetId);
        return restIndex < 0 ? remainingTasks.length : restIndex;
      }
    }

    return remainingTasks.length;
  };

  const dropOnColumn = (event, status) => {
    event.preventDefault();
    const columnTasks = tasks.filter((task) => task.status === status);
    setDropTarget({
      status,
      index: columnTasks.length,
      end: true,
    });
  };

  const finishDrop = (event, status) => {
    event.preventDefault();
    event.stopPropagation();

    const taskId = draggedTaskId || event.dataTransfer.getData('text/plain');
    if (!taskId) return;

    try {
      const index = getDropIndex(event, status);
      moveTask(taskId, status, index);
      setError('');
    } catch (moveError) {
      setError(moveError.message || 'Could not move the task.');
    } finally {
      setDraggedTaskId(null);
      setDropTarget(null);
    }
  };

  const addTask = (event, status) => {
    event.preventDefault();
    const title = (drafts[status] ?? '').trim();
    if (!title) return;

    try {
      createTask({
        project_id: projectId,
        title,
        assignee_id: null,
        status,
        due_date: null,
      });
      setDrafts((current) => ({ ...current, [status]: '' }));
      setError('');
    } catch (createError) {
      setError(createError.message || 'Could not create the task.');
    }
  };

  const openTask = (event, taskId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(`/tasks/${taskId}`);
    }
  };

  return (
    <main className="page task-board-page">
      <Link to="/tasks/board" className="task-board-back">← Back to boards</Link>

      <header className="page-header task-board-header">
        <div>
          <p className="eyebrow">{project.client?.name ?? 'No client'}</p>
          <h1>{project.title}</h1>
          <p className="muted">Tasks for this project</p>
        </div>
      </header>

      {team.length > 0 && (
        <section className="task-board-filters" aria-label="Filter tasks by assignee">
          <span className="muted">Filter by person:</span>
          {team.map((person) => (
            <button
              key={person.id}
              type="button"
              className={`task-board-filter ${assigneeFilter === person.id ? 'is-selected' : ''}`}
              aria-pressed={assigneeFilter === person.id}
              title={`Show ${person.display_name}'s tasks`}
              onClick={() =>
                setAssigneeFilter((current) => current === person.id ? null : person.id)
              }
            >
              <PersonAvatar person={person} size={30} />
              <span>{person.display_name}</span>
            </button>
          ))}
          {assigneeFilter !== null && (
            <button type="button" className="link-button" onClick={() => setAssigneeFilter(null)}>
              Clear filter
            </button>
          )}
        </section>
      )}

      {error && <p className="alert alert-error" role="alert">{error}</p>}

      <section className="task-board-columns" aria-label="Project task board">
        {TASK_STATUSES.map((status) => {
          const columnTasks = visibleTasks(status.value);
          const isDropEnd = dropTarget?.status === status.value && dropTarget.end;

          return (
            <section
              key={status.value}
              className="task-board-column"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => finishDrop(event, status.value)}
            >
              <header className="task-board-column-header">
                <h2>{status.label}</h2>
                <span className="task-board-count">{columnTasks.length}</span>
              </header>

              <div className="task-board-card-list">
                {columnTasks.length === 0 && (
                  <p className="task-board-no-tasks">No tasks here</p>
                )}

                {columnTasks.map((task) => {
                  const isDropBefore =
                    dropTarget?.taskId === task.id && dropTarget.side === 'before';
                  const isDropAfter =
                    dropTarget?.taskId === task.id && dropTarget.side === 'after';

                  return (
                    <div key={task.id}>
                      {isDropBefore && <div className="task-board-drop-marker" />}
                      <article
                        data-task-id={task.id}
                        className={`task-board-card ${draggedTaskId === task.id ? 'is-dragging' : ''}`}
                        draggable
                        onDragStart={(event) => startDrag(event, task)}
                        onDragEnd={() => {
                          setDraggedTaskId(null);
                          setDropTarget(null);
                        }}
                        onDragOver={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onDrop={(event) => finishDrop(event, status.value)}
                      >
                        <strong>{task.title}</strong>
                        <div className="task-board-card-details">
                          <span className="task-board-assignee">
                            <PersonAvatar person={task.assignee} size={25} />
                            <span>{task.assignee?.display_name ?? 'Unassigned'}</span>
                          </span>
                          <DueLabel task={task} />
                        </div>
                      </article>
                      {isDropAfter && <div className="task-board-drop-marker" />}
                    </div>
                  );
                })}

                {isDropEnd && <div className="task-board-drop-marker" />}
              </div>

              <form className="task-board-add" onSubmit={(event) => addTask(event, status.value)}>
                <input
                  aria-label={`New task in ${status.label}`}
                  placeholder="Add a task…"
                  value={drafts[status.value] ?? ''}
                  onChange={(event) =>
                    setDrafts((current) => ({ ...current, [status.value]: event.target.value }))
                  }
                />
                <button type="submit" className="btn">Add</button>
              </form>
            </section>
          );
        })}
      </section>

      <div className="task-board-drop-catcher" onDragOver={(event) => event.preventDefault()} onDrop={finishDrop} />
    </main>
  );
}
