import { Outlet, Link, useNavigate } from 'react-router-dom';
import React, {useEffect} from 'react';


export default function Root() {
  const isUserLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/userprofilepage');
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
          {/* <li><Link to={'/checkoutpage'}>Check Out</Link></li> */}
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