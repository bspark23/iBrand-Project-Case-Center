import { statusLabel } from '../labels.js';

// Coloured status label.
// Usage: <StatusBadge status="active" />
export default function StatusBadge({ status }) {
  return (
    <span className={`status-badge status-${status}`}>
      <span className="status-dot" />
      {statusLabel(status)}
    </span>
  );
}

// Purple "Published" tag for projects that are in the Case Library.
export function PublishedBadge() {
  return <span className="status-badge status-published">Published</span>;
}
