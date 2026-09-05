# 🔔 Notification Service API

A microservice-based Notification backend engine built with the MERN stack (Node.js, Express, MongoDB) following the MVC pattern.
Built as part of Day 26 — Backend Internship Journey at RFT.

---

## 📌 Overview

This project implements a multi-channel notification dispatch system using **microservices architecture**. Each service runs independently on a dedicated port and communicates internally over HTTP via Axios.

### Core Features
- Direct Notification Dispatch (In-App, Push)
- Notification History per User
- Mark Notifications as Read
- Delete Notifications
- User Notification Preferences Management
- System-Wide Broadcast Notifications

### Bonus Features
- Automated Scheduled Notifications (via `node-cron`)
- Push Notification Gateway Dispatch Simulation

---

## 🏗️ Architecture & Ports

| Service | Port | Base URL | Responsibility |
|---|---|---|---|
| **User Service** | `5000` | `http://localhost:5000/api/users` | Registration, user fetching, and notification preference controls |
| **Notification Core Service** | `5001` | `http://localhost:5001/api/notifications` | Orchestration, persistence, read/delete actions, broadcast, and scheduler |
| **Push Notification Service** | `5003` | `http://localhost:5003/api/push` | Device token payload processing and push gateway dispatch |

---

## 📁 Folder Structure

notification-service-api/
├── node_modules/
├── config/
│   └── db.js
├── middleware/
│   └── authMiddleware.js
├── user-service/
│   ├── user.model.js
│   ├── user.controller.js
│   ├── user.routes.js
│   └── user.server.js
├── notification-core-service/
│   ├── notification.model.js
│   ├── notification.controller.js
│   ├── notification.routes.js
│   └── notification.server.js
├── push-service/
│   ├── push.controller.js
│   ├── push.routes.js
│   └── push.server.js
├── .env
├── .gitignore
└── package.json

---

## ⚙️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Job Scheduler:** node-cron
- **Inter-service Communication:** Axios
- **Dev Tools:** Nodemon, Concurrently

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

MONGO_URI=mongodb://127.0.0.1:27017/notification_system
JWT_SECRET=superSecretJWTKey_notification_2026

# Ports
USER_SERVICE_PORT=5000
NOTIFICATION_SERVICE_PORT=5001
PUSH_SERVICE_PORT=5003

# Internal Service URLs
USER_SERVICE_URL=http://localhost:5000/api/users
NOTIFICATION_SERVICE_URL=http://localhost:5001/api/notifications
PUSH_SERVICE_URL=http://localhost:5003/api/push

---

## 🚀 Installation & Setup

### 1. Clone the repository
clone repo using git clone
cd notification-service-api

### 2. Install dependencies
npm install

### 3. Ensure MongoDB is running
Ensure your local MongoDB daemon is running on mongodb://127.0.0.1:27017.

### 4. Run all microservices concurrently
npm run dev

### Run services individually (optional)
npm run user
npm run notification
npm run push

---

## 📡 API Endpoints

### 👤 User Service (http://localhost:5000/api/users)
| Method | Endpoint | Description |
|---|---|---|
| POST | /register | Register a new user |
| GET | / | Fetch all users |
| GET | /:id | Fetch user by ID |
| PUT | /:id/preferences | Update in-app and push notification preferences |

### 🔔 Notification Core Service (http://localhost:5001/api/notifications)
| Method | Endpoint | Description |
|---|---|---|
| POST | /send | Dispatch immediate or scheduled notification |
| POST | /broadcast | Broadcast notification to all eligible users |
| GET | /history/:userId | Get full notification history for a user |
| PATCH | /:id/read | Mark a notification as read |
| DELETE | /:id | Delete a notification record |

### 📲 Push Service (http://localhost:5003/api/push)
| Method | Endpoint | Description |
|---|---|---|
| POST | /send | Direct push payload gateway dispatch |

---

## 🧪 Sample Payloads

### 1. Send Notification (Immediate)
POST http://localhost:5001/api/notifications/send
{
  "userId": "66b1a2b3c4d5e6f7a8b9c0d1",
  "title": "Account Credit",
  "message": "You received 100 reward points!",
  "channel": "IN_APP"
}

### 2. Schedule Notification
POST http://localhost:5001/api/notifications/send
{
  "userId": "66b1a2b3c4d5e6f7a8b9c0d1",
  "title": "Subscription Renewal",
  "message": "Your monthly plan renews tomorrow.",
  "channel": "PUSH",
  "scheduledAt": "2026-09-01T09:00:00.000Z"
}

### 3. Update Preferences
PUT http://localhost:5000/api/users/66b1a2b3c4d5e6f7a8b9c0d1/preferences
{
  "inAppEnabled": true,
  "pushEnabled": false
}

---

## 🛡️ Business Logic & Validations

- **Preference Enforcement:** Before dispatching an in-app or push alert, the core service verifies that the recipient has enabled the corresponding channel.
- **Automated Scheduling:** A background cron worker checks every minute for pending scheduled notifications and triggers dispatch automatically when due.
- **Fail-Safe Broadcasts:** The broadcast endpoint filters recipients dynamically against their stored preferences before writing to the database.

---

## 👨‍💻 Author
**Garvita jain**
Built as part of the **Day 26 Backend Internship Challenge** — Notification Service API using MERN + Microservices + MVC.

---

## 📄 License

This project is licensed under the MIT License for educational and internship purposes.
