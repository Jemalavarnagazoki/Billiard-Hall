import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LocaleProvider } from './context/LocaleContext';
import { RouteLoadingProvider } from './context/RouteLoadingContext';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <LocaleProvider>
        <RouteLoadingProvider>
          <App />
        </RouteLoadingProvider>
      </LocaleProvider>
    </BrowserRouter>
  </React.StrictMode>
);
