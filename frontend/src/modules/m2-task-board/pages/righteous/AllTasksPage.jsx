// OWNER: Righteous – task W2-03. See docs/tasks/week-2/W2-03-righteous-task-lists.md
//
// /tasks – every task from every project in one list.
//
// How this page works:
//   1. useTasks() gives us every task (with its project and person).
//   2. The filters the user picks are kept in the address bar, e.g. /tasks?status=todo&due=overdue.
//      That way the Back button and shared links keep the same filters.
//   3. filterTasks() and sortTasks() (in taskFilters.js) turn all tasks into the visible list.
//   4. Each row has a tick box to mark the task done, and a link to the task's own page.

import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from '../../../../shared/ui/Icon.jsx';
import EmptyState from '../../../../shared/ui/EmptyState.jsx';
import PersonAvatar from '../../../../shared/ui/PersonAvatar.jsx';
import { useProjects } from '../../../m1-projects/store.js';
import { useTeam } from '../../../../shared/teamStore.js';
import { useTasks, moveTask } from '../../taskStore.js';
import { TASK_STATUSES } from '../../taskRules.js';
import TaskStatusBadge from '../../components/TaskStatusBadge.jsx';
import DueLabel from '../../components/DueLabel.jsx';
import { DUE_FILTERS, filterTasks, sortTasks, countSummary } from './taskFilters.js';
import './lists.css';

// The names of the filters in the address bar. Keeping them in one place
// stops typos like "?stauts=" from breaking a filter.
const FILTER_KEYS = ['q', 'status', 'project', 'person', 'due'];

