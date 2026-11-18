# Backend

Node.js + Express API. One server for every endpoint. Owned by the lead.

## Run it

```
cd backend
npm install
npm run dev
```

- Health check: http://localhost:4000/api/health
- API docs (Swagger): http://localhost:4000/api/docs

## Layout

```
backend/
├── openapi.yaml           The API contract. The source of truth for endpoints.
└── src/
    ├── server.js          Starts the server
    ├── app.js             Sets up Express and plugs in each module's routes
    ├── config.js          Settings from environment variables
    ├── middleware/        Error handling (later: login check, role check)
    ├── utils/             Small helpers (HttpError)
    └── modules/           One folder per feature (health, auth, projects, ...)
```

Coming in Phase 1: `db/` (database and migrations) and `storage/` (saving files on disk).

## Errors

Throw `new HttpError(status, code, message)` from any route. It is sent back in the standard format:

```json
{ "error": { "code": "NOT_FOUND", "message": "Project not found." } }
```
