import { NavLink, Outlet, Route, Routes } from 'react-router-dom';
import Icon from '../../shared/ui/Icon.jsx';
import SampleTasksPanel from './dev/SampleTasksPanel.jsx';

// Samuel
import BoardPickerPage from './pages/samuel/BoardPickerPage.jsx';
import BoardPage from './pages/samuel/BoardPage.jsx';
// Tega
import TaskFormPage from './pages/tega/TaskFormPage.jsx';
import TaskDetailPage from './pages/tega/TaskDetailPage.jsx';
// Righteous
import AllTasksPage from './pages/righteous/AllTasksPage.jsx';
import WorkloadPage from './pages/righteous/WorkloadPage.jsx';

import './taskboard.css';

// M2 Task Board routes (all under /tasks). Set up by the lead – please don't change this file.
//   /tasks                    All tasks list            Righteous
//   /tasks/people             Workload per person       Righteous
//   /tasks/board              Pick a project's board    Samuel
//   /tasks/board/:projectId   Kanban board              Samuel
//   /tasks/new                Create a task             Tega   (?project=<id> picks the project)
//   /tasks/:id                Task detail               Tega
//   /tasks/:id/edit           Edit a task               Tega
export default function TaskBoardModule() {
  return (
    <Routes>
      <Route element={<TaskLayout />}>
        <Route index element={<AllTasksPage />} />
        <Route path="people" element={<WorkloadPage />} />
        <Route path="board" element={<BoardPickerPage />} />
        <Route path="board/:projectId" element={<BoardPage />} />
        <Route path="new" element={<TaskFormPage />} />
        <Route path=":id" element={<TaskDetailPage />} />
        <Route path=":id/edit" element={<TaskFormPage />} />
      </Route>
    </Routes>
  );
}

function TaskLayout() {
  return (
    <div className="page task-module">
      <nav className="task-nav" aria-label="Task Board sections">
        <NavLink to="/tasks" end className="task-nav-link">
          <Icon name="list" size={16} />
          All tasks
        </NavLink>
        <NavLink to="/tasks/board" className="task-nav-link">
          <Icon name="kanban" size={16} />
          Boards
        </NavLink>
        <NavLink to="/tasks/people" className="task-nav-link">
          <Icon name="users" size={16} />
          People
        </NavLink>
        <NavLink to="/tasks/new" className="btn btn-primary btn-sm task-nav-new">
          <Icon name="plus" size={15} />
          New task
        </NavLink>
      </nav>
      <Outlet />
      {import.meta.env.DEV && <SampleTasksPanel />}
    </div>
  );
}
