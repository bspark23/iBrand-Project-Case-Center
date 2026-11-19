// The list of modules. The shell builds the menu, routes and overview cards from this list.
// To plug in a module: export a default Page component from its index.jsx.
//
// section: 'internal' = Internal Desk (staff/interns), 'public' = Client Portal
// icon: a name from src/shared/ui/Icon.jsx

import ProjectsPage from './m1-projects/index.jsx';
import ClientsPage from './m1-projects/pages/ClientListPage.jsx';
import TaskBoardPage from './m2-task-board/index.jsx';
import TeamPage from './team/index.jsx';
import EquipmentPage from './m3-equipment/index.jsx';
import MediaPage from './m4-media/index.jsx';
import CaseLibraryPage from './m5-case-library/index.jsx';
import ShareLinksPage from './m6-share-links/index.jsx';
import ClientProgressPage from './m7-client-progress/index.jsx';

export const modules = [
  { id: 'm1', name: 'Projects', path: '/projects', section: 'internal', icon: 'folder', ready: true, description: 'Plan, track and publish every client project.', Page: ProjectsPage },
  { id: 'm1-clients', name: 'Clients', path: '/clients', section: 'internal', icon: 'briefcase', ready: true, description: 'The companies iBrand works with.', Page: ClientsPage },
  { id: 'm2', name: 'Task Board', path: '/tasks', section: 'internal', icon: 'kanban', description: 'Move work from To do to Done.', Page: TaskBoardPage },
  { id: 'team', name: 'Team', path: '/team', section: 'internal', icon: 'users', ready: true, description: 'The people you can assign tasks to.', Page: TeamPage },
  { id: 'm3', name: 'Equipment', path: '/equipment', section: 'internal', icon: 'box', description: 'Checklists and PDF exports for every shoot.', Page: EquipmentPage },
  { id: 'm4', name: 'Media', path: '/media', section: 'internal', icon: 'image', description: 'Photos, videos and documents in one gallery.', Page: MediaPage },
  { id: 'm6', name: 'Share Links', path: '/share-links', section: 'internal', icon: 'link', description: 'Private links with passwords and expiry.', Page: ShareLinksPage },
  { id: 'm5', name: 'Case Library', path: '/cases', section: 'public', icon: 'library', description: 'Finished work, ready to show new clients.', Page: CaseLibraryPage },
  { id: 'm7', name: 'Client Progress', path: '/progress', section: 'public', icon: 'activity', description: 'A simple status page for clients.', Page: ClientProgressPage },
];
