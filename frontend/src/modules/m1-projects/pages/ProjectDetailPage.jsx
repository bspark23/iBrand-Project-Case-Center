// OWNER: Tega – task W1-02. See docs/tasks/week-1/W1-02-tega-project-detail.md
import { useParams, Link } from 'react-router-dom';

export default function ProjectDetailPage() {
  const { id } = useParams();
  return (
    <section>
      <Link to="/projects">← All projects</Link>
      <h1>Project detail</h1>
      <p className="muted">Project {id} – being built by Tega (W1-02).</p>
    </section>
  );
}
