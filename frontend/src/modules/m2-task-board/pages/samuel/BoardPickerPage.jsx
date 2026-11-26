// OWNER: Samuel – task W2-01. See docs/tasks/week-2/W2-01-samuel-task-board.md
//import TaskPagePlaceholder from '../../components/TaskPagePlaceholder.jsx';
import { Link } from 'react-router-dom';
import { useProjects } from '../../../m1-projects/store.js';
import { useTasks } from '../../taskStore.js';

// /tasks/board – choose which project's board to open.
export default function BoardPickerPage() {
  const projects = useProjects();
  const tasks = useTasks();

  if (projects.length === 0) {
    return (
      <div className="page">
        <header className="page-header">
          <div>
            <p className="eyebrow">Task Board</p>
            <h1>Boards</h1>
          </div>
        </header>

        <section className="card">
          <h2>No projects yet</h2>
          <p className="muted">Create a project to start using its task board.</p>
          <Link to="/projects/new" className="btn btn-primary">
            Create a project
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Task Board</p>
          <h1>Boards</h1>
          <p className="muted">Choose a project to view its tasks.</p>
        </div>
      </header>

      <section className="project-grid" aria-label="Project boards">
        {projects.map((project) => {
          const projectTasks = tasks.filter((task) => task.project_id === project.id);
          const doneCount = projectTasks.filter((task) => task.status === 'done').length;

          return (
            <Link
              key={project.id}
              to={`/tasks/board/${project.id}`}
              className="project-card"
              aria-label={`${project.title}, ${project.client?.name ?? 'No client'}, ${doneCount} of ${projectTasks.length} tasks done`}
            >
              <div className="project-card-client">
                <span>{project.client?.name ?? 'No client'}</span>
              </div>
              <h2 className="project-card-title">{project.title}</h2>
              <div className="project-card-meta">
                <span>{doneCount} of {projectTasks.length} done</span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
