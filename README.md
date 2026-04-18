# Green World E-Shop

A full-stack e-commerce web application for Green World, a Hong Kong-based recycling social enterprise. The platform allows users to browse eco-friendly products, add items to cart, and complete payments via PayPal.

## 👥 Team Members

| Name | Role | Student ID |
|------|------|-------------|
| Hu duoduo | Scrum Master | 25469932 |
| Xie Tianqing | Developer | 25469851 |
| Gao Yikai | Scrum Master | 25442570 |
| Xiang Jingwei | Scrum Master | 25422022 |
| Lam Hoikiu | Scrum Master | 25450441 |
| Zhang Zijie | Developer | 25456296 |

**Team No.:** 23  
**Team Name:** Caffeine Power  
**Course:** COMP 7780 Special Topics in Knowledge and Information Management

## 📋 Project Requirements

| Requirement | Description | Status |
|-------------|-------------|--------|
| R1 | Set up e-shop to display and sell products | ✅ |
| R2 | Home page with heading, company info, footer | ✅ |
| R3 | Product page with heading, company info, product info, footer | ✅ |
| R4 | PayPal payment integration | ✅ |
| R5 | Allow users to place orders | ✅ |
| R6 | Student information in table format | ✅ |
| ITR1 | Node.js web server | ✅ |
| ITR2 | MySQL database for transaction data | ✅ |

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Payment Integration:** PayPal SDK (Sandbox)
- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap 4
- **Development Tools:** Nodemon

## 📁 Project Structure

```
green-world-eshop/
├── server.js                 # Main application entry point
├── package.json              # Project dependencies
├── .env                      # Environment variables
├── comp7780_home.html        # Home page
├── comp7780_product.html     # Product page
├── css/
│   ├── styles.css            # Home page styles
│   └── styles2.css           # Product page styles
├── js/
│   └── script.js             # Frontend JavaScript (cart & PayPal)
├── config/
│   └── database.js           # MySQL database connection
├── controllers/
│   └── paypalController.js   # PayPal API handlers
├── routes/
│   └── paypal.js             # PayPal API routes
├── db/
│   └── database.sql          # Database schema
└── images/                   # Product images
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server (8.0 recommended)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd green-world-eshop

Step 2: Install Dependencies
npm install

Step 3: Configure Environment Variables
Create a .env file in the root directory with the following configuration:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your db password
DB_NAME=green_world

# PayPal sandbox
PAYPAL_CLIENT_ID=ARTBk-SiJjYqZji_hblclL7r0y1czLXDPllq9ThdQONIWLUFPAtHX5s6L-wNkgNfIJVH42P_mp--1Gjv
PAYPAL_CLIENT_SECRET=EGYrAp32mqNhBvWV95KuX3x8UzFc0R1BGhTy9Tk3uXIlYeBnPQBVQxC0Bp_LPT3IDojx_10Xzorg0JuC
PAYPAL_MODE=sandbox

Step 4: Set Up Database
# Login to MySQL
mysql -u root -p

# Execute the database schema
source db/database.sql

# Verify database creation
SHOW DATABASES;
USE green_world;
SHOW TABLES;

Step 5: Start the Server
npm start

Step 6: Access the Application
Home Page: http://localhost:3000/home

Product Page: http://localhost:3000/product

Step 7: Review Order Information
# 1. Log in to MySQL 
mysql -u root -p
Enter password: your database password 
# 2. Switch to the "green_world" database 
USE green_world;
# 3. View Order Information 
SELECT id, order_id, amount, status, payer_name, created_at FROM orders;

💳 PayPal Sandbox Testing

Test Accounts

You can use PayPal's sandbox test accounts to simulate payments:

1. Login to [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Navigate to **Sandbox > Accounts**
3. Use the default buyer account (e.g., `sb-xxxxxx@personal.example.com`)
4. Default password: `123456789`

Test Payment Flow

1. Add products to cart on the product page
2. Open shopping cart sidebar
3. Click the PayPal button
4. Login with sandbox buyer account
5. Complete the payment
6. Verify order is saved in database with `status = 'completed'`

📊 Database Schema

sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(100) NOT NULL UNIQUE,
    payer_id VARCHAR(100),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'HKD',
    status VARCHAR(50) DEFAULT 'pending',
    items JSON,
    payer_name VARCHAR(200),
    payer_email VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
## 🔗 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/paypal/create-order` | POST | Create PayPal order |
| `/api/paypal/capture-order` | POST | Capture PayPal payment |
| `/api/orders` | GET | Retrieve all orders |

## 🎨 Features

- **Product Catalog:** 12 eco-friendly products across 4 categories
- **Shopping Cart:** Add/remove items, adjust quantities
- **PayPal Integration:** Secure sandbox payment processing
- **Order Management:** Automatic order storage in MySQL
- **Responsive Design:** Mobile-friendly layout
- **Team Information:** Student details displayed in table format (R6)

## 📝 Notes

- The project uses PayPal Sandbox mode for testing – no real money is transferred
- All products are sample data representing recycled/donated items
- The application meets all COMP 7780 assignment requirements
- **Never commit `.env` file to version control** (contains sensitive credentials)

## 👨‍💻 Developer

**Zhang Zijie (Roy)** - Developer  
GitHub: [https://github.com/RoyZiJie/comp7780-Project](https://github.com/RoyZiJie/comp7780-Project)

## 📅 Last Updated

April 2026

---

© 2026 Green World | HKBU COMP 7780

