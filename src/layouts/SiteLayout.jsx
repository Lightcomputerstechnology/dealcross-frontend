-import AppRoutes from './AppRoutes.jsx';
+import App from './App.jsx';

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <UserProvider>
-         <div className="animate-fade-in">
-           <AppRoutes />
-           <NotificationAlert />
-         </div>
+         <App />               {/* ← Now you mount your full app */}
      </UserProvider>
    </NotificationProvider>
  </BrowserRouter>
</React.StrictMode>
);