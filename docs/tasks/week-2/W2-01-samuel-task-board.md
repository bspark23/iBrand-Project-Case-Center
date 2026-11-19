W2-01 - The Task Board (Samuel)

Owner: Samuel
Branch: samuel/W2-01-task-board
Your folder: frontend/src/modules/m2-task-board/pages/samuel/
Due: end of Day 5


What you are building

You are building two pages. The first is the board picker at /tasks/board, in the file BoardPickerPage.jsx. The second is the board itself at /tasks/board/<project id>, in the file BoardPage.jsx.

The board shows one project's tasks in three columns: To do, In progress and Done. You drag a card from one column to another to change its status.


Tools you can use

These are already built. Just import them into your page.

To get one project's tasks in order, use useProjectTasks(projectId) from taskStore.js.
To move a card, use moveTask(taskId, 'done', 0). That example puts the card in Done, at the top.
To add a task, use createTask from taskStore.js.
To get all projects, use useProjects() from m1-projects/store.js.
To get all people, use useTeam() from shared/teamStore.js.
For the column names, use TASK_STATUSES from taskRules.js.
To show a due date, use the DueLabel component.
To show a person's initials, use the PersonAvatar component.


Step 1 - Plan it (Day 1)

Write your answers at the bottom of this file.

Write down, step by step, what a person does on the board.
Sketch the board on paper and add a photo to docs/tasks/week-2/images/.
List at least 6 things that could go wrong and what should happen. For example: the project has no tasks, the project was deleted, or a card is dropped outside a column.


Step 2 - Board picker page (Day 2)

Show a card for every project, with the client name.
On each card, show how many tasks it has and how many are done, for example "4 of 10 done".
Clicking a card opens that project's board.
If there are no projects, show a message with a link to create one.


Step 3 - The board (Day 2 to 4)

Show the project title and client at the top, with a "Back to boards" link.
Show the three columns. Each column shows how many cards it has.
Each card shows the title, the person and the due date.
Let people drag a card to another column, or up and down inside a column, using moveTask. You don't need a library. Ask the AI about the HTML drag and drop events onDragStart, onDragOver and onDrop.
While a card is being dragged, show where it will land.
Give each card a small menu to move it without dragging, for phones and for people who can't drag.
At the bottom of each column, let people type a title and press Enter to add a card.
Put a row of avatars at the top. Clicking one shows only that person's cards, and clicking it again shows everyone's.
Clicking a card opens /tasks/<task id>. That is Tega's page, and the link works even before it is built.
If the project doesn't exist, show "Project not found".
An empty column shows "No tasks here".


Step 4 - Finish (Day 5)

Make sure it looks good on a phone. The columns can sit side by side and scroll.
Add screenshots to your pull request.
Reply to every comment on your pull request.
Click "Ready for review".

You are done when everything above works and you have only changed files inside pages/samuel/.


My answers

Steps:


Things that could go wrong, and what the page does:


Notes or questions:

