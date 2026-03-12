// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { initAuthFromStorage } from './api/client';
import { AuthProvider } from './components/AuthContext/AuthContext.tsx';

initAuthFromStorage();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  // </StrictMode>,
);
