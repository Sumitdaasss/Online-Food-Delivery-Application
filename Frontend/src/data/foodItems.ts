import { FoodItem } from '../contexts/CartContext';

export const foodItems: FoodItem[] = [
  // Biryani
  {
    id: '1',
    name: 'Chicken Biryani',
    price: 299,
    category: 'Biryani',
    imageURL: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Aromatic basmati rice with tender chicken pieces and traditional spices',
    rating: 4.5
  },
  {
    id: '2',
    name: 'Mutton Biryani',
    price: 399,
    category: 'Biryani',
    imageURL: 'https://images.pexels.com/photos/15146310/pexels-photo-15146310.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Rich and flavorful mutton biryani with saffron and ghee',
    rating: 4.7
  },
  {
    id: '3',
    name: 'Veg Biryani',
    price: 199,
    category: 'Biryani',
    imageURL: 'https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Delicious vegetable biryani with mixed vegetables and aromatic spices',
    rating: 4.2
  },
  // Burgers
  {
    id: '4',
    name: 'Classic Chicken Burger',
    price: 179,
    category: 'Burgers',
    imageURL: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Juicy chicken patty with lettuce, tomato, and our special sauce',
    rating: 4.3
  },
  {
    id: '5',
    name: 'Veggie Burger',
    price: 149,
    category: 'Burgers',
    imageURL: 'https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh vegetable patty with avocado and crispy lettuce',
    rating: 4.0
  },
  {
    id: '6',
    name: 'Cheese Burger',
    price: 199,
    category: 'Burgers',
    imageURL: 'https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Beef patty with melted cheese, onions, and pickles',
    rating: 4.4
  },
  // Pizzas
  {
    id: '7',
    name: 'Margherita Pizza',
    price: 249,
    category: 'Pizzas',
    imageURL: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    rating: 4.6
  },
  {
    id: '8',
    name: 'Pepperoni Pizza',
    price: 299,
    category: 'Pizzas',
    imageURL: 'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Spicy pepperoni with mozzarella cheese and tomato sauce',
    rating: 4.5
  },
  {
    id: '9',
    name: 'Veggie Supreme Pizza',
    price: 279,
    category: 'Pizzas',
    imageURL: 'https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Loaded with bell peppers, mushrooms, onions, and olives',
    rating: 4.3
  },
  // Drinks
  {
    id: '10',
    name: 'Fresh Lime Soda',
    price: 79,
    category: 'Drinks',
    imageURL: 'https://images.pexels.com/photos/1542252/pexels-photo-1542252.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Refreshing lime soda with mint leaves',
    rating: 4.1
  },
  {
    id: '11',
    name: 'Mango Lassi',
    price: 99,
    category: 'Drinks',
    imageURL: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Creamy mango lassi made with fresh mangoes',
    rating: 4.4
  },
  {
    id: '12',
    name: 'Masala Chai',
    price: 49,
    category: 'Drinks',
    imageURL: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Traditional Indian spiced tea with milk',
    rating: 4.2
  },
  // Indian Curries
  {
    id: '13',
    name: 'Butter Chicken',
    price: 249,
    category: 'Curries',
    imageURL: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Creamy tomato-based chicken curry with aromatic spices',
    rating: 4.8
  },
  {
    id: '14',
    name: 'Paneer Makhani',
    price: 199,
    category: 'Curries',
    imageURL: 'https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Rich and creamy paneer curry in tomato gravy',
    rating: 4.5
  },
  {
    id: '15',
    name: 'Dal Tadka',
    price: 129,
    category: 'Curries',
    imageURL: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Yellow lentils tempered with cumin and spices',
    rating: 4.3
  },
  // Desserts
  {
    id: '16',
    name: 'Gulab Jamun',
    price: 89,
    category: 'Desserts',
    imageURL: 'https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Soft and spongy milk dumplings in sugar syrup',
    rating: 4.6
  },
  {
    id: '17',
    name: 'Chocolate Brownie',
    price: 119,
    category: 'Desserts',
    imageURL: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Rich chocolate brownie with vanilla ice cream',
    rating: 4.4
  },
  {
    id: '18',
    name: 'Kulfi',
    price: 69,
    category: 'Desserts',
    imageURL: 'https://images.pexels.com/photos/1625894/pexels-photo-1625894.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Traditional Indian ice cream with cardamom and pistachios',
    rating: 4.5
  }
];

export const categories = [
  'All',
  'Biryani',
  'Burgers',
  'Pizzas',
  'Curries',
  'Drinks',
  'Desserts'
];