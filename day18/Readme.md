# 🛒 E-Commerce Backend — Microservices Architecture

> **GOW AI Academy | Backend Internship — Day 18**
> Built with Node.js, Express, MongoDB, and Axios following a clean Microservices + API Gateway pattern.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Services](#services)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Inter-Service Communication](#inter-service-communication)
- [Bonus Features](#bonus-features)
- [Testing Guide](#testing-guide)
- [Scripts](#scripts)

---

## Overview

This is a real-world e-commerce backend system built using **Microservices Architecture**. Instead of one monolithic server, the system is split into four independent services — each with its own responsibility, database, and port — all accessible through a single **API Gateway**.

### What It Does

- Manage a product catalog with stock tracking
- Allow users to add products to a cart
- Place orders that automatically deduct stock and clear the cart
- View full order history per user

---

## Architecture

```
CLIENT / POSTMAN
       |
       ▼
+------------------+
|   API GATEWAY    |  ← Port 3000 (single entry point)
+------------------+
   |        |        |
   ▼        ▼        ▼
+-------+ +------+ +-------+
|Product| | Cart | | Order |
|Service| |Service|Service|
|  3001 | | 3002 | | 3003  |
+-------+ +------+ +-------+
   |          |        |
   ▼          ▼        ▼
 product-db  cart-db  order-db
 (MongoDB)  (MongoDB) (MongoDB)
```

### How Requests Flow

1. Client sends a request to the **API Gateway** on port `3000`
2. Gateway proxies the request to the correct service based on the URL path
3. Each service handles its own logic and database operations
4. Services communicate with each other using **Axios** (HTTP calls) when needed
5. Response travels back through the Gateway to the client

---

## Tech Stack

| Technology                | Purpose                           |
| ------------------------- | --------------------------------- |
| **Node.js**               | Runtime environment               |
| **Express.js**            | HTTP server framework             |
| **MongoDB**               | NoSQL database (one per service)  |
| **Mongoose**              | MongoDB ODM                       |
| **Axios**                 | Inter-service HTTP communication  |
| **http-proxy-middleware** | API Gateway routing               |
| **dotenv**                | Environment variable management   |
| **cors**                  | Cross-origin resource sharing     |
| **nodemon**               | Auto-restart on file changes      |
| **concurrently**          | Run all services with one command |

---

## Project Structure

```
ecommerce-backend/
│
├── .env                          ← Single env file for all services
├── .gitignore
├── package.json                  ← Single package.json with all dependencies
├── node_modules/                 ← Single shared node_modules
│
├── api-gateway/
│   └── src/
│       └── index.js              ← Proxy middleware, routes to services
│
├── product-service/
│   └── src/
│       ├── index.js              ← Server entry, DB connection
│       ├── models/
│       │   └── product.model.js  ← Product schema (name, price, stock, category)
│       ├── services/
│       │   └── product.service.js ← Business logic (CRUD + stock update)
│       ├── controllers/
│       │   └── product.controller.js ← HTTP req/res handling
│       └── routes/
│           └── product.routes.js ← Route definitions
│
├── cart-service/
│   └── src/
│       ├── index.js
│       ├── models/
│       │   └── cart.model.js     ← Cart schema (userId, items[], totalPrice)
│       ├── services/
│       │   └── cart.service.js   ← Add/remove items, calculate total, clear cart
│       ├── controllers/
│       │   └── cart.controller.js
│       └── routes/
│           └── cart.routes.js
│
└── order-service/
    └── src/
        ├── index.js
        ├── models/
        │   └── order.model.js    ← Order schema (userId, items[], status)
        ├── services/
        │   └── order.service.js  ← Place order, fetch cart, deduct stock, clear cart
        ├── controllers/
        │   └── order.controller.js
        └── routes/
            └── order.routes.js
```

---

## Services

### 🌐 API Gateway — Port 3000

The single entry point for all client requests. Uses `http-proxy-middleware` to forward requests to the appropriate service based on the URL path.

| Path Prefix     | Forwarded To           |
| --------------- | ---------------------- |
| `/api/products` | Product Service (3001) |
| `/api/cart`     | Cart Service (3002)    |
| `/api/orders`   | Order Service (3003)   |

---

### 📦 Product Service — Port 3001

Manages the product catalog. Handles product creation, retrieval, and stock updates.

**Database:** `product-db`

**Responsibilities:**

- Store product information (name, price, stock, category, description)
- Expose stock update endpoint used by Order Service after a purchase
- Validate product existence for cart operations

---

### 🛒 Cart Service — Port 3002

Manages user shopping carts. Each user has one cart identified by their `userId`.

**Database:** `cart-db`

**Responsibilities:**

- Add items to a user's cart (calls Product Service to validate product and check stock)
- Automatically calculate `totalPrice` on every cart change
- Remove individual items from cart
- Clear entire cart (called by Order Service after order is placed)

---

### 📋 Order Service — Port 3003

Handles order placement and history. The most complex service — it orchestrates the entire checkout flow.

**Database:** `order-db`

**Responsibilities:**

- Fetch user's cart from Cart Service
- Deduct stock for each ordered item via Product Service
- Create a confirmed order record
- Clear the cart after successful order
- Return full order history per user

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB running locally on port `27017`
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ecommerce-backend.git
cd ecommerce-backend

# 2. Install all dependencies (single install at root)
npm install

# 3. Create your .env file at the root
cp .env.example .env
# Edit .env with your values (see Environment Variables section)

# 4. Start all services simultaneously
npm run dev
```

### Expected Console Output

```
[0] 🌐 API Gateway running on port 3000
[0]    /api/products → http://localhost:3001
[0]    /api/cart     → http://localhost:3002
[0]    /api/orders   → http://localhost:3003
[1] ✅ Product DB connected
[1] 🚀 Product Service running on port 3001
[2] ✅ Cart DB connected
[2] 🚀 Cart Service running on port 3002
[3] ✅ Order DB connected
[3] 🚀 Order Service running on port 3003
```

---

## Environment Variables

Create a single `.env` file at the project root:

```env
# ── Ports ─────────────────────────────────────
GATEWAY_PORT=3000
PRODUCT_PORT=3001
CART_PORT=3002
ORDER_PORT=3003

# ── MongoDB URIs ──────────────────────────────
PRODUCT_MONGO_URI=mongodb://localhost:27017/product-db
CART_MONGO_URI=mongodb://localhost:27017/cart-db
ORDER_MONGO_URI=mongodb://localhost:27017/order-db

# ── Internal Service URLs ─────────────────────
PRODUCT_SERVICE_URL=http://localhost:3001
CART_SERVICE_URL=http://localhost:3002
ORDER_SERVICE_URL=http://localhost:3003
```

> ⚠️ The `.env` file is listed in `.gitignore` and will **never** be pushed to GitHub.

---

## API Reference

All requests go through the **API Gateway on port 3000**.

### Product Endpoints

| Method   | Endpoint                  | Description        | Body                                            |
| -------- | ------------------------- | ------------------ | ----------------------------------------------- |
| `GET`    | `/api/products`           | Get all products   | —                                               |
| `GET`    | `/api/products/:id`       | Get single product | —                                               |
| `POST`   | `/api/products`           | Create a product   | `{ name, price, stock, category, description }` |
| `PATCH`  | `/api/products/:id/stock` | Deduct stock       | `{ quantity }`                                  |
| `DELETE` | `/api/products/:id`       | Delete a product   | —                                               |

**Create Product — Example Request:**

```json
POST /api/products
{
  "name": "iPhone 15",
  "price": 79999,
  "stock": 50,
  "category": "Electronics",
  "description": "Latest Apple smartphone"
}
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "_id": "664abc123...",
    "name": "iPhone 15",
    "price": 79999,
    "stock": 50,
    "category": "Electronics",
    "createdAt": "2026-05-27T06:00:00.000Z"
  }
}
```

---

### Cart Endpoints

| Method   | Endpoint                       | Description           | Body                              |
| -------- | ------------------------------ | --------------------- | --------------------------------- |
| `GET`    | `/api/cart/:userId`            | Get user's cart       | —                                 |
| `POST`   | `/api/cart`                    | Add item to cart      | `{ userId, productId, quantity }` |
| `DELETE` | `/api/cart/:userId/:productId` | Remove item from cart | —                                 |
| `DELETE` | `/api/cart/:userId/clear`      | Clear entire cart     | —                                 |

**Add to Cart — Example Request:**

```json
POST /api/cart
{
  "userId": "user123",
  "productId": "664abc123...",
  "quantity": 2
}
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "userId": "user123",
    "items": [
      {
        "productId": "664abc123...",
        "name": "iPhone 15",
        "price": 79999,
        "quantity": 2
      }
    ],
    "totalPrice": 159998
  }
}
```

---

### Order Endpoints

| Method  | Endpoint                   | Description         | Body         |
| ------- | -------------------------- | ------------------- | ------------ |
| `POST`  | `/api/orders`              | Place an order      | `{ userId }` |
| `GET`   | `/api/orders/user/:userId` | Get order history   | —            |
| `GET`   | `/api/orders/:orderId`     | Get single order    | —            |
| `PATCH` | `/api/orders/:orderId`     | Update order status | `{ status }` |

**Order Status Values:** `pending` → `confirmed` → `shipped` → `delivered` → `cancelled`

**Place Order — Example Request:**

```json
POST /api/orders
{
  "userId": "user123"
}
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "_id": "664xyz789...",
    "userId": "user123",
    "items": [
      {
        "productId": "664abc123...",
        "name": "iPhone 15",
        "price": 79999,
        "quantity": 2
      }
    ],
    "totalPrice": 159998,
    "status": "confirmed",
    "createdAt": "2026-05-27T06:30:00.000Z"
  }
}
```

---

### Health Check Endpoints

```
GET http://localhost:3000/health  ← Gateway
GET http://localhost:3001/health  ← Product Service
GET http://localhost:3002/health  ← Cart Service
GET http://localhost:3003/health  ← Order Service
```

---

## Inter-Service Communication

Services communicate directly with each other using **Axios** — bypassing the Gateway for internal calls to avoid unnecessary overhead.

```
Order Service
    │
    ├── GET  http://localhost:3002/api/cart/:userId
    │        (fetch cart before placing order)
    │
    ├── PATCH http://localhost:3001/api/products/:id/stock
    │        (deduct stock for each item — called in a loop)
    │
    └── DELETE http://localhost:3002/api/cart/:userId/clear
             (clear cart after order is confirmed)

