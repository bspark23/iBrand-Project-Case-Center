import { createApp } from './app.js';
import { config } from './config.js';

const app = createApp();

app.listen(config.port, () => {
  console.log(`IPCC backend running on http://localhost:${config.port}`);
  console.log(`API docs:            http://localhost:${config.port}/api/docs`);
});
