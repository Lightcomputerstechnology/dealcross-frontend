// File: src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css'; // Tailwind + Global styles

import { NotificationProvider } from './context/NotificationContext.jsx';
import { UserProvider } from './context/UserContext.jsx';

const root = document.getElementById('root');

if (root) {
  const app = (
    <React.StrictMode>
      <BrowserRouter>
        <NotificationProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </NotificationProvider>
      </BrowserRouter>
    </React.StrictMode>
  );

  ReactDOM.createRoot(root).render(app);
} else {
  console.error("❌ Root element not found. Ensure <div id='root'></div> exists in public/index.html");
}
