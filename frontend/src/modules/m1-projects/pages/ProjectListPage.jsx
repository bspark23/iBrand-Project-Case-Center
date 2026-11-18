// OWNER: Samuel – task W1-01. See docs/tasks/week-1/W1-01-project-list.md
import { Link } from 'react-router-dom';

export default function ProjectListPage() {
  return (
    <section>
      <h1>Projects</h1>
      <p className="muted">Project list – being built by Samuel (W1-01).</p>
      <Link to="/projects/new">+ New project</Link>
    </section>
  );
}
