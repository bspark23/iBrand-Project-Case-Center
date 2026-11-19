import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';

// A pop-up window for forms. Closes on Escape, the X button, or a click outside.
// Usage: <Modal open title="Add a client" onClose={close}>...form...</Modal>
export default function Modal({ open, title, subtitle, onClose, children }) {
  const panelRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    // Focus the first field so the user can start typing straight away.
    panelRef.current?.querySelector('input, select, textarea, button')?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') closeRef.current();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div ref={panelRef} className="modal modal-form" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className="modal-head">
          <div>
            <h2 id="modal-title">{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <Icon name="x" size={18} />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}
