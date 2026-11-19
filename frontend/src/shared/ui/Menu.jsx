import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

// A "⋯" button that opens a small list of actions.
// items: [{ label, icon, onClick, danger, disabled, hint }] or { divider: true }
export default function Menu({ label = 'More actions', items }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="menu" ref={rootRef}>
      <button
        type="button"
        className="btn menu-trigger"
        aria-label={label}
        title={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="more" size={20} strokeWidth={3} />
      </button>

      {open && (
        <div className="menu-list" role="menu">
          {items.map((item, i) =>
            item.divider ? (
              <div key={`d${i}`} className="menu-divider" role="separator" />
            ) : (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className={`menu-item ${item.danger ? 'menu-item-danger' : ''}`}
                disabled={item.disabled}
                title={item.disabled ? item.hint : undefined}
                onClick={() => {
                  setOpen(false);
                  item.onClick();
                }}
              >
                {item.icon && <Icon name={item.icon} size={16} />}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
