// File: src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css'; // Tailwind + Global styles

import { NotificationProvider } from './context/NotificationContext.jsx';
import { UserProvider } from './context/UserContext.jsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
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
} else {
  console.error("❌ Root element not found. Ensure your public/index.html has: <div id='root'></div>");
}