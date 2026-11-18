// The list of modules. The shell builds the menu and routes from this list.
// To plug in a module: export a default Page component from its index.jsx.
//
// section: 'internal' = Internal Desk (staff/interns), 'public' = Client Portal

import ProjectsPage from './m1-projects/index.jsx';
import TaskBoardPage from './m2-task-board/index.jsx';
import EquipmentPage from './m3-equipment/index.jsx';
import MediaPage from './m4-media/index.jsx';
import CaseLibraryPage from './m5-case-library/index.jsx';
import ShareLinksPage from './m6-share-links/index.jsx';
import ClientProgressPage from './m7-client-progress/index.jsx';

export const modules = [
  { id: 'm1', name: 'Projects', path: '/projects', section: 'internal', Page: ProjectsPage },
  { id: 'm2', name: 'Task Board', path: '/tasks', section: 'internal', Page: TaskBoardPage },
  { id: 'm3', name: 'Equipment', path: '/equipment', section: 'internal', Page: EquipmentPage },
  { id: 'm4', name: 'Media', path: '/media', section: 'internal', Page: MediaPage },
  { id: 'm6', name: 'Share Links', path: '/share-links', section: 'internal', Page: ShareLinksPage },
  { id: 'm5', name: 'Case Library', path: '/cases', section: 'public', Page: CaseLibraryPage },
  { id: 'm7', name: 'Client Progress', path: '/progress', section: 'public', Page: ClientProgressPage },
];
