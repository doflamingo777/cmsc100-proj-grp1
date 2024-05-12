import { Outlet, Link } from 'react-router-dom';
export default function Root() {

    return (
      <>
        <nav>
          <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/login'}>Login</Link></li>
          <li><Link to={'/register'}>Register</Link></li>
          <li><Link to={'/productlistpage'}>Product List</Link></li>
          <li><Link to={'/shoppingcartpage'}>Shopping Cart</Link></li>
          <li><Link to={'/checkoutpage'}>Check Out</Link></li>
          <li><Link to={'/orderconfirmationpage'}>Order Confirmation</Link></li>
          <li><Link to={'/userprofilepage'}>User Profile</Link></li>
          <li><Link to={'/admindashboardpage'}>Admin Dashboard</Link></li>
          <li><Link to={'/admindashboardpage/usermanagementpage'}>User Management</Link></li>
          <li><Link to={'/admindashboardpage/productlistadminpage'}>Product List Admin</Link></li>
          <li><Link to={'/admindashboardpage/orderfulfillmentpage'}>Order Fulfillment</Link></li>
          <li><Link to={'/admindashboardpage/salesreportpage'}>Sales Report</Link></li>
          </ul>
        </nav>
        <Outlet/>
      </>
    )
}