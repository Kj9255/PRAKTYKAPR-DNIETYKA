import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Login from './Login.jsx';
import { AuthProvider, useAuth } from './AuthContext.jsx';

function Root() {
  const { user } = useAuth();
  return user ? <App /> : <Login />;
}

// Create the React root and render the application.
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <AuthProvider>
    <Root />
  </AuthProvider>
);

