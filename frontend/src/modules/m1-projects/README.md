# M1 – Projects and Clients

**Owner:** Lead (@bspark23)

## Pages

| URL | Page | File |
|-----|------|------|
| `/clients` | Clients: add, edit, delete, see project counts | `pages/ClientListPage.jsx` |
| `/projects` | Project list: search, filter, sort, card or table view | `pages/ProjectListPage.jsx` |
| `/projects/new` | Create a project (`?client=<id>` picks the client) | `pages/ProjectFormPage.jsx` |
| `/projects/:id` | Project detail: start, mark as done, publish, archive, delete | `pages/ProjectDetailPage.jsx` |
| `/projects/:id/edit` | Edit a project | `pages/ProjectFormPage.jsx` |

## Where the data lives (for now)

There is no dummy data. The app starts empty, and you add your real clients and projects.

Until the backend is connected, data is saved in **this browser's localStorage** (`store.js`):
- It survives a page refresh.
- It is **not** shared between computers or browsers.
- Clearing the browser's site data deletes it.

When the backend endpoints are ready (P1-A04 clients, P1-A05 projects), only `store.js` changes. The pages stay the same.

## Rules

| Rule | Where it's enforced |
|------|---------------------|
| Every project needs a client that exists | `store.js`, `projectRules.js` |
| End date can't be before the start date | `projectRules.js` |
| Only Delivered projects can be published | `projectRules.js`, `store.js` |
| A published project must stay Delivered | `projectRules.js`, `store.js` |
| A client with projects can't be deleted | `store.js` |
| Client names must be unique | `clientRules.js` |

## Files

| File | What it does |
|------|--------------|
| `store.js` | Saves and reads clients and projects |
| `projectRules.js` | Project checks: validation, publish, mark as done |
| `clientRules.js` | Client checks: validation, unique name |
| `labels.js` | Readable names and date formatting |
| `components/` | StatusBadge, TypeLabel, ClientAvatar, ProjectCard, ClientFormDialog |
| `projects.css` | Styles for this module |
