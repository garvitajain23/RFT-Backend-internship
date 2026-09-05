# 🔗 URL Shortener API

A backend project built as part of a RFT  Backend Internship Journey (Day 25) — a full-featured URL Shortener REST API built with Node.js, Express, and MongoDB, following MVC + Service Layer architecture.

---

## 📌 Features

### Core
- Generate short URLs from long URLs
- Redirect short URL to original URL
- Track total clicks per short URL
- Store creation date automatically
- Delete expired URLs (manual + automatic via cron)

### Bonus
- Custom short URL alias
- QR Code generation for any short URL
- Analytics endpoint (clicks, created date, expiry status)
- Rate limiting to prevent abuse

---

## 🏗️ Architecture

This project follows an MVC + Service Layer pattern as a modular monolith:

Request → Route → Controller → Service → Model → MongoDB

- Routes — define API endpoints
- Controllers — handle HTTP req/res, delegate logic to services
- Services — contain business logic (short ID generation, expiry checks, click tracking)
- Models — Mongoose schemas for MongoDB
- Middlewares — rate limiting, centralized error handling
- Utils — reusable helpers (short ID generator, QR code generator)

---

## 📂 Folder Structure

url-shortener/

├── package.json
├── .env
├── .gitignore
├── server.js
└── src/
    ├── config/
    │   ├── db.js
    │   └── constants.js
    ├── models/
    │   └── Url.model.js
    ├── controllers/
    │   └── url.controller.js
    ├── services/
    │   └── url.service.js
    ├── routes/
    │   └── url.routes.js
    ├── middlewares/
    │   ├── rateLimiter.js
    │   └── errorHandler.js
    └── utils/
        ├── generateShortId.js
        └── qrGenerator.js

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Mongoose ODM) |
| Short ID Generation | nanoid |
| QR Code | qrcode |
| Rate Limiting | express-rate-limit |
| Scheduled Cleanup | node-cron |
| Dev Tooling | nodemon |

---

## ⚙️ Installation & Setup

### 1. Clone the repository

    git clone https://github.com/garvitajain23/RFT-Backend-internship/tree/main/Day-25
    cd url-shortener

### 2. Install dependencies

    npm install

### 3. Configure environment variables

Create a .env file in the root directory:

    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/urlshortener
    BASE_URL=http://localhost:5000
    NODE_ENV=development

### 4. Start MongoDB

Make sure MongoDB is running locally, or update MONGO_URI to point to a MongoDB Atlas cluster.

### 5. Run the server

    # Development (auto-restart on changes)
    npm run dev

    # Production
    npm start

Server will start at:

    http://localhost:5000

---

## 📡 API Endpoints

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Check if the server is running |

### URL Shortening

| Method | Endpoint | Description |
|---|---|---|
| POST | /shorten | Create a short URL (with optional custom alias & expiry) |
| GET | /:shortId | Redirect to the original URL (increments click count) |
| DELETE | /:shortId | Delete a specific short URL |

### Analytics & QR

| Method | Endpoint | Description |
|---|---|---|
| GET | /analytics/:shortId | Get click count, creation date, expiry status |
| GET | /qrcode/:shortId | Generate a QR code (base64 PNG) for the short URL |

### Maintenance

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /cleanup/expired | Manually delete all expired URLs |

Expired URLs are also auto-deleted daily at midnight via a scheduled cron job.

---

## 📥 Request / Response Examples

### Create Short URL

Request:

    POST /shorten
    Content-Type: application/json

    {
      "originalUrl": "https://github.com",
      "customAlias": "gh",
      "expiryDays": 30
    }

Response:

    {
      "success": true,
      "data": {
        "shortUrl": "http://localhost:5000/gh",
        "originalUrl": "https://github.com",
        "shortId": "gh",
        "customAlias": true,
        "clicks": 0,
        "expiresAt": "2026-09-23T10:00:00.000Z",
        "createdAt": "2026-08-24T10:00:00.000Z"
      }
    }

### Get Analytics

Request:

    GET /analytics/gh

Response:

    {
      "success": true,
      "data": {
        "shortId": "gh",
        "originalUrl": "https://github.com",
        "clicks": 3,
        "createdAt": "2026-08-24T10:00:00.000Z",
        "expiresAt": "2026-09-23T10:00:00.000Z",
        "isExpired": false
      }
    }

---

## 🧪 Testing

This API was tested using Postman.

Key test cases covered:

- Creating short URLs (auto-generated & custom alias)
- Duplicate custom alias rejection
- Redirect behavior & click tracking
- Analytics retrieval
- QR code generation & rendering
- 404 handling for non-existent short IDs
- Expired URL cleanup
- Rate limit enforcement (100 requests / 15 min)

---

## 🔒 Rate Limiting

All shorten & redirect requests are rate-limited to 100 requests per 15-minute window per IP to prevent abuse.

---

## 🙋 Author

Built by Garvita Jain — Day 25 of Backend Internship at RFT  Journey.
