````md
# File Management API — Microservice Architecture

A file upload and management system built with microservice architecture using Node.js, Express, and MongoDB.

---

## Architecture

```text
Client
│
▼
API Gateway (3000)
├── /api/upload   → Upload Service   (3001)
├── /api/files    → File Service     (3002)
└── /api/metadata → Metadata Service (3003)
````

---

## Services

| Service          | Port | Responsibility                     |
| ---------------- | ---- | ---------------------------------- |
| API Gateway      | 3000 | Routes requests to correct service |
| Upload Service   | 3001 | Handles file uploads & validation  |
| File Service     | 3002 | Retrieve & delete files            |
| Metadata Service | 3003 | Stores file metadata in MongoDB    |

---

## Folder Structure

```text
file-management-api/
├── api-gateway/
│   └── index.js
├── services/
│   ├── upload-service/
│   │   ├── uploads/
│   │   ├── index.js
│   │   ├── upload.routes.js
│   │   └── fileValidator.js
│   ├── file-service/
│   │   ├── index.js
│   │   └── file.routes.js
│   └── metadata-service/
│       ├── index.js
│       ├── metadata.routes.js
│       └── FileMetadata.model.js
├── .env
├── package.json
└── README.md
```

---

## Tech Stack

* **Runtime** — Node.js
* **Framework** — Express.js
* **Database** — MongoDB + Mongoose
* **File Upload** — Multer
* **Proxy** — express-http-proxy
* **Dev Tool** — Nodemon + Concurrently

---

## Getting Started

### 1. Clone the repository

```bash
git clone git clone https://github.com/garvitajain23/RFT-Backend-internship/tree/main/Day-18.git
cd file-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the root:

put 
1. all ports
2. url of each service
3. mongodb uri
4. upload files format

```

### 4. Start all services

```bash
npm run dev
```

All 4 services start together in one terminal.

---

## API Endpoints

All requests go through the API Gateway on port **3000**.

### Upload a File

```http
POST /api/upload
Content-Type: multipart/form-data
```

#### Body (form-data)

| Key  | Type | Value            |
| ---- | ---- | ---------------- |
| file | File | Select your file |

---

### List All Files

```http
GET /api/files
```

---

### Retrieve / Download a File

```http
GET /api/files/:storedName
```

---

### Delete a File

```http
DELETE /api/files/:storedName
```

---

### Get All Metadata

```http
GET /api/metadata
```

---

### Get Single File Metadata

```http
GET /api/metadata/:storedName
```

---

### Health Check

```http
GET /health
```

---

## Validation Rules

| Rule          | Value                                                         |
| ------------- | ------------------------------------------------------------- |
| Max file size | 5MB                                                           |
| Allowed types | image/jpeg, image/png, image/gif, application/pdf, text/plain |

---

## Error Responses

| Scenario          | Status | Message                          |
| ----------------- | ------ | -------------------------------- |
| No file uploaded  | 400    | No file provided                 |
| Invalid file type | 400    | Invalid type: ...                |
| File too large    | 413    | File too large. Max allowed: 5MB |
| File not found    | 404    | File not found                   |
| Service down      | 502    | Service unavailable              |

---

## Author
**garvita jain**


-Gmail: garvitajain.in@gmail.com

`#rftInternship` 
