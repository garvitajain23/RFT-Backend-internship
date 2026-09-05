# 💰 Digital Wallet API

A microservice-based Digital Wallet backend built with the MERN stack (Node.js, Express, MongoDB).
Built as part of Day 27 — Backend Internship Journey at RFT.

---

## 📌 Overview

This project implements a Digital Wallet system using **microservice architecture**, where each service runs independently on its own port and communicates with other services via REST APIs (using Axios).

### Core Features
- User Wallet Creation
- Add Money
- Send Money
- Transaction History
- Wallet Balance
- Beneficiary Management

### Bonus Features
- Transaction PIN Verification
- Daily Transaction Limits
- Transaction Analytics API

---

## 🏗️ Architecture

| Service              | Port | Responsibility                                      |
|----------------------|------|------------------------------------------------------|
| user-service         | 5000 | Register/Login, Transaction PIN set & verify         |
| wallet-service       | 5001 | Wallet creation, Balance, Add Money, Debit/Credit     |
| transaction-service  | 5002 | Send Money, Transaction History, Analytics            |
| beneficiary-service  | 5003 | Beneficiary CRUD                                      |

Each service follows an MVC-style separation (Model / Controller / Routes / Server) within its own folder, and services communicate with each other over HTTP using Axios.

---

## 📁 Folder Structure

digital-wallet-api/
├── node_modules/
├── package.json
├── .env
├── .gitignore
├── config/
│   └── db.js
├── middleware/
│   ├── authMiddleware.js
│   └── pinMiddleware.js
├── user-service/
│   ├── user.model.js
│   ├── user.controller.js
│   ├── user.routes.js
│   └── user.server.js
├── wallet-service/
│   ├── wallet.model.js
│   ├── wallet.controller.js
│   ├── wallet.routes.js
│   └── wallet.server.js
├── transaction-service/
│   ├── transaction.model.js
│   ├── transaction.controller.js
│   ├── transaction.routes.js
│   └── transaction.server.js
└── beneficiary-service/
    ├── beneficiary.model.js
    ├── beneficiary.controller.js
    ├── beneficiary.routes.js
    └── beneficiary.server.js

---

## ⚙️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT, bcryptjs
- **Inter-service Communication:** Axios
- **Dev Tools:** Nodemon, Concurrently

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

MONGO_URI=mongodb://127.0.0.1:27017/digital_wallet
JWT_SECRET=yourSuperSecretKey123

USER_SERVICE_PORT=5000
WALLET_SERVICE_PORT=5001
TRANSACTION_SERVICE_PORT=5002
BENEFICIARY_SERVICE_PORT=5003

USER_SERVICE_URL=http://localhost:5000
WALLET_SERVICE_URL=http://localhost:5001
TRANSACTION_SERVICE_URL=http://localhost:5002
BENEFICIARY_SERVICE_URL=http://localhost:5003

DAILY_TRANSACTION_LIMIT=50000

---

## 🚀 Installation & Setup

### 1. Clone the repository
from my official repo link clone repo
cd digital-wallet-api

### 2. Install dependencies
npm install

### 3. Start MongoDB
Make sure MongoDB is running locally on `mongodb://127.0.0.1:27017`.

### 4. Run all microservices together
npm run dev

This starts all four services concurrently:
- User Service → `http://localhost:5000`
- Wallet Service → `http://localhost:5001`
- Transaction Service → `http://localhost:5002`
- Beneficiary Service → `http://localhost:5003`

### Run services individually (optional)
npm run user
npm run wallet
npm run transaction
npm run beneficiary

---

## 📡 API Endpoints

### 👤 User Service — `http://localhost:5000/api/users`
| Method | Endpoint        | Description                  |
|--------|-----------------|-------------------------------|
| POST   | /register       | Register new user + wallet    |
| POST   | /login          | Login user                    |
| POST   | /set-pin        | Set transaction PIN           |
| POST   | /verify-pin     | Verify transaction PIN        |
| GET    | /:id            | Get user by ID                |

### 👛 Wallet Service — `http://localhost:5001/api/wallet`
| Method | Endpoint             | Description                     |
|--------|-----------------------|----------------------------------|
| POST   | /create               | Create wallet (internal)        |
| GET    | /balance/:userId      | Get wallet balance              |
| POST   | /add-money            | Add money to wallet             |
| POST   | /debit                | Debit wallet (internal)         |
| POST   | /credit               | Credit wallet (internal)        |

### 💸 Transaction Service — `http://localhost:5002/api/transactions`
| Method | Endpoint              | Description                    |
|--------|------------------------|---------------------------------|
| POST   | /send                  | Send money (PIN verified)      |
| GET    | /history/:userId       | Get transaction history        |
| GET    | /analytics/:userId     | Get transaction analytics      |

### 👥 Beneficiary Service — `http://localhost:5003/api/beneficiary`
| Method | Endpoint      | Description                 |
|--------|----------------|-------------------------------|
| POST   | /add           | Add a beneficiary            |
| GET    | /:userId       | List beneficiaries           |
| DELETE | /:id           | Remove a beneficiary         |

---

## 🧪 Sample Request — Send Money

**POST** `http://localhost:5002/api/transactions/send`

{
  "senderId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "receiverId": "64f1a2b3c4d5e6f7a8b9c0d2",
  "amount": 500,
  "pin": "1234",
  "note": "Lunch payment"
}

---

## 🛡️ Security Features

- Passwords and Transaction PINs hashed using bcryptjs
- JWT-based authentication middleware
- Transaction PIN verification before money transfer
- Daily transaction limit enforcement per wallet

---

## 📈 Bonus Features Implemented

- ✅ Transaction PIN Verification (middleware calling user-service)
- ✅ Daily Transaction Limits (enforced in wallet-service debit logic)
- ✅ Transaction Analytics API (total sent/received + monthly breakdown)

---

## 👨‍💻 Author

**garvita jain**
Built as part of the **Day 27 Backend Internship Challenge** — Digital Wallet API using MERN + Microservices + MVC.

---

## 📄 License

This project is licensed for educational/internship purposes.
