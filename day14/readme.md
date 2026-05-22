# 📦 Inventory Management API

A **microservices-based** REST API built with Node.js and Express for managing product inventory. Built as part of the **GOW AI Academy Backend Internship — Day 14**.

---

## 🏗️ Architecture Overview

```
Client / Postman
      │
      ▼
┌─────────────────────┐
│   API Gateway       │  ← Port 2000 (Single Entry Point)
│   gateway/index.js  │  ← Uses AXIOS to forward requests
└──────┬──────┬───────┘
       │      │       │
       ▼      ▼       ▼
┌────────┐ ┌──────────┐ ┌──────────┐
│Product │ │Inventory │ │ Report   │
│Service │ │ Service  │ │ Service  │
│:2001   │ │  :2002   │ │  :2003   │
└────┬───┘ └────┬─────┘ └────┬─────┘
     │          │             │
     └──────────┴─────────────┘
                │
         ┌──────▼──────┐
         │  SQLite DB  │
         │ inventory.db│
         └─────────────┘
```

> The client **only ever talks to port 2000**. The gateway internally routes to the right microservice using Axios.

---

## 📁 Project Structure

```
inventory-management/
├── package.json
├── .env                          ← secrets (gitignored)
├── .gitignore
├── database/
│   └── db.js                     ← Shared SQLite connection + table setup
├── gateway/
│   └── index.js                  ← API Gateway (port 2000)
└── services/
    ├── product-service/          ← Handles add, get, delete products
    │   ├── index.js
    │   ├── routes/productRoutes.js
    │   ├── controller/productController.js
    │   └── service/productService.js
    ├── inventory-service/        ← Handles quantity updates & low stock
    │   ├── index.js
    │   ├── routes/inventoryRoutes.js
    │   ├── controller/inventoryController.js
    │   └── service/inventoryService.js
    └── report-service/           ← Handles sorting & analytics
        ├── index.js
        ├── routes/reportRoutes.js
        ├── controller/reportController.js
        └── service/reportService.js
```

---

## ⚙️ Tech Stack

| Tool           | Purpose                            |
| -------------- | ---------------------------------- |
| Node.js        | Runtime                            |
| Express.js     | HTTP server for each microservice  |
| Axios          | Gateway-to-service communication   |
| better-sqlite3 | SQL database (file-based)          |
| dotenv         | Environment variable management    |
| concurrently   | Run all 4 servers with one command |
| nodemon        | Auto-restart on file save          |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <"https://github.com/garvitajain23/RFT-internship">
cd inventory-management
npm install
```

### 2. Set up `.env`

Create a `.env` file in the root:

```env
GATEWAY_PORT=2000
PRODUCT_SERVICE_PORT=2001
INVENTORY_SERVICE_PORT=2002
REPORT_SERVICE_PORT=2003

PRODUCT_SERVICE_URL=http://localhost:2001
INVENTORY_SERVICE_URL=http://localhost:2002
REPORT_SERVICE_URL=http://localhost:2003

DB_PATH=./database/inventory.db
LOW_STOCK_THRESHOLD=5
```

### 3. Start all services

```bash
npm start
```

This launches all 4 servers simultaneously using `concurrently` + `nodemon`:

```
🌐 API Gateway running on port 2000
📦 Product Service running on port 2001
🏭 Inventory Service running on port 2002
📊 Report Service running on port 2003
✅ Database connected at: ./database/inventory.db
```

---

## 🔌 API Endpoints

> All requests go through the **API Gateway at port 2000**.

### 📦 Products

| Method   | Endpoint            | Description            |
| -------- | ------------------- | ---------------------- |
| `GET`    | `/api/products`     | Get all products       |
| `POST`   | `/api/products`     | Add a new product      |
| `DELETE` | `/api/products/:id` | Delete a product by ID |

#### POST `/api/products` — Request Body

```json
{
  "name": "Laptop",
  "price": 55000,
  "quantity": 10
}
```

#### Response

```json
{
  "success": true,
  "message": "Product added!",
  "data": {
    "id": 1,
    "name": "Laptop",
    "price": 55000,
    "quantity": 10,
    "created_at": "2026-05-21 06:30:00"
  }
}
```

---

### 🏭 Inventory

| Method  | Endpoint                      | Description                               |
| ------- | ----------------------------- | ----------------------------------------- |
| `PATCH` | `/api/inventory/:id/quantity` | Update product quantity                   |
| `GET`   | `/api/inventory/low-stock`    | Get products with low stock (≤ threshold) |

#### PATCH `/api/inventory/:id/quantity` — Request Body

```json
{
  "quantity": 3
}
```

#### GET `/api/inventory/low-stock` — Response

```json
{
  "success": true,
  "message": "Products with quantity ≤ 5",
  "count": 2,
  "data": [...]
}
```

---

### 📊 Reports

| Method | Endpoint                               | Description                                    |
| ------ | -------------------------------------- | ---------------------------------------------- |
| `GET`  | `/api/reports/sort-by-price?order=asc` | Products sorted by price (asc/desc)            |
| `GET`  | `/api/reports/summary`                 | Total products, inventory value, average price |

#### GET `/api/reports/summary` — Response

```json
{
  "success": true,
  "data": {
    "totalProducts": 5,
    "totalInventoryValue": 312450,
    "averagePrice": 4899.5
  }
}
```

---

### 🏥 Health Checks

| Endpoint      | Port | Description              |
| ------------- | ---- | ------------------------ |
| `GET /health` | 2000 | Gateway status           |
| `GET /health` | 2001 | Product service status   |
| `GET /health` | 2002 | Inventory service status |
| `GET /health` | 2003 | Report service status    |

---

## 🧠 Concepts Demonstrated

- **Microservices Architecture** — each service is independently deployable and has a single responsibility
- **API Gateway Pattern** — single entry point using Axios for internal HTTP forwarding
- **Layered Architecture** — every service follows `routes → controller → service` separation
- **Database Queries** — SQL with `better-sqlite3` (CREATE, INSERT, SELECT, UPDATE, DELETE)
- **Real-World Modeling** — Product entity with name, price, quantity; business logic like low stock alerts
- **Environment Configuration** — `.env` for secrets and port management
- **Error Handling** — proper HTTP status codes (400, 404, 409, 500, 503) throughout

---

## 🌟 Bonus Features

- ✅ **Low Stock Alert** — flags products at or below configurable threshold (`LOW_STOCK_THRESHOLD` in `.env`)
- ✅ **Sort by Price** — ascending or descending via query param (`?order=asc` / `?order=desc`)
- ✅ **Inventory Summary** — total product count, total inventory value, and average price
- ✅ **Duplicate Prevention** — returns `409 Conflict` if product name already exists
- ✅ **Service Unavailable Handling** — gateway returns `503` if a downstream service is down

---

## 📋 Rules Followed

- ✅ Daily task completed before 11 PM
- ✅ Code pushed to GitHub with proper commit messages
- ✅ LinkedIn post with day number, learnings, GitHub link, and hashtags `#gowaiacademy #rftinternship`
- ✅ Form submitted before deadline

---

## 👨‍💻 Author

**[GARVITA JAIN]**
GOW AI Academy — Backend Internship, Day 14
Ruhil Future Technologies

---

_Built with ❤️ using Node.js Microservices_
