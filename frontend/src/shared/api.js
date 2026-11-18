// One place for all calls to the backend.
// Modules must use this instead of calling fetch() directly,
// so login tokens and errors are handled the same way everywhere.

async function request(method, path, body) {
  const headers = { Accept: 'application/json' };
  const token = localStorage.getItem('ipcc_token');
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  const res = await fetch(path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = data?.error?.message || `Request failed (${res.status})`;
    const error = new Error(message);
    error.status = res.status;
    error.code = data?.error?.code;
    throw error;
  }
  return data;
}

export const api = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  patch: (path, body) => request('PATCH', path, body),
  delete: (path) => request('DELETE', path),
};
