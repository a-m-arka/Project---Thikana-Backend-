# Thikana

Thikana (ঠিকানা — Bangla for "address") is a full-stack real estate listing platform built for the Bangladeshi market. Users can register, list properties for sale or rent, upload property images, and browse listings from other users.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Database Schema](#database-schema)
- [Roadmap](#roadmap)

## Features

- **User authentication** — registration and login with JWT-based sessions and hashed passwords
- **Profile management** — edit profile details, change password, upload profile picture
- **Property listings** — create, update, and delete property listings (flat, house, or commercial)
- **Image uploads** — upload up to 10 images per property via Cloudinary
- **Posts** — publish a property as a "sell" or "rent" post
- **Protected routes** — frontend route guarding based on authentication state

## Tech Stack

**Backend**
- Node.js / Express
- MySQL (via `mysql2`)
- JWT (`jsonwebtoken`) for authentication
- `bcryptjs` for password hashing
- `multer` + `cloudinary` for image upload and storage
- `dotenv`, `cors`

**Frontend**
- React 19
- React Router v7
- Vite
- Sass (SCSS)
- react-icons

## Project Structure

```
Project---Thikana/
├── Thikana_Backend/
│   ├── app.js                  # Express app entry point
│   └── src/
│       ├── config/             # DB, Cloudinary, and Multer configuration
│       ├── controllers/        # Request handlers
│       ├── services/           # Business logic
│       ├── queries/            # SQL query definitions / table schemas
│       ├── models/             # Data models
│       ├── routes/             # Express route definitions
│       └── utils/              # Helper utilities (auth, db, cloudinary, etc.)
└── Thikana_Frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx             # Route definitions
        ├── main.jsx            # App entry point
        ├── components/         # Reusable UI components
        ├── context/            # React context (auth state)
        ├── pages/               # Page-level components (Landing, Login, Home, etc.)
        └── data/                # Static/sample data
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A running MySQL instance
- A [Cloudinary](https://cloudinary.com/) account (for image hosting)

### Backend Setup

```bash
cd Thikana_Backend
npm install
```

Create a `.env` file in `Thikana_Backend/` (see [Environment Variables](#environment-variables)).

```bash
npm start
```

The server starts on `http://localhost:<PORT>` and automatically creates the required MySQL tables on first run if they don't already exist.

### Frontend Setup

```bash
cd Thikana_Frontend
npm install
npm run dev
```

The Vite dev server will print the local URL (typically `http://localhost:5173`).

## Environment Variables

Create a `.env` file inside `Thikana_Backend/` with the following keys:

```env
# Server
PORT=5000

# MySQL Database
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=thikana

# JWT
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

## API Overview

All routes are prefixed with `/api`.

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/register-user` | Register a new user | No |
| POST | `/auth/login-user` | Log in and receive a JWT | No |
| GET | `/user/get-user-data` | Get the current user's data | Yes |
| PUT | `/user/update-profile-picture` | Update profile picture | Yes |
| PUT | `/user/edit-profile` | Edit profile details | Yes |
| PUT | `/user/change-password` | Change account password | Yes |
| POST | `/property/register-property` | Create a new property listing (up to 10 images) | Yes |
| GET | `/property/user-properties` | Get properties owned by the current user | Yes |
| PUT | `/property/update-property/:propertyId` | Update property details | Yes |
| DELETE | `/property/delete-property/:propertyId` | Delete a property | Yes |
| POST | `/property/add-new-images/:propertyId` | Add images to a property | Yes |
| DELETE | `/property/delete-images/:propertyId` | Delete specific property images | Yes |
| POST | `/post/create-post/:propertyId` | Create a sell/rent post for a property | Yes |
| DELETE | `/post/delete-post/:postId` | Delete a post | Yes |
| POST | `/image/upload-image` | Upload a single standalone image | No |
| POST | `/image/upload-multiple-images` | Upload multiple standalone images | No |
| DELETE | `/image/delete-image` | Delete an uploaded image | No |

> Routes marked "Auth Required" expect a `Bearer <token>` in the `Authorization` header.

## Database Schema

The backend automatically provisions the following MySQL tables on startup:

- **Users** — account details and profile picture
- **Properties** — listing details (title, address, city, price, type, description), linked to a user
- **Posts** — links a property to a sell/rent listing with timestamps
- **Property_Images** — Cloudinary-hosted images linked to a property
- **Messages** — schema for user-to-user messaging tied to a post (read status, edit/delete flags)

## Roadmap

- [ ] Wire up messaging (`Messages` table exists but has no routes/controllers yet)
- [ ] Add search/filter functionality to the Explore page
- [ ] Add automated tests
- [ ] Add API documentation (e.g. Swagger/OpenAPI)
