# 5. Data Model

> **Status: DRAFT** – becomes **FROZEN** at the end of Week 1 (task P0-05). After that, changes need a `contract-change` issue approved by the lead.

This is the list of database tables. Every module and every endpoint must follow it. All mock data must match it exactly.

All `id` fields are UUIDs (long random IDs like `3f2b8c1e-...`).

## clients
The companies iBrand works for.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | primary key |
| name | text | |
| logo_url | text | |
| brand_colors | JSON | e.g. `{"primary": "#E30613", "secondary": "#111111"}` |
| created_at | timestamp | |

## projects
One job for a client.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | primary key |
| client_id | UUID | links to `clients` |
| title | text | |
| type | one of `event`, `livestream`, `brand_film`, `documentary` | |
| status | one of `planning`, `active`, `delivered`, `archived` | |
| start_date | date | |
| end_date | date | |
| is_published | true/false | default false. True = shows in the Case Library |
| published_at | timestamp or empty | set at the same time as `is_published` |
| created_by | UUID | links to `users` |
| created_at | timestamp | |
| updated_at | timestamp | |

## tasks
Work items inside a project (Task Board).

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | primary key |
| project_id | UUID | links to `projects` |
| assignee_id | UUID | links to `users` |
| title | text | |
| status | one of `todo`, `in_progress`, `done` | |
| due_date | date | |
| position | number | order of the card inside its column |

## equipment
Items needed for a project (Equipment Registry).

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | primary key |
| project_id | UUID | links to `projects` |
| item_name | text | |
| quantity | number | |
| checked | true/false | |
| notes | text | |

## media
Files uploaded to a project (Media Repository).

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | primary key |
| project_id | UUID | links to `projects` |
| file_url | text | path on our server disk |
| media_type | one of `image`, `video`, `document` | |
| tags | list of text | |
| thumbnail_url | text | |
| uploaded_by | UUID | links to `users` |
| created_at | timestamp | |

## share_links
Private links for clients or outsiders.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | primary key |
| target_type | one of `project`, `client`, `case` | what the link points to |
| target_id | UUID | the ID of that thing |
| token | text, unique | long random string in the URL |
| password_hash | text or empty | scrambled password, if the link has one |
| expires_at | timestamp or empty | |
| created_by | UUID | links to `users` |

## users
Everyone who can log in.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | primary key |
| email | text, unique | |
| password_hash | text | scrambled password |
| display_name | text | |
| role | one of `intern`, `staff`, `admin`, `client` | |
| created_at | timestamp | |

## Open question for Week 1
- Interns can only see projects they are "assigned to". The tables above don't say how an intern is assigned to a project. Option: a `project_members` table (`project_id`, `user_id`). Decide in P0-05.

## Rules that must always be true

1. A project can only be published when its status is `delivered`.
2. `is_published` and `published_at` are always set together.
3. A share link to a case only shows that case's published media.
4. Users with the `client` role never receive tasks, equipment or internal notes from any endpoint.
