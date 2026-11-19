# W2-02 – Task Form and Task Page (Tega)

**Owner:** Tega
**Reviewed by:** Samuel
**Branch:** `tega/W2-02-task-form-and-detail`
**Your folder:** `frontend/src/modules/m2-task-board/pages/tega/`
**Due:** end of Day 5

## What you are building

Two pages:

| Page | Address | File |
|------|---------|------|
| Task form | `/tasks/new` and `/tasks/<id>/edit` | `TaskFormPage.jsx` |
| Task page | `/tasks/<id>` | `TaskDetailPage.jsx` |

The **form** creates a new task, or changes an existing one.
The **task page** shows one task in full, with buttons to change it.

## Tools you can use

All of these are ready. Import them into your page.

| What | Where | How |
|------|-------|-----|
| One task | `taskStore.js` | `const task = useTask(id)` gives `null` if it doesn't exist |
| Create | `taskStore.js` | `createTask(values)` returns the new task |
| Save changes | `taskStore.js` | `updateTask(id, values)` |
| Change status only | `taskStore.js` | `moveTask(id, 'done')` |
| Delete | `taskStore.js` | `deleteTask(id)` |
| Check the form | `taskRules.js` | `validateTask(values, { projects, team })` gives `{ title: 'Task title is required.' }` |
| Empty form values | `taskRules.js` | `EMPTY_TASK` |
| Status names | `taskRules.js` | `TASK_STATUSES` |
| Projects | `m1-projects/store.js` | `useProjects()` |
| People | `shared/teamStore.js` | `useTeam()` |
| Status tag | `components/TaskStatusBadge.jsx` | `<TaskStatusBadge status={task.status} />` |
| Due date tag | `components/DueLabel.jsx` | `<DueLabel task={task} />` |
| Person's initials | `shared/ui/PersonAvatar.jsx` | `<PersonAvatar person={task.assignee} />` |
| "Are you sure?" pop-up | `shared/ui/ConfirmDialog.jsx` | see how the Projects page uses it |

Every changing function throws an error with a readable message if something is wrong. Show that message on the page.

## Step 1 – Plan it (Day 1)

Write your answers at the bottom of this file.

- [ ] **Steps:** write what a person does to create a task, and to edit one.
- [ ] **Drawing:** sketch both pages and add a photo to `docs/tasks/week-2/images/`.
- [ ] **Form rules:** for each field, write whether it's required and what error message to show.
- [ ] **Problems:** list at least 6 things that could go wrong. For example, "the task was deleted while I was editing it", "the person was removed from the team", or "I click Cancel after typing".

## Step 2 – The form (Day 2–3)

- [ ] Fields: title, project (dropdown), person (dropdown, with an "Unassigned" option), status, and due date.
- [ ] If the address has `?project=<id>`, pick that project already. The project page's "Add task" button uses this.
- [ ] On `/tasks/<id>/edit`, fill the fields with that task's details.
- [ ] Show an error under each wrong field, using `validateTask`.
- [ ] The page title says "New task" or "Edit task".
- [ ] Save, then go to the task page.
- [ ] Cancel: if something was typed, ask "Discard your changes?" first.
- [ ] If there are no projects, say "Create a project first" with a link.
- [ ] If the task doesn't exist, show "Task not found".

## Step 3 – The task page (Day 3–4)

- [ ] Show the title, status, project (link to `/projects/<id>`), client, person, due date, and when it was created and last changed.
- [ ] 3 buttons to change the status straight away: To do, In progress, Done. The current one is highlighted.
- [ ] An "Edit" button that goes to `/tasks/<id>/edit`.
- [ ] A "Delete" button that asks "Are you sure?" first. After deleting, go back to the project's board (`/tasks/board/<project id>`).
- [ ] A link "Open the board", to `/tasks/board/<project id>`. (That's Samuel's page, and the link works even before it's built.)
- [ ] If the task doesn't exist, show "Task not found" with a link to all tasks.

## Step 4 – Finish (Day 5)

- [ ] It looks good on a phone.
- [ ] Add screenshots to your PR: the empty form, the form showing errors, and the task page.
- [ ] Review **Righteous's** PR and leave 3 or more comments.
- [ ] Reply to every comment on your own PR.
- [ ] Click **Ready for review**.

## Done when

- [ ] Every box above is ticked.
- [ ] You only changed files inside `pages/tega/`.

---

## My answers

### Steps – create
1.

### Steps – edit
1.

### Form rules
| Field | Required? | Error message |
|-------|-----------|---------------|
| Title | | |
| Project | | |
| Person | | |
| Status | | |
| Due date | | |

### Problems
| # | What could go wrong | What the page does |
|---|---------------------|--------------------|
| 1 | | |

### Notes or questions
-
