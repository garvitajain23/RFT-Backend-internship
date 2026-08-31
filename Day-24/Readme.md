# Event Booking API

A Node.js + Express + MongoDB backend for managing event registrations, ticket bookings, cancellations, and booking history — built using a modular microservice-style architecture with MVC principles inside each service.

## Features

- Event Registration
- Book Tickets
- Cancel Booking
- View Booking History
- Event Seat Availability Check

### Bonus Features

- QR Code Generation for each booking
- Email Confirmation on successful booking
- Real-time Seat Availability Check

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **QR Code:** qrcode
- **Email:** Nodemailer
- **Environment Config:** dotenv

## Architecture

This project follows a **modular microservice-style architecture** combined with **MVC** inside each module:

- `event-service` → handles event registration and availability
- `booking-service` → handles booking, cancellation, and history
- `notification-service` → handles QR generation and email confirmation

Each service is self-contained (Model → Service → Controller → Routes) but shares a single `server.js`, `.env`, `package.json`, and `node_modules` for simplicity, rather than running as fully independent deployable services.

## Folder Structure

    event-booking-api/
     ├── .env
     ├── package.json
     ├── server.js
     ├── db.js
     ├── errorHandler.js
     ├── apiResponse.js
     ├── services/
     │   ├── event-service/
     │   │   ├── event.model.js
     │   │   ├── event.controller.js
     │   │   ├── event.routes.js
     │   │   └── event.service.js
     │   ├── booking-service/
     │   │   ├── booking.model.js
     │   │   ├── booking.controller.js
     │   │   ├── booking.routes.js
     │   │   └── booking.service.js
     │   └── notification-service/
     │       ├── qrGenerator.js
     │       ├── emailSender.js
     │       └── notification.controller.js

## Prerequisites

- Node.js (v18 or higher)
- MongoDB running locally or a MongoDB Atlas connection string
- Gmail account with an App Password (for email confirmation feature)

## Installation

1. Clone or download this repository
2. Install dependencies:

   npm install

3. Create a `.env` file in the root directory .

## Running the Project

**Development mode (with auto-restart):**

    npm run dev

**Production mode:**

    npm start

Server will start at `http://localhost:5000`

## API Endpoints

### Event Service

| Feature            | Method | Endpoint                       |
| ------------------ | ------ | ------------------------------ |
| Register Event     | POST   | `/api/events`                  |
| List All Events    | GET    | `/api/events`                  |
| Check Availability | GET    | `/api/events/:id/availability` |

### Booking Service

| Feature         | Method | Endpoint                       |
| --------------- | ------ | ------------------------------ |
| Book Tickets    | POST   | `/api/bookings`                |
| Cancel Booking  | PUT    | `/api/bookings/:id/cancel`     |
| Booking History | GET    | `/api/bookings/history/:email` |

## Sample Requests

### Register Event

`POST /api/events`

    {
      "title": "Tech Conference 2026",
      "description": "Annual developer conference",
      "venue": "Delhi Convention Center",
      "date": "2026-09-15",
      "totalSeats": 100,
      "price": 500
    }

### Book Tickets

`POST /api/bookings`

    {
      "eventId": "PASTE_EVENT_ID_HERE",
      "userName": "Raj Sharma",
      "userEmail": "raj@example.com",
      "seats": 2
    }

## Response Format

All API responses follow a consistent structure:

**Success:**

    {
      "success": true,
      "message": "Description of what happened",
      "data": {}
    }

**Error:**

    {
      "success": false,
      "message": "Description of the error"
    }

## Business Logic Notes

- Booking a ticket automatically decreases `availableSeats` on the associated event.
- Cancelling a booking automatically restores the seats back to the event.
- A booking cannot be cancelled twice.
- A booking cannot be made if requested seats exceed available seats.
- Email confirmation failures do not block or fail the booking — they are logged silently on the server.
- Each successful booking generates a QR code (base64-encoded PNG) containing booking ID, user email, and seat count.

## Error Handling

Centralized error handling is implemented via `errorHandler.js`, and all controllers use a shared `apiResponse.js` helper for consistent success/error formatting across the API.

## Author

Aman Sharma

Built as part of  Day 24 RFT Backend Internship.
