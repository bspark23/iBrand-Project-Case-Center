// Where tasks are kept until the backend is connected (P2-A01).
// Saved in this browser's localStorage, like clients and projects.
// When the backend is ready, only this file changes.
//
// ---------- How to use (everything you need for your page) ----------
//
// Reading (React hooks – they update the page by themselves when data changes):
//   const tasks = useTasks();                  // every task, each with .project and .assignee
//   const tasks = useProjectTasks(projectId);  // one project's tasks, in board order
//   const task  = useTask(id);                 // one task with .project and .assignee, or null
//
// Changing (each throws an Error with a readable message if a rule blocks it):
//   createTask({ project_id, title, assignee_id, status, due_date })  -> new task
//   updateTask(id, { ...same fields })                                 -> updated task
//   moveTask(id, toStatus, toIndex)  // for drag and drop: put the task in a column at a position
//   deleteTask(id)
//
// Each task looks like the `tasks` table:
//   { id, project_id, assignee_id, title, status, due_date, position, created_at, updated_at }
// plus, from the hooks: task.project (the project, with .client) and task.assignee (a team member or null).

import { useMemo, useSyncExternalStore } from 'react';
import { useProjects, getProjects } from '../m1-projects/store.js';
import { useTeam, getTeam } from '../../shared/teamStore.js';
import { TASK_STATUSES, validateTask } from './taskRules.js';

const STORAGE_KEY = 'ipcc.tasks.v1';
const storage = typeof window !== 'undefined' ? window.localStorage : null;

function load() {
  try {
    const data = JSON.parse(storage?.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

let tasks = load();
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

function save(next) {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    throw new Error("Couldn't save. This browser's storage may be full or blocked.");
  }
  tasks = next;
  emit();
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      tasks = load();
      emit();
    }
  });
}

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const getSnapshot = () => tasks;
const useRawTasks = () => useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

function newId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));
}
const now = () => new Date().toISOString();
const byPosition = (a, b) => a.position - b.position;
const statusOrder = (s) => TASK_STATUSES.findIndex((x) => x.value === s);

// Joins each task with its project and assignee. Tasks whose project was deleted are hidden.
function useJoined(list) {
  const projects = useProjects();
  const team = useTeam();
  return useMemo(() => {
    const projectById = new Map(projects.map((p) => [p.id, p]));
    const memberById = new Map(team.map((m) => [m.id, m]));
    return list
      .filter((t) => projectById.has(t.project_id))
      .map((t) => ({ ...t, project: projectById.get(t.project_id), assignee: memberById.get(t.assignee_id) ?? null }));
  }, [list, projects, team]);
}

// ---------- Reading ----------

export function useTasks() {
  return useJoined(useRawTasks());
}

export function useProjectTasks(projectId) {
  const raw = useRawTasks();
  const own = useMemo(
    () => raw.filter((t) => t.project_id === projectId).sort((a, b) => statusOrder(a.status) - statusOrder(b.status) || byPosition(a, b)),
    [raw, projectId]
  );
  return useJoined(own);
}

export function useTask(id) {
  const raw = useRawTasks();
  const one = useMemo(() => raw.filter((t) => t.id === id), [raw, id]);
  return useJoined(one)[0] ?? null;
}

// ---------- Changing ----------

function checkTask(values) {
  const errors = validateTask(values, { projects: getProjects(), team: getTeam() });
  const first = Object.values(errors)[0];
  if (first) throw new Error(first);
}

function clean(values) {
  return {
    project_id: values.project_id,
    title: values.title.trim().replace(/\s+/g, ' '),
    assignee_id: values.assignee_id || null,
    status: values.status,
    due_date: values.due_date || null,
  };
}

// Gives tasks in one column the positions 0, 1, 2, ... in their current order.
function renumber(list, projectId, status) {
  const column = list.filter((t) => t.project_id === projectId && t.status === status).sort(byPosition);
  const pos = new Map(column.map((t, i) => [t.id, i]));
  return list.map((t) => (pos.has(t.id) ? { ...t, position: pos.get(t.id) } : t));
}

const columnSize = (list, projectId, status) => list.filter((t) => t.project_id === projectId && t.status === status).length;

function find(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) throw new Error('Task not found. It may have been deleted.');
  return task;
}

export function createTask(values) {
  checkTask(values);
  const data = clean(values);
  const time = now();
  // New tasks go to the bottom of their column.
  const task = { id: newId(), ...data, position: columnSize(tasks, data.project_id, data.status), created_at: time, updated_at: time };
  save([...tasks, task]);
  return task;
}

export function updateTask(id, values) {
  const existing = find(id);
  checkTask(values);
  const data = clean(values);
  const moved = data.project_id !== existing.project_id || data.status !== existing.status;

  let next = tasks.filter((t) => t.id !== id);
  const updated = {
    ...existing,
    ...data,
    position: moved ? columnSize(next, data.project_id, data.status) : existing.position,
    updated_at: now(),
  };
  next = [...next, updated];
  if (moved) next = renumber(next, existing.project_id, existing.status);
  save(next);
  return updated;
}

// For drag and drop. Puts the task into column `toStatus` at position `toIndex`
// (0 = top). Other cards in both columns shift to make room.
export function moveTask(id, toStatus, toIndex) {
  const task = find(id);
  if (!TASK_STATUSES.some((s) => s.value === toStatus)) throw new Error('Unknown column.');

  const rest = tasks.filter((t) => t.id !== id);
  const column = rest.filter((t) => t.project_id === task.project_id && t.status === toStatus).sort(byPosition);
  const index = Math.max(0, Math.min(Number.isInteger(toIndex) ? toIndex : column.length, column.length));
  column.splice(index, 0, { ...task, status: toStatus, updated_at: task.status === toStatus ? task.updated_at : now() });

  const placed = new Map(column.map((t, i) => [t.id, { ...t, position: i }]));
  let next = [...rest.filter((t) => !placed.has(t.id)), ...placed.values()];
  if (task.status !== toStatus) next = renumber(next, task.project_id, task.status);
  save(next);
  return placed.get(id);
}

export function deleteTask(id) {
  const task = find(id);
  save(renumber(tasks.filter((t) => t.id !== id), task.project_id, task.status));
}
