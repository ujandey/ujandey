import { preview } from 'vite';

// Production output needs no development transforms or configuration bundling.
const server = await preview({ configFile: false, preview: { host: '127.0.0.1', port: 4173 } });
server.printUrls();
