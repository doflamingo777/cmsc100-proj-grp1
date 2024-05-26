# Farm-to-table

## Project Features

### User Types and Accounts
- **Customers (Registered users)**: Can register using an email format username without verification. They can make purchases from the shop.
- **Department of Agriculture (Administrator or Merchants)**: Only one pre-assigned account to manage the entire catalog and oversee e-commerce management. This user does not need to register.
- **Registration**: Users register with an email format username. No verification or OTP required. Automatically assigned as customer users upon registration.
- **Login/Logout Functionality**: Only registered users can log in. Customers cannot access admin dashboards or exclusive admin routes. Ensure routes are protected.

### E-commerce Management (Administrator or Merchant Users)
- **Dashboard**: Renders modules for management tasks.
- **Management of User Accounts**: Oversees registered users and reports the total count.
- **Product Listings**:
  - Manage inventory categorized by Product Name, Product Type (crops or poultry), Product Price, Product Description, and Quantity.
  - Update inventory quantities when orders are confirmed.
  - Sort products by name, type, price, or quantity in ascending or descending order.
- **Order Fulfillment**: Confirm customer orders, making them final and ready for delivery.
- **Sales Reports**: List sold products, sales income, and total sales. Present summary of transactions weekly, monthly, and annually.

### Shop (Customer Users)
- **Product Listings and Order Fulfillment**: Browse and manage products.
- **Shopping Cart**:
  - Add, delete, and count items.
  - Calculate total price of items in the cart.
  - Sort products by name, type, price, or quantity.
- **Manage Orders**: Confirm purchased items in the cart. The default transaction mode is cash-on-delivery. Users can cancel orders before confirmation by the merchant.

## Usage Guidelines

### As a Consumer
1. **Register**: Sign up with an email-format username.
2. **Log in**: Access the shop after logging in.
3. **Browse Products**: View and sort available products.
4. **Manage Cart**: Add items to your cart, view the total price, and remove items as needed.
5. **Place Orders**: Confirm your cart items to place an order. Orders can be canceled if not yet confirmed by the merchant.

### As an Admin
1. **Log in**: Use the pre-assigned credentials.
2. **Dashboard Access**: Manage user accounts, product listings, order fulfillment, and view sales reports.
3. **Product Management**: Add, update, and sort products in the inventory.
4. **Order Confirmation**: Confirm customer orders for delivery.
5. **Sales Reporting**: Generate and view sales reports by week, month, or year.

## How to Run

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/doflamingo777/cmsc100-proj-grp1.git
   ```

2. **Start the Backend Server**:
   ```sh
   cd cmsc100-proj-grp1/backend
   node server.js
   ```

3. **Start the Frontend Server**:
   ```sh
   cd cmsc100-proj-grp1
   npm run dev
   ```

## Screenshots



---

By following these guidelines, you can effectively use and manage the e-commerce project for both customer and administrative roles. Enjoy the streamlined shopping and management experience!