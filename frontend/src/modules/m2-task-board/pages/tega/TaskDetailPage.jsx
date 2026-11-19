// OWNER: Tega – task W2-02. See docs/tasks/week-2/W2-02-tega-task-form-and-detail.md
import { useParams } from 'react-router-dom';
import TaskPagePlaceholder from '../../components/TaskPagePlaceholder.jsx';

// /tasks/:id – one task in full.
export default function TaskDetailPage() {
  const { id } = useParams();
  return (
    <TaskPagePlaceholder
      title={`Task ${id}`}
      owner="Tega"
      taskFile="docs/tasks/week-2/W2-02-tega-task-form-and-detail.md"
      todo={['Show everything about the task', 'Buttons to change the status', 'Edit and Delete buttons']}
    />
  );
}
