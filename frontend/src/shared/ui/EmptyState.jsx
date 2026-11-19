import Icon from './Icon.jsx';

// A friendly box for "nothing here" moments: no results, not found, coming soon.
export default function EmptyState({ icon = 'inbox', title, children, action }) {
  return (
    <div className="empty">
      <div className="empty-icon">
        <Icon name={icon} size={24} />
      </div>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
      {action}
    </div>
  );
}
