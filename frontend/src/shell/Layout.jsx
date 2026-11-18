import { NavLink, Outlet } from 'react-router-dom';
import { modules } from '../modules/index.js';

const sections = [
  { key: 'internal', label: 'Internal Desk' },
  { key: 'public', label: 'Client Portal' },
];

export default function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <NavLink to="/" className="brand">IPCC</NavLink>
        {sections.map((s) => (
          <nav key={s.key}>
            <p className="nav-title">{s.label}</p>
            {modules
              .filter((m) => m.section === s.key)
              .map((m) => (
                <NavLink key={m.id} to={m.path} className="nav-link">
                  {m.name}
                </NavLink>
              ))}
          </nav>
        ))}
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
