import { BrowserRouter as Router } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import React from 'react';
import App from './App';
import './App.css'
import './tailwind.css'


const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  //<React.StrictMode>
    <MantineProvider>
      <Router>
        <App />
      </Router>
    </MantineProvider>
  //</React.StrictMode>
);

