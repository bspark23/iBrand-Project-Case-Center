W2-02 - Task Form and Task Page (Tega)

Owner: Tega
Branch: tega/W2-02-task-form-and-detail
Your folder: frontend/src/modules/m2-task-board/pages/tega/
Due: end of Day 5


What you are building

You are building two pages. The first is the task form at /tasks/new and /tasks/<id>/edit, in the file TaskFormPage.jsx. The second is the task page at /tasks/<id>, in the file TaskDetailPage.jsx.

The form creates a new task or changes an existing one. The task page shows one task in full, with buttons to change it.


Tools you can use

These are already built. Just import them into your page.

To get one task, use useTask(id) from taskStore.js. It gives null if the task doesn't exist.
To create a task, use createTask(values). To save changes, use updateTask(id, values).
To change only the status, use moveTask(id, 'done'). To delete, use deleteTask(id).
To check the form, use validateTask(values, { projects, team }) from taskRules.js. It tells you which fields are wrong and what message to show.
For an empty form, use EMPTY_TASK. For the status names, use TASK_STATUSES.
To get projects, use useProjects(). To get people, use useTeam().
To show the status, use TaskStatusBadge. For the due date, use DueLabel. For a person's initials, use PersonAvatar.
For an "Are you sure?" pop-up, use ConfirmDialog. Look at the Projects page to see how it's used.

If something goes wrong, these functions give an error with a readable message. Show that message on the page.


Step 1 - Plan it (Day 1)

Write your answers at the bottom of this file.

Write down, step by step, what a person does to create a task, and what they do to edit one.
Sketch both pages and add a photo to docs/tasks/week-2/images/.
For each field, write whether it's required and what error message to show.
List at least 6 things that could go wrong. For example: the task was deleted while you were editing it, the person was removed from the team, or someone clicks Cancel after typing.


Step 2 - The form (Day 2 to 3)

The fields are title, project, person, status and due date. The person dropdown needs an "Unassigned" option.
If the address has ?project=<id>, pick that project already. The project page's "Add task" button uses this.
On the edit page, fill the fields with the task's details.
Show an error under each wrong field.
The page title says "New task" or "Edit task".
After saving, go to the task page.
If something was typed and the person clicks Cancel, ask "Discard your changes?" first.
If there are no projects, say "Create a project first" with a link.
If the task doesn't exist, show "Task not found".


Step 3 - The task page (Day 3 to 4)

Show the title, status, project, client, person and due date, and when the task was created and last changed. The project name links to the project's page.
Add three buttons that change the status straight away: To do, In progress and Done. Highlight the current one.
Add an Edit button that goes to the edit page.
Add a Delete button that asks "Are you sure?" first. After deleting, go back to the project's board.
Add a link that opens the board at /tasks/board/<project id>. That is Samuel's page, and the link works even before it is built.
If the task doesn't exist, show "Task not found" with a link to all tasks.


Step 4 - Finish (Day 5)

Make sure both pages look good on a phone.
Add screenshots to your pull request: the empty form, the form showing errors, and the task page.
Reply to every comment on your pull request.
Click "Ready for review".

You are done when everything above works and you have only changed files inside pages/tega/.


My answers

Steps to create a task:


Steps to edit a task:


Form rules:


Things that could go wrong, and what the page does:


Notes or questions:

