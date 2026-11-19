// Business rules for projects, kept in one place so every page follows them.
// The backend will check the same rules; these give the user fast feedback.

import { PROJECT_TYPES, PROJECT_STATUSES, statusLabel } from './labels.js';

// Fields the user can fill in. Everything else (id, dates, publish fields) is set by the system.
export const EDITABLE_FIELDS = ['title', 'client_id', 'type', 'status', 'start_date', 'end_date'];

export const TITLE_MAX = 120;

export function pickEditable(project) {
  return Object.fromEntries(EDITABLE_FIELDS.map((field) => [field, project?.[field] ?? '']));
}

// A project can be marked as done (delivered) while it is still planning or active.
export const canMarkDone = (project) => ['planning', 'active'].includes(project.status);


// Rule 1 in docs/05-data-model.md: only delivered projects can be published.
export function getPublishState(project) {
  if (project.is_published) {
    return { canPublish: false, reason: 'Already published.' };
  }
  if (project.status !== 'delivered') {
    return {
      canPublish: false,
      reason: `Only delivered projects can be published. This one is ${statusLabel(project.status)}.`,
    };
  }
  return { canPublish: true, reason: null };
}

const isOption = (list, value) => list.some((item) => item.value === value);

// Returns { fieldName: 'error message' }. An empty object means the form is valid.
export function validateProject(values, { clients, isPublished }) {
  const errors = {};
  const title = values.title.trim();

  if (!title) errors.title = 'Title is required.';
  else if (title.length > TITLE_MAX) errors.title = `Title must be ${TITLE_MAX} characters or less.`;

  if (!values.client_id) errors.client_id = 'Pick a client.';
  else if (!clients.some((c) => c.id === values.client_id)) {
    errors.client_id = 'This client no longer exists. Pick another one.';
  }

  if (!isOption(PROJECT_TYPES, values.type)) errors.type = 'Pick a project type.';

  if (!isOption(PROJECT_STATUSES, values.status)) errors.status = 'Pick a status.';
  else if (isPublished && values.status !== 'delivered') {
    // Rule 1 again: a published project must stay delivered.
    errors.status = 'A published project must stay Delivered. Unpublish it first.';
  }

  if (!values.start_date) errors.start_date = 'Start date is required.';
  if (!values.end_date) errors.end_date = 'End date is required.';
  else if (values.start_date && values.end_date < values.start_date) {
    errors.end_date = "End date can't be before the start date.";
  }

  return errors;
}