export default function AllTasksPage() {
  const tasks = useTasks();
  const projects = useProjects();
  const team = useTeam();
  const [params, setParams] = useSearchParams();
  const [error, setError] = useState(null);

  // Read the current filters from the address bar. Unknown values are ignored.
  const filters = {
    q: params.get('q') ?? '',
    status: TASK_STATUSES.some((s) => s.value === params.get('status')) ? params.get('status') : '',
    project: params.get('project') ?? '',
    person: params.get('person') ?? '',
    due: DUE_FILTERS.some((d) => d.value === params.get('due')) ? params.get('due') : '',
  };
  const hasFilters = FILTER_KEYS.some((key) => filters[key]);

  // Change one filter. An empty value removes it from the address.
  // { replace: true } stops every key press in the search box from adding a Back-button step.
  function setFilter(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }

  const clearFilters = () => setParams({}, { replace: true });

  // The number cards work like shortcuts: clicking one sets a filter,
  // clicking it again (when it's already on) turns it off.
  function toggleCard(key, value) {
    const isOn = filters[key] === value;
    const next = new URLSearchParams();
    if (!isOn) next.set(key, value);
    setParams(next, { replace: true });
  }

  // Only recalculate when the tasks or the filters change.
  const summary = useMemo(() => countSummary(tasks), [tasks]);
  const visible = useMemo(
    () => sortTasks(filterTasks(tasks, filters)),
    // filters is rebuilt on every render, so depend on the address instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tasks, params]
  );

  // Tick box: done -> back to "To do", anything else -> "Done".
  function toggleDone(task) {
    try {
      moveTask(task.id, task.status === 'done' ? 'todo' : 'done');
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  const cards = [
    { label: 'Overdue', value: summary.overdue, icon: 'alert', tone: 'danger', filter: ['due', 'overdue'] },
    { label: 'Due this week', value: summary.week, icon: 'calendar', tone: 'warn', filter: ['due', 'week'] },
    { label: 'In progress', value: summary.inProgress, icon: 'activity', tone: 'active', filter: ['status', 'in_progress'] },
    { label: 'Done', value: summary.done, icon: 'check', tone: 'delivered', filter: ['status', 'done'] },
  ];

  return (
    <section className="all-tasks">
      <header className="page-header">
        <div>
          <p className="eyebrow">Task Board</p>
          <h1>All tasks</h1>
          <p className="muted">Every task from every project. See what's late and what's coming up.</p>
        </div>
      </header>

      {/* Number cards */}
      <div className="stats">
        {cards.map((card) => {
          const [key, value] = card.filter;
          const active = filters[key] === value;
          return (
            <button
              key={card.label}
              type="button"
              className={`stat card summary-card ${active ? 'summary-card-active' : ''}`}
              onClick={() => toggleCard(key, value)}
              aria-pressed={active}
            >
              <span className={`stat-icon summary-${card.tone}`}>
                <Icon name={card.icon} size={18} />
              </span>
              <span>
                <span className="stat-value">{card.value}</span>
                <span className="stat-label">{card.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and filters */}
      <div className="toolbar card">
        <div className="toolbar-row">
          <label className="search">
            <Icon name="search" size={17} />
            <input
              type="search"
              placeholder="Search tasks or projects"
              value={filters.q}
              onChange={(e) => setFilter('q', e.target.value)}
              aria-label="Search tasks"
            />
          </label>

          <select className="select" value={filters.status} onChange={(e) => setFilter('status', e.target.value)} aria-label="Filter by status">
            <option value="">Any status</option>
            {TASK_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          <select className="select" value={filters.project} onChange={(e) => setFilter('project', e.target.value)} aria-label="Filter by project">
            <option value="">All projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>

          <select className="select" value={filters.person} onChange={(e) => setFilter('person', e.target.value)} aria-label="Filter by person">
            <option value="">Everyone</option>
            <option value="unassigned">Unassigned</option>
            {team.map((m) => (
              <option key={m.id} value={m.id}>{m.display_name}</option>
            ))}
          </select>

          <select className="select" value={filters.due} onChange={(e) => setFilter('due', e.target.value)} aria-label="Filter by due date">
            <option value="">Any due date</option>
            {DUE_FILTERS.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="result-line">
        Showing <strong>{visible.length}</strong> of {tasks.length} tasks
        {hasFilters && (
          <button type="button" className="link-button" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </p>

      {error && (
        <div className="alert alert-error" role="alert">
          <Icon name="alert" size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* The list, or a friendly message when it's empty */}
      {tasks.length === 0 ? (
        <EmptyState
          icon="kanban"
          title="No tasks yet"
          action={
            <Link to="/tasks/new" className="btn btn-primary">
              <Icon name="plus" size={16} />
              Add a task
            </Link>
          }
        >
          Tasks from every project will show up here.
        </EmptyState>
      ) : visible.length === 0 ? (
        <EmptyState
          icon="search"
          title="No tasks match"
          action={<button type="button" className="btn" onClick={clearFilters}>Clear filters</button>}
        >
          Try a different search word, or remove a filter.
        </EmptyState>
      ) : (
        <ul className="task-list card">
          {visible.map((task) => (
            <TaskRow key={task.id} task={task} onToggleDone={() => toggleDone(task)} />
          ))}
        </ul>
      )}
    </section>
  );
}

// One line in the list. The tick box and the link are separate,
// so ticking a task doesn't also open it.
function TaskRow({ task, onToggleDone }) {
  const done = task.status === 'done';
  return (
    <li className={`task-row ${done ? 'task-row-done' : ''}`}>
      <input
        type="checkbox"
        className="task-check"
        checked={done}
        onChange={onToggleDone}
        aria-label={done ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`}
      />
      <Link to={`/tasks/${task.id}`} className="task-row-link">
        <span className="task-row-main">
          <span className="task-row-title">{task.title}</span>
          <span className="task-row-project">
            {task.project.title}
            {task.project.client && <> · {task.project.client.name}</>}
          </span>
        </span>
        <span className="task-row-status">
          <TaskStatusBadge status={task.status} />
        </span>
        <span className="task-row-person">
          <PersonAvatar person={task.assignee} size={26} />
          <span>{task.assignee?.display_name ?? 'Unassigned'}</span>
        </span>
        <span className="task-row-due">
          {task.due_date ? <DueLabel task={task} /> : <span className="muted">No due date</span>}
        </span>
      </Link>
    </li>
  );
}