Cart Service
    │
    └── GET http://localhost:3001/api/products/:id
             (validate product exists + check stock before adding to cart)
```

---

## Bonus Features

### ✅ Stock Update After Order

When an order is placed, the Order Service loops through all ordered items and calls the Product Service's stock update endpoint for each one. If any product has insufficient stock, the order fails with a clear error message before anything is saved.

### ✅ Order History Per User

Every order is saved with the `userId` field. The endpoint `GET /api/orders/user/:userId` returns all past orders for a user, sorted from newest to oldest.

### ✅ Auto Cart Clear

After a successful order, the cart is automatically emptied. The user starts fresh for their next purchase.

### ✅ Duplicate Cart Item Handling

Adding the same product to a cart twice doesn't create two entries — it increments the `quantity` of the existing item instead.

---

## Testing Guide

Test all endpoints using **Postman** or **Thunder Client** — always through port `3000`.

### Recommended Test Flow

```
Step 1: POST /api/products       → Create 2 products, copy their _id values
Step 2: POST /api/cart           → Add both products to user123's cart
Step 3: GET  /api/cart/user123   → Verify cart contents and totalPrice
Step 4: POST /api/orders         → Place order for user123
Step 5: GET  /api/products/:id   → Verify stock was reduced
Step 6: GET  /api/cart/user123   → Verify cart is now empty
Step 7: GET  /api/orders/user/user123 → Verify order history
```

### Edge Cases to Test

| Test                                   | Expected Result             |
| -------------------------------------- | --------------------------- |
| Order with empty cart                  | `400` — "Cart is empty"     |
| Add more quantity than available stock | `400` — "Not enough stock"  |
| Get product with invalid ID            | `404` — "Product not found" |
| Get order with invalid ID              | `404` — "Order not found"   |

---

## Scripts

```bash
# Run all 4 services simultaneously (recommended)
npm run dev

# Run individual services
npm run gateway    # API Gateway only
npm run product    # Product Service only
npm run cart       # Cart Service only
npm run order      # Order Service only
```

---

## Key Concepts Demonstrated

| Concept                    | Implementation                                |
| -------------------------- | --------------------------------------------- |
| **Microservices**          | 4 independent services with separate DBs      |
| **API Gateway**            | Single entry point proxying to services       |
| **Inter-service calls**    | Axios HTTP calls between services             |
| **Separation of concerns** | model → service → controller → routes         |
| **Monorepo**               | Single `node_modules`, `package.json`, `.env` |
| **Hot reload**             | nodemon + concurrently for dev experience     |
| **Environment config**     | All secrets in `.env`, never committed        |

---

## Author

**RFT Internship — Day 18**
GOW AI Academy × Ruhil Future Technologies

> GitHub: push with message `Day 18 — E-Commerce Microservices Backend`
> LinkedIn: tag `#gowaiacademy #rftinternship` with project video and GitHub link
