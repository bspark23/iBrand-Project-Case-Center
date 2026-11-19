// Round badge with a person's initials. The colour is picked from their name,
// so the same person always gets the same colour.
// Usage: <PersonAvatar person={member} size={28} />   (person can be null = unassigned)

const COLORS = ['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#059669', '#0891b2', '#4f46e5', '#b45309'];

function colorFor(name = '') {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return COLORS[hash % COLORS.length];
}

function initials(name = '') {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return '?';
  return (words[0][0] + (words[1]?.[0] ?? '')).toUpperCase();
}

export default function PersonAvatar({ person, size = 28, title }) {
  const style = { width: size, height: size, fontSize: Math.round(size * 0.4) };
  if (!person) {
    return (
      <span className="person-avatar person-avatar-empty" style={style} title={title ?? 'Unassigned'} aria-label="Unassigned">
        ?
      </span>
    );
  }
  return (
    <span
      className="person-avatar"
      style={{ ...style, background: colorFor(person.display_name) }}
      title={title ?? person.display_name}
      aria-label={person.display_name}
    >
      {initials(person.display_name)}
    </span>
  );
}
