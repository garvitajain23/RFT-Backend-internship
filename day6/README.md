# 🎓 Student Management API — Microservices Architecture

> **Day 6 Project | GOW AI Academy Backend Internship**  
> Built with Node.js, Express, MongoDB Atlas, and a microservices pattern

---

## 📌 Project Overview

A fully functional **Student Management REST API** built using a **microservices architecture**. Each service runs independently on its own port, and all client requests are routed through a central **API Gateway**.

---

## 🏗️ Architecture

```
CLIENT (Postman / Frontend)
          │
          ▼
┌─────────────────────┐
│     API GATEWAY     │  ← Port 6000 (single entry point)
└────────┬────────────┘
         │ proxies to...
    ┌────┴──────────────────────┐
    ▼              ▼                        ▼
┌──────────┐  ┌──────────────┐  ┌──────────────┐
│ student  │  │   validate   │  │   idguard    │
│ service  │  │   service    │  │   service    │
│ Port6001 │  │  Port 6002   │  │  Port 6003   │
└──────────┘  └──────────────┘  └──────────────┘
     │
  MongoDB Atlas
```

---

## 📁 Folder Structure

```
student-management-api/
│
├── package.json              ← single package.json for all services
├── .env                      ← environment variables (gitignored)
├── .gitignore
├── README.md
│
├── api-gateway/              ← Port 6000 — routes all requests
│   ├── gateway.js
│   └── server.js
│
├── student-service/          ← Port 6001 — CRUD + MongoDB
│   ├── db.js
│   ├── student.model.js
│   ├── student.controller.js
│   ├── student.routes.js
│   └── server.js
│
├── validate-service/         ← Port 6002 — checks missing fields
│   ├── validate.controller.js
│   ├── validate.routes.js
│   └── server.js
│
└── idguard-service/          ← Port 6003 — prevents duplicate IDs
    ├── idguard.controller.js
    ├── idguard.routes.js
    └── server.js
```

---

## ⚙️ Tech Stack

| Technology            | Purpose                           |
| --------------------- | --------------------------------- |
| Node.js               | Runtime environment               |
| Express.js v4         | HTTP server framework             |
| MongoDB Atlas         | Cloud database                    |
| Mongoose              | MongoDB ODM                       |
| http-proxy-middleware | API Gateway proxying              |
| dotenv                | Environment variable management   |
| nodemon               | Auto-restart on file save         |
| concurrently          | Run all services with one command |
| axios                 | HTTP requests between services    |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/garvitajain23/RFT-internship.git
cd day6/student-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
# Ports
GATEWAY_PORT=6000
STUDENT_SERVICE_PORT=6001
VALIDATE_SERVICE_PORT=6002
IDGUARD_SERVICE_PORT=6003

# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/studentdb

# Service URLs
STUDENT_SERVICE_URL=http://localhost:6001
VALIDATE_SERVICE_URL=http://localhost:6002
IDGUARD_SERVICE_URL=http://localhost:6003
```

### 4. Run All Services

```bash
npm run dev
```

Or run each service individually in separate terminals:

```bash
npm run gateway    # Port 6000
npm run student    # Port 6001
npm run validate   # Port 6002
npm run idguard    # Port 6003
```

---

## 📡 API Endpoints

All requests go through the **API Gateway on Port 6000**

### Student CRUD Endpoints

| Method   | Endpoint        | Description           |
| -------- | --------------- | --------------------- |
| `POST`   | `/students`     | Add a new student     |
| `GET`    | `/students`     | Get all students      |
| `GET`    | `/students/:id` | Get one student by ID |
| `PUT`    | `/students/:id` | Update a student      |
| `DELETE` | `/students/:id` | Delete a student      |

### Validation & Guard Endpoints

| Method | Endpoint    | Description                    |
| ------ | ----------- | ------------------------------ |
| `POST` | `/validate` | Check for missing fields       |
| `POST` | `/check-id` | Check for duplicate student ID |

### Health Check Endpoints

| Method | Endpoint                | Description             |
| ------ | ----------------------- | ----------------------- |
| `GET`  | `localhost:6000/health` | Gateway status          |
| `GET`  | `localhost:6001/health` | Student service status  |
| `GET`  | `localhost:6002/health` | Validate service status |
| `GET`  | `localhost:6003/health` | IDGuard service status  |

---

## 📋 Request & Response Examples

### ➕ Add a Student

**Request:**

```http
POST http://localhost:6000/students
Content-Type: application/json

{
  "studentId": "STU001",
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "course": "Backend Development",
  "age": 20
}
```

**Response:**

```json
{
  "success": true,
  "message": "Student added successfully",
  "data": {
    "_id": "...",
    "studentId": "STU001",
    "name": "Rahul Sharma",
    "email": "rahul@gmail.com",
    "course": "Backend Development",
    "age": 20,
    "createdAt": "2026-05-11T10:17:08.780Z",
    "updatedAt": "2026-05-11T10:17:08.780Z"
  }
}
```

### 📋 Get All Students

**Request:**

```http
GET http://localhost:6000/students
```

**Response:**

```json
{
  "success": true,
  "count": 1,
  "data": [...]
}
```

### ✏️ Update a Student

**Request:**

```http
PUT http://localhost:6000/students/STU001
Content-Type: application/json

{
  "name": "Rahul Kumar",
  "course": "Full Stack Development"
}
```

### 🗑️ Delete a Student

**Request:**

```http
DELETE http://localhost:6000/students/STU001
```

### 🔍 Validate Fields

**Request:**

```http
POST http://localhost:6002/validate
Content-Type: application/json

{
  "studentId": "STU002",
  "name": "Priya"
}
```

**Response:**

```json
{
  "success": false,
  "message": "Missing required fields: email, course, age"
}
```

### 🛡️ Check Duplicate ID

**Request:**

```http
POST http://localhost:6003/check-id
Content-Type: application/json

{
  "studentId": "STU001"
}
```

**Response:**

```json
{
  "success": false,
  "message": "Student with ID STU001 already exists"
}
```

---

## 🧠 Concepts Learned

- **Microservices Architecture** — splitting an app into independent, focused services
- **API Gateway Pattern** — single entry point that routes to correct service
- **CRUD Operations** — Create, Read, Update, Delete with MongoDB
- **Route Design** — clean RESTful route structure
- **Error Handling** — invalid IDs, missing fields, duplicate entries
- **Environment Variables** — keeping secrets out of code with `.env`
- **Mongoose Schema** — enforcing data shape in MongoDB
- **nodemon** — automatic server restart on file changes
- **concurrently** — running multiple services with one command

---

## 🔒 Error Handling

| Scenario             | HTTP Status | Response                                                            |
| -------------------- | ----------- | ------------------------------------------------------------------- |
| Student not found    | `404`       | `{ success: false, message: "No student found with ID: ..." }`      |
| Missing fields       | `400`       | `{ success: false, message: "Missing required fields: ..." }`       |
| Duplicate student ID | `409`       | `{ success: false, message: "Student with ID ... already exists" }` |
| Server error         | `500`       | `{ success: false, message: "..." }`                                |

---

## 👨‍💻 Author

**GARVITA JAIN**  
RFT Internship — Day 6  
[GitHub](https://github.com/yourusername) • [LinkedIn](https://linkedin.com/in/yourusername)

---

## 📌 Hashtags

`#gowaiacademy` `#rftinternship` `#nodejs` `#expressjs` `#mongodb` `#microservices` `#backenddev`
