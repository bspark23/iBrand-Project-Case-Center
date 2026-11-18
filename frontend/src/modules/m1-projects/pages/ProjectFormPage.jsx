// OWNER: Righteous – task W1-03. See docs/tasks/week-1/W1-03-project-form.md
import { useParams, Link } from 'react-router-dom';

export default function ProjectFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  return (
    <section>
      <Link to="/projects">← All projects</Link>
      <h1>{isEdit ? 'Edit project' : 'New project'}</h1>
      <p className="muted">Project form – being built by Righteous (W1-03).</p>
    </section>
  );
}
