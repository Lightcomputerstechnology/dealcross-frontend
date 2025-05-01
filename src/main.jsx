import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import NotificationAlert from '@/components/common/NotificationAlert';
import './index.css'; // Tailwind styles

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <NotificationProvider>
          <UserProvider>
            <div className="animate-fade-in">
              <AppRoutes />
              <NotificationAlert />
            </div>
          </UserProvider>
        </NotificationProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Ensure index.html contains <div id='root'></div>");
}

// Inject fade-in animation if not handled by Tailwind
const style = document.createElement('style');
style.innerHTML = `
  .animate-fade-in {
    animation: fadeIn 0.8s ease-in-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);
