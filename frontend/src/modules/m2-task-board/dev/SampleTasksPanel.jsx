// DEVELOPER TOOL – only shows when running `npm run dev`, never in the real app.
// Lets each person fill THEIR OWN browser with test tasks, so they can build
// their page without waiting for anyone else. "Remove test tasks" deletes only
// the tasks this panel made; real tasks are never touched.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../shared/ui/Icon.jsx';
import { useProjects } from '../../m1-projects/store.js';
import { useTeam } from '../../../shared/teamStore.js';
import { useTasks, createTask, deleteTask } from '../taskStore.js';
import { TASK_STATUSES } from '../taskRules.js';

const SAMPLE_KEY = 'ipcc.tasks.sample-ids';
const TITLES = [
  'Confirm venue access times', 'Book camera crew', 'Test livestream internet', 'Write run-of-show',
  'Pack lighting kit', 'Record b-roll', 'First edit', 'Colour grade', 'Add subtitles',
  'Send draft to client', 'Make final changes', 'Export final files', 'Back up raw footage', 'Design thumbnail',
];

const readIds = () => {
  try { return JSON.parse(localStorage.getItem(SAMPLE_KEY) ?? '[]'); } catch { return []; }
};

function dateFromToday(days) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export default function SampleTasksPanel() {
  const projects = useProjects();
  const team = useTeam();
  const tasks = useTasks();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(null);

  const sampleIds = new Set(readIds());
  const sampleCount = tasks.filter((t) => sampleIds.has(t.id)).length;

  function addSamples() {
    const made = [];
    for (let i = 0; i < 12; i++) {
      const project = projects[i % projects.length];
      const person = team.length ? team[i % (team.length + 1)] : null; // some stay unassigned
      const task = createTask({
        project_id: project.id,
        title: TITLES[i % TITLES.length],
        assignee_id: person?.id ?? '',
        status: TASK_STATUSES[i % 3].value,
        due_date: i % 4 === 3 ? '' : dateFromToday([-3, 0, 2, 6, 14, -1][i % 6]),
      });
      made.push(task.id);
    }
    localStorage.setItem(SAMPLE_KEY, JSON.stringify([...readIds(), ...made]));
    setNote(`Added ${made.length} test tasks.`);
  }

  function removeSamples() {
    let removed = 0;
    for (const id of readIds()) {
      try { deleteTask(id); removed++; } catch { /* already gone */ }
    }
    localStorage.removeItem(SAMPLE_KEY);
    setNote(`Removed ${removed} test tasks.`);
  }

  return (
    <div className="dev-panel">
      {open && (
        <div className="dev-panel-box card">
          <strong>Test data (developers only)</strong>
          <p className="muted">Only you see this, and only in this browser.</p>
          {projects.length === 0 ? (
            <p>
              Create a <Link to="/clients">client</Link> and a <Link to="/projects/new">project</Link> first.
              {team.length === 0 && <> Adding people on the <Link to="/team">Team</Link> page helps too.</>}
            </p>
          ) : (
            <>
              <button type="button" className="btn btn-sm" onClick={addSamples}>
                <Icon name="plus" size={14} />
                Add 12 test tasks
              </button>
              <button type="button" className="btn btn-sm" onClick={removeSamples} disabled={sampleCount === 0}>
                <Icon name="trash" size={14} />
                Remove test tasks ({sampleCount})
              </button>
              {team.length === 0 && <p className="muted">Tip: add people on the <Link to="/team">Team</Link> page so tasks get assigned.</p>}
            </>
          )}
          {note && <p className="dev-note">{note}</p>}
        </div>
      )}
      <button type="button" className="dev-panel-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <Icon name={open ? 'x' : 'sparkle'} size={16} />
        Test data
      </button>
    </div>
  );
}
