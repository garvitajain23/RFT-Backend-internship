# Day 8 — Login & Register API (Basic Auth Logic)

> **GOW AI Academy — Backend Internship**  
> Built as part of the RFT Internship program by Ruhil Future Technologies

---

## 📌 Project Overview

A RESTful Authentication API built with **Node.js**, **Express**, and **MongoDB**.  
Supports user registration and login with input validation and password hashing.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Security:** bcryptjs (password hashing)
- **Config:** dotenv

---

## 📁 Folder Structure

```
auth-service/
├── src/
│   ├── app.js              ← Express setup & middleware
│   ├── authController.js   ← Register & login business logic
│   ├── authRoutes.js       ← Route definitions
│   ├── db.js               ← MongoDB connection
│   ├── User.js             ← Mongoose user schema
│   └── validate.js         ← Input validation rules
├── .env                    ← Environment variables (not pushed)
├── .gitignore
├── package.json
└── server.js               ← Entry point
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/garvitajain23/rftinternship.git
cd rftinternship/day8/auth-service
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/authdb
```

### 4. Start the server

```bash
node server.js
```

---

## 🔗 API Endpoints

### POST `/api/register`

Registers a new user.

**Request Body:**

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

**Success Response `201`:**

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

### POST `/api/login`

Logs in an existing user.

**Request Body:**

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

**Success Response `200`:**

```json
{
  "success": true,
  "message": "Login successful",
  "userId": "mongo_object_id"
}
```

---

## ✅ Validation Rules

| Field    | Rule                       |
| -------- | -------------------------- |
| email    | Must be valid email format |
| password | Minimum 6 characters       |

---

## ❌ Error Responses

| Status | Message                   | Reason                 |
| ------ | ------------------------- | ---------------------- |
| 400    | Invalid email format      | Bad email input        |
| 400    | Password too short        | Less than 6 characters |
| 401    | Invalid email or password | Wrong credentials      |
| 409    | Email already registered  | Duplicate user (BONUS) |
| 500    | Server error              | Internal error         |

---

## 🎯 Concepts Covered

- ✅ Input Validation (email format + password length)
- ✅ Authentication Flow (register → login)
- ✅ Password Hashing with bcryptjs
- ✅ Duplicate User Prevention (BONUS)
- ✅ Proper Error Messages (BONUS)
- ✅ MongoDB with Mongoose

---

---

## 🏷️ Tags

`#gowaiacademy` `#rftinternship` `#nodejs` `#expressjs` `#mongodb` `#authentication` `#backenddev`
