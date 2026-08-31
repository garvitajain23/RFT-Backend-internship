# Day 21 — REST API Basics (Microservice Architecture)

## 📌 Overview
Completed Task of Day-21 during RFT Backend Intership. A simple backend system for managing student records, built using
**microservice architecture**. Instead of one monolithic server, the
project is split into two independent services that communicate over HTTP,
plus a frontend that talks to the system through a single entry point.

## 🏗️ Architecture

Frontend (Live Server)
│
▼
API Gateway (port 5000) ← single entry point for the frontend
│
▼
Student Service (port 5001) ← owns the data + MongoDB connection
│
▼
MongoDB (studentDB)

- **API Gateway** — routes every request from the frontend to the correct
  microservice. The frontend never talks to Student Service directly.
- **Student Service** — the only service that touches the database. Handles
  all CRUD logic for students.
- **Frontend** — a plain HTML/JS page that calls the gateway using `fetch()`.

## 📂 Folder Structure

REST-API-BASICS/
│
├── .env
├── .gitignore
├── package.json
│
├── student-service/
│   ├── db.js
│   ├── Student.js
│   └── server.js
│
├── api-gateway/
│   └── server.js
│
└── frontend/
    └── index.html
## ⚙️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- dotenv (environment config)
- concurrently (run both services with one command)

## 🔑 Environment Variables

Create a `.env` file in the project root:

    STUDENT_SERVICE_PORT=5001
    GATEWAY_PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/studentDB
    STUDENT_SERVICE_URL=http://localhost:5001

## ▶️ Setup & Run

1. Install dependencies (once, at project root):

       npm install

2. Make sure MongoDB is running locally:

       mongod

3. Start both services together:

       npm start

   This runs the Student Service (`5001`) and API Gateway (`5000`)
   concurrently in one terminal.

4. Open `frontend/index.html` using **Live Server** (or any static server)
   to use the UI.

## 🔌 API Endpoints

All requests go through the **API Gateway** at
`http://localhost:5000`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get a single student |
| POST | `/students` | Create a new student |
| PUT | `/students/:id` | Update an existing student |
| DELETE | `/students/:id` | Delete a student |

### Example Request Body (POST / PUT)

    {
      "name": "Aarav Sharma",
      "course": "Backend Development"
    }

## 🚀 Challenge Completed

The frontend (`frontend/index.html`) is connected to the API Gateway using
JavaScript `fetch()`. Students can be added and deleted directly from the
browser, with data persisted in MongoDB.

## 📖 Learnings

- REST API design (routes, HTTP methods, status codes)
- Microservice architecture — separating concerns across independent
  services on different ports
- API Gateway pattern — single entry point that forwards requests
- Connecting Express to MongoDB with Mongoose
- Managing configuration securely using `.env`
- Debugging cross-origin (CORS) issues between frontend and backend