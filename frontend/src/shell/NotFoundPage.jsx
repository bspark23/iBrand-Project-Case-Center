import { Link } from 'react-router-dom';
import EmptyState from '../shared/ui/EmptyState.jsx';

export default function NotFoundPage() {
  return (
    <div className="page">
      <EmptyState
        icon="alert"
        title="Page not found"
        action={<Link className="btn btn-primary" to="/">Go to overview</Link>}
      >
        The page you're looking for doesn't exist or has moved.
      </EmptyState>
    </div>
  );
}
