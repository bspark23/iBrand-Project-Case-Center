import { useEffect, useState } from 'react';
import { api } from '../shared/api.js';

export default function HomePage() {
  const [health, setHealth] = useState({ state: 'loading' });

  useEffect(() => {
    api
      .get('/api/health')
      .then((data) => setHealth({ state: 'ok', data }))
      .catch((err) => setHealth({ state: 'error', message: err.message }));
  }, []);

  return (
    <section>
      <h1>iBrand Project & Case Center</h1>
      <p>Pick a module from the menu.</p>
      <p className={`status status-${health.state}`}>
        Backend:{' '}
        {health.state === 'loading' && 'checking…'}
        {health.state === 'ok' && 'connected'}
        {health.state === 'error' && `not reachable (${health.message})`}
      </p>
    </section>
  );
}
