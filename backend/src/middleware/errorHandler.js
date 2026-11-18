import { HttpError } from '../utils/httpError.js';
import { config } from '../config.js';

// Any path that no route matched.
export function notFound(req, res, next) {
  next(new HttpError(404, 'NOT_FOUND', `No endpoint for ${req.method} ${req.path}`));
}

// Turns every error into the standard error format from docs/06-api-contract.md.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: { code: err.code, message: err.message } });
  }

  // Bad JSON in the request body.
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: { code: 'BAD_JSON', message: 'Request body is not valid JSON.' } });
  }

  console.error(err);
  const message = config.nodeEnv === 'production' ? 'Something went wrong.' : err.message;
  return res.status(500).json({ error: { code: 'SERVER_ERROR', message } });
}
