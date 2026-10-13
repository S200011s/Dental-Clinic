# 🦷 Dentia — Dental Clinic Platform

A full-stack dental clinic management platform. Patients can search for doctors, browse services, book appointments with time slots, pay through a simulated checkout, and manage their bookings. Admins manage doctors, services, appointments, and view a dedicated dashboard.

🔗 **Live Demo:** [https://dental-c-linic.vercel.app](https://dental-c-linic.vercel.app)
📦 **Repository:** [S200011s/Dental-Clinic](https://github.com/S200011s/Dental-Clinic)

🛠️ Backend: server/

🌐 Live: https://dental-c-linic.vercel.app
---

## ✨ Features

### Patient
- 🔐 Register / login (JWT)
- 👤 User dashboard and profile editing
- 🔍 Search doctors and services
- 🎯 Filter doctors by specialization, sort by newest or rating
- 🗂️ Filter services by category, sort by newest or price
- 📅 Book appointments with selectable time slots
- ⭐ Leave star reviews (rating + text) after appointments
- 📜 View, cancel, and track appointment status (`pending | confirmed | cancelled`)
- 💳 Simulated payment flow at checkout
- 📧 Email notifications on booking events

### Admin
- 📊 Admin dashboard
- 👨‍⚕️ Manage doctors (create, update, delete)
- 🩺 Manage services
- 📅 Manage appointments — confirm or cancel
- 👥 View registered patients

### General
- 🧾 Clean REST API with JWT authentication
- 🔒 Input validation with Joi
- 📄 Pagination + sorting on list endpoints
- 🌐 CORS configured for the deployed frontend
- 📱 Fully responsive UI

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **React Router** — routing
- **Axios** — API calls
- **CSS / Tailwind** — styling
- Deployed on **Vercel**

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **Joi** for request validation
- **Nodemailer** for email notifications
- **bcrypt** for password hashing
- **Stripe** (test mode) for simulated payments
- **Cloudinary** for image uploads
- Deployed on **Vercel**

### Database
- **MongoDB Atlas**

---

## 📁 Project Structure
Dental-Clinic/
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/ # Axios API layer
│ │ ├── context/ # Auth context
│ │ ├── hooks/
│ │ └── App.jsx
│ ├── .env
│ ├── vercel.json
│ └── package.json
│
├── server/ # Express backend
│ ├── config/ # DB + cloudinary config
│ ├── controllers/
│ ├── middleware/ # Auth, error, validation
│ ├── models/ # Mongoose schemas
│ ├── routes/
│ ├── utils/
│ ├── validations/ # Joi schemas
│ ├── .env
│ ├── server.js
│ ├── vercel.json
│ └── package.json
│
├── .gitignore
└── README.md

Features
Browse, search, and filter doctors (by specialization, sort by newest / rating)

Browse and filter services (by category, sort by newest / price)

Book appointments with time slots

Stripe test-mode checkout

Patient dashboard + profile editing

Admin dashboard for doctors, services, and appointments

Leave reviews after appointments

