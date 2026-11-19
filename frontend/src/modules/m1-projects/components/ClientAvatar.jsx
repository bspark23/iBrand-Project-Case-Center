// Round badge with the client's initials in their brand colour.
// Shows the logo instead when the client has one.
// Usage: <ClientAvatar client={project.client} size={36} />

function initials(name = '') {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  return (words[0][0] + (words[1]?.[0] ?? '')).toUpperCase();
}

export default function ClientAvatar({ client, size = 36 }) {
  const color = client?.brand_colors?.primary ?? '#64748b';
  const style = { width: size, height: size, fontSize: Math.round(size * 0.38) };

  if (client?.logo_url) {
    return <img className="client-avatar" src={client.logo_url} alt="" style={style} />;
  }

  return (
    <span
      className="client-avatar"
      style={{ ...style, background: `${color}1a`, color, borderColor: `${color}33` }}
      aria-hidden="true"
    >
      {initials(client?.name)}
    </span>
  );
}
