# 6. API Contract

> **Status: DRAFT** – the full version lives in `backend/openapi.yaml` (task P0-07). If this file and the OpenAPI file disagree, the OpenAPI file wins.

This is the list of every backend endpoint. Frontend modules may only call endpoints listed here.

- Logged-in requests send the login token in the header: `Authorization: Bearer <token>`
- "Role" means who is allowed to call it. Everyone else gets `403 Forbidden`.

## Auth (M1)
| Method | Path | What it does | Role |
|--------|------|--------------|------|
| POST | `/api/auth/register` | Create a user | admin |
| POST | `/api/auth/login` | Log in, get a token | anyone |
| GET | `/api/auth/me` | Who am I? | any logged-in user |

## Clients (M1)
| Method | Path | What it does | Role |
|--------|------|--------------|------|
| GET | `/api/clients` | List clients | staff, admin |
| POST | `/api/clients` | Create a client | staff, admin |
| PATCH | `/api/clients/:id` | Update a client | staff, admin |

## Projects (M1)
| Method | Path | What it does | Role |
|--------|------|--------------|------|
| GET | `/api/projects` | List projects (filter by status, client) | staff, admin, intern (only assigned) |
| POST | `/api/projects` | Create a project | staff, admin |
| GET | `/api/projects/:id` | Project detail | staff, admin, assigned intern |
| PATCH | `/api/projects/:id` | Update a project | staff, admin |
| POST | `/api/projects/:id/publish` | Turn into a case study | staff, admin |
| POST | `/api/projects/:id/unpublish` | Remove from case library | admin |

## Tasks (M2)
| Method | Path | What it does | Role |
|--------|------|--------------|------|
| GET | `/api/projects/:id/tasks` | List tasks | staff, admin, assigned intern |
| POST | `/api/projects/:id/tasks` | Create a task | staff, admin |
| PATCH | `/api/tasks/:id` | Change status or position | assignee, staff, admin |
| DELETE | `/api/tasks/:id` | Delete a task | staff, admin |

## Equipment (M3)
| Method | Path | What it does | Role |
|--------|------|--------------|------|
| GET | `/api/projects/:id/equipment` | List items | staff, admin |
| POST | `/api/projects/:id/equipment` | Add an item | staff, admin |
| PATCH | `/api/equipment/:id` | Update / tick an item | staff, admin |
| GET | `/api/projects/:id/equipment/export` | Download PDF | staff, admin |

## Media (M4)
| Method | Path | What it does | Role |
|--------|------|--------------|------|
| POST | `/api/projects/:id/media` | Upload a file | staff, admin, intern |
| GET | `/api/projects/:id/media` | List files | staff, admin, assigned intern |
| DELETE | `/api/media/:id` | Delete a file | staff, admin |

## Public case library (M5)
| Method | Path | What it does | Role |
|--------|------|--------------|------|
| GET | `/api/public/cases` | List published cases | anyone |
| GET | `/api/public/cases/:id` | Case detail | anyone |

## Share links (M6, M7)
| Method | Path | What it does | Role |
|--------|------|--------------|------|
| POST | `/api/share-links` | Create a share link | staff, admin |
| GET | `/api/shared/:token` | Open a share link (asks for password if set) | anyone with the link |
| GET | `/api/shared/:token/project` | Read-only project progress | anyone with a valid link |

## Open questions for Week 1 (task P0-06)
- M6 needs to list and delete share links. Add `GET /api/share-links` and `DELETE /api/share-links/:id`?
- M2 needs to edit task title and due date, not just status. Does `PATCH /api/tasks/:id` cover that?
- M3 has no delete endpoint for equipment. Add `DELETE /api/equipment/:id`?
- How does a password-protected share link send the password? (e.g. `POST /api/shared/:token/unlock`)

## Standard error format
Every error looks like this:
```json
{ "error": { "code": "FORBIDDEN", "message": "You do not have access to this project." } }
```
