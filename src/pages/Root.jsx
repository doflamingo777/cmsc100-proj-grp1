/*import { Outlet, Link, useNavigate } from 'react-router-dom';
import React, {useEffect} from 'react';


export default function Root() {
  const isUserLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/userprofilepage')
    } else {
      navigate('/');
    }
  }, [isUserLoggedIn, navigate]);


    return (
      <>
        <nav>
          <ul>
          <li><Link to={'/'}>Home</Link></li>
          {!isUserLoggedIn && <li><Link to={'/login'}>Login</Link></li>}
          {!isUserLoggedIn && <li><Link to={'/register'}>Register</Link></li>}
          <li><Link to={'/shopcart'}>Shopping Cart</Link></li>
          <li><Link to={'/productlistpage'}>Product List</Link></li>
          <li><Link to={'/checkoutpage'}>Check Out</Link></li> 
          <li><Link to={'/orderconfirmationpage'}>Order Confirmation</Link></li>
          {isUserLoggedIn && <li><Link to={'/userprofilepage'}>User Profile</Link></li>}
          <li><Link to={'/admindashboardpage'}>Admin Dashboard</Link></li>
          <li><Link to={'/admindashboardpage/usermanagementpage'}>User Management</Link></li>
          <li><Link to={'/admindashboardpage/productlistadminpage'}>Product List Admin</Link></li>
          <li><Link to={'/admindashboardpage/productlistadminpage/addproductpage'}>Product Add admin</Link></li>
          <li><Link to={'/admindashboardpage/orderfulfillmentpage'}>Order Fulfillment</Link></li>
          <li><Link to={'/admindashboardpage/salesreportpage'}>Sales Report</Link></li>

          </ul>
        </nav>
        <Outlet/>
      </>
    )
}
*/

import { Outlet, Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import './root.css';

export default function Root() {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');
  const isUserLoggedIn = !!token;
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn) {
      if (userType === 'admin') {
        navigate('/admindashboardpage');
      } else {
        navigate('/userprofilepage');
      }
    } else {
      navigate('/');
    }
  }, [isUserLoggedIn, userType, navigate]);

  return (
    <div className='App'>
      <div className='top-bar'>
        <div className='contact-info'>
          <span><i className='icon fa fa-phone'></i> +63 999 8342342</span>
          <span><i className='icon fa fa-envelope'></i> contact@farmtotable.com</span>
        </div>
        <div className='social-icons'>
          <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'><i class="fi fi-brands-instagram"></i></a>
          <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'><i class="fi fi-brands-youtube"></i></a>
          <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'><i class="fi fi-brands-facebook"></i></a>
          <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'><i class="fi fi-brands-twitter"></i></a>
          
        </div>
      </div>
      <div className='root-container'>
        <nav>
          <div className="nav-logo">Farm-to-Table</div>
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            {!isUserLoggedIn && <li><Link to={'/login'}>Login</Link></li>}
            {!isUserLoggedIn && <li><Link to={'/register'}>Register</Link></li>}
            <li><Link to={'/shopcart'}>Shopping Cart</Link></li>
            <li><Link to={'/productlistpage'}>Product List</Link></li>
            <li><Link to={'/checkoutpage'}>Check Out</Link></li>
            <li><Link to={'/orderconfirmationpage'}>Order Confirmation</Link></li>
            {isUserLoggedIn && <li><Link to={'/userprofilepage'}>User Profile</Link></li>}
            {isUserLoggedIn && userType === 'user' &&
              <li><Link to={'/userprofilepage'}>User Profile</Link></li>}
            {isUserLoggedIn && userType === 'admin' && (
              <>
                <li><Link to={'/admindashboardpage'}>Admin Dashboard</Link></li>
                <li><Link to={'/admindashboardpage/usermanagementpage'}>User Management</Link></li>
                <li><Link to={'/admindashboardpage/productlistadminpage'}>Product List Admin</Link></li>
                <li><Link to={'/admindashboardpage/productlistadminpage/addproductpage'}>Product Add admin</Link></li>
                <li><Link to={'/admindashboardpage/orderfulfillmentpage'}>Order Fulfillment</Link></li>
                <li><Link to={'/admindashboardpage/salesreportpage'}>Sales Report</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
