# Foodies API - Postman Examples

## Base URL
```
https://your-backend-domain.com/api
```

## Authentication Endpoints

### 1. Register User
```
POST https://your-backend-domain.com/api/register
Content-Type: application/json

{
    "name": "John Doe",
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
        "role": "user"
    }
}
```

### 2. Login User
```
POST https://your-backend-domain.com/api/login
Content-Type: application/json

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
        "role": "user"
    }
}
```

## Food Management Endpoints

### 3. Get All Foods
```
GET https://your-backend-domain.com/api/foods
```

**Response:**
```json
[
    {
        "id": "6869001fbd712f0c6557ceb9",
        "name": "Chicken Biryani",
        "description": "Aromatic basmati rice with tender chicken pieces",
        "category": "Biryani",
        "price": 299.0,
        "imageUrl": "https://example.com/chicken-biryani.jpg",
        "createdAt": "2024-01-15T10:30:00Z"
    }
]
```

### 4. Get Single Food
```
GET https://your-backend-domain.com/api/foods/6869001fbd712f0c6557ceb9
```

### 5. Add Food (Admin Only)
```
POST https://your-backend-domain.com/api/foods
Authorization: Bearer {your-jwt-token}
Content-Type: multipart/form-data

Form Data:
- food: {
    "name": "Chicken Biryani",
    "description": "Aromatic basmati rice with tender chicken",
    "category": "Biryani",
    "price": 299.00
  }
- file: [Select Image File]
```

### 6. Delete Food (Admin Only)
```
DELETE https://your-backend-domain.com/api/foods/6869001fbd712f0c6557ceb9
Authorization: Bearer {your-jwt-token}
```

## Cart Management Endpoints

### 7. Get Cart
```
GET https://your-backend-domain.com/api/cart
Authorization: Bearer {your-jwt-token}
```

**Response:**
```json
{
    "id": "cart123",
    "userId": "user123",
    "items": [
        {
            "foodId": "6869001fbd712f0c6557ceb9",
            "quantity": 2,
            "price": 299.0,
            "food": {
                "id": "6869001fbd712f0c6557ceb9",
                "name": "Chicken Biryani",
                "description": "Aromatic basmati rice",
                "category": "Biryani",
                "price": 299.0,
                "imageUrl": "https://example.com/image.jpg"
            }
        }
    ],
    "totalAmount": 598.0
}
```

### 8. Add to Cart
```
POST https://your-backend-domain.com/api/cart
Authorization: Bearer {your-jwt-token}
Content-Type: application/json

{
    "foodId": "6869001fbd712f0c6557ceb9"
}
```

### 9. Remove from Cart
```
POST https://your-backend-domain.com/api/cart/remove
Authorization: Bearer {your-jwt-token}
Content-Type: application/json

{
    "foodId": "6869001fbd712f0c6557ceb9"
}
```

### 10. Clear Cart
```
DELETE https://your-backend-domain.com/api/cart
Authorization: Bearer {your-jwt-token}
```

## Order Management Endpoints

### 11. Create Order (Updated Structure)
```
POST https://your-backend-domain.com/api/orders/create
Authorization: Bearer {your-jwt-token}
Content-Type: application/json

{
    "orderedItems": [
        {
            "foodId": "6869001fbd712f0c6557ceb9",
            "price": 350.0,
            "quantity": 2
        }
    ],
    "userAddress": "Visakhapatnam",
    "email": "sumit@example.com",
    "phoneNumber": "1234567890",
    "amount": "700",
    "orderStatus": "Pending"
}
```

**Response:**
```json
{
    "id": "order123",
    "userId": "user123",
    "orderedItems": [
        {
            "foodId": "6869001fbd712f0c6557ceb9",
            "price": 350.0,
            "quantity": 2,
            "food": {
                "id": "6869001fbd712f0c6557ceb9",
                "name": "Chicken Biryani",
                "description": "Aromatic basmati rice",
                "category": "Biryani",
                "price": 350.0,
                "imageUrl": "https://example.com/image.jpg"
            }
        }
    ],
    "userAddress": "Visakhapatnam",
    "email": "sumit@example.com",
    "phoneNumber": "1234567890",
    "amount": 700,
    "orderStatus": "Pending",
    "createdAt": "2024-01-15T10:30:00Z"
}
```

### 12. Get User Orders
```
GET https://your-backend-domain.com/api/orders
Authorization: Bearer {your-jwt-token}
```

