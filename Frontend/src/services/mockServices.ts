import { 
  FoodItem, 
  Cart, 
  Order, 
  User, 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  CreateOrderRequest 
} from '../types';
import { 
  mockFoodItems, 
  mockUsers, 
  getStoredCart, 
  saveCart, 
  getStoredOrders, 
  saveOrder, 
  getAllStoredOrders, 
  mockDelay 
} from './mockData';

// Mock Auth Service
export const mockAuthService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    await mockDelay();
    
    // Check stored users first
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const allUsers = [...mockUsers, ...storedUsers];
    
    const user = allUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // In a real app, you'd verify the password hash
    // For demo purposes, we'll accept any password for existing users
    const token = `mock_token_${Date.now()}`;
    
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'user',
      },
    };
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    await mockDelay();
    
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const allUsers = [...mockUsers, ...storedUsers];
    
    const existingUser = allUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: 'user',
    };

    storedUsers.push({ ...newUser, password: userData.password });
    localStorage.setItem('users', JSON.stringify(storedUsers));

    const token = `mock_token_${Date.now()}`;

    return {
      token,
      user: newUser,
    };
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};

// Mock Food Service
export const mockFoodService = {
  async getAllFoods(): Promise<FoodItem[]> {
    await mockDelay();
    return mockFoodItems;
  },

  async getFoodById(id: string): Promise<FoodItem> {
    await mockDelay();
    const food = mockFoodItems.find(f => f.id === id);
    if (!food) {
      throw new Error('Food item not found');
    }
    return food;
  },

  async createFood(formData: FormData): Promise<FoodItem> {
    await mockDelay();
    
    const foodData = JSON.parse(formData.get('food') as string);
    const file = formData.get('file') as File;
    
    const newFood: FoodItem = {
      id: `food_${Date.now()}`,
      ...foodData,
      imageUrl: file ? URL.createObjectURL(file) : 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      createdAt: new Date().toISOString(),
    };

    // In a real app, you'd save this to a database
    // For demo purposes, we'll just add it to the mock data temporarily
    mockFoodItems.push(newFood);
    
    return newFood;
  },

  async deleteFood(id: string): Promise<void> {
    await mockDelay();
    const index = mockFoodItems.findIndex(f => f.id === id);
    if (index === -1) {
      throw new Error('Food item not found');
    }
    mockFoodItems.splice(index, 1);
  },
};

// Mock Cart Service
export const mockCartService = {
  async getCart(): Promise<Cart> {
    await mockDelay();
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      throw new Error('User not authenticated');
    }

    return getStoredCart(user.id);
  },

  async addToCart(foodId: string): Promise<Cart> {
    await mockDelay();
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      throw new Error('User not authenticated');
    }

    const cart = getStoredCart(user.id);
    const food = mockFoodItems.find(f => f.id === foodId);
    
    if (!food) {
      throw new Error('Food item not found');
    }

    const existingItem = cart.items.find(item => item.foodId === foodId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        foodId,
        food,
        quantity: 1,
        price: food.price,
      });
    }

    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    saveCart(cart);
    
    return cart;
  },

  async removeFromCart(foodId: string): Promise<Cart> {
    await mockDelay();
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      throw new Error('User not authenticated');
    }

    const cart = getStoredCart(user.id);
    const itemIndex = cart.items.findIndex(item => item.foodId === foodId);
    
    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }

    const item = cart.items[itemIndex];
    
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    saveCart(cart);
    
    return cart;
  },

  async clearCart(): Promise<void> {
    await mockDelay();
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      throw new Error('User not authenticated');
    }

    const cart: Cart = {
      id: `cart_${user.id}`,
      userId: user.id,
      items: [],
      totalAmount: 0,
    };
    
    saveCart(cart);
  },
};

// Mock Order Service
export const mockOrderService = {
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    await mockDelay();
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      throw new Error('User not authenticated');
    }

    const order: Order = {
      id: `order_${Date.now()}`,
      userId: user.id,
      orderedItems: orderData.orderedItems.map(item => ({
        ...item,
        food: mockFoodItems.find(f => f.id === item.foodId),
      })),
      userAddress: orderData.userAddress,
      email: orderData.email,
      phoneNumber: orderData.phoneNumber,
      amount: parseInt(orderData.amount),
      orderStatus: orderData.orderStatus as Order['orderStatus'],
      createdAt: new Date().toISOString(),
    };

    saveOrder(order);
    
    // Clear cart after order
    await mockCartService.clearCart();
    
    return order;
  },

  async getUserOrders(): Promise<Order[]> {
    await mockDelay();
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      throw new Error('User not authenticated');
    }

    return getStoredOrders(user.id);
  },

  async getAllOrders(): Promise<Order[]> {
    await mockDelay();
    return getAllStoredOrders();
  },

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    await mockDelay();
    
    const allOrders = getAllStoredOrders();
    const order = allOrders.find(o => o.id === orderId);
    
    if (!order) {
      throw new Error('Order not found');
    }

    order.orderStatus = status as Order['orderStatus'];
    order.updatedAt = new Date().toISOString();

    // Update in localStorage
    const userOrders = getStoredOrders(order.userId);
    const orderIndex = userOrders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      userOrders[orderIndex] = order;
      localStorage.setItem(`orders_${order.userId}`, JSON.stringify(userOrders));
    }

    return order;
  },

  async deleteOrder(orderId: string): Promise<void> {
    await mockDelay();
    
    const allOrders = getAllStoredOrders();
    const order = allOrders.find(o => o.id === orderId);
    
    if (!order) {
      throw new Error('Order not found');
    }

    const userOrders = getStoredOrders(order.userId);
    const filteredOrders = userOrders.filter(o => o.id !== orderId);
    localStorage.setItem(`orders_${order.userId}`, JSON.stringify(filteredOrders));
  },

  async verifyPayment(): Promise<any> {
    await mockDelay();
    return { success: true, message: 'Payment verified successfully' };
  },
};