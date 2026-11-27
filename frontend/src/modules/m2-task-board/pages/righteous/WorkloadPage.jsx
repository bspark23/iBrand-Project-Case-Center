// OWNER: Righteous – task W2-03. See docs/tasks/week-2/W2-03-righteous-task-lists.md
import TaskPagePlaceholder from '../../components/TaskPagePlaceholder.jsx';

// /tasks/people – how much work each person has.
export default function WorkloadPage() {
  return (
    <TaskPagePlaceholder
      title="People"
      owner="Righteous"
      taskFile="docs/tasks/week-2/W2-03-righteous-task-lists.md"
      todo={['A card for each team member', 'Their open, overdue and done tasks', 'Click a person to see their tasks']}
    />
  );
}
