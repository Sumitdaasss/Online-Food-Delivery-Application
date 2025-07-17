# Foodies API - Postman Collection

## Base URL
```
http://localhost:8080/api
```

## Authentication Endpoints

### 1. Register User
**Method:** `POST`
**URL:** `http://localhost:8080/api/auth/register`
**Headers:**
```
Content-Type: application/json
```
**Body (JSON):**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "9876543210",
    "password": "123456"
}
```
**Response:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "user": {
        "id": "user123",
        "name": "John Doe",
        "email": "john@example.com",
        "mobile": "9876543210",
        "role": "user"
    }
}
```

### 2. Login User
**Method:** `POST`
**URL:** `http://localhost:8080/api/auth/login`
**Headers:**
```
Content-Type: application/json
```
**Body (JSON):**
```json
{
    "email": "john@example.com",
    "password": "123456"
}
```
**Response:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "user": {
        "id": "user123",
        "name": "John Doe",
        "email": "john@example.com",
        "mobile": "9876543210",
        "role": "user"
    }
}
```

## Food Management Endpoints

### 3. Get All Foods
**Method:** `GET`
**URL:** `http://localhost:8080/api/food`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
```
**Response:**
```json
[
    {
        "id": "food123",
        "name": "Chicken Biryani",
        "description": "Aromatic basmati rice with tender chicken pieces",
        "category": "Biryani",
        "price": 299.0,
        "imageUrl": "http://localhost:8080/uploads/chicken-biryani.jpg",
        "createdAt": "2024-01-15T10:30:00Z"
    }
]
```

### 4. Get Single Food
**Method:** `GET`
**URL:** `http://localhost:8080/api/food/{foodId}`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
```

### 5. Add Food (Admin Only)
**Method:** `POST`
**URL:** `http://localhost:8080/api/food`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
Content-Type: multipart/form-data
```
**Body (Form Data):**
- `food` (JSON): 
```json
{
    "name": "Chicken Biryani",
    "description": "Aromatic basmati rice with tender chicken",
    "category": "Biryani",
    "price": 299.00
}
```
- `file`: [Select Image File]

### 6. Delete Food (Admin Only)
**Method:** `DELETE`
**URL:** `http://localhost:8080/api/food/{foodId}`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
```

## Cart Management Endpoints

### 7. Get Cart
**Method:** `GET`
**URL:** `http://localhost:8080/api/cart`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
```
**Response:**
```json
{
    "id": "cart123",
    "userId": "user123",
    "items": [
        {
            "foodId": "food123",
            "quantity": 2,
            "price": 299.0,
            "food": {
                "id": "food123",
                "name": "Chicken Biryani",
                "description": "Aromatic basmati rice",
                "category": "Biryani",
                "price": 299.0,
                "imageUrl": "http://localhost:8080/uploads/image.jpg"
            }
        }
    ],
    "totalAmount": 598.0
}
```

### 8. Add to Cart
**Method:** `POST`
**URL:** `http://localhost:8080/api/cart`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
Content-Type: application/json
```
**Body (JSON):**
```json
{
    "foodId": "food123"
}
```

### 9. Remove from Cart
**Method:** `POST`
**URL:** `http://localhost:8080/api/cart/remove`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
Content-Type: application/json
```
**Body (JSON):**
```json
{
    "foodId": "food123"
}
```

### 10. Clear Cart
**Method:** `DELETE`
**URL:** `http://localhost:8080/api/cart`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
```

## Order Management Endpoints

### 11. Create Order
**Method:** `POST`
**URL:** `http://localhost:8080/api/order`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
Content-Type: application/json
```
**Body (JSON):**
```json
{
    "orderedItems": [
        {
            "foodId": "food123",
            "price": 299.0,
            "quantity": 2
        }
    ],
    "userAddress": "123 Main Street, Visakhapatnam, AP 530001",
    "email": "john@example.com",
    "phoneNumber": "9876543210",
    "amount": "598",
    "orderStatus": "Pending"
}
```

### 12. Get User Orders
**Method:** `GET`
**URL:** `http://localhost:8080/api/order/user`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
```

### 13. Get All Orders (Admin Only)
**Method:** `GET`
**URL:** `http://localhost:8080/api/order/all`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
```

### 14. Update Order Status (Admin Only)
**Method:** `PUT`
**URL:** `http://localhost:8080/api/order/{orderId}/status`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
Content-Type: application/json
```
**Body (JSON):**
```json
{
    "status": "Confirmed"
}
```
**Available Statuses:**
- `Pending`
- `Confirmed`
- `Preparing`
- `Out for delivery`
- `Delivered`
- `Cancelled`

### 15. Delete Order (Admin Only)
**Method:** `DELETE`
**URL:** `http://localhost:8080/api/order/{orderId}`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
```

### 16. Verify Payment
**Method:** `POST`
**URL:** `http://localhost:8080/api/order/verify-payment`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
Content-Type: application/json
```
**Body (JSON):**
```json
{
    "razorpay_order_id": "order_Q3mYUskF6fSrz9",
    "razorpay_signature": "test_signature_hash",
    "razorpay_payment_id": "pay_Q3mYVskF6fSrz9"
}
```

## User Management Endpoints

### 17. Get User Profile
**Method:** `GET`
**URL:** `http://localhost:8080/api/user/profile`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
```

### 18. Update User Profile
**Method:** `PUT`
**URL:** `http://localhost:8080/api/user/profile`
**Headers:**
```
Authorization: Bearer {your-jwt-token}
Content-Type: application/json
```
**Body (JSON):**
```json
{
    "name": "John Doe Updated",
    "mobile": "9876543211"
}
```

## Environment Variables for Postman

Create these variables in your Postman environment:

```
baseUrl: http://localhost:8080/api
authToken: {JWT token from login response}
```

## Sample Headers Template

For authenticated requests:
```
Authorization: Bearer {{authToken}}
Content-Type: application/json
```

For file uploads:
```
Authorization: Bearer {{authToken}}
Content-Type: multipart/form-data
```

## Error Response Format

All endpoints return errors in this format:
```json
{
    "message": "Error description",
    "status": 400,
    "timestamp": "2024-01-15T10:30:00Z"
}
```

## Testing Steps

1. **Start your Spring Boot backend** on `http://localhost:8080`
2. **Register a new user** using the register endpoint
3. **Login** to get the JWT token
4. **Set the token** in Postman environment as `authToken`
5. **Test other endpoints** using the token

## Quick Test Sequence

1. Register: `POST /auth/register`
2. Login: `POST /auth/login` (save the token)
3. Get Foods: `GET /food`
4. Add to Cart: `POST /cart`
5. Get Cart: `GET /cart`
6. Create Order: `POST /order`
7. Get Orders: `GET /order/user`

## Notes

- Make sure your Spring Boot application is running on port 8080
- All endpoints except register and login require authentication
- Admin endpoints require a user with admin role
- File uploads should use multipart/form-data
- JWT tokens expire based on your backend configuration