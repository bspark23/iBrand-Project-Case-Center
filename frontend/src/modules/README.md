# Modules

Each folder is one module, owned by one person.

| Folder | Module | Owner |
|--------|--------|-------|
| `m1-projects` | M1 Projects | Engineer A (Lead) |
| `m2-task-board` | M2 Task Board | Engineer B |
| `m3-equipment` | M3 Equipment Registry | Engineer B |
| `m4-media` | M4 Media Repository | Engineer C |
| `m5-case-library` | M5 Case Library | Engineer C |
| `m6-share-links` | M6 Share Links | Engineer D |
| `m7-client-progress` | M7 Client Progress | Engineer D |

## Rules

- Only change files inside your own folder.
- `index.jsx` must export one default component. That is your module's main page.
- Put your fake data in `mock-data.json` inside your folder (task P1-06). It must match [the data model](../../../docs/05-data-model.md).
- Call the backend only through `src/shared/api.js`, and only use endpoints from [the API contract](../../../docs/06-api-contract.md).
- Each folder gets its own `README.md` (task P2-01).
