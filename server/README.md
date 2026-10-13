# 🦷 Dentia — Backend API

Node.js + Express + MongoDB REST API powering the [Dentia dental clinic platform](https://dental-c-linic.vercel.app). Handles authentication, doctors, services, appointments, reviews, and simulated payments.

🔗 **Live API:** https://dental-c-linic.vercel.app/
🌐 **Frontend Repo:** [Dental-Clinic / client](https://github.com/S200011s/Dental-Clinic/tree/main/client)

---

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Joi validation
- Nodemailer (email notifications)
- Cloudinary (image uploads)
- Stripe (test mode)
- bcrypt
- Deployed on Vercel + MongoDB Atlas

---

## Setup

```bash
npm install

Features
JWT auth (register / login / profile / password reset)

CRUD for doctors, services, appointments

Search + pagination + sorting (doctors, services)

Joi validation on all write routes

Appointment status flow: pending → confirmed | cancelled

Reviews tied to completed appointments

Email notifications on booking events

Stripe test-mode checkout

Cloudinary image uploads

CORS enabled for the deployed frontend