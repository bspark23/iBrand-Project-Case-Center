import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../shared/api.js';
import { modules } from '../modules/index.js';
import Icon from '../shared/ui/Icon.jsx';
import { useClients, useProjects } from '../modules/m1-projects/store.js';
import { useTasks } from '../modules/m2-task-board/taskStore.js';
import { dueState } from '../modules/m2-task-board/taskRules.js';
import ProjectCard from '../modules/m1-projects/components/ProjectCard.jsx';

export default function HomePage() {
  const [health, setHealth] = useState('checking');
  const clients = useClients();
  const projects = useProjects();
  const tasks = useTasks();

  useEffect(() => {
    api
      .get('/api/health')
      .then(() => setHealth('online'))
      .catch(() => setHealth('offline'));
  }, []);

  const healthText = {
    checking: 'Checking backend…',
    online: 'Backend connected',
    offline: 'Backend offline · saving in this browser',
  }[health];

  const recent = useMemo(
    () => [...projects].sort((a, b) => b.updated_at.localeCompare(a.updated_at)).slice(0, 3),
    [projects]
  );
  const active = projects.filter((p) => p.status === 'active').length;
  const published = projects.filter((p) => p.is_published).length;
  const overdue = tasks.filter((t) => dueState(t)?.key === 'overdue').length;

  // First-time setup: guide the user through the three steps.
  const steps = [
    { done: clients.length > 0, label: 'Add a client', to: '/clients' },
    { done: projects.length > 0, label: 'Create a project', to: '/projects/new' },
    { done: tasks.length > 0, label: 'Add a task', to: '/tasks/new' },
  ];
  const setupDone = steps.every((s) => s.done);

  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>iBrand Project & Case Center</h1>
          <p className="hero-text">
            Run every project from first plan to finished case study, all in one place.
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-light">
              <Icon name="folder" size={16} />
              Open projects
            </Link>
            <Link to={clients.length ? '/projects/new' : '/clients'} className="btn btn-ghost-light">
              <Icon name="plus" size={16} />
              {clients.length ? 'New project' : 'Add a client'}
            </Link>
          </div>
        </div>
        <span className={`health health-${health}`}>
          <span className="health-dot" />
          {healthText}
        </span>
      </section>

      {!setupDone && (
        <section className="card setup">
          <div>
            <h2>Get started</h2>
            <p className="muted">Three quick steps to set up your workspace.</p>
          </div>
          <ol className="setup-steps">
            {steps.map((s, i) => (
              <li key={s.label} className={s.done ? 'done' : ''}>
                <span className="setup-dot">{s.done ? <Icon name="check" size={14} strokeWidth={2.6} /> : i + 1}</span>
                {s.done ? <span>{s.label}</span> : <Link to={s.to}>{s.label}</Link>}
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="stats home-stats">
        <HomeStat to="/clients" icon="briefcase" label="Clients" value={clients.length} />
        <HomeStat to="/projects?status=active" icon="activity" label="Active projects" value={active} tone="active" />
        <HomeStat to="/projects?status=published" icon="globe" label="Published cases" value={published} tone="published" />
        <HomeStat to="/tasks" icon="clock" label="Overdue tasks" value={overdue} tone={overdue ? 'danger' : 'delivered'} />
      </section>

      {recent.length > 0 && (
        <section className="module-section">
          <div className="section-head">
            <h2 className="section-title">Recently updated</h2>
            <Link to="/projects" className="link-button">See all projects</Link>
          </div>
          <div className="project-grid">
            {recent.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </section>
      )}

      {['internal', 'public'].map((section) => (
        <section key={section} className="module-section">
          <h2 className="section-title">{section === 'internal' ? 'Internal Desk' : 'Client Portal'}</h2>
          <div className="module-grid">
            {modules
              .filter((m) => m.section === section)
              .map((m) => (
                <Link key={m.id} to={m.path} className="module-card card">
                  <span className="module-icon">
                    <Icon name={m.icon} size={20} />
                  </span>
                  <span className="module-body">
                    <strong>{m.name}</strong>
                    <span>{m.description}</span>
                  </span>
                  <span className={`badge ${m.ready ? 'badge-live' : ''}`}>{m.ready ? 'Live' : 'Coming soon'}</span>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function HomeStat({ to, icon, label, value, tone = 'neutral' }) {
  return (
    <Link to={to} className="stat card home-stat">
      <span className={`stat-icon stat-${tone}`}>
        <Icon name={icon} size={18} />
      </span>
      <span>
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
      </span>
    </Link>
  );
}
