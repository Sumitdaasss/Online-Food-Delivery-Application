# 🍽️ Online Food Delivery Application

A full-stack **Online Food Ordering System** built using **Spring Boot (Java)** for the backend and **React.js** for the frontend. It supports category-wise food items, JWT-based authentication, cart management, order placement, and secure payment integration.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### ⚙️ Backend
- Spring Boot
- Spring Security + JWT
- Maven

### 🛢️ Database
- MySQL

### 🧰 Tools
- Postman (for API testing)
- Docker (optional for containerization)
- GitHub (Version Control)
- AWS EC2 / Vercel (for deployment)

---

## 🔐 Key Features

### 👥 User
- JWT Authentication (Sign In/Up)
- View food items by category
- Add/Remove from Cart
- Place Orders with delivery address
- View Order History
- Payment Integration (Optional)

### 🧑‍🍳 Admin
- Add/Edit/Delete Food Items
- Manage Categories
- View All Orders

---

## 📁 Folder Structure

Online-Food-Delivery-Application/
├── backend/ # Spring Boot API
├── frontend/ # React.js UI
└── README.md

yaml
Copy
Edit

---

## 🧪 API Testing (Postman)

| Endpoint            | Method | Description              |
|---------------------|--------|--------------------------|
| `/api/auth/login`   | POST   | User login               |
| `/api/auth/register`| POST   | User registration        |
| `/api/foods`        | GET    | List all food items      |
| `/api/cart`         | POST   | Add item to cart         |
| `/api/order`        | POST   | Place an order           |

---

## 🛠️ Run the App Locally

### ✅ Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
App runs on: http://localhost:8080

✅ Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
App runs on: http://localhost:3000

📦 Deployment (Optional)
Frontend: Deploy using Vercel, Netlify, or GitHub Pages

Backend: Deploy to AWS EC2, Render, or Railway

📸 Screenshots
Add screenshots here after hosting (UI pages, cart, orders, etc.)

🧑‍💻 Author
Sumit Das

GitHub: @Sumitdaasss

Email: sumitdas95504@gmail.com

