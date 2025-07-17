export interface User {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  role?: 'user' | 'admin';
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl?: string;
  imageURL?: string; // Alternative field name for backend compatibility
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  foodId: string;
  food?: FoodItem;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
}

export interface OrderItem {
  foodId: string;
  price: number;
  quantity: number;
  food?: FoodItem;
}

export interface Order {
  id: string;
  userId: string;
  orderedItems: OrderItem[];
  userAddress: string;
  email: string;
  phoneNumber: string;
  amount: number;
  orderStatus: 'Pending' | 'Confirmed' | 'Preparing' | 'Out for delivery' | 'Delivered' | 'Cancelled';
  createdAt: string;
  updatedAt?: string;
  razorpayOrderId?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  mobile?: string;
  password: string;
}

export interface CreateOrderRequest {
  orderedItems: OrderItem[];
  userAddress: string;
  email: string;
  phoneNumber: string;
  amount: string;
  orderStatus: string;
}

export interface PaymentVerificationRequest {
  razorpay_order_id: string;
  razorpay_signature: string;
  razorpay_payment_id: string;
}