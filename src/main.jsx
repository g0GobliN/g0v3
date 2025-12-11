import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Portfolio from './App';
import './index.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Snowfall from 'react-snowfall';

const isWinterSeason = () => {
  const month = new Date().getMonth() + 1;
  return month === 12 || month === 1 || month === 2;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Snow effect runs globally and only in winter*/}
      {isWinterSeason() && (
        <Snowfall 
        //snowflakeCount={200}
        />
      )}
      
      <Portfolio />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </React.StrictMode>
);
