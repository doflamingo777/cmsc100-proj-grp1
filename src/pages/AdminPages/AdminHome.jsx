import { useEffect, useState } from "react";
import "./AdminHome.css"
import axios from "axios";

export default function AdminHomePage(){
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [topProduct, setTopProduct] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [orderTransaction, setOrderTransaction] = useState([]);
    const [completedOrder, setCompletedOrder] = useState([]);
    const [cancelledOrder, setCancelledOrder] = useState([]);
    const [topUser, setTopUser] = useState([]);

    const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:3000/users');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

    const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost:3000/getAllProduct');
        setProducts(response.data);
        findTopProduct(response.data);
        findLowStockProducts(response.data);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
    };

    const findTopProduct = (products) => {
        if (products.length > 0) {
          const top = products.reduce((max, product) => (product.sales > max.sales ? product : max), products[0]);
          setTopProduct(top);
        }
      };

    const fetchOrderTransactions = async () => {
        try {
        // Fetch order transactions from the backend
        const response = await axios.get('http://localhost:3000/getAllOrderTransactions');
        const filteredData = response.data.filter(item => item.orderStatus !== 1 & item.orderStatus !== 2 & item.orderStatus !== 3); // Filter pending orders
        const filteredCompOrder = response.data.filter(item => item.orderStatus !== 0 & item.orderStatus !== 2 & item.orderStatus !== 3); // Filter completed orders
        const filteredCancOrder = response.data.filter(item => item.orderStatus !== 0 & item.orderStatus !== 2 & item.orderStatus !== 1); // Filter cancelled orders
        setOrderTransaction(filteredData);
        setCompletedOrder(filteredCompOrder);
        setCancelledOrder(filteredCancOrder);
        findTopUser(response.data);
        // console.log(topUser);
        } catch (error) {
        console.error('Error fetching order transactions:', error);
        }
    };

    const findLowStockProducts = (products) => {
        const lowStock = products.filter(product => product.qty < 5);
        setLowStockProducts(lowStock[0]);
    };

    const findTopUser = (orders) => {
        const userOrderCount = orders.reduce((acc, order) => {
          acc[order.email] = (acc[order.email] || 0) + 1;
          return acc;
        }, {});
    
        const topUserEmail = Object.keys(userOrderCount).reduce((max, email) =>
          userOrderCount[email] > userOrderCount[max] ? email : max
        );
    
        const topUserDetails = users.find(user => user.email === topUserEmail);
        if (topUserDetails) {
          setTopUser({
            email: topUserEmail,
            orders: userOrderCount[topUserEmail],
            firstName: topUserDetails.firstname,
            lastName: topUserDetails.lastname
          });
        }
      };

    // Filter products to exclude those with sales equal to 0
    const filteredProducts = products.filter(product => product.sales > 0);

    // Calculate the total sales from filteredProducts
    const getTotalProductSales = () => {
        return filteredProducts.reduce((total, product) => total + product.sales, 0);
    };

      useEffect(() => {
        //constantly fetch user from database
        fetchUsers();
        fetchProducts();
        fetchOrderTransactions();
      }, [users]);

    return (
        <div className="admin-home-container">
            <div className="admin-box-container">
                <div className="admin-box" style={{flexGrow:1}}>
                    <h2> There are <span> {users.length} </span> users registered </h2>
                    {/* {users.map((item, index) => (
                        <p>{item.email}</p>
                    ))} */}
                </div>
                <div className="admin-box" style={{flexGrow:2}}>
                    <h2><span>{products.length}</span> products are currently on sale</h2>
                </div>
                {/* <p>Homepage here</p> */}

            </div>
            <div className="admin-box-container">
                <div className="admin-box top-product" style={{flexGrow:1}}>
                    {topProduct.length != 0 ? (
                        <>
                        <h3>HIGHEST SELLING PRODUCT</h3>
                        <img src= {topProduct.image} alt={topProduct.name} className="product-image-list"/>
                        <h2><span>{topProduct.name} </span>has {topProduct.soldqty} quantity sold with total sales of ₱{topProduct.sales}</h2>
                        </>
                    ):(<h1>Loading top product...</h1>) 
                    }
                </div>
                <div className="admin-box top-product" style={{flexGrow:1}}>
                    {lowStockProducts && lowStockProducts.length != 0 ? (
                        <>
                        <h3>LOW STOCK PRODUCT</h3>
                    <img src= {lowStockProducts.image} alt={lowStockProducts.name} className="product-image-list"/>
                    <div className="low-stock-prod">
                        <h4><span>{lowStockProducts.name}</span></h4>
                        <h4>Quantity: {lowStockProducts.qty}</h4>
                    </div>
                        </>
                        ) : (<h1>All products are well-stocked</h1>) }
                </div>
                {/* <p>Homepage here</p> */}

            </div>
            <div className="admin-box-container">
                <div className="admin-box" style={{flexGrow:1}}>
                    {orderTransaction.length != 0 ? 
                    <h2>There are <span>{orderTransaction.length}</span> pending orders</h2>
                    : <h2>No pending orders yet</h2>
                }
                </div>
                <div className="admin-box" style={{flexGrow:3}}>
                    <h2><span>{completedOrder.length}</span> orders are completed</h2>
                    <h2><span>{cancelledOrder.length}</span> orders are cancelled</h2>
                </div>
                {/* <p>Homepage here</p> */}

            </div>
            <div className="admin-box-container">
                <div className="admin-box top-user" style={{ flexGrow: 0.5 }}>
                    {topUser ? (
                        <>
                        <h3>TOP USER</h3>
                        <div className="low-stock-prod">
                            <h2>{topUser.firstName} {topUser.lastName}</h2>
                            <p>with <span>{topUser.orders}</span> orders</p>
                        </div>
                        </>
                    ) : (
                        <h2>Loading top user...</h2>
                    )}
                </div>
                <div className="admin-box" style={{flexGrow:3, alignContent:"center"}}>
                <h2>Total sales are currently <span>₱{getTotalProductSales()}</span></h2>
                </div>
            </div>
        </div>

    );

}