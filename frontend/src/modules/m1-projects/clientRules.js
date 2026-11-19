// Rules for clients, kept in one place so the form and the store agree.
// Shape matches the `clients` table in docs/05-data-model.md.

export const CLIENT_NAME_MAX = 80;
export const DEFAULT_COLORS = { primary: '#e30613', secondary: '#111111' };

const HEX = /^#[0-9a-f]{6}$/i;
export const isHex = (value) => HEX.test(value ?? '');

const cleanName = (name = '') => name.trim().replace(/\s+/g, ' ');

// The fields a user can edit, taken from a saved client.
export function pickClientFields(client) {
  return {
    name: client?.name ?? '',
    logo_url: client?.logo_url ?? '',
    brand_colors: {
      primary: client?.brand_colors?.primary ?? DEFAULT_COLORS.primary,
      secondary: client?.brand_colors?.secondary ?? DEFAULT_COLORS.secondary,
    },
  };
}

// Cleans form values before saving.
export function normalizeClient(values) {
  const fields = pickClientFields(values);
  return {
    name: cleanName(fields.name),
    logo_url: fields.logo_url.trim(),
    brand_colors: {
      primary: fields.brand_colors.primary.toLowerCase(),
      secondary: fields.brand_colors.secondary.toLowerCase(),
    },
  };
}

// Returns { field: 'message' }. Empty object = valid.
// existing: all saved clients (to stop duplicate names). editingId: the client being edited, if any.
export function validateClient(values, { existing = [], editingId } = {}) {
  const errors = {};
  const name = cleanName(values.name);

  if (!name) errors.name = 'Client name is required.';
  else if (name.length > CLIENT_NAME_MAX) errors.name = `Name must be ${CLIENT_NAME_MAX} characters or less.`;
  else if (existing.some((c) => c.id !== editingId && c.name.toLowerCase() === name.toLowerCase())) {
    errors.name = 'A client with this name already exists.';
  }

  const logo = (values.logo_url ?? '').trim();
  if (logo && !/^https?:\/\/\S+$/i.test(logo)) {
    errors.logo_url = 'Logo must be a web link starting with http:// or https://';
  }

  if (!isHex(values.brand_colors?.primary)) errors.primary = 'Use a colour code like #E30613.';
  if (!isHex(values.brand_colors?.secondary)) errors.secondary = 'Use a colour code like #111111.';

  return errors;
}
