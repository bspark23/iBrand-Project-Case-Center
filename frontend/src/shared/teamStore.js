// The people who work at iBrand (staff, interns, admins). Tasks are assigned to them.
// Matches the `users` table in docs/05-data-model.md, without passwords.
// Login (P1-A02) will replace this with real user accounts; until then the list
// is saved in this browser's localStorage, like clients and projects.
//
// Reading:  useTeam(), useTeamMember(id), getTeam()
// Changing: addTeamMember(values), updateTeamMember(id, values), removeTeamMember(id)

import { useMemo, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'ipcc.team.v1';
const storage = typeof window !== 'undefined' ? window.localStorage : null;

export const TEAM_ROLES = [
  { value: 'intern', label: 'Intern' },
  { value: 'staff', label: 'Staff' },
  { value: 'admin', label: 'Admin' },
];
export const roleLabel = (role) => TEAM_ROLES.find((r) => r.value === role)?.label ?? 'Unknown';

function load() {
  try {
    const data = JSON.parse(storage?.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

let team = load();
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

function save(next) {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    throw new Error("Couldn't save. This browser's storage may be full or blocked.");
  }
  team = next;
  emit();
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      team = load();
      emit();
    }
  });
}

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const getSnapshot = () => team;

function newId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));
}

export const getTeam = () => team;

export function useTeam() {
  const list = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return useMemo(() => [...list].sort((a, b) => a.display_name.localeCompare(b.display_name)), [list]);
}

export function useTeamMember(id) {
  const list = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return useMemo(() => list.find((m) => m.id === id) ?? null, [list, id]);
}

// ---------- Rules ----------

export const NAME_MAX = 60;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateTeamMember(values, { editingId } = {}) {
  const errors = {};
  const name = values.display_name.trim();
  const email = values.email.trim().toLowerCase();

  if (!name) errors.display_name = 'Name is required.';
  else if (name.length > NAME_MAX) errors.display_name = `Name must be ${NAME_MAX} characters or less.`;

  if (!email) errors.email = 'Email is required.';
  else if (!EMAIL.test(email)) errors.email = 'Enter a valid email, like name@ibrand.com.';
  else if (team.some((m) => m.id !== editingId && m.email === email)) errors.email = 'Someone on the team already uses this email.';

  if (!TEAM_ROLES.some((r) => r.value === values.role)) errors.role = 'Pick a role.';
  return errors;
}

function clean(values) {
  return {
    display_name: values.display_name.trim().replace(/\s+/g, ' '),
    email: values.email.trim().toLowerCase(),
    role: values.role,
  };
}

function check(values, editingId) {
  const errors = validateTeamMember(values, { editingId });
  const first = Object.values(errors)[0];
  if (first) throw new Error(first);
}

// ---------- Changing ----------

export function addTeamMember(values) {
  check(values);
  const member = { id: newId(), ...clean(values), created_at: new Date().toISOString() };
  save([...team, member]);
  return member;
}

export function updateTeamMember(id, values) {
  const existing = team.find((m) => m.id === id);
  if (!existing) throw new Error('Team member not found.');
  check(values, id);
  const updated = { ...existing, ...clean(values) };
  save(team.map((m) => (m.id === id ? updated : m)));
  return updated;
}

// Their tasks stay, but show as "Unassigned".
export function removeTeamMember(id) {
  save(team.filter((m) => m.id !== id));
}
