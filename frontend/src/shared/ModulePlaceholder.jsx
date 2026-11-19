import { Link } from 'react-router-dom';
import Icon from './ui/Icon.jsx';

// Temporary page shown until the module owner builds their module.
export default function ModulePlaceholder({ code, name, owner, description }) {
  return (
    <div className="page">
      <div className="placeholder card">
        <div className="placeholder-icon">
          <Icon name="sparkle" size={26} />
        </div>
        <p className="eyebrow">{code} · Coming soon</p>
        <h1>{name}</h1>
        <p className="placeholder-text">{description}</p>
        <div className="placeholder-meta">
          <span className="badge">
            <Icon name="users" size={14} />
            {owner}
          </span>
        </div>
        <Link className="btn" to="/">
          <Icon name="arrowLeft" size={16} />
          Back to overview
        </Link>
      </div>
    </div>
  );
}
