# 🎟️ Evently

A scalable backend REST API for an event booking platform built with **Node.js**, **Express**, **TypeScript**, **Prisma**, and **PostgreSQL**. Evently supports authentication, role-based authorization, event management, venue management, and a booking system with seat availability validation.

---

## ✨ Features

### Authentication & Authorization

- JWT Authentication
- Secure password hashing with bcrypt
- Role-Based Access Control (RBAC)
- Roles:
  - Admin
  - Organizer
  - User
- Ownership-based authorization for protected resources

---

### User Management

- Register
- Login
- Get current user
- Get all users (Admin)
- Get user by ID
- Update user role (Admin)
- Pagination
- Sorting

---

### Venue Management

- Create venue
- Get all venues
- Get venue by ID
- Update venue
- Delete venue
- Pagination
- Sorting
- Search by venue name

---

### Event Management

- Create event
- Get all events
- Get event by ID
- Update event
- Delete event
- Organizer ownership validation
- Event status management
- Pagination
- Sorting
- Search by title
- Filter by:
  - Status
  - Venue
  - Organizer

---

### Booking Management

- Create booking
- Get booking by ID
- Get current user's bookings
- Get all bookings (Admin)
- Delete booking
- Seat availability validation
- Booking allowed only for published events
- Pagination
- Sorting

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- JWT
- bcrypt

### Validation

- Zod

## 🔒 Authorization

### Admin

- Manage users
- Manage venues
- Manage events
- View all bookings

### Organizer

- Create events
- Update own events
- Delete own events
- Create venues (if allowed)

### User

- Book events
- View own bookings
- Delete own bookings

---

## 🛡️ Validation

All incoming requests are validated using **Zod**.

Validation includes:

- Request body
- Route parameters
- Query parameters

---

## ⚡ Security

- JWT Authentication
- Password Hashing
- Role-Based Authorization
- Ownership Validation
- Input Validation
- Protected Routes

---

## 🚧 Upcoming Features

- Swagger API Documentation
- Docker Support
- Deployment
- CI/CD Pipeline
- Redis Caching
- Booking Transactions
- Email Notifications
