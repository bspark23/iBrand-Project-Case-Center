// OWNER: Tega – task W2-02. See docs/tasks/week-2/W2-02-tega-task-form-and-detail.md
import { useParams } from 'react-router-dom';
import TaskPagePlaceholder from '../../components/TaskPagePlaceholder.jsx';

// /tasks/new and /tasks/:id/edit – create or edit a task.
export default function TaskFormPage() {
  const { id } = useParams();
  return (
    <TaskPagePlaceholder
      title={id ? 'Edit task' : 'New task'}
      owner="Tega"
      taskFile="docs/tasks/week-2/W2-02-tega-task-form-and-detail.md"
      todo={['Fields: title, project, person, status, due date', 'Show an error under any wrong field', 'Save, then go to the task page']}
    />
  );
}
