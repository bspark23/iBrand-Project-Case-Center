import { NavLink, Outlet } from 'react-router-dom';
import { modules } from '../modules/index.js';
import Icon from '../shared/ui/Icon.jsx';

const sections = [
  { key: 'internal', label: 'Internal Desk' },
  { key: 'public', label: 'Client Portal' },
];

export default function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <NavLink to="/" className="brand" end>
          <span className="brand-mark">iB</span>
          <span className="brand-text">
            <strong>iBrand</strong>
            <small>Project & Case Center</small>
          </span>
        </NavLink>

        <nav className="nav">
          <NavLink to="/" end className="nav-link">
            <Icon name="home" />
            <span>Overview</span>
          </NavLink>

          {sections.map((s) => (
            <div key={s.key} className="nav-group">
              <p className="nav-title">{s.label}</p>
              {modules
                .filter((m) => m.section === s.key)
                .map((m) => (
                  <NavLink key={m.id} to={m.path} className="nav-link">
                    <Icon name={m.icon} />
                    <span>{m.name}</span>
                    {!m.ready && <span className="nav-soon">Soon</span>}
                  </NavLink>
                ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="avatar">L</div>
          <div>
            <strong>Lead</strong>
            <small>Admin</small>
          </div>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
