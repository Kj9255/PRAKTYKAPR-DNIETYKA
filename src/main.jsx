import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Create the React root and render the application. This entry point is
// consumed by Vite during development and build, and ensures that the
// App component is mounted into the element with the id of 'root'.
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);