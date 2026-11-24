// OWNER: Righteous – task W2-03.
//
// Plain helper functions for the All tasks and People pages.
// They take a list of tasks and return a new list or some numbers.
// They never change any data and never touch React, so they are easy to read
// and easy to test on their own.
//
// A "task" here is what useTasks() returns: a row from the tasks table plus
//   task.project  – the project it belongs to (with .title and .client)
//   task.assignee – the team member doing it, or null if nobody is assigned
//
// "today" is a date like "2026-11-24". It is a parameter so tests can pick any day.

import { dueState, todayISO } from '../../taskRules.js';

// The choices in the "Due" filter dropdown.
export const DUE_FILTERS = [
  { value: 'overdue', label: 'Overdue' },
  { value: 'today', label: 'Due today' },
  { value: 'week', label: 'Due this week' },
  { value: 'none', label: 'No due date' },
];

// Number of whole days from `from` to `to` (both "YYYY-MM-DD").
function daysBetween(from, to) {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000);
}

// True when an unfinished task is due today or in the next 6 days.
// Overdue tasks are NOT counted here; they have their own number.
export function isDueThisWeek(task, today = todayISO()) {
  if (!task.due_date || task.status === 'done') return false;
  const days = daysBetween(today, task.due_date);
  return days >= 0 && days <= 6;
}

// Does this task match the chosen "Due" filter? An empty filter matches everything.
export function matchesDue(task, due, today = todayISO()) {
  switch (due) {
    case 'overdue':
      return dueState(task, today)?.key === 'overdue';
    case 'today':
      return dueState(task, today)?.key === 'today';
    case 'week':
      return isDueThisWeek(task, today);
    case 'none':
      return !task.due_date;
    default:
      return true;
  }
}

// Keeps only the tasks that match every filter the user has set.
//   filters = { q, status, project, person, due }
//   - q:       words to search for in the task title or project title
//   - status:  'todo' | 'in_progress' | 'done' | '' (any)
//   - project: a project id, or '' (any)
//   - person:  a team member id, 'unassigned', or '' (anyone)
//   - due:     a value from DUE_FILTERS, or '' (any)
export function filterTasks(tasks, filters, today = todayISO()) {
  const q = (filters.q ?? '').trim().toLowerCase();

  return tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.project && task.project_id !== filters.project) return false;

    // "Unassigned" also catches tasks whose person was removed from the team,
    // because useTasks() gives those an assignee of null.
    if (filters.person === 'unassigned' && task.assignee) return false;
    if (filters.person && filters.person !== 'unassigned' && task.assignee?.id !== filters.person) return false;

    if (!matchesDue(task, filters.due, today)) return false;

    if (q) {
      const text = `${task.title} ${task.project?.title ?? ''}`.toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });
}

// The order of the list:
//   1. Unfinished tasks come before done tasks.
//   2. Then the earliest due date first. Overdue tasks have the earliest dates, so they lead.
//   3. Tasks with no due date go after the ones with a date.
//   4. If all of that is equal, sort by title A–Z.
// Returns a new array; the original is not changed.
export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    const doneA = a.status === 'done' ? 1 : 0;
    const doneB = b.status === 'done' ? 1 : 0;
    if (doneA !== doneB) return doneA - doneB;

    if (a.due_date && b.due_date && a.due_date !== b.due_date) return a.due_date.localeCompare(b.due_date);
    if (a.due_date && !b.due_date) return -1;
    if (!a.due_date && b.due_date) return 1;

    return a.title.localeCompare(b.title);
  });
}

// The four numbers at the top of the All tasks page.
export function countSummary(tasks, today = todayISO()) {
  return {
    overdue: tasks.filter((t) => dueState(t, today)?.key === 'overdue').length,
    week: tasks.filter((t) => isDueThisWeek(t, today)).length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
  };
}

// One row of numbers for a person (or for "Unassigned").
function countFor(list, today) {
  const done = list.filter((t) => t.status === 'done').length;
  return {
    total: list.length,
    open: list.length - done,
    overdue: list.filter((t) => dueState(t, today)?.key === 'overdue').length,
    done,
    // Share of their tasks that are done, 0–100. Zero tasks counts as 0%.
    percentDone: list.length ? Math.round((done / list.length) * 100) : 0,
  };
}

// Builds the cards for the People page.
// Returns { people, unassigned }:
//   people:     [{ member, ...counts }] for every team member, even those with no tasks,
//               sorted so the person with the most overdue tasks comes first,
//               then the most open tasks, then by name.
//   unassigned: the counts for tasks with no person, or null if there are none.
export function workloadByPerson(tasks, team, today = todayISO()) {
  const people = team
    .map((member) => ({ member, ...countFor(tasks.filter((t) => t.assignee?.id === member.id), today) }))
    .sort(
      (a, b) =>
        b.overdue - a.overdue ||
        b.open - a.open ||
        a.member.display_name.localeCompare(b.member.display_name)
    );

  const noPerson = tasks.filter((t) => !t.assignee);
  return { people, unassigned: noPerson.length ? countFor(noPerson, today) : null };
}
