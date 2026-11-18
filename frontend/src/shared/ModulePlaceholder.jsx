// Temporary page shown until the module owner builds their module.
export default function ModulePlaceholder({ code, name, owner, description }) {
  return (
    <section>
      <p className="module-code">{code}</p>
      <h1>{name}</h1>
      <p>{description}</p>
      <p className="muted">Owner: {owner} · Not built yet</p>
    </section>
  );
}
