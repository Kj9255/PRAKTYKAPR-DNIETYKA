import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the indoor routing application. The React plugin
// enables JSX support and fast refresh during development.
export default defineConfig({
  plugins: [react()]
});