# 🚀 Day 5 — API Tester Project (Microservice Architecture)

> GOW AI Academy × Ruhil Future Technologies — Backend Internship

---

## 📐 Architecture

```
CLIENT (Browser / Postman)
        |
        ▼
  API GATEWAY :2000          ← Your only entry point
        |
   ┌────┼────┬──────────┐
   ▼    ▼    ▼          ▼
Hello  Calc  Users    Quote
:2001  :2002  :2003   :2004
```

---

## 📁 Folder Structure

```
day5-microservices/
├── gateway/
│   └── index.js              ← API Gateway (port 2000)
├── services/
│   ├── hello-service/
│   │   ├── service.js        ← Business logic
│   │   ├── controller.js     ← Request/Response handling
│   │   ├── routes.js         ← URL mapping
│   │   └── index.js          ← Server entry (port 2001)
│   ├── calculate-service/    ← port 2002
│   ├── users-service/        ← port 2003
│   └── quote-service/        ← port 2004
├── .env                      ← Port config (NEVER push to GitHub!)
├── .gitignore
└── package.json
```

---

## ⚙️ Setup & Installation

```bash
# 1. Install all dependencies
npm install

# 2. Start ALL services at once
npm run dev
```

---

## 🌐 API Endpoints (all through Gateway :2000)

### Hello Service

| Method | URL                 | Description                 |
| ------ | ------------------- | --------------------------- |
| GET    | `/hello`            | Get a random greeting       |
| GET    | `/hello?name=Rahul` | Get a personalized greeting |

### Calculate Service

| Method | URL                                            | Description         |
| ------ | ---------------------------------------------- | ------------------- |
| GET    | `/calculate?num1=10&num2=3&operation=add`      | Add numbers         |
| GET    | `/calculate?num1=10&num2=3&operation=subtract` | Subtract            |
| GET    | `/calculate?num1=10&num2=3&operation=multiply` | Multiply            |
| GET    | `/calculate?num1=10&num2=3&operation=divide`   | Divide              |
| GET    | `/calculate?num1=10&num2=3&operation=modulo`   | Modulo              |
| GET    | `/calculate/operations`                        | List all operations |

### Users Service

| Method | URL        | Body                     | Description    |
| ------ | ---------- | ------------------------ | -------------- |
| GET    | `/users`   | —                        | Get all users  |
| GET    | `/users/1` | —                        | Get user by ID |
| POST   | `/users`   | `{ name, email, role? }` | Create user    |
| DELETE | `/users/1` | —                        | Delete user    |

### Quote Service

| Method | URL                           | Description         |
| ------ | ----------------------------- | ------------------- |
| GET    | `/quote`                      | Get a random quote  |
| GET    | `/quote?category=programming` | Quote by category   |
| GET    | `/quote/categories`           | List all categories |

---

## 🧪 Test in Postman

Import these URLs and test:

- `GET http://localhost:2000/hello?name=YourName`
- `GET http://localhost:2000/calculate?num1=15&num2=4&operation=divide`
- `POST http://localhost:2000/users` with JSON body
- `GET http://localhost:2000/quote?category=motivation`

---

## 🏷️ Hashtags

`#gowaiacademy` `#rftinternship`
