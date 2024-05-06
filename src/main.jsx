import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './pages/Root';
import LoginDetails from './pages/Login/Login';
import Home from './pages/Home/Home';
import RegisterDetails from './pages/Register/Register';

const router = createBrowserRouter([
  { path: '/', element: <Root />, children: [
    {path: '/', element: <Home />,}
  ]},
  { path: '/login', element: <LoginDetails /> },
  { path: '/register', element: <RegisterDetails /> }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>
);