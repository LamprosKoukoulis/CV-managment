# CV Management Web Application

## 📌 Description
This project is a web-based CV management system for undergraduate and graduate students.  
It allows administrators to manage student profiles and CVs, and enables students to register, update their CVs, and be searchable based on skills and keywords.

The system uses a relational database and follows a normalized schema designed according to UML and software engineering principles (RUP methodology).

---

## ⚙️ Tech Stack
- Node.js 18+
- JavaScript
- dotenv
- bcrypt
- jsonwebtoken
- cors
- cookie-parser
- Express API 
- Turso (libSQL database)
- SQL (SQLite-compatible)

---

## 🚀 Installation

### 1. Clone repository
```bash
git clone https://github.com/LamprosKoukoulis/CV-managment
cd CV-managment
```
### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables

Create a .env file in the root directory:
```bash
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_KEY=your_database_token
JWT_SECRET=your_jwt_key
PORT=default_is_3000

```
### 4. Run local server
```bash
  node serevr.js
```

## 📌 Notes
Database is hosted on Turso (cloud SQLite)  
Environment variables are required for connection.  
Node.js 18+ recommended
