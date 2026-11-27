// OWNER: Samuel – task W2-01. See docs/tasks/week-2/W2-01-samuel-task-board.md
import { useParams } from 'react-router-dom';
import TaskPagePlaceholder from '../../components/TaskPagePlaceholder.jsx';

// /tasks/board/:projectId – the Kanban board for one project.
export default function BoardPage() {
  const { projectId } = useParams();
  return (
    <TaskPagePlaceholder
      title={`Task board for project ${projectId}`}
      owner="Samuel"
      taskFile="docs/tasks/week-2/W2-01-samuel-task-board.md"
      todo={['Three columns: To do, In progress, Done', 'Drag cards between and inside columns', 'Quick-add a card at the bottom of a column', 'Filter by person']}
    />
  );
}
