import { useState } from 'react';
import Modal from '../../../shared/ui/Modal.jsx';
import Icon from '../../../shared/ui/Icon.jsx';
import ClientAvatar from './ClientAvatar.jsx';
import { useClients, createClient, updateClient } from '../store.js';
import { validateClient, pickClientFields, DEFAULT_COLORS, CLIENT_NAME_MAX } from '../clientRules.js';

// Add or edit a client in a pop-up.
// Pass client to edit it; leave it out to add a new one.
// onSaved(client) runs after a successful save.
export default function ClientFormDialog({ open, client, onClose, onSaved }) {
  if (!open) return null;
  // key gives a fresh form each time the dialog opens for a different client.
  return <ClientForm key={client?.id ?? 'new'} client={client} onClose={onClose} onSaved={onSaved} />;
}

function ClientForm({ client, onClose, onSaved }) {
  const clients = useClients();
  const isEdit = Boolean(client);
  const [values, setValues] = useState(() =>
    isEdit ? pickClientFields(client) : { name: '', logo_url: '', brand_colors: { ...DEFAULT_COLORS } }
  );
  const [touched, setTouched] = useState({});
  const [triedSave, setTriedSave] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const errors = validateClient(values, { existing: clients, editingId: client?.id });
  const errorFor = (name) => (touched[name] || triedSave ? errors[name] : undefined);

  const setColor = (key, value) =>
    setValues((v) => ({ ...v, brand_colors: { ...v.brand_colors, [key]: value } }));

  function handleSubmit(event) {
    event.preventDefault();
    setTriedSave(true);
    if (Object.keys(errors).length > 0) return;
    try {
      const saved = isEdit ? updateClient(client.id, values) : createClient(values);
      onSaved?.(saved);
      onClose();
    } catch (err) {
      setSaveError(err.message);
    }
  }

  const preview = { ...values, name: values.name.trim() || 'Client name' };

  return (
    <Modal
      open
      title={isEdit ? 'Edit client' : 'Add a client'}
      subtitle={isEdit ? 'Changes show on all of this clientâ€™s projects.' : 'Add a company iBrand is working with.'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="client-preview" style={{ background: `linear-gradient(120deg, ${values.brand_colors.primary}, ${values.brand_colors.secondary})` }}>
          <span className="client-preview-avatar">
            <ClientAvatar client={preview} size={52} />
          </span>
          <strong>{preview.name}</strong>
        </div>

        <div className={`field ${errorFor('name') ? 'has-error' : ''}`}>
          <div className="field-label">
            <label htmlFor="client-name">Client name</label>
            <span className="field-counter">{values.name.trim().length}/{CLIENT_NAME_MAX}</span>
          </div>
          <input
            id="client-name"
            className="input"
            placeholder="e.g. Acme Ltd"
            value={values.name}
            maxLength={CLIENT_NAME_MAX + 20}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            aria-invalid={Boolean(errorFor('name'))}
          />
          {errorFor('name') && <p className="field-error">{errorFor('name')}</p>}
        </div>

        <div className="field">
          <span className="field-label"><label>Brand colours</label></span>
          <div className="color-row">
            <ColorPicker label="Main" value={values.brand_colors.primary} onChange={(v) => setColor('primary', v)} />
            <ColorPicker label="Second" value={values.brand_colors.secondary} onChange={(v) => setColor('secondary', v)} />
          </div>
          <p className="field-hint">Used to theme this clientâ€™s projects and case studies.</p>
        </div>

        <div className={`field ${errorFor('logo_url') ? 'has-error' : ''}`}>
          <div className="field-label">
            <label htmlFor="client-logo">Logo link</label>
            <span className="field-counter">Optional</span>
          </div>
          <input
            id="client-logo"
            className="input"
            type="url"
            placeholder="https://â€¦"
            value={values.logo_url}
            onChange={(e) => setValues((v) => ({ ...v, logo_url: e.target.value }))}
            onBlur={() => setTouched((t) => ({ ...t, logo_url: true }))}
            aria-invalid={Boolean(errorFor('logo_url'))}
          />
          {errorFor('logo_url') ? (
            <p className="field-error">{errorFor('logo_url')}</p>
          ) : (
            <p className="field-hint">Leave empty to show the clientâ€™s initials. Logo upload comes with the backend.</p>
          )}
        </div>

        {saveError && (
          <div className="alert alert-error" role="alert">
            <Icon name="alert" size={18} />
            <span>{saveError}</span>
          </div>
        )}

        <div className="modal-actions">
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">
            <Icon name="check" size={16} />
            {isEdit ? 'Save changes' : 'Add client'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function ColorPicker({ label, value, onChange }) {
  return (
    <label className="color-picker">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} aria-label={`${label} colour`} />
      <span>
        <strong>{label}</strong>
        <span className="muted">{value.toUpperCase()}</span>
      </span>
    </label>
  );
}
