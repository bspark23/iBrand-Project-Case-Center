// Task rules and readable names, shared by every Task Board page.
// Matches the `tasks` table in docs/05-data-model.md.

export const TASK_STATUSES = [
  { value: 'todo', label: 'To do' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
];

// taskStatusLabel('in_progress') -> "In progress"
export const taskStatusLabel = (value) => TASK_STATUSES.find((s) => s.value === value)?.label ?? 'Unknown';

export const TASK_TITLE_MAX = 120;
export const EMPTY_TASK = { project_id: '', title: '', assignee_id: '', status: 'todo', due_date: '' };

// Today as "YYYY-MM-DD" (UTC), so it can be compared with due dates.
export const todayISO = () => new Date().toISOString().slice(0, 10);

const daysBetween = (from, to) => Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000);

// How urgent a task is, from its due date.
// Returns null when there is no due date, otherwise
// { key, text } where key is: 'done' | 'overdue' | 'today' | 'soon' | 'later'
// 'soon' = due in the next 3 days.
export function dueState(task, today = todayISO()) {
  if (!task.due_date) return null;
  if (task.status === 'done') return { key: 'done', text: 'Done' };

  const days = daysBetween(today, task.due_date);
  if (days < 0) return { key: 'overdue', text: `Overdue by ${-days} ${days === -1 ? 'day' : 'days'}` };
  if (days === 0) return { key: 'today', text: 'Due today' };
  if (days === 1) return { key: 'soon', text: 'Due tomorrow' };
  if (days <= 3) return { key: 'soon', text: `Due in ${days} days` };
  return { key: 'later', text: `Due in ${days} days` };
}

// Returns { field: 'message' }. Empty object = valid.
export function validateTask(values, { projects = [], team = [] } = {}) {
  const errors = {};
  const title = (values.title ?? '').trim();

  if (!title) errors.title = 'Task title is required.';
  else if (title.length > TASK_TITLE_MAX) errors.title = `Title must be ${TASK_TITLE_MAX} characters or less.`;

  if (!values.project_id) errors.project_id = 'Pick a project.';
  else if (!projects.some((p) => p.id === values.project_id)) errors.project_id = 'This project no longer exists.';

  if (values.assignee_id && !team.some((m) => m.id === values.assignee_id)) {
    errors.assignee_id = 'This person is no longer on the team.';
  }

  if (!TASK_STATUSES.some((s) => s.value === values.status)) errors.status = 'Pick a status.';

  if (values.due_date && !/^\d{4}-\d{2}-\d{2}$/.test(values.due_date)) errors.due_date = 'Use a real date.';

  return errors;
}
