# 🚀 Task Manager Microservices API
> GOW AI Academy RFT — Backend Internship Day 20 | Final Capstone Project

---

## 📌 Project Overview

A production-ready **Task Manager REST API** built with **Microservices Architecture** using Node.js, Express, MongoDB, and Axios for inter-service communication.

---

# 🏗️ Architecture

```text
Client Request
      ↓
API Gateway (Port 3000)        ← Single entry point
      ↓ (Axios forwards)

┌─────────────────────────────────────┐
│  Auth Service    (Port 3001)       │ → Register, Login, Verify Token
│  Task Service    (Port 3002)       │ → CRUD Tasks
│  User Service    (Port 3003)       │ → Profile Management
└─────────────────────────────────────┘
      ↓
MongoDB Database
```

---

# 📁 Folder Structure

```text
task-manager-microservices/
│
├── .env
├── package.json
│
├── shared/
│   ├── logger.js
│   └── authMiddleware.js
│
├── gateway/
│   ├── server.js
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
│
└── services/
    │
    ├── auth-service/
    │   ├── server.js
    │   ├── userModel.js
    │   ├── authController.js
    │   ├── validateMiddleware.js
    │   └── authRoutes.js
    │
    ├── task-service/
    │   ├── server.js
    │   ├── taskModel.js
    │   ├── taskController.js
    │   └── taskRoutes.js
    │
    └── user-service/
        ├── server.js
        ├── userModel.js
        ├── userController.js
        └── userRoutes.js
```

---

# ⚙️ Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js + Express | Server & REST API |
| MongoDB + Mongoose | Database & ODM |
| Axios | Inter-service communication |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Winston | Logging |
| express-validator | Input validation |
| concurrently | Run all services together |
| nodemon | Auto-restart on changes |

---

# 🚀 Getting Started

## 📌 Prerequisites

- Node.js v18+
- MongoDB running locally

---

# 📦 Installation

```bash
# Clone the repo
git clone https://github.com/garvitajain23/RFT-Backend-internship/tree/main/Day-20.git

# Move into project folder
cd task-manager-microservices

# Install dependencies
npm install

# Start MongoDB
mongod
```

---



# ▶️ Run All Services

```bash
# Run all services together
npm run start:all
```

## Run Individually

```bash
npm run dev:gateway
npm run dev:auth
npm run dev:task
npm run dev:user
```

---

# 🔗 API Endpoints

All requests go through:

```text
http://localhost:3000
```

---

# 🔐 Auth Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login & get token | ❌ |

---

# ✅ Task Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/tasks` | Get my tasks | ✅ |
| GET | `/api/tasks?status=todo` | Filter by status | ✅ |
| GET | `/api/tasks?priority=high` | Filter by priority | ✅ |
| GET | `/api/tasks/:id` | Get single task | ✅ |
| POST | `/api/tasks` | Create task | ✅ |
| PUT | `/api/tasks/:id` | Update task | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |
| GET | `/api/tasks/all` | Get all tasks (Admin) | ✅ 👑 |

---

# 👤 User Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/profile` | Get my profile | ✅ |
| PUT | `/api/users/profile` | Update profile | ✅ |
| GET | `/api/users` | Get all users (Admin) | ✅ 👑 |

---

# 📝 Request Examples

## Register

```json
POST /api/auth/register

{
  "name": "Yogender",
  "email": "yogender@test.com",
  "password": "123456"
}
```

---

## Login

```json
POST /api/auth/login

{
  "email": "yogender@test.com",
  "password": "123456"
}
```

---

## Create Task

```json
POST /api/tasks

Authorization: Bearer <token>

{
  "title": "Complete Day 20 Project",
  "description": "Build microservices task manager",
  "status": "todo",
  "priority": "high",
  "dueDate": "2026-06-01"
}
```

---

## Update Task

```json
PUT /api/tasks/:id

Authorization: Bearer <token>

{
  "status": "done"
}
```

---

# 🔒 Authentication Flow

```text
User registers/logs in
        ↓
Auth Service returns JWT token
        ↓
Client sends token in header:
Authorization: Bearer <token>
        ↓
Gateway forwards request + token
        ↓
Target service calls Auth Service /api/auth/verify
        ↓
Auth Service validates token
        ↓
Returns user data
        ↓
Service processes request using req.user
```

---

# 👑 Role-Based Access

| Route | user | admin |
|------|------|-------|
| CRUD own tasks | ✅ | ✅ |
| GET /api/tasks/all | ❌ | ✅ |
| GET /api/users | ❌ | ✅ |

---

# 📊 Health Checks

```bash
GET http://localhost:3000/health
GET http://localhost:3001/health
GET http://localhost:3002/health
GET http://localhost:3003/health
```

---

# 👨‍💻 Author

**GARVITA JAIN**  
GOW AI Academy RFT Backend Internship

- Day 20 — Final Capstone Project


---

# 🏷️ Tags

```text
#gowaiacademy
#rftinternship
#nodejs
#microservices
#mongodb
#expressjs
```
