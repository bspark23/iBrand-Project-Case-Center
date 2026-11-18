# 2. Team and Modules

## Roles

| Person | GitHub username | Role |
|--------|-----------------|------|
| Engineer A | `@lead-username` | **Lead.** Assigns tasks, reviews and merges all pull requests, builds the backend and the app shell |
| Engineer B | `@engineer-b` | Owner of M2 Task Board and M3 Equipment Registry |
| Engineer C | `@engineer-c` | Owner of M4 Media Repository and M5 Case Library |
| Engineer D | `@engineer-d` | Owner of M6 Share Links and M7 Client Progress View |

> Replace the usernames with real ones. Also update [.github/CODEOWNERS](../.github/CODEOWNERS).

## What each person is responsible for

The lead writes most of the code. Engineers B, C and D own their modules by doing the **thinking work**, then building the screens with AI help. For their module, each owner is responsible for:

| Skill | What it means in practice |
|-------|---------------------------|
| **Problem solving** | Find what can go wrong (edge cases) and decide what should happen |
| **System architecture** | Draw how their module connects to the backend and other modules |
| **System design** | Plan the screens, user steps and the data each screen needs |
| **System maintenance** | Keep their module's README, mock data and docs up to date; fix issues found in review |
| **Team collaboration** | Give feedback on other people's pull requests, run a weekly check-in |
| **Deadlines** | Move their tasks on the GitHub board and say early when something is late |

## The modules

### M1 – Project Core & Shell (Lead)
The base of the app: login, menu, page routing, creating and listing projects, and the "Publish as Case" button. Every other module plugs into this.

### M2 – Task Board (Engineer B)
A Kanban board (To do → In progress → Done). Drag cards between columns, filter by person, highlight tasks that are due soon or late.

### M3 – Equipment Registry (Engineer B)
A checklist of equipment for each project (camera, tripod, mic…), with quantity, a tick box, notes, and a PDF export.

### M4 – Media Repository (Engineer C)
Upload images, videos and documents to a project. Make thumbnails, add tags, show them in a gallery.

### M5 – Case Library (Engineer C)
The public page of finished work. Search and filter by client, project type and keyword. Each case page uses the client's brand colours.

### M6 – Share Links & Permissions (Engineer D)
Staff create a private link to a project or case. The link can have a password and an expiry date.

### M7 – Client Progress View (Engineer D)
What a client sees when they open a share link: the project status and dates only. No tasks, no equipment, no internal notes.

## Why the work is split this way

- The lead owns the "spine" (login + projects) because every module depends on it.
- B, C and D each own a full slice, so they rarely touch the same files and merge conflicts stay rare.
- Each module has its own mock data, so it runs and can be demoed without the others.

## Module "done" checklist

A module is done when:

- [ ] It does everything in its scope, using only endpoints in the [API contract](06-api-contract.md)
- [ ] It runs on its own with mock data
- [ ] It has a README explaining how to start and demo it
- [ ] It works with the real backend (passed an assembly test)
- [ ] The owner can demo it alone, without other modules
