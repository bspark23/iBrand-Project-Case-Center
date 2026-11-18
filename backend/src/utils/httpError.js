// Throw this from any route to send a clean error in the standard format:
// { "error": { "code": "NOT_FOUND", "message": "Project not found." } }

export class HttpError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}
