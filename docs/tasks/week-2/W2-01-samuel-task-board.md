# W2-01 – The Task Board (Samuel)

**Owner:** Samuel
**Reviewed by:** Righteous
**Branch:** `samuel/W2-01-task-board`
**Your folder:** `frontend/src/modules/m2-task-board/pages/samuel/`
**Due:** end of Day 5

## What you are building

Two pages:

| Page | Address | File |
|------|---------|------|
| Board picker | `/tasks/board` | `BoardPickerPage.jsx` |
| The board | `/tasks/board/<project id>` | `BoardPage.jsx` |

The board shows one project's tasks in 3 columns: **To do**, **In progress** and **Done**. You drag a card from one column to another to change its status.

## Tools you can use

All of these are ready. Import them into your page.

| What | Where | How |
|------|-------|-----|
| One project's tasks, in order | `taskStore.js` | `const tasks = useProjectTasks(projectId)` |
| Move a card | `taskStore.js` | `moveTask(taskId, 'done', 0)` puts it in Done, at the top |
| Add a task | `taskStore.js` | `createTask({ project_id, title, status, assignee_id: '', due_date: '' })` |
| All projects | `m1-projects/store.js` | `const projects = useProjects()` |
| All people | `shared/teamStore.js` | `const team = useTeam()` |
| Column names | `taskRules.js` | `TASK_STATUSES` gives `[{ value: 'todo', label: 'To do' }, ...]` |
| Due date tag | `components/DueLabel.jsx` | `<DueLabel task={task} />` |
| Person's initials | `shared/ui/PersonAvatar.jsx` | `<PersonAvatar person={task.assignee} />` |

## Step 1 – Plan it (Day 1)

Write your answers at the bottom of this file.

- [ ] **Steps:** write what a person does on the board, step by step.
- [ ] **Drawing:** sketch the board on paper and add a photo to `docs/tasks/week-2/images/`.
- [ ] **Problems:** list at least 6 things that could go wrong, and what should happen. For example, "the project has no tasks", "the project was deleted", or "a card is dropped outside a column".

## Step 2 – Board picker page (Day 2)

- [ ] Show a card for every project, with the client name.
- [ ] On each card, show how many tasks it has, and how many are done (e.g. "4 of 10 done").
- [ ] Click a card to open that project's board.
- [ ] If there are no projects, show a message with a link to create one.

## Step 3 – The board (Day 2–4)

- [ ] Show the project title and client at the top, with a "Back to boards" link.
- [ ] Show 3 columns: To do, In progress, Done. Each column shows how many cards it has.
- [ ] Each card shows the title, the person (`PersonAvatar`) and the due date (`DueLabel`).
- [ ] **Drag and drop:** drag a card to another column, or up and down inside a column. Use `moveTask`. Tip: ask the AI about the HTML "drag and drop" events `onDragStart`, `onDragOver` and `onDrop`. You don't need a library.
- [ ] While dragging, show where the card will land.
- [ ] **Move without dragging:** give each card a small menu with "Move to To do / In progress / Done", for phones and for people who can't drag.
- [ ] **Quick add:** at the bottom of each column, type a title and press Enter to add a card to that column.
- [ ] **Filter by person:** a row of avatars at the top. Click one to show only that person's cards. Click again to show all.
- [ ] Click a card to open `/tasks/<task id>`. (That's Tega's page, and the link works even before it's built.)
- [ ] If the project doesn't exist, show "Project not found".
- [ ] An empty column shows "No tasks here".

## Step 4 – Finish (Day 5)

- [ ] It looks good on a phone. The columns can sit side by side and scroll.
- [ ] Add screenshots to your PR.
- [ ] Review **Tega's** PR and leave 3 or more comments.
- [ ] Reply to every comment on your own PR.
- [ ] Click **Ready for review**.

## Done when

- [ ] Every box above is ticked.
- [ ] You only changed files inside `pages/samuel/`.

---

## My answers

### Steps
1.

### Problems
| # | What could go wrong | What the page does |
|---|---------------------|--------------------|
| 1 | | |

### Notes or questions
-
