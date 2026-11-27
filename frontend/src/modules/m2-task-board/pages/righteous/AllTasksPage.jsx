// OWNER: Righteous – task W2-03. See docs/tasks/week-2/W2-03-righteous-task-lists.md
import TaskPagePlaceholder from '../../components/TaskPagePlaceholder.jsx';

// /tasks – every task from every project in one list.
export default function AllTasksPage() {
  return (
    <TaskPagePlaceholder
      title="All tasks"
      owner="Righteous"
      taskFile="docs/tasks/week-2/W2-03-righteous-task-lists.md"
      todo={['Numbers at the top: overdue, due this week, done', 'Search and filters', 'A list of every task']}
    />
  );
}
