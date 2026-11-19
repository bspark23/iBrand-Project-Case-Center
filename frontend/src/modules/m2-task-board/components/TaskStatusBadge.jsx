import { taskStatusLabel } from '../taskRules.js';

// Coloured task status. Usage: <TaskStatusBadge status="in_progress" />
export default function TaskStatusBadge({ status }) {
  return (
    <span className={`status-badge task-status-${status}`}>
      <span className="status-dot" />
      {taskStatusLabel(status)}
    </span>
  );
}
