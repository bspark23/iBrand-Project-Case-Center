// OWNER: Samuel – task W2-01. See docs/tasks/week-2/W2-01-samuel-task-board.md
import TaskPagePlaceholder from '../../components/TaskPagePlaceholder.jsx';

// /tasks/board – choose which project's board to open.
export default function BoardPickerPage() {
  return (
    <TaskPagePlaceholder
      title="Boards"
      owner="Samuel"
      taskFile="docs/tasks/week-2/W2-01-samuel-task-board.md"
      todo={['A card for every project', 'Show how many tasks are done', 'Click a card to open its board']}
    />
  );
}
