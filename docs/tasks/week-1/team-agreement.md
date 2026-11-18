# Week 1 Team Agreement

Fill this in together on the Day 1 kick-off call. One person types; everyone agrees.
Whoever types it pushes it in their PR, and the other two approve it in a comment.

**Date of call:**
**Present:**
**Check-in runner (end of week):**

## 1. StatusBadge (owner: Samuel)

How to use it:
```jsx
<StatusBadge status="active" />
```

| Status | Label shown | Colour |
|--------|-------------|--------|
| planning | | |
| active | | |
| delivered | | |
| archived | | |

## 2. labels.js (owner: Righteous)

What it exports and how to use it:
```js
// example
import { typeLabel, statusLabel } from '../labels.js';
typeLabel('brand_film')   // "Brand film"
```

## 3. useMockProjects.js (owner: Tega)

What it returns:
```js
// example
const projects = useMockProjects();          // all projects, each with .client
const project  = useMockProject(id);         // one project or null
```

## 4. Links between pages

| From | Button / click | Goes to |
|------|----------------|---------|
| List | Click a project card | `/projects/:id` |
| List | "+ New project" | `/projects/new` |
| Detail | "Edit" | `/projects/:id/edit` |
| Form | "Save" (new) | |
| Form | "Save" (edit) | |
| Form | "Cancel" | |

## 5. How we talk

- Main place for decisions: GitHub PR comments / Discussions
- Quick chat: 
- Best time for calls: 

## 6. Anything else we agreed
-
