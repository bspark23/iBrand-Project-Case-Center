// OWNER: Lead (@bspark23) – task W1-01. See docs/tasks/week-1/W1-01-samuel-project-list.md
import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../../shared/ui/Icon.jsx';
import EmptyState from '../../../shared/ui/EmptyState.jsx';
import { useProjects, useClients } from '../store.js';
import { PROJECT_STATUSES, formatDateRange, formatDateTime } from '../labels.js';
import ProjectCard from '../components/ProjectCard.jsx';
import StatusBadge, { PublishedBadge } from '../components/StatusBadge.jsx';
import TypeLabel from '../components/TypeLabel.jsx';
import ClientAvatar from '../components/ClientAvatar.jsx';

const SORTS = [
  { value: 'updated', label: 'Recently updated', compare: (a, b) => b.updated_at.localeCompare(a.updated_at) },
  { value: 'start_desc', label: 'Start date: newest', compare: (a, b) => (b.start_date ?? '').localeCompare(a.start_date ?? '') },
  { value: 'start_asc', label: 'Start date: oldest', compare: (a, b) => (a.start_date ?? '').localeCompare(b.start_date ?? '') },
  { value: 'title', label: 'Title A–Z', compare: (a, b) => a.title.localeCompare(b.title) },
];

// Filters live in the URL (e.g. /projects?status=active), so they survive
// going back from a project and can be shared as a link.
export default function ProjectListPage() {
  const projects = useProjects();
  const clients = useClients();
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const [flash, setFlash] = useState(location.state?.flash ?? null);

  const query = params.get('q') ?? '';
  const status = params.get('status') ?? 'all';
  const clientId = params.get('client') ?? 'all';
  const sort = SORTS.some((s) => s.value === params.get('sort')) ? params.get('sort') : 'updated';
  const view = params.get('view') === 'table' ? 'table' : 'grid';

  function setParam(key, value, fallback) {
    const next = new URLSearchParams(params);
    if (!value || value === fallback) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  const counts = useMemo(() => {
    const c = { all: projects.length, published: 0 };
    PROJECT_STATUSES.forEach((s) => (c[s.value] = 0));
    projects.forEach((p) => {
      c[p.status] += 1;
      if (p.is_published) c.published += 1;
    });
    return c;
  }, [projects]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const compare = SORTS.find((s) => s.value === sort).compare;
    return projects
      .filter((p) => status === 'all' || (status === 'published' ? p.is_published : p.status === status))
      .filter((p) => clientId === 'all' || p.client_id === clientId)
      .filter((p) => !q || p.title.toLowerCase().includes(q) || (p.client?.name ?? '').toLowerCase().includes(q))
      .sort(compare);
  }, [projects, query, status, clientId, sort]);

  const hasFilters = Boolean(query) || status !== 'all' || clientId !== 'all';
  const clearFilters = () => setParams(view === 'table' ? { view } : {}, { replace: true });

  const tabs = [
    { value: 'all', label: 'All' },
    ...PROJECT_STATUSES,
    { value: 'published', label: 'Published' },
  ];

  return (
    <div className="page projects-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Internal Desk</p>
          <h1>Projects</h1>
          <p className="muted">Every client project, from first plan to published case study.</p>
        </div>
        <Link to="/projects/new" className="btn btn-primary">
          <Icon name="plus" size={16} />
          New project
        </Link>
      </header>

      {flash && (
        <div className="alert alert-success" role="status">
          <Icon name="check" size={18} />
          <span>{flash}</span>
          <button type="button" className="alert-close" onClick={() => setFlash(null)} aria-label="Dismiss">
            <Icon name="x" size={16} />
          </button>
        </div>
      )}

      <section className="stats">
        <Stat icon="folder" label="Total projects" value={counts.all} />
        <Stat icon="activity" label="Active now" value={counts.active} tone="active" />
        <Stat icon="check" label="Delivered" value={counts.delivered} tone="delivered" />
        <Stat icon="globe" label="Published cases" value={counts.published} tone="published" />
      </section>

      <section className="toolbar card">
        <div className="tabs-pill" role="tablist" aria-label="Filter by status">
          {tabs.map((t) => (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={status === t.value}
              className={`pill ${status === t.value ? 'pill-active' : ''}`}
              onClick={() => setParam('status', t.value, 'all')}
            >
              {t.label}
              <span className="pill-count">{counts[t.value]}</span>
            </button>
          ))}
        </div>

        <div className="toolbar-row">
          <label className="search">
            <Icon name="search" size={17} />
            <input
              type="search"
              placeholder="Search by project or client"
              value={query}
              onChange={(e) => setParam('q', e.target.value, '')}
              aria-label="Search projects"
            />
          </label>

          <select className="select" value={clientId} onChange={(e) => setParam('client', e.target.value, 'all')} aria-label="Filter by client">
            <option value="all">All clients</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select className="select" value={sort} onChange={(e) => setParam('sort', e.target.value, 'updated')} aria-label="Sort projects">
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          <div className="view-toggle" role="group" aria-label="Choose view">
            <button type="button" className={view === 'grid' ? 'active' : ''} onClick={() => setParam('view', 'grid', 'grid')} aria-label="Card view" aria-pressed={view === 'grid'}>
              <Icon name="grid" size={16} />
            </button>
            <button type="button" className={view === 'table' ? 'active' : ''} onClick={() => setParam('view', 'table', 'grid')} aria-label="Table view" aria-pressed={view === 'table'}>
              <Icon name="list" size={16} />
            </button>
          </div>
        </div>
      </section>

      <p className="result-line">
        Showing <strong>{visible.length}</strong> of {projects.length} projects
        {hasFilters && (
          <button type="button" className="link-button" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </p>

      {projects.length === 0 ? (
        <EmptyState
          icon="folder"
          title="No projects yet"
          action={
            clients.length === 0 ? (
              <Link to="/clients" className="btn btn-primary"><Icon name="users" size={16} />Add your first client</Link>
            ) : (
              <Link to="/projects/new" className="btn btn-primary"><Icon name="plus" size={16} />Create the first project</Link>
            )
          }
        >
          {clients.length === 0
            ? 'Start by adding the clients you work with. Then create projects for them.'
            : 'Projects you create will show up here.'}
        </EmptyState>
      ) : visible.length === 0 ? (
        <EmptyState
          icon="search"
          title="No projects match"
          action={<button type="button" className="btn" onClick={clearFilters}>Clear filters</button>}
        >
          Try a different search word, or remove a filter.
        </EmptyState>
      ) : view === 'grid' ? (
        <div className="project-grid">
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      ) : (
        <ProjectTable projects={visible} />
      )}
    </div>
  );
}

function Stat({ icon, label, value, tone = 'neutral' }) {
  return (
    <div className="stat card">
      <span className={`stat-icon stat-${tone}`}>
        <Icon name={icon} size={18} />
      </span>
      <span>
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
      </span>
    </div>
  );
}

function ProjectTable({ projects }) {
  const navigate = useNavigate();
  return (
    <div className="table-wrap card">
      <table className="table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Type</th>
            <th>Status</th>
            <th>Dates</th>
            <th>Last updated</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} onClick={() => navigate(`/projects/${p.id}`)}>
              <td>
                <div className="table-project">
                  <ClientAvatar client={p.client} size={32} />
                  <div>
                    <Link to={`/projects/${p.id}`} onClick={(e) => e.stopPropagation()}>{p.title}</Link>
                    <span>{p.client?.name ?? 'Unknown client'}</span>
                  </div>
                </div>
              </td>
              <td><TypeLabel type={p.type} /></td>
              <td>
                <span className="table-badges">
                  <StatusBadge status={p.status} />
                  {p.is_published && <PublishedBadge />}
                </span>
              </td>
              <td className="nowrap">{formatDateRange(p.start_date, p.end_date)}</td>
              <td className="nowrap muted">{formatDateTime(p.updated_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
