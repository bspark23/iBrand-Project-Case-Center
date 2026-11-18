import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import HomePage from './HomePage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import { modules } from '../modules/index.js';

// The app shell (M1). Each module is listed in src/modules/index.js
// and gets its own route here automatically.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        {modules.map((m) => (
          <Route key={m.id} path={`${m.path}/*`} element={<m.Page />} />
        ))}
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
