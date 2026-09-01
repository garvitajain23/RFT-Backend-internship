# Customer Support Ticket Management API

A REST API for managing support tickets — built with Node.js, Express, and MongoDB using a modular monolith architecture (each domain structured like a microservice, MVC internally).

Day 29 — Backend Internship at RFT.

## Features

- Create, assign, update, and close support tickets
- Ticket status & priority management
- Full ticket history/audit trail
- JWT authentication with role-based access (customer / agent / admin)
- Email notifications on create, assign, and close
- Analytics dashboard endpoint

## Tech Stack

Node.js · Express · MongoDB (Mongoose) · JWT · bcryptjs · Nodemailer

## Setup

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/support_ticket_db
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM="Support Desk <no-reply@supportdesk.com>"
```

Run:

```bash
npm run dev     # development
npm start       # production
```

## Folder Structure

src/
├── config/ # db connection, constants
├── middlewares/ # shared error & validation middleware
├── utils/ # logger, email sender, response formatter
├── routes.js # mounts all service routes
└── services/
├── auth-service/
├── ticket-service/
├── agent-service/
├── notification-service/
└── analytics-service/


## API Endpoints

Base URL: `http://localhost:5000/api`
Protected routes require header: `Authorization: Bearer <token>`

**Auth**
| Method | Endpoint | Access |
|---|---|---|
| POST | `/auth/register` | Public |
| POST | `/auth/login` | Public |

**Agents**
| Method | Endpoint | Access |
|---|---|---|
| POST | `/agents` | Admin |
| GET | `/agents` | Admin, Agent |
| GET | `/agents/:id` | Admin, Agent |
| PATCH | `/agents/:id/availability` | Admin, Agent |

**Tickets**
| Method | Endpoint | Access |
|---|---|---|
| POST | `/tickets` | Authenticated |
| GET | `/tickets` | Authenticated |
| GET | `/tickets/:id` | Authenticated |
| GET | `/tickets/:id/history` | Authenticated |
| PATCH | `/tickets/:id/assign` | Admin, Agent |
| PATCH | `/tickets/:id/status` | Admin, Agent |
| PATCH | `/tickets/:id/priority` | Admin, Agent |
| PATCH | `/tickets/:id/close` | Admin, Agent |

**Notifications**
| Method | Endpoint | Access |
|---|---|---|
| POST | `/notifications/test` | Admin |

**Analytics**
| Method | Endpoint | Access |
|---|---|---|
| GET | `/analytics/summary` | Admin, Agent |

## Ticket Lifecycle

`open → assigned → in-progress → resolved → closed`

## Priority Levels

`low → medium → high → urgent`

## Error Response Format

```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

## Future Improvements

- Joi/Zod validation
- Pagination on list endpoints
- Automated tests (Jest + Supertest)
- Swagger docs