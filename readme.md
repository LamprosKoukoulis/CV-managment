# CV Management Web Application

## 📌 Description
This project is a web-based CV management system for undergraduate and graduate students.  
It allows administrators to manage student profiles and CVs, and enables students to register, update their CVs, and be searchable based on skills and keywords.

The system uses a relational database and follows a normalized schema designed according to UML and software engineering principles (RUP methodology).

---

## ⚙️ Tech Stack
- Node.js v24.10.0.
- JavaScript
- Turso (libSQL database)
- dotenv
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
```

## 📌 Notes
Database is hosted on Turso (cloud SQLite)  
Environment variables are required for connection.  
Node.js 18+ recommended
