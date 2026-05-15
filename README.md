# ✦ Blogify

> *A modern full-stack blogging platform — write your story, share with the world.*

Blogify is a full-stack web application that lets users register, log in, and publish their own blog posts. Every user gets a private space to manage their stories, while a public feed lets anyone explore blogs shared by the community. The backend is powered by FastAPI with JWT-based authentication and a SQLite database via SQLAlchemy ORM. The frontend is built in React with a clean, responsive UI — making reading and writing feel effortless.

---

## ✦ Features

| Feature | Description |
|---|---|
| 🔐 Auth | User registration, login, and JWT-protected routes |
| ✍️ Write | Create and delete your own blogs |
| 🗂️ Stories | Private per-user story management |
| 🌐 Explore | Public blog feed for all readers |
| 📱 UI | Responsive, modern interface |

---

## ✦ Tech Stack

**Frontend**
```
React  ·  React Router DOM  ·  Axios  ·  CSS
```

**Backend**
```
FastAPI  ·  SQLAlchemy  ·  JWT  ·  Passlib  ·  bcrypt  ·  SQLite
```

---

## ✦ Project Structure

```
blogify/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── crud.py
│   ├── schemas.py
│   ├── auth.py
│   └── database.py
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── App.jsx
│       └── style.css
│
└── README.md
```

---

## ✦ Installation

### 1 · Backend

```bash
cd backend

# Install dependencies
pip install fastapi uvicorn sqlalchemy python-jose passlib bcrypt

# Run the server
python -m uvicorn main:app --reload
# → http://127.0.0.1:8000
```

### 3 · Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
# → http://localhost:5173
```

---

## ✦ Authentication

Blogify uses **JWT tokens** for secure, stateless authentication.

- Tokens are stored in `localStorage`
- All write-routes are protected
- Users can only manage **their own** blogs
- "My Stories" is a private, user-specific view

---


## ✦ Author

**Srijita Ghosh**

---
