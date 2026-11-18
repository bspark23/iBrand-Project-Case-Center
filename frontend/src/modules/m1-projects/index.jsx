import { Routes, Route } from 'react-router-dom';
import ProjectListPage from './pages/ProjectListPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import ProjectFormPage from './pages/ProjectFormPage.jsx';

// Projects module routes (all under /projects).
//   /projects            -> list         (Samuel)
//   /projects/new        -> create form  (Righteous)
//   /projects/:id        -> detail       (Tega)
//   /projects/:id/edit   -> edit form    (Righteous)
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
