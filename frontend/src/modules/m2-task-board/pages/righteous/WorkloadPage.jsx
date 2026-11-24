// OWNER: Righteous – task W2-03. See docs/tasks/week-2/W2-03-righteous-task-lists.md
//
// /tasks/people – how much work each person has.
//
// How this page works:
//   1. useTasks() gives every task, useTeam() gives every person.
//   2. workloadByPerson() (in taskFilters.js) counts each person's open, overdue and done tasks,
//      and sorts them so whoever has the most overdue work is first.
//   3. Each card links to the All tasks page filtered to that person: /tasks?person=<id>.

import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../../shared/ui/Icon.jsx';
import EmptyState from '../../../../shared/ui/EmptyState.jsx';
import PersonAvatar from '../../../../shared/ui/PersonAvatar.jsx';
import { useTeam, roleLabel } from '../../../../shared/teamStore.js';
import { useTasks } from '../../taskStore.js';
import { workloadByPerson } from './taskFilters.js';
import './lists.css';

export default function WorkloadPage() {
  const tasks = useTasks();
  const team = useTeam();
  const { people, unassigned } = useMemo(() => workloadByPerson(tasks, team), [tasks, team]);

  return (
    <section className="workload">
      <header className="page-header">
        <div>
          <p className="eyebrow">Task Board</p>
          <h1>People</h1>
          <p className="muted">How much work each person has. People with overdue tasks come first.</p>
        </div>
      </header>

      {team.length === 0 ? (
        <EmptyState
          icon="users"
          title="No one on the team yet"
          action={
            <Link to="/team" className="btn btn-primary">
              <Icon name="plus" size={16} />
              Add people
            </Link>
          }
        >
          Add the staff and interns on the Team page. Then you can see their workload here.
        </EmptyState>
      ) : (
        <div className="workload-grid">
          {people.map(({ member, ...counts }) => (
            <PersonCard
              key={member.id}
              to={`/tasks?person=${member.id}`}
              avatar={<PersonAvatar person={member} size={44} />}
              name={member.display_name}
              subtitle={roleLabel(member.role)}
              counts={counts}
            />
          ))}

          {/* Tasks with nobody on them get their own card, so they don't get forgotten. */}
          {unassigned && (
            <PersonCard
              to="/tasks?person=unassigned"
              avatar={<PersonAvatar person={null} size={44} />}
              name="Unassigned"
              subtitle="Tasks with no person yet"
              counts={unassigned}
              muted
            />
          )}
        </div>
      )}
    </section>
  );
}

// One card on the People page.
// counts = { total, open, overdue, done, percentDone } from taskFilters.js
function PersonCard({ to, avatar, name, subtitle, counts, muted = false }) {
  return (
    <Link to={to} className={`card workload-card ${muted ? 'workload-card-muted' : ''}`}>
      <span className="workload-head">
        {avatar}
        <span className="workload-name">
          <strong>{name}</strong>
          <span className="muted">{subtitle}</span>
        </span>
        {counts.overdue > 0 && (
          <span className="workload-alert" title={`${counts.overdue} overdue`}>
            <Icon name="alert" size={14} />
            {counts.overdue}
          </span>
        )}
      </span>

      <span className="workload-numbers">
        <span><strong>{counts.open}</strong> open</span>
        <span className={counts.overdue ? 'workload-overdue' : ''}><strong>{counts.overdue}</strong> overdue</span>
        <span><strong>{counts.done}</strong> done</span>
      </span>

      <span className="workload-progress">
        <span className="progress" aria-hidden="true">
          <span style={{ width: `${counts.percentDone}%` }} />
        </span>
        <span className="muted">
          {counts.total === 0 ? 'No tasks yet' : `${counts.percentDone}% of ${counts.total} done`}
        </span>
      </span>
    </Link>
  );
}
