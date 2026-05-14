# 📋 Form Validation API — Microservice Architecture

> **Day 9 Project | GOW AI Academy Backend Internship**  
> Built with Node.js, Express, and Axios following Microservice Architecture principles.

---

## 📌 Project Overview

A **Form Validation REST API** that accepts user input (`name`, `email`, `age`), validates all fields, and returns either a success response or **all errors at once** — built using a clean microservice pattern with an API Gateway as the single entry point.

---

## 🏗️ Architecture

```
CLIENT / POSTMAN
      │
      ▼
┌─────────────────────┐
│   API Gateway       │  ← Port 9000 (Single Entry Point)
│   gateway/          │
└────────┬────────────┘
         │ forwards via axios
         ▼
┌─────────────────────┐
│   User Service      │  ← Port 9001
│   services/         │
│   user-service/     │
│   ├── routes/       │
│   ├── controllers/  │
│   └── services/     │
└─────────────────────┘
```

---

## 📁 Folder Structure

```
form-validation-microservices/
│
├── gateway/                        ← API Gateway (port 9000)
│   ├── index.js                    ← Entry point, proxies requests
│   ├── package.json
│   └── .env                        ← gitignored
│
├── services/
│   └── user-service/               ← Handles all user validation (port 9001)
│       ├── routes/
│       │   └── userRoute.js        ← Defines POST /api/user/submit
│       ├── controllers/
│       │   └── userController.js   ← Handles req/res logic
│       ├── services/
│       │   └── userService.js      ← Core validation logic
│       ├── index.js                ← Service entry point
│       ├── package.json
│       └── .env                    ← gitignored
│
└── .gitignore
```

---

## ⚙️ Concepts Practiced

| Concept                       | Implementation                                |
| ----------------------------- | --------------------------------------------- |
| **Microservice Architecture** | Gateway + independent User Service            |
| **API Gateway**               | Single client-facing entry point on port 9000 |
| **Input Validation**          | Name, Email, Age with detailed rules          |
| **Error Responses**           | All errors returned at once (Bonus ✅)        |
| **Defensive Programming**     | Null checks, type checks, edge cases          |
| **Nodemon**                   | Auto-restart on file save                     |
| **dotenv**                    | Environment variables via `.env`              |
| **Gitignore**                 | `.env` and `node_modules` excluded            |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm
- Postman (for testing)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/form-validation-microservices.git
cd form-validation-microservices
```

**2. Install dependencies for each service**

```bash
# Gateway
cd gateway
npm install

# User Service
cd ../services/user-service
npm install
```

**3. Set up environment variables**

Create `.env` inside `gateway/`:

```env
PORT=9000
USER_SERVICE_URL=http://localhost:9001
```

Create `.env` inside `services/user-service/`:

```env
PORT=9001
```

### Running the Services

Open **two separate terminals**:

**Terminal 1 — User Service:**

```bash
cd services/user-service
npm run dev
```

**Terminal 2 — API Gateway:**

```bash
cd gateway
npm run dev
```

You should see:

```
👤 User Service running on http://localhost:9001
🚀 API Gateway running on http://localhost:9000
```

---

## 📡 API Reference

### Base URL

```
http://localhost:9000
```

### Endpoints

#### `GET /health`

Check if the API Gateway is running.

**Response:**

```json
{
  "status": "API Gateway running",
  "port": 9000
}
```

---

#### `GET /api/user/health`

Check if the User Service is running.

**Response:**

```json
{
  "status": "User Service running",
  "port": 9001
}
```

---

#### `POST /api/user/submit`

Submit and validate user form data.

**Request Body:**

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "age": 21
}
```

**Success Response — 200 OK:**

```json
{
  "success": true,
  "message": "User form submitted successfully ✅",
  "data": {
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "age": 21
  }
}
```

**Validation Error Response — 422 Unprocessable Entity:**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name is required and cannot be empty",
    "Email must be a valid format (e.g. user@example.com)",
    "Age must be at least 5"
  ]
}
```

**Missing Fields Response — 400 Bad Request:**

```json
{
  "success": false,
  "errors": ["Request body must include name, email, and age"]
}
```

---

## ✅ Validation Rules

### Name

| Rule       | Detail                                     |
| ---------- | ------------------------------------------ |
| Required   | Cannot be missing or empty                 |
| Min length | At least 2 characters                      |
| Max length | No more than 50 characters                 |
| Format     | Letters, spaces, hyphens, apostrophes only |

### Email

| Rule     | Detail                                |
| -------- | ------------------------------------- |
| Required | Cannot be missing or empty            |
| Format   | Must follow `user@domain.com` pattern |

### Age

| Rule     | Detail                     |
| -------- | -------------------------- |
| Required | Cannot be missing or empty |
| Type     | Must be a whole number     |
| Min      | At least 5                 |
| Max      | No more than 100           |

---

## 🧪 Test Cases

| Test              | Input                                      | Expected Status |
| ----------------- | ------------------------------------------ | --------------- |
| All valid         | `name: "Rahul", email: "r@r.com", age: 21` | 200 ✅          |
| All invalid       | `name: "", email: "bad", age: 2`           | 422 ❌          |
| Missing fields    | `{ "name": "Rahul" }`                      | 400 ❌          |
| Age too high      | `age: 150`                                 | 422 ❌          |
| Age decimal       | `age: 21.5`                                | 422 ❌          |
| Name with numbers | `name: "Rahul123"`                         | 422 ❌          |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **HTTP Client:** Axios (gateway → service forwarding)
- **Dev Tool:** Nodemon
- **Config:** dotenv

---

## 📝 Scripts

| Command       | Description                               |
| ------------- | ----------------------------------------- |
| `npm run dev` | Start with nodemon (auto-restart on save) |
| `npm start`   | Start with node (production)              |

---

## 🔐 Environment Variables

| Variable           | Service      | Description                       |
| ------------------ | ------------ | --------------------------------- |
| `PORT`             | Gateway      | Gateway port (default: 9000)      |
| `USER_SERVICE_URL` | Gateway      | URL of the User Service           |
| `PORT`             | User Service | User service port (default: 9001) |

> ⚠️ Never commit `.env` files. They are listed in `.gitignore`.

---

## 👤 Author

**Garvita Jain**  
GOW AI Academy — Backend Internship  
GitHub: [@your-username](https://github.com/garvitajain23)

---

## 🏷️ Tags

`#gowaiacademy` `#rftinternship` `#nodejs` `#expressjs` `#microservices` `#backenddev` `#formvalidation`
