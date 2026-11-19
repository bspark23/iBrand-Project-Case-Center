import { Routes, Route } from 'react-router-dom';
import ProjectListPage from './pages/ProjectListPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import ProjectFormPage from './pages/ProjectFormPage.jsx';
import './projects.css';

// Projects module routes (all under /projects). Owner: Lead.
//   /projects            -> list
//   /projects/new        -> create form (?client=<id> picks the client)
//   /projects/:id        -> detail
//   /projects/:id/edit   -> edit form
// The Clients page (/clients) is registered separately in src/modules/index.js.
export default function ProjectsModule() {
  return (
    <Routes>
      <Route index element={<ProjectListPage />} />
      <Route path="new" element={<ProjectFormPage />} />
      <Route path=":id" element={<ProjectDetailPage />} />
      <Route path=":id/edit" element={<ProjectFormPage />} />
    </Routes>
  );
}
