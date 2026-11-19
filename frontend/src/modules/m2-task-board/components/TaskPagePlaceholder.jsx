import Icon from '../../../shared/ui/Icon.jsx';

// Shown on a page until its owner builds it. Delete it from your page when you start.
export default function TaskPagePlaceholder({ title, owner, taskFile, todo = [] }) {
  return (
    <div className="placeholder card task-placeholder">
      <div className="placeholder-icon">
        <Icon name="sparkle" size={26} />
      </div>
      <p className="eyebrow">Being built by {owner}</p>
      <h1>{title}</h1>
      {todo.length > 0 && (
        <ul className="placeholder-list">
          {todo.map((item) => (
            <li key={item}>
              <Icon name="check" size={14} />
              {item}
            </li>
          ))}
        </ul>
      )}
      <p className="muted">Task file: <code>{taskFile}</code></p>
    </div>
  );
}
