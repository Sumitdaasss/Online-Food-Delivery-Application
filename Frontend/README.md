# Foodies - Online Food Delivery Application

A modern, responsive food delivery web application built with React, TypeScript, and Tailwind CSS.

## Features

- 🍕 **Beautiful Product Catalog** - Browse food items with animated cards and hover effects
- 🔍 **Advanced Search & Filtering** - Search by name, filter by categories
- 🛒 **Shopping Cart** - Add/remove items with real-time updates
- 👤 **User Authentication** - Login/Register with JWT tokens
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 🎨 **Smooth Animations** - Powered by Framer Motion
- 📦 **Order Management** - Track orders with real-time status updates
- 👨‍💼 **Admin Panel** - Manage food items and orders

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Query** for data fetching
- **React Hook Form** with Yup validation
- **React Router** for navigation
- **Lucide React** for icons

### Backend Integration
- **Spring Boot** REST API
- **JWT Authentication**
- **File Upload** support
- **CORS** enabled

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Java 11+ (for backend)
- Spring Boot backend running on port 8080

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd foodies-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your backend URL:
   ```
   VITE_API_URL=http://localhost:8080/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Backend API Endpoints

The frontend expects the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Food Management
- `GET /api/food` - Get all food items
- `GET /api/food/{id}` - Get food item by ID
- `POST /api/food` - Create new food item (Admin)
- `DELETE /api/food/{id}` - Delete food item (Admin)

### Cart Management
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Order Management
- `POST /api/order` - Create new order
- `GET /api/order/user` - Get user orders
- `GET /api/order/all` - Get all orders (Admin)
- `PUT /api/order/{id}/status` - Update order status (Admin)
- `DELETE /api/order/{id}` - Delete order (Admin)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   └── ProductList/    # Product catalog components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API service functions
├── types/              # TypeScript type definitions
├── config/             # Configuration files
└── utils/              # Utility functions
```

## Features Overview

### 🎨 Product Catalog
- Beautiful animated product cards
- Hover effects with action menus
- Category-based filtering
- Real-time search functionality
- Grid and list view modes

### 🛒 Shopping Cart
- Add/remove items with smooth animations
- Real-time price calculations
- Persistent cart state
- Checkout flow with order summary

### 👤 User Management
- JWT-based authentication
- User registration with validation
- Profile management
- Role-based access control

### 📱 Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Optimized performance

### 🌙 Dark Mode
- System preference detection
- Smooth theme transitions
- Persistent theme selection
- Consistent styling across all components

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Consistent component structure

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred hosting service**
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - Any static hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.