# 🔍 Day 15 — Search API (Database Querying)

> **GOW AI Academy — Backend Internship**
> Built with Node.js, Express, PostgreSQL, and a Microservice Architecture

---

## 📌 Project Overview

A production-style **Search API** built using microservice architecture. The system allows clients to search across Products, Users, and Posts through a single API Gateway that routes requests to independent microservices, each connected to a PostgreSQL database.

**Concepts Tested:** Querying, Filtering, Partial Match Search, Multiple Filters, Efficient Data Retrieval

---

## 🏗️ Architecture

```
Client (Browser / Postman)
        |
        ▼
  API Gateway (Port 2000)        ← Single entry point
        |
        | uses Axios to forward requests
        |
  ┌─────┼──────────────┐
  ▼     ▼              ▼
Products  Users       Posts
(2001)   (2002)      (2003)
  |        |            |
  └────────┴────────────┘
              |
              ▼
       PostgreSQL Database
   (products | users | posts)
```

Each microservice is **fully independent** with its own:

- Router
- Controller
- Service (database layer)
- Express server on its own port

---

## 📁 Folder Structure

```
search-api/
├── .env                          # Environment variables (gitignored)
├── .gitignore
├── package.json                  # Single package.json for entire project
├── node_modules/
├── db/
│   └── index.js                  # Shared PostgreSQL connection pool
├── gateway/
│   └── index.js                  # API Gateway — port 2000
└── services/
    ├── products/
    │   ├── index.js              # Products server — port 2001
    │   ├── product.routes.js     # Route definitions
    │   ├── product.controller.js # Request/response handling
    │   └── product.service.js    # Database queries
    ├── users/
    │   ├── index.js              # Users server — port 2002
    │   ├── user.routes.js
    │   ├── user.controller.js
    │   └── user.service.js
    └── posts/
        ├── index.js              # Posts server — port 2003
        ├── post.routes.js
        ├── post.controller.js
        └── post.service.js
```

---

## ⚙️ Tech Stack

| Technology         | Purpose                                      |
| ------------------ | -------------------------------------------- |
| Node.js            | Runtime environment                          |
| Express.js         | Web framework for each microservice          |
| PostgreSQL         | Relational database                          |
| pg (node-postgres) | PostgreSQL client for Node.js                |
| Axios              | HTTP client used by gateway to call services |
| dotenv             | Environment variable management              |
| nodemon            | Auto-restart server on file save             |
| concurrently       | Run all 4 services with one command          |

---

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- PostgreSQL installed and running
- pgAdmin (optional, for GUI)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/search-api.git
cd search-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=searchapi

# Service Ports
GATEWAY_PORT=2000
PRODUCTS_PORT=2001
USERS_PORT=2002
POSTS_PORT=2003
```

### 4. Set up the PostgreSQL database

Open pgAdmin or any PostgreSQL client and run:

```sql
CREATE DATABASE searchapi;
```

Then connect to `searchapi` and run:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  category VARCHAR(100),
  price DECIMAL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  body TEXT,
  author VARCHAR(100)
);

INSERT INTO products (name, category, price) VALUES
('Phone', 'Electronics', 299.99),
('Laptop', 'Electronics', 899.99),
('Shoes', 'Fashion', 59.99);

INSERT INTO users (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com');

INSERT INTO posts (title, body, author) VALUES
('Hello World', 'This is my first post', 'Alice'),
('Node.js Tips', 'Some useful backend tips', 'Bob');
```

### 5. Start all services

```bash
npm run dev
```

This starts all 4 servers simultaneously using `concurrently`:

```
[0] Products service running on port 2001
[1] Users service running on port 2002
[2] Posts service running on port 2003
[3] API Gateway running on port 2000
```

---

## 📡 API Reference

All requests go through the **API Gateway on port 2000**.

### Base URL

```
http://localhost:2000
```

---

### Health Check

```http
GET /health
```

**Response:**

```json
{
  "status": "Gateway is running",
  "port": "2000"
}
```

---

### Search Endpoint

```http
GET /search?service={service}&{filters}
```

