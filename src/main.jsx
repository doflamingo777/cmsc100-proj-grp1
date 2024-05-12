import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './pages/Root';
import LoginDetails from './pages/Login/Login';
import Home from './pages/Home/Home';
import RegisterDetails from './pages/Register/Register';
import ShoppingCartPage from './pages/CustomerPages/ShoppingCartPage';
import ProductListPage from './pages/CustomerPages/ProductListPage';
import CheckOutPage from './pages/CustomerPages/CheckOutPage';
import OrderConfirmationPage from './pages/CustomerPages/OrderConfirmationPage';
import UserProfilePage from './pages/CustomerPages/UserProfilePage';
import AdminDashboardPage from './pages/AdminPages/AdminDashboardPage';
import UserManagementPage from './pages/AdminPages/UserManagementPage';
import ProductListAdminPage from './pages/AdminPages/ProductListAdminPage';
import OrderFulfillmentPage from './pages/AdminPages/OrderFulfillmentPage';
import SalesReportPage from './pages/AdminPages/SalesReportPage';

const router = createBrowserRouter([
  { path: '/', element: <Root />, children: [
    {path: '/', element: <Home />,}
  ]},
  { path: '/login', element: <LoginDetails /> },
  { path: '/register', element: <RegisterDetails /> },
  {path: '/productlistpage', element: <ProductListPage />},
  { path: '/shoppingcartpage', element: <ShoppingCartPage /> },
  { path: '/checkoutpage', element: <CheckOutPage /> },
  { path: '/orderconfirmationpage', element: <OrderConfirmationPage /> },
  { path: '/userprofilepage', element: <UserProfilePage /> },
  { path: '/admindashboardpage', element: <AdminDashboardPage />, children: [
    { path: 'usermanagementpage', element: <UserManagementPage /> },
    { path: 'productlistadminpage', element: <ProductListAdminPage /> },
    { path: 'orderfulfillmentpage', element: <OrderFulfillmentPage /> },
    { path: 'salesreportpage', element: <SalesReportPage /> },

  ]},
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>
);