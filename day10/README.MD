# 📝 Notes API — Microservice Architecture

> **Day 10 Project** | GOW AI Academy Backend Internship  
> A fully functional Notes CRUD API built with microservice architecture, API Gateway pattern, and Express.js.

---

## 🏗️ Architecture Overview

```
CLIENT (Postman / Frontend)
         │
         ▼
  API GATEWAY :2000        ← Single entry point for all requests
         │
         ▼
  NOTES SERVICE :2001      ← Handles all notes business logic
```

All client requests go through **port 2000 only**. The gateway forwards them internally to the appropriate service. The client never talks directly to any microservice.

---

## 📁 Project Structure

```
notes-api/
├── gateway/                        ← API Gateway (port 2000)
│   ├── src/
│   │   └── index.js                ← Axios-based request forwarder
│   ├── .env                        ← PORT, NOTES_SERVICE_URL (gitignored)
│   └── package.json
│
├── services/
│   └── notes-service/              ← Notes Microservice (port 2001)
│       ├── src/
│       │   ├── routes/
│       │   │   └── notes.routes.js     ← URL definitions
│       │   ├── controllers/
│       │   │   └── notes.controller.js ← Request/Response handling
│       │   ├── services/
│       │   │   └── notes.service.js    ← Business logic (pure functions)
│       │   └── index.js                ← Service entry point
│       ├── .env                        ← PORT (gitignored)
│       └── package.json
│
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm
- Postman (for testing)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/garvitajain23RNAME/R.git
cd notes-api
```

**2. Install dependencies for Gateway**

```bash
cd gateway
npm install
```

**3. Install dependencies for Notes Service**

```bash
cd ../services/notes-service
npm install
```

**4. Create `.env` files**

`gateway/.env`

```
PORT=2000
NOTES_SERVICE_URL=http://localhost:2001
```

`services/notes-service/.env`

```
PORT=2001
```

### Running the App

Open **two terminals**:

**Terminal 1 — Notes Service:**

```bash
cd services/notes-service
npm run dev
```

**Terminal 2 — Gateway:**

```bash
cd gateway
npm run dev
```

You should see:

```
📝 Notes Service running on http://localhost:2001
🚀 API Gateway running on http://localhost:2000
```

---

## 📡 API Endpoints

All requests go through **`http://localhost:2000`**

| Method   | Endpoint                | Description               | Body                 |
| -------- | ----------------------- | ------------------------- | -------------------- |
| `GET`    | `/notes`                | Get all notes             | —                    |
| `GET`    | `/notes?search=keyword` | Search notes by keyword   | —                    |
| `GET`    | `/notes?sortBy=title`   | Get notes sorted by title | —                    |
| `GET`    | `/notes/:id`            | Get a single note by ID   | —                    |
| `POST`   | `/notes`                | Add a new note            | `{ title, content }` |
| `PUT`    | `/notes/:id`            | Update a note             | `{ title, content }` |
| `DELETE` | `/notes/:id`            | Delete a note             | —                    |

---

## 📦 Note Structure

```json
{
  "id": "uuid-auto-generated",
  "title": "Meeting",
  "content": "Discuss project"
}
```

---

## 🧪 Example Requests

### Add a Note

```bash
curl -X POST http://localhost:2000/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "Meeting", "content": "Discuss project"}'
```

### Get All Notes

```bash
curl http://localhost:2000/notes
```

### Search Notes

```bash
curl http://localhost:2000/notes?search=meeting
```

### Update a Note

```bash
curl -X PUT http://localhost:2000/notes/YOUR-ID-HERE \
  -H "Content-Type: application/json" \
  -d '{"title": "Meeting Updated", "content": "Discuss deployment"}'
```

### Delete a Note

```bash
curl -X DELETE http://localhost:2000/notes/YOUR-ID-HERE
```

---

## ✅ Concepts Covered

- **Microservice Architecture** — each service is independent with its own port
- **API Gateway Pattern** — single entry point, internal routing hidden from client
- **Separation of Concerns** — routes → controller → service layers
- **CRUD Operations** — Create, Read, Update, Delete
- **Input Validation** — returns proper error messages for missing fields
- **Bonus: Search** — filter notes by keyword in title or content
- **Bonus: Sort** — sort notes alphabetically by title
- **Environment Variables** — `.env` files for config, never hardcoded
- **Nodemon** — auto-restart on file save during development

---

## 🛠️ Tech Stack

| Tool          | Purpose                         |
| ------------- | ------------------------------- |
| Node.js       | Runtime                         |
| Express.js v5 | Web framework                   |
| Axios         | HTTP forwarding in gateway      |
| UUID          | Auto-generate note IDs          |
| Dotenv        | Environment variable management |
| Nodemon       | Dev auto-restart                |

---

## 👨‍💻 Author

**GARVITA JAIN**  
GOW AI Academy — Backend Internship  
Day 10 | #gowaiacademy #rftinternship

---

## 📄 License

MIT
