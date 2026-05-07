# Day 4 — Random Data API 🚀

### GOW AI Academy | Backend Internship

---

## 📌 Project Overview

A **Random Data API** built using **Microservice Architecture** with Node.js and Express.js.
Each service runs independently on its own port and is accessed through a central **API Gateway**.

---

## 🏗️ Architecture

```
CLIENT (Browser/Postman)
        |
        ▼
  [API GATEWAY]  → Port 9000
        |
   ┌────┼────┐
   ▼    ▼    ▼
[Quote] [Joke] [Fact]
 :9001   :9002  :9003
```

---

## 📁 Folder Structure

```
day4-random-api/
│
├── api-gateway/
│   ├── index.js                  ← Entry point only
│   ├── package.json
│   └── routes/
│       └── gateway.routes.js     ← All gateway routing logic
│
├── quote-service/
│   ├── index.js                  ← Entry point only
│   ├── package.json
│   ├── routes/
│   │   └── quote.routes.js       ← Route definitions
│   ├── controllers/
│   │   └── quote.controller.js   ← Business logic
│   └── data/
│       └── quotes.data.js        ← Data layer
│
├── joke-service/
│   ├── index.js
│   ├── package.json
│   ├── routes/
│   │   └── joke.routes.js
│   ├── controllers/
│   │   └── joke.controller.js
│   └── data/
│       └── jokes.data.js
│
└── fact-service/
    ├── index.js
    ├── package.json
    ├── routes/
    │   └── fact.routes.js
    ├── controllers/
    │   └── fact.controller.js
    └── data/
        └── facts.data.js
```

---

## 🧠 Concepts Used

| Concept                       | Description                                    |
| ----------------------------- | ---------------------------------------------- |
| **Microservice Architecture** | Each service runs independently                |
| **API Gateway**               | Single entry point that routes to services     |
| **Dynamic Response**          | `Math.random()` picks different data each time |
| **No Repetition Logic**       | Tracks recent responses to avoid repeats       |
| **Single Responsibility**     | Each file has one job only                     |
| **MVC Pattern**               | Separated routes, controllers, and data layers |

---

## 🔌 API Endpoints

### Via API Gateway (Recommended)

| Method | Endpoint                      | Description                        |
| ------ | ----------------------------- | ---------------------------------- |
| GET    | `http://localhost:9000/`      | Welcome message & available routes |
| GET    | `http://localhost:9000/quote` | Returns a random quote             |
| GET    | `http://localhost:9000/joke`  | Returns a random joke              |
| GET    | `http://localhost:9000/fact`  | Returns a random fact ⭐ Bonus     |

### Direct Service Access

| Method | Endpoint                      | Description            |
| ------ | ----------------------------- | ---------------------- |
| GET    | `http://localhost:9001/quote` | Quote Service directly |
| GET    | `http://localhost:9002/joke`  | Joke Service directly  |
| GET    | `http://localhost:9003/fact`  | Fact Service directly  |

---

## 📦 Sample Responses

**GET /quote**

```json
{
  "success": true,
  "type": "quote",
  "data": {
    "quote": "The only way to do great work is to love what you do.",
    "author": "Steve Jobs"
  }
}
```

**GET /joke**

```json
{
  "success": true,
  "type": "joke",
  "data": {
    "setup": "Why do programmers prefer dark mode?",
    "punchline": "Because light attracts bugs!"
  }
}
```

**GET /fact**

```json
{
  "success": true,
  "type": "fact",
  "data": {
    "fact": "Python was named after Monty Python, not the snake."
  }
}
```

**404 Response**

```json
{
  "success": false,
  "message": "Route /unknown not found",
  "available": ["/quote", "/joke", "/fact"]
}
```

**503 Response (Service Down)**

```json
{
  "success": false,
  "message": "Quote Service unavailable"
}
```

---

## ⚙️ Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **HTTP Client** — Axios (used in API Gateway)
- **Dev Tool** — Nodemon (auto-restart on save)

---

## 🚀 How to Run

### 1. Install Dependencies

```bash
cd quote-service && npm install && cd ..
cd joke-service  && npm install && cd ..
cd fact-service  && npm install && cd ..
cd api-gateway   && npm install && cd ..
```

### 2. Start All Services (4 Separate Terminals)

```bash
# Terminal 1
cd quote-service && npm run dev

# Terminal 2
cd joke-service && npm run dev

# Terminal 3
cd fact-service && npm run dev

# Terminal 4
cd api-gateway && npm run dev
```

### 3. Test in Postman or Browser

```
http://localhost:9000/quote
http://localhost:9000/joke
http://localhost:9000/fact
```

---

## ⭐ Bonus Features

- ✅ `/fact` endpoint added
- ✅ No repetition logic — last 3 responses are tracked to avoid showing same data consecutively
- ✅ Error handling — graceful 503 response when a service is down
- ✅ 404 handler — shows available routes on wrong endpoint

---

## 👨‍💻 Author

**GOW AI Academy — Backend Internship**
`#gowaiacademy` `#rftinternship`
