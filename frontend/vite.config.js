import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In Docker the backend is reachable as "backend"; on a laptop it's localhost.
const apiTarget = process.env.API_URL || 'http://localhost:4000';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': apiTarget,
    },
  },
});