| Parameter  | Required    | Values                         | Description                        |
| ---------- | ----------- | ------------------------------ | ---------------------------------- |
| `service`  | ✅ Yes      | `products` / `users` / `posts` | Which microservice to query        |
| `name`     | ❌ Optional | any string                     | Filter by name (partial match)     |
| `category` | ❌ Optional | any string                     | Filter by category (products only) |
| `email`    | ❌ Optional | any string                     | Filter by email (users only)       |
| `title`    | ❌ Optional | any string                     | Filter by title (posts only)       |
| `author`   | ❌ Optional | any string                     | Filter by author (posts only)      |

---

### Products Service Examples

**Search by name:**

```http
GET /search?service=products&name=phone
```

**Partial match (BONUS):**

```http
GET /search?service=products&name=ph
```

**Search by category:**

```http
GET /search?service=products&category=electronics
```

**Multiple filters (BONUS):**

```http
GET /search?service=products&name=lap&category=electronics
```

**Response:**

```json
{
  "service": "products",
  "count": 1,
  "data": [
    {
      "id": 2,
      "name": "Laptop",
      "category": "Electronics",
      "price": "899.99"
    }
  ]
}
```

---

### Users Service Examples

**Search by name:**

```http
GET /search?service=users&name=alice
```

**Search by email:**

```http
GET /search?service=users&email=bob
```

**Multiple filters (BONUS):**

```http
GET /search?service=users&name=bob&email=bob@example.com
```

**Response:**

```json
{
  "service": "users",
  "count": 1,
  "data": [
    {
      "id": 2,
      "name": "Bob",
      "email": "bob@example.com"
    }
  ]
}
```

---

### Posts Service Examples

**Search by title:**

```http
GET /search?service=posts&title=node
```

**Search by author:**

```http
GET /search?service=posts&author=alice
```

**Multiple filters (BONUS):**

```http
GET /search?service=posts&title=hello&author=alice
```

**Response:**

```json
{
  "service": "posts",
  "count": 1,
  "data": [
    {
      "id": 1,
      "title": "Hello World",
      "body": "This is my first post",
      "author": "Alice"
    }
  ]
}
```

---

### Error Responses

**Missing service parameter:**

```http
GET /search?name=phone
```

```json
{
  "error": "Please provide a valid \"service\" query param: products | users | posts"
}
```

**Invalid service name:**

```http
GET /search?service=orders&name=phone
```

```json
{
  "error": "Please provide a valid \"service\" query param: products | users | posts"
}
```

---

## ✅ Features

- [x] Search products, users, and posts from PostgreSQL database
- [x] Microservice architecture with independent ports per service
- [x] Single API Gateway entry point (port 2000)
- [x] Axios-based internal service communication
- [x] Separate router, controller, and service layers per microservice
- [x] Environment variables with `.env` (gitignored)
- [x] Auto-restart with nodemon on file save
- [x] Run all services with one command (`npm run dev`)
- [x] ⭐ BONUS: Partial match search using `ILIKE`
- [x] ⭐ BONUS: Multiple filters combined in single query
- [x] Proper error handling for missing/invalid params
- [x] Empty result handled gracefully (`count: 0, data: []`)

---

## 🧠 Key Concepts Learned

**Microservice Architecture** — each service is independently deployable with its own server, routes, and business logic. The gateway is the only public-facing endpoint.

**API Gateway Pattern** — the client never communicates directly with individual services. The gateway acts as a reverse proxy using Axios to forward requests internally.

**Parameterized SQL Queries** — using `$1, $2` placeholders with the `pg` library prevents SQL injection attacks.

**ILIKE for Partial Matching** — PostgreSQL's `ILIKE` operator enables case-insensitive substring matching, powering the partial search feature.

**Dynamic Query Building** — filters are applied conditionally using `WHERE 1=1` as a base, appending clauses only when parameters are provided.

---

## 📜 Scripts

| Command                  | Description                         |
| ------------------------ | ----------------------------------- |
| `npm run dev`            | Start all 4 services simultaneously |
| `npm run start:gateway`  | Start only the API Gateway          |
| `npm run start:products` | Start only the Products service     |
| `npm run start:users`    | Start only the Users service        |
| `npm run start:posts`    | Start only the Posts service        |

---

## 👤 Author

**GARVITA JAIN**

- GitHub: [garvitajain23](https://github.com/garvitajain23)

---

## 🏫 Internship

Built as part of **GOW AI Academy Backend Internship — Day 15**

Hashtags: `#gowaiacademy` `#rftinternship`
