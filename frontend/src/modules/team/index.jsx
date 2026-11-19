// OWNER: Lead (@bspark23) – Team page. People here can be assigned to tasks.
import { useState } from 'react';
import Icon from '../../shared/ui/Icon.jsx';
import EmptyState from '../../shared/ui/EmptyState.jsx';
import Modal from '../../shared/ui/Modal.jsx';
import ConfirmDialog from '../../shared/ui/ConfirmDialog.jsx';
import PersonAvatar from '../../shared/ui/PersonAvatar.jsx';
import {
  useTeam,
  addTeamMember,
  updateTeamMember,
  removeTeamMember,
  validateTeamMember,
  TEAM_ROLES,
  roleLabel,
  NAME_MAX,
} from '../../shared/teamStore.js';

export default function TeamPage() {
  const team = useTeam();
  const [editing, setEditing] = useState(null); // null = closed, 'new', or a member
  const [removing, setRemoving] = useState(null);
  const [message, setMessage] = useState(null);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Internal Desk</p>
          <h1>Team</h1>
          <p className="muted">The people at iBrand. You can assign tasks to anyone on this list.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setEditing('new')}>
          <Icon name="plus" size={16} />
          Add person
        </button>
      </header>

      {message && (
        <div className="alert alert-success" role="status">
          <Icon name="check" size={18} />
          <span>{message}</span>
          <button type="button" className="alert-close" onClick={() => setMessage(null)} aria-label="Dismiss">
            <Icon name="x" size={16} />
          </button>
        </div>
      )}

      {team.length === 0 ? (
        <EmptyState
          icon="users"
          title="No team members yet"
          action={
            <button type="button" className="btn btn-primary" onClick={() => setEditing('new')}>
              <Icon name="plus" size={16} />
              Add the first person
            </button>
          }
        >
          Add the staff and interns who work on projects, so you can give them tasks.
        </EmptyState>
      ) : (
        <div className="table-wrap card">
          <table className="table team-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {team.map((m) => (
                <tr key={m.id}>
                  <td>
                    <span className="team-name">
                      <PersonAvatar person={m} size={32} />
                      <strong>{m.display_name}</strong>
                    </span>
                  </td>
                  <td className="muted">{m.email}</td>
                  <td><span className={`badge role-${m.role}`}>{roleLabel(m.role)}</span></td>
                  <td className="team-actions">
                    <button type="button" className="icon-btn" onClick={() => setEditing(m)} aria-label={`Edit ${m.display_name}`} title="Edit">
                      <Icon name="edit" size={16} />
                    </button>
                    <button type="button" className="icon-btn icon-btn-danger" onClick={() => setRemoving(m)} aria-label={`Remove ${m.display_name}`} title="Remove">
                      <Icon name="trash" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <MemberForm
          key={editing === 'new' ? 'new' : editing.id}
          member={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={(text) => setMessage(text)}
        />
      )}

      <ConfirmDialog
        open={Boolean(removing)}
        tone="danger"
        icon="trash"
        title={`Remove ${removing?.display_name}?`}
        confirmLabel="Remove"
        onConfirm={() => {
          removeTeamMember(removing.id);
          setMessage(`${removing.display_name} was removed.`);
          setRemoving(null);
        }}
        onCancel={() => setRemoving(null)}
      >
        Their tasks will stay, but will show as Unassigned.
      </ConfirmDialog>
    </div>
  );
}

function MemberForm({ member, onClose, onSaved }) {
  const isEdit = Boolean(member);
  const [values, setValues] = useState({
    display_name: member?.display_name ?? '',
    email: member?.email ?? '',
    role: member?.role ?? 'intern',
  });
  const [tried, setTried] = useState(false);
  const [error, setError] = useState(null);

  const errors = validateTeamMember(values, { editingId: member?.id });
  const show = (name) => (tried ? errors[name] : undefined);
  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    setTried(true);
    if (Object.keys(errors).length) return;
    try {
      const saved = isEdit ? updateTeamMember(member.id, values) : addTeamMember(values);
      onSaved(isEdit ? 'Changes saved.' : `${saved.display_name} was added to the team.`);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Modal open title={isEdit ? 'Edit person' : 'Add a person'} subtitle="Login accounts come later. For now this is the list of people you can assign." onClose={onClose}>
      <form onSubmit={submit} noValidate>
        <div className={`field ${show('display_name') ? 'has-error' : ''}`}>
          <div className="field-label"><label htmlFor="member-name">Full name</label></div>
          <input id="member-name" className="input" maxLength={NAME_MAX + 10} value={values.display_name} onChange={set('display_name')} />
          {show('display_name') && <p className="field-error">{show('display_name')}</p>}
        </div>
        <div className={`field ${show('email') ? 'has-error' : ''}`}>
          <div className="field-label"><label htmlFor="member-email">Email</label></div>
          <input id="member-email" className="input" type="email" placeholder="name@ibrand.com" value={values.email} onChange={set('email')} />
          {show('email') && <p className="field-error">{show('email')}</p>}
        </div>
        <div className="field">
          <div className="field-label"><label htmlFor="member-role">Role</label></div>
          <select id="member-role" className="input" value={values.role} onChange={set('role')}>
            {TEAM_ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </div>
        {error && (
          <div className="alert alert-error" role="alert">
            <Icon name="alert" size={18} />
            <span>{error}</span>
          </div>
        )}
        <div className="modal-actions">
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">
            <Icon name="check" size={16} />
            {isEdit ? 'Save changes' : 'Add person'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
