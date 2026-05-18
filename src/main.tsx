// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { initAuthFromStorage } from './api/client';
import { AuthProvider } from './components/AuthContext/AuthContext.tsx';
import { Provider } from 'react-redux';
import {store} from "./redux/store.ts"

initAuthFromStorage();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  // </StrictMode>,
);
