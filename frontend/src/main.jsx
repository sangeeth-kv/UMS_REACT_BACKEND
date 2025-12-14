import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './app/store.js';
import {Provider} from "react-redux"
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

window.store = store;

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);
