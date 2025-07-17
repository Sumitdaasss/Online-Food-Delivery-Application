import { FoodItem, Cart, Order, User } from '../types';

// Enhanced mock food items data with more variety
export const mockFoodItems: FoodItem[] = [
  // Biryani
  {
    id: '1',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice with tender chicken pieces and traditional spices',
    category: 'Biryani',
    price: 299,
    imageUrl: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Mutton Biryani',
    description: 'Rich and flavorful mutton biryani with saffron and ghee',
    category: 'Biryani',
    price: 399,
    imageUrl: 'https://images.pexels.com/photos/15146310/pexels-photo-15146310.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Veg Biryani',
    description: 'Delicious vegetable biryani with mixed vegetables and aromatic spices',
    category: 'Biryani',
    price: 199,
    imageUrl: 'https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '16',
    name: 'Hyderabadi Biryani',
    description: 'Authentic Hyderabadi style biryani with dum cooking method',
    category: 'Biryani',
    price: 349,
    imageUrl: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '17',
    name: 'Prawn Biryani',
    description: 'Fresh prawns cooked with fragrant basmati rice and coastal spices',
    category: 'Biryani',
    price: 429,
    imageUrl: 'https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  
  // Burgers
  {
    id: '4',
    name: 'Classic Chicken Burger',
    description: 'Juicy chicken patty with lettuce, tomato, and our special sauce',
    category: 'Burgers',
    price: 179,
    imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Veggie Burger',
    description: 'Fresh vegetable patty with avocado and crispy lettuce',
    category: 'Burgers',
    price: 149,
    imageUrl: 'https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Cheese Burger',
    description: 'Beef patty with melted cheese, onions, and pickles',
    category: 'Burgers',
    price: 199,
    imageUrl: 'https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '18',
    name: 'BBQ Bacon Burger',
    description: 'Smoky BBQ sauce with crispy bacon and cheddar cheese',
    category: 'Burgers',
    price: 249,
    imageUrl: 'https://images.pexels.com/photos/1556698/pexels-photo-1556698.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '19',
    name: 'Mushroom Swiss Burger',
    description: 'Grilled mushrooms with Swiss cheese and garlic aioli',
    category: 'Burgers',
    price: 219,
    imageUrl: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  
  // Pizzas
  {
    id: '7',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    category: 'Pizzas',
    price: 249,
    imageUrl: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Pepperoni Pizza',
    description: 'Spicy pepperoni with mozzarella cheese and tomato sauce',
    category: 'Pizzas',
    price: 299,
    imageUrl: 'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Veggie Supreme Pizza',
    description: 'Loaded with bell peppers, mushrooms, onions, and olives',
    category: 'Pizzas',
    price: 279,
    imageUrl: 'https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '20',
    name: 'BBQ Chicken Pizza',
    description: 'Grilled chicken with BBQ sauce, red onions, and cilantro',
    category: 'Pizzas',
    price: 329,
    imageUrl: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '21',
    name: 'Four Cheese Pizza',
    description: 'Mozzarella, parmesan, gorgonzola, and ricotta cheese blend',
    category: 'Pizzas',
    price: 349,
    imageUrl: 'https://images.pexels.com/photos/365459/pexels-photo-365459.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '22',
    name: 'Hawaiian Pizza',
    description: 'Ham and pineapple with mozzarella cheese',
    category: 'Pizzas',
    price: 289,
    imageUrl: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  
  // Curries
  {
    id: '10',
    name: 'Butter Chicken',
    description: 'Creamy tomato-based chicken curry with aromatic spices',
    category: 'Curries',
    price: 249,
    imageUrl: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '11',
    name: 'Paneer Makhani',
    description: 'Rich and creamy paneer curry in tomato gravy',
    category: 'Curries',
    price: 199,
    imageUrl: 'https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '23',
    name: 'Chicken Tikka Masala',
    description: 'Grilled chicken in spiced curry sauce with cream',
    category: 'Curries',
    price: 269,
    imageUrl: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '24',
    name: 'Dal Tadka',
    description: 'Yellow lentils tempered with cumin and spices',
    category: 'Curries',
    price: 129,
    imageUrl: 'https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '25',
    name: 'Palak Paneer',
    description: 'Fresh spinach curry with cottage cheese cubes',
    category: 'Curries',
    price: 189,
    imageUrl: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  
  // Drinks
  {
    id: '12',
    name: 'Fresh Lime Soda',
    description: 'Refreshing lime soda with mint leaves',
    category: 'Drinks',
    price: 79,
    imageUrl: 'https://images.pexels.com/photos/1542252/pexels-photo-1542252.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '13',
    name: 'Mango Lassi',
    description: 'Creamy mango lassi made with fresh mangoes',
    category: 'Drinks',
    price: 99,
    imageUrl: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '26',
    name: 'Masala Chai',
    description: 'Traditional Indian spiced tea with milk',
    category: 'Drinks',
    price: 49,
    imageUrl: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '27',
    name: 'Cold Coffee',
    description: 'Iced coffee with milk and vanilla ice cream',
    category: 'Drinks',
    price: 89,
    imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '28',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice with pulp',
    category: 'Drinks',
    price: 69,
    imageUrl: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '29',
    name: 'Strawberry Milkshake',
    description: 'Thick strawberry milkshake with fresh strawberries',
    category: 'Drinks',
    price: 109,
    imageUrl: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  
  // Desserts
  {
    id: '14',
    name: 'Gulab Jamun',
    description: 'Soft and spongy milk dumplings in sugar syrup',
    category: 'Desserts',
    price: 89,
    imageUrl: 'https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '15',
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie with vanilla ice cream',
    category: 'Desserts',
    price: 119,
    imageUrl: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '30',
    name: 'Kulfi',
    description: 'Traditional Indian ice cream with cardamom and pistachios',
    category: 'Desserts',
    price: 69,
    imageUrl: 'https://images.pexels.com/photos/1625894/pexels-photo-1625894.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '31',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee and mascarpone',
    category: 'Desserts',
    price: 149,
    imageUrl: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '32',
    name: 'Cheesecake',
    description: 'New York style cheesecake with berry compote',
    category: 'Desserts',
    price: 139,
    imageUrl: 'https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '33',
    name: 'Rasmalai',
    description: 'Soft cottage cheese dumplings in sweetened milk',
    category: 'Desserts',
    price: 99,
    imageUrl: 'https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },

  // Snacks
  {
    id: '34',
    name: 'Samosa',
    description: 'Crispy triangular pastry filled with spiced potatoes',
    category: 'Snacks',
    price: 39,
    imageUrl: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '35',
    name: 'Spring Rolls',
    description: 'Crispy vegetable spring rolls with sweet chili sauce',
    category: 'Snacks',
    price: 79,
    imageUrl: 'https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '36',
    name: 'Chicken Wings',
    description: 'Spicy buffalo chicken wings with ranch dip',
    category: 'Snacks',
    price: 159,
    imageUrl: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '37',
    name: 'Nachos',
    description: 'Tortilla chips with cheese, jalapeños, and salsa',
    category: 'Snacks',
    price: 129,
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '38',
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese cubes with mint chutney',
    category: 'Snacks',
    price: 149,
    imageUrl: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },

  // Pasta
  {
    id: '39',
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with eggs, cheese, and pancetta',
    category: 'Pasta',
    price: 219,
    imageUrl: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '40',
    name: 'Penne Arrabbiata',
    description: 'Spicy tomato sauce with garlic and red chilies',
    category: 'Pasta',
    price: 189,
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '41',
    name: 'Chicken Alfredo',
    description: 'Creamy white sauce pasta with grilled chicken',
    category: 'Pasta',
    price: 249,
    imageUrl: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '42',
    name: 'Vegetable Lasagna',
    description: 'Layered pasta with vegetables and cheese',
    category: 'Pasta',
    price: 229,
    imageUrl: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
];

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@test.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'user@test.com',
    role: 'user',
  },
];

// Helper functions for localStorage operations
export const getStoredCart = (userId: string): Cart => {
  const stored = localStorage.getItem(`cart_${userId}`);
  if (stored) {
    return JSON.parse(stored);
  }
  
  return {
    id: `cart_${userId}`,
    userId,
    items: [],
    totalAmount: 0,
  };
};

export const saveCart = (cart: Cart): void => {
  localStorage.setItem(`cart_${cart.userId}`, JSON.stringify(cart));
};

export const getStoredOrders = (userId: string): Order[] => {
  const stored = localStorage.getItem(`orders_${userId}`);
  return stored ? JSON.parse(stored) : [];
};

export const saveOrder = (order: Order): void => {
  const existingOrders = getStoredOrders(order.userId);
  existingOrders.unshift(order);
  localStorage.setItem(`orders_${order.userId}`, JSON.stringify(existingOrders));
};

export const getAllStoredOrders = (): Order[] => {
  const allOrders: Order[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('orders_')) {
      const orders = JSON.parse(localStorage.getItem(key) || '[]');
      allOrders.push(...orders);
    }
  }
  return allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Mock API delay
export const mockDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};