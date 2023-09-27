import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/index.scss";
import reportWebVitals from './reportWebVitals';
import { router } from './Router';
import { RouterProvider } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);

reportWebVitals();

