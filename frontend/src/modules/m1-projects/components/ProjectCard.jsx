import { Link } from 'react-router-dom';
import Icon from '../../../shared/ui/Icon.jsx';
import StatusBadge, { PublishedBadge } from './StatusBadge.jsx';
import TypeLabel from './TypeLabel.jsx';
import ClientAvatar from './ClientAvatar.jsx';
import { formatDateRange, timingLabel } from '../labels.js';

// One project as a card. Used on the list page and as the live preview on the form.
// Pass preview to show it without a link (e.g. while filling in the form).
export default function ProjectCard({ project, preview = false }) {
  const brand = project.client?.brand_colors?.primary ?? '#94a3b8';
  const timing = timingLabel(project);

  const body = (
    <>
      <span className="project-card-stripe" style={{ background: brand }} />
      <span className="project-card-top">
        <span className="project-card-client">
          <ClientAvatar client={project.client} size={30} />
          <span>{project.client?.name ?? 'No client yet'}</span>
        </span>
        <span className="project-card-badges">
          {project.is_published && <PublishedBadge />}
          <StatusBadge status={project.status} />
        </span>
      </span>

      <span className="project-card-title">{project.title || 'Untitled project'}</span>

      <span className="project-card-meta">
        <TypeLabel type={project.type} />
        <span className="meta-item">
          <Icon name="calendar" size={15} />
          {formatDateRange(project.start_date, project.end_date)}
        </span>
      </span>

      {timing && (
        <span className={`timing timing-${timing.tone}`}>
          <Icon name="clock" size={14} />
          {timing.text}
        </span>
      )}
    </>
  );

  if (preview) return <div className="project-card card">{body}</div>;

  return (
    <Link to={`/projects/${project.id}`} className="project-card card">
      {body}
    </Link>
  );
}