**Response:**
```json
[
    {
        "id": "order123",
        "userId": "user123",
        "orderedItems": [
            {
                "foodId": "6869001fbd712f0c6557ceb9",
                "price": 350.0,
                "quantity": 2,
                "food": {
                    "id": "6869001fbd712f0c6557ceb9",
                    "name": "Chicken Biryani",
                    "description": "Aromatic basmati rice",
                    "category": "Biryani",
                    "price": 350.0,
                    "imageUrl": "https://example.com/image.jpg"
                }
            }
        ],
        "userAddress": "Visakhapatnam",
        "email": "sumit@example.com",
        "phoneNumber": "1234567890",
        "amount": 700,
        "orderStatus": "Preparing",
        "createdAt": "2024-01-15T10:30:00Z"
    }
]
```

### 13. Get All Orders (Admin Only)
```
GET https://your-backend-domain.com/api/orders/all
Authorization: Bearer {your-jwt-token}
```

### 14. Update Order Status (Admin Only)
```
PATCH https://your-backend-domain.com/api/orders/status/order123?status=Out for delivery
Authorization: Bearer {your-jwt-token}
```

**Available Order Statuses:**
- `Pending`
- `Confirmed`
- `Preparing`
- `Out for delivery`
- `Delivered`
- `Cancelled`

### 15. Delete Order (Admin Only)
```
DELETE https://your-backend-domain.com/api/orders/order123
Authorization: Bearer {your-jwt-token}
```

### 16. Verify Payment
```
POST https://your-backend-domain.com/api/orders/verify
Authorization: Bearer {your-jwt-token}
Content-Type: application/json

{
    "razorpay_order_id": "order_Q3mYUskF6fSrz9",
    "razorpay_signature": "test_signature_hash",
    "razorpay_payment_id": "pay_Q3mYVskF6fSrz9"
}
```

## Frontend Data Structure Examples

### Food Item Structure
```json
{
    "id": "6869001fbd712f0c6557ceb9",
    "name": "Chicken Biryani",
    "description": "Aromatic basmati rice with tender chicken pieces and traditional spices",
    "category": "Biryani",
    "price": 299,
    "imageUrl": "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg",
    "createdAt": "2024-01-15T10:30:00Z"
}
```

### Cart Item Structure
```json
{
    "foodId": "6869001fbd712f0c6557ceb9",
    "food": {
        "id": "6869001fbd712f0c6557ceb9",
        "name": "Chicken Biryani",
        "description": "Aromatic basmati rice",
        "category": "Biryani",
        "price": 299,
        "imageUrl": "https://example.com/image.jpg"
    },
    "quantity": 2,
    "price": 299
}
```

### Order Item Structure
```json
{
    "foodId": "6869001fbd712f0c6557ceb9",
    "price": 350.0,
    "quantity": 2,
    "food": {
        "id": "6869001fbd712f0c6557ceb9",
        "name": "Chicken Biryani",
        "description": "Aromatic basmati rice",
        "category": "Biryani",
        "price": 350.0,
        "imageUrl": "https://example.com/image.jpg"
    }
}
```

## Environment Variables for Postman

Create these variables in your Postman environment:

```
baseUrl: https://your-backend-domain.com/api
authToken: {JWT token from login response}
```

## Sample Headers

For authenticated requests, always include:
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

## Food Categories Available

- **Biryani** 🍛 - Traditional rice dishes
- **Burgers** 🍔 - Juicy burgers and sandwiches  
- **Pizzas** 🍕 - Italian pizzas with various toppings
- **Curries** 🍛 - Indian curry dishes
- **Drinks** 🥤 - Beverages and refreshments
- **Desserts** 🍰 - Sweet treats and desserts
- **Snacks** 🍿 - Light bites and appetizers
- **Pasta** 🍝 - Italian pasta dishes

## Testing Notes

1. **Authentication**: Always obtain a token via login before testing protected endpoints
2. **Food IDs**: Use actual food IDs from the GET /foods endpoint
3. **Order Status**: Only admins can update order status
4. **File Uploads**: Use actual image files for food creation
5. **Address Format**: Use complete addresses like "123 Main Street, City, State, Pincode"

## Sample Test Data

### Test Users
```json
{
    "admin": {
        "email": "admin@test.com",
        "password": "123456"
    },
    "user": {
        "email": "user@test.com", 
        "password": "123456"
    }
}
```

### Sample Order Creation
```json
{
    "orderedItems": [
        {"foodId": "6869001fbd712f0c6557ceb9", "price": 299.0, "quantity": 1},
        {"foodId": "6869001fbd712f0c6557ceb8", "price": 179.0, "quantity": 2}
    ],
    "userAddress": "123 MG Road, Visakhapatnam, Andhra Pradesh 530001",
    "email": "sumit@example.com",
    "phoneNumber": "9876543210",
    "amount": "657",
    "orderStatus": "Pending"
}
```