# 📘 Day 12 - Blog System with Users

This project is part of my **Backend Development Internship**.  
In Day 12, I built a **Blog System** that supports users and posts with proper relationships.

---

## 🚀 Features

- 👤 Create Users
- 📝 Create Posts
- 🔗 User → Post Relationship
- 📄 Fetch All Posts
- 📌 Fetch Posts by Specific User

---

## 🧠 Concepts Covered

- Multi-entity system design
- Data relationships (User → Post)
- REST API structure
- Backend project structuring

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- (Add MongoDB / MySQL if you used it)

---

## 📂 Project Structure

day2/
└── blog-system/
├── models/
├── routes/
├── controllers/
├── package.json
└── server.js

---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/garvitajain23/rftinternship.git
```

Navigate to the project directory:

cd rftinternship/day12/blog-system

Install dependencies:

npm install

Start the server:

npm run dev

📌 API Endpoints
👤 Users

POST /users → Create a new user

📝 Posts

POST /posts → Create a new post

GET /posts → Fetch all posts

GET /posts/:userId → Fetch posts by user

🎯 Learning Outcomes

Understood how to link multiple entities in backend

Learned to structure scalable backend projects

Practiced building REST APIs

Gained hands-on experience with real-world backend logic

🔗 Connect with Me

💼 LinkedIn: www.linkedin.com/in/garvita-jain-02678a2ba

💻 GitHub: https://github.com/garvitajain23

⭐ Acknowledgment
This project is part of the GOW AI Academy Backend Internship Program.

📌 Note
This project is built for learning purposes and demonstrates backend fundamentals like routing, relationships, and API handling.
