import Icon from '../../../shared/ui/Icon.jsx';
import { dueState } from '../taskRules.js';

// Shows when a task is due, coloured by how urgent it is.
// Usage: <DueLabel task={task} />   (shows nothing if the task has no due date)
export default function DueLabel({ task }) {
  const state = dueState(task);
  if (!state) return null;
  return (
    <span className={`due-label due-${state.key}`} title={task.due_date}>
      <Icon name={state.key === 'done' ? 'check' : 'clock'} size={13} />
      {state.text}
    </span>
  );
}
