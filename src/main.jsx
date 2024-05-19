import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './pages/Root';
import LoginDetails from './pages/Login/Login';
import Home from './pages/Home/Home';
import RegisterDetails from './pages/Register/Register';
import ShoppingCart from './Shopping_Cart/ShoppingCart';
import CheckOutPage from './Shopping_Cart/CheckOutPage';
import Checkout from './Shopping_Cart/CheckOutPage';
import ProductListPage from './pages/CustomerPages/ProductListPage';
// import OrderConfirmationPage from './pages/CustomerPages/OrderConfirmationPage';
// import UserProfilePage from './pages/CustomerPages/UserProfilePage';
import Transactions from './Shopping_Cart/Transactions'
import AdminDashboardPage from './pages/AdminPages/AdminDashboardPage';
import UserManagementPage from './pages/AdminPages/UserManagementPage';
import ProductListAdminPage from './pages/AdminPages/ProductListAdminPage';
import OrderFulfillmentPage from './pages/AdminPages/OrderFulfillmentPage';
import SalesReportPage from './pages/AdminPages/SalesReportPage';
import AddProductPage from './pages/AdminPages/AddProductPage';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/shopcart', element: ( <ProtectedRoute allowedRoles={['user',  'admin']}> <ShoppingCart />  </ProtectedRoute>),},
    ],
  },
  { path: '/checkout', 
    element: ( 
      <ProtectedRoute allowedRoles={['user', 'admin']}> 
        <Checkout /> 
      </ProtectedRoute>
    )
  },
  { path: '/userTransac', 
    element: ( 
      <ProtectedRoute allowedRoles={['user', 'admin']}> 
        <Transactions /> 
      </ProtectedRoute>
    )
  },
  { path: '/login', element: <LoginDetails /> },
  { path: '/register', element: <RegisterDetails /> },
  {
    path: '/productlistpage',
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <ProductListPage />
      </ProtectedRoute>
    ),
  },
  // {
  //   path: '/userprofilepage',
  //   element: (
  //     <ProtectedRoute allowedRoles={['user']}>
  //       <UserProfilePage />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: '/admindashboardpage',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboardPage />
      </ProtectedRoute>
    ),
    children: [
      { path: 'usermanagementpage', element: <UserManagementPage /> },
      { path: 'productlistadminpage', element: <ProductListAdminPage /> },
      { path: 'productlistadminpage/addproductpage', element: <AddProductPage /> },
      { path: 'productlistadminpage/addproductpage/:existingProductId', element: <AddProductPage /> },
      { path: 'orderfulfillmentpage', element: <OrderFulfillmentPage /> },
      { path: 'salesreportpage', element: <SalesReportPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
