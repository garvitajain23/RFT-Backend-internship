# 📋 Day 7 — Advanced To-Do API (Microservice Architecture)

> Built as part of the **GOW AI Academy Backend Internship** — Day 7 Project  
> A production-pattern REST API using Node.js, Express, and Microservice Architecture

---

## 🏗️ Architecture Overview

```
Client (Postman)
      ↓
API Gateway :7000        ← Single entry point for all requests
      ↓
Tasks Service :7001      ← Handles all task business logic
      ↓
In-Memory Store          ← State management (backend side)
```

---

## 📁 Folder Structure

```
todo-microservice/
│
├── .env                              # Environment variables (git ignored)
├── .gitignore                        # Ignores node_modules + .env
├── package.json                      # Single node_modules for all services
│
├── gateway/
│   └── index.js                      # API Gateway — proxies requests to services
│
└── services/
    └── tasks/
        ├── index.js                  # Boots Tasks Service on port 7001
        ├── routes/
        │   └── task.routes.js        # URL endpoint definitions
        ├── controller/
        │   └── task.controller.js    # Request/Response handling
        └── service/
            └── task.service.js       # Pure business logic + state management
```

---

## 🧠 Concepts Demonstrated

| Concept                        | Implementation                                               |
| ------------------------------ | ------------------------------------------------------------ |
| **Microservice Architecture**  | Gateway proxies to isolated task service                     |
| **State Management (Backend)** | In-memory array with persistent state during runtime         |
| **Partial Updates**            | `PATCH /tasks/:id/complete` — only updates `completed` field |
| **Separation of Concerns**     | Route → Controller → Service layers                          |
| **API Gateway Pattern**        | Single entry point on port 7000                              |
| **Environment Config**         | `.env` file with `dotenv`                                    |
| **Auto Restart**               | `nodemon` + `concurrently` for dev workflow                  |

---

## ⚙️ Tech Stack

- **Runtime** — Node.js v24
- **Framework** — Express.js v5
- **HTTP Proxy** — Axios (manual gateway forwarding)
- **Dev Tools** — Nodemon, Concurrently
- **Config** — dotenv

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd todo-microservice
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
GATEWAY_PORT=7000
TASKS_SERVICE_PORT=7001
TASKS_SERVICE_URL=http://localhost:7001
```

### 4. Start the server

```bash
npm start
```

You should see:

```
🌐 API Gateway running on http://localhost:7000
📋 Tasks Service running on http://localhost:7001
```

---

## 📡 API Endpoints

All requests go through the **API Gateway on port 7000**

### Task Structure

```json
{
  "id": 1,
  "title": "Learn Backend",
  "completed": false
}
```

### Endpoints

| Method   | Endpoint                  | Description            | Body                 |
| -------- | ------------------------- | ---------------------- | -------------------- |
| `GET`    | `/tasks`                  | Get all tasks          | —                    |
| `GET`    | `/tasks?status=completed` | Filter completed tasks | —                    |
| `GET`    | `/tasks?status=pending`   | Filter pending tasks   | —                    |
| `GET`    | `/tasks/:id`              | Get single task        | —                    |
| `POST`   | `/tasks`                  | Add new task           | `{ "title": "..." }` |
| `PATCH`  | `/tasks/:id/complete`     | Mark task as completed | —                    |
| `DELETE` | `/tasks/:id`              | Delete a task          | —                    |

---

## 🧪 Example Requests

### Add a task

```bash
POST http://localhost:7000/tasks
Content-Type: application/json

{
  "title": "Learn Backend"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Learn Backend",
    "completed": false
  }
}
```

### Mark as completed (Partial Update)

```bash
PATCH http://localhost:7000/tasks/1/complete
```

### Filter by status (Bonus)

```bash
GET http://localhost:7000/tasks?status=completed
GET http://localhost:7000/tasks?status=pending
```

---

## 📌 Rules Followed

- ✅ Daily coding task completed before 11 PM
- ✅ Code pushed to GitHub with proper commit messages
- ✅ LinkedIn post with day number, learnings, and hashtags

---

## 🔗 Connect

**Hashtags:** `#gowaiacademy` `#rftinternship` `#nodejs` `#expressjs` `#microservices` `#backenddev`
