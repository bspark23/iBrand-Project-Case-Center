// OWNER: Lead (@bspark23) – Clients page (M1, P1-A04).
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../../shared/ui/Icon.jsx';
import EmptyState from '../../../shared/ui/EmptyState.jsx';
import ConfirmDialog from '../../../shared/ui/ConfirmDialog.jsx';
import { useClients, useProjects, deleteClient } from '../store.js';
import { formatDate } from '../labels.js';
import ClientAvatar from '../components/ClientAvatar.jsx';
import ClientFormDialog from '../components/ClientFormDialog.jsx';
import '../projects.css';

export default function ClientListPage() {
  const navigate = useNavigate();
  const clients = useClients();
  const projects = useProjects();
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null); // null = closed, 'new' = add, or a client
  const [deleting, setDeleting] = useState(null);
  const [message, setMessage] = useState(null);

  // Project counts per client, for the cards and the delete check.
  const stats = useMemo(() => {
    const map = {};
    projects.forEach((p) => {
      const s = (map[p.client_id] ??= { total: 0, active: 0, delivered: 0 });
      s.total += 1;
      if (p.status === 'active') s.active += 1;
      if (p.status === 'delivered') s.delivered += 1;
    });
    return map;
  }, [projects]);

  const visible = clients.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()));

  function confirmDelete() {
    try {
      deleteClient(deleting.id);
      setMessage({ tone: 'success', text: `${deleting.name} was deleted.` });
    } catch (err) {
      setMessage({ tone: 'error', text: err.message });
    }
    setDeleting(null);
  }

  const deletingCount = deleting ? stats[deleting.id]?.total ?? 0 : 0;

  return (
    <div className="page clients-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Internal Desk</p>
          <h1>Clients</h1>
          <p className="muted">The companies iBrand works with. Every project belongs to a client.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setEditing('new')}>
          <Icon name="plus" size={16} />
          Add client
        </button>
      </header>

      {message && (
        <div className={`alert alert-${message.tone}`} role="status">
          <Icon name={message.tone === 'success' ? 'check' : 'alert'} size={18} />
          <span>{message.text}</span>
          <button type="button" className="alert-close" onClick={() => setMessage(null)} aria-label="Dismiss">
            <Icon name="x" size={16} />
          </button>
        </div>
      )}

      {clients.length === 0 ? (
        <EmptyState
          icon="users"
          title="No clients yet"
          action={
            <button type="button" className="btn btn-primary" onClick={() => setEditing('new')}>
              <Icon name="plus" size={16} />
              Add your first client
            </button>
          }
        >
          Add the companies you work with. Then you can create projects for them.
        </EmptyState>
      ) : (
        <>
          <div className="toolbar card toolbar-simple">
            <label className="search">
              <Icon name="search" size={17} />
              <input type="search" placeholder="Search clients" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search clients" />
            </label>
            <span className="muted">{clients.length} {clients.length === 1 ? 'client' : 'clients'}</span>
          </div>

          {visible.length === 0 ? (
            <EmptyState icon="search" title="No clients match" action={<button type="button" className="btn" onClick={() => setQuery('')}>Clear search</button>}>
              Try a different name.
            </EmptyState>
          ) : (
            <div className="client-grid">
              {visible.map((c) => {
                const s = stats[c.id] ?? { total: 0, active: 0, delivered: 0 };
                return (
                  <article key={c.id} className="client-card card">
                    <div className="client-card-cover" style={{ background: `linear-gradient(120deg, ${c.brand_colors.primary}, ${c.brand_colors.secondary})` }} />
                    <div className="client-card-body">
                      <span className="client-card-avatar">
                        <ClientAvatar client={c} size={48} />
                      </span>
                      <h2>{c.name}</h2>
                      <p className="muted">Added {formatDate(c.created_at.slice(0, 10))}</p>

                      <div className="client-stats">
                        <span><strong>{s.total}</strong> projects</span>
                        <span><strong>{s.active}</strong> active</span>
                        <span><strong>{s.delivered}</strong> delivered</span>
                      </div>

                      <div className="client-card-actions">
                        <Link to={`/projects?client=${c.id}`} className="btn btn-sm">
                          <Icon name="folder" size={15} />
                          Projects
                        </Link>
                        <Link to={`/projects/new?client=${c.id}`} className="btn btn-sm">
                          <Icon name="plus" size={15} />
                          New project
                        </Link>
                        <span className="client-card-spacer" />
                        <button type="button" className="icon-btn" onClick={() => setEditing(c)} aria-label={`Edit ${c.name}`} title="Edit">
                          <Icon name="edit" size={16} />
                        </button>
                        <button type="button" className="icon-btn icon-btn-danger" onClick={() => setDeleting(c)} aria-label={`Delete ${c.name}`} title="Delete">
                          <Icon name="trash" size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}

      <ClientFormDialog
        open={editing !== null}
        client={editing === 'new' ? null : editing}
        onClose={() => setEditing(null)}
        onSaved={(saved) => setMessage({ tone: 'success', text: editing === 'new' ? `${saved.name} was added.` : 'Client updated.' })}
      />

      <ConfirmDialog
        open={Boolean(deleting) && deletingCount === 0}
        tone="danger"
        icon="trash"
        title={`Delete ${deleting?.name}?`}
        confirmLabel="Delete client"
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      >
        This can’t be undone.
      </ConfirmDialog>

      <ConfirmDialog
        open={Boolean(deleting) && deletingCount > 0}
        icon="alert"
        title={`${deleting?.name} still has projects`}
        confirmLabel="See their projects"
        cancelLabel="Close"
        onConfirm={() => {
          const id = deleting.id;
          setDeleting(null);
          navigate(`/projects?client=${id}`);
        }}
        onCancel={() => setDeleting(null)}
      >
        This client has {deletingCount} {deletingCount === 1 ? 'project' : 'projects'}. Delete or move them to another client first, so no project is left without a client.
      </ConfirmDialog>
    </div>
  );
}
