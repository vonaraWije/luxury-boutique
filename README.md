# LUMIÈRE — Luxury Boutique

A full-stack MERN e-commerce application for clothing, jewellery & cosmetics with an elegant, classy gold & charcoal design theme.

## Tech Stack

**Backend:** Node.js · Express · MongoDB (Mongoose) · JWT Auth · bcrypt  
**Frontend:** React 18 · Vite · Tailwind CSS · React Router v6 · Axios · React Hot Toast

## Quick Start

### 1. Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run seed       # Seeds 16 sample products + admin user
npm run dev        # Runs on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev        # Runs on http://localhost:3000
```

## Demo Credentials
- **Admin:** admin@luxuryboutique.com / admin123

## Features

### Storefront
- Elegant hero section with parallax imagery
- Category grid (Clothing, Jewellery, Cosmetics, Accessories)
- Featured Products, New Arrivals, Bestsellers sections
- Full product listing with filters (category, price range) & search
- Product detail page with image gallery, size/colour selection, reviews
- Cart sidebar with quantity management
- Multi-step checkout (Shipping → Payment → Review → Confirmation)
- Newsletter signup

### User Accounts
- JWT-based registration & login
- Profile management
- Order history
- Wishlist (UI-ready)

### Backend API
- `POST /api/auth/register` — Register
- `POST /api/auth/login`    — Login
- `GET  /api/products`      — List products (filterable)
- `GET  /api/products/:id`  — Product detail
- `POST /api/orders`        — Place order (auth required)
- `GET  /api/orders/my`     — User's orders
- `POST /api/reviews`       — Submit review
- `GET  /api/users/profile` — User profile

## Color Palette
| Token       | Hex       | Use                      |
|-------------|-----------|--------------------------|
| `gold-500`  | `#c9a96e` | Primary accent           |
| `charcoal`  | `#2d2d2d` | Dark backgrounds & text  |
| `cream`     | `#faf8f5` | Page background          |
| `champagne` | `#f2e6d0` | Section backgrounds      |
| `rose-gold` | `#c49a9a` | Secondary accent          |
