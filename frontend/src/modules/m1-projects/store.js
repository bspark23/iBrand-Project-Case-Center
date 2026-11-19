// Where clients and projects are kept until the backend is connected.
//
// Data is saved in this browser's localStorage, so it survives a refresh.
// It is NOT shared between computers or browsers yet. When the backend is
// ready (P1-A04, P1-A05), only this file changes: each function will call
// src/shared/api.js instead.
//
// Reading:   useClients(), useProjects(), useProject(id)
// Clients:   createClient(values), updateClient(id, values), deleteClient(id)
// Projects:  createProject(values), updateProject(id, values), setProjectStatus(id, status), markProjectDone(id),
//            publishProject(id), deleteProject(id)
// Every changing function throws an Error with a readable message if it can't do the job.

import { useMemo, useSyncExternalStore } from 'react';
import { canMarkDone, getPublishState, pickEditable } from './projectRules.js';
import { normalizeClient } from './clientRules.js';
import { PROJECT_STATUSES } from './labels.js';

const STORAGE_KEY = 'ipcc.data.v1';
const EMPTY = { clients: [], projects: [] };

const storage = typeof window !== 'undefined' ? window.localStorage : null;

function load() {
  if (!storage) return EMPTY;
  try {
    const data = JSON.parse(storage.getItem(STORAGE_KEY) ?? 'null');
    return {
      clients: Array.isArray(data?.clients) ? data.clients : [],
      projects: Array.isArray(data?.projects) ? data.projects : [],
    };
  } catch {
    return EMPTY;
  }
}

let state = load();
const listeners = new Set();
const emit = () => listeners.forEach((listener) => listener());

// Save first; only update the screen if saving worked, so nothing is lost silently.
function setState(next) {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    throw new Error("Couldn't save. This browser's storage may be full or blocked.");
  }
  state = next;
  emit();
}

// Keep other open tabs in sync.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      state = load();
      emit();
    }
  });
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
const getSnapshot = () => state;
const useStore = () => useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

// crypto.randomUUID only works on localhost/https, so fall back when opened over a LAN IP.
function newId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));
}
const now = () => new Date().toISOString();

const withClient = (project, clients) => ({
  ...project,
  client: clients.find((c) => c.id === project.client_id) ?? null,
});

function findProject(id) {
  const project = state.projects.find((p) => p.id === id);
  if (!project) throw new Error('Project not found. It may have been deleted.');
  return project;
}

function replaceProject(updated) {
  setState({ ...state, projects: state.projects.map((p) => (p.id === updated.id ? updated : p)) });
  return updated;
}

// ---------- Reading ----------

export function useClients() {
  const { clients } = useStore();
  return useMemo(() => [...clients].sort((a, b) => a.name.localeCompare(b.name)), [clients]);
}

export function useProjects() {
  const { projects, clients } = useStore();
  return useMemo(() => projects.map((p) => withClient(p, clients)), [projects, clients]);
}

export function useProject(id) {
  const { projects, clients } = useStore();
  return useMemo(() => {
    const project = projects.find((p) => p.id === id);
    return project ? withClient(project, clients) : null;
  }, [projects, clients, id]);
}

// ---------- Clients ----------

export function createClient(values) {
  const client = { id: newId(), ...normalizeClient(values), created_at: now() };
  setState({ ...state, clients: [...state.clients, client] });
  return client;
}

export function updateClient(id, values) {
  const existing = state.clients.find((c) => c.id === id);
  if (!existing) throw new Error('Client not found. It may have been deleted.');
  const updated = { ...existing, ...normalizeClient(values) };
  setState({ ...state, clients: state.clients.map((c) => (c.id === id ? updated : c)) });
  return updated;
}

// A client with projects can't be deleted, so no project is left without a client.
export function deleteClient(id) {
  const count = state.projects.filter((p) => p.client_id === id).length;
  if (count > 0) {
    throw new Error(`This client still has ${count} ${count === 1 ? 'project' : 'projects'}. Delete those first.`);
  }
  setState({ ...state, clients: state.clients.filter((c) => c.id !== id) });
}

// ---------- Projects ----------

function cleanProject(values) {
  const picked = pickEditable(values);
  if (!state.clients.some((c) => c.id === picked.client_id)) {
    throw new Error('Pick a client that exists.');
  }
  return { ...picked, title: picked.title.trim() };
}

export function createProject(values) {
  const time = now();
  const project = {
    id: newId(),
    ...cleanProject(values),
    is_published: false,
    published_at: null,
    created_by: null, // set to the logged-in user once login exists (P1-A02)
    created_at: time,
    updated_at: time,
  };
  setState({ ...state, projects: [project, ...state.projects] });
  return project;
}

export function updateProject(id, values) {
  const existing = findProject(id);
  const changes = cleanProject(values);
  if (existing.is_published && changes.status !== 'delivered') {
    throw new Error('A published project must stay Delivered.');
  }
  return replaceProject({ ...existing, ...changes, updated_at: now() });
}

// Change only the status (Start, Mark as done, Archive, Restore).
export function setProjectStatus(id, status) {
  const existing = findProject(id);
  if (!PROJECT_STATUSES.some((s) => s.value === status)) throw new Error('Unknown status.');
  if (existing.is_published && status !== 'delivered') {
    throw new Error('A published project must stay Delivered.');
  }
  return replaceProject({ ...existing, status, updated_at: now() });
}

// "Done" means the work is delivered to the client.
export function markProjectDone(id) {
  if (!canMarkDone(findProject(id))) throw new Error('Only planning or active projects can be marked as done.');
  return setProjectStatus(id, 'delivered');
}

export function publishProject(id) {
  const existing = findProject(id);
  const { canPublish, reason } = getPublishState(existing);
  if (!canPublish) throw new Error(reason);
  // Rule 2: is_published and published_at are always set together.
  const time = now();
  return replaceProject({ ...existing, is_published: true, published_at: time, updated_at: time });
}

// Takes a project out of the Case Library. (Admin only once login exists.)
export function unpublishProject(id) {
  const existing = findProject(id);
  if (!existing.is_published) throw new Error('This project is not published.');
  // Rule 2: is_published and published_at change together.
  return replaceProject({ ...existing, is_published: false, published_at: null, updated_at: now() });
}

// Read-only access for other modules' stores (e.g. the Task Board checks a project exists).
export const getProjects = () => state.projects;
export const getClients = () => state.clients;

export function deleteProject(id) {
  findProject(id);
  setState({ ...state, projects: state.projects.filter((p) => p.id !== id) });
}
