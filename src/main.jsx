import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Portfolio from './App';
import './index.css';
import { Analytics } from '@vercel/analytics/next';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Portfolio />
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
);
