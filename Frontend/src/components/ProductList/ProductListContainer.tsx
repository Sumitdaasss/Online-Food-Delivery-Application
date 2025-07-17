import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Filter, Grid, List } from 'lucide-react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import CategoryTabs from './CategoryTabs';
import DarkModeToggle from './DarkModeToggle';

// Sample product data
const sampleProducts = [
  {
    id: '1',
    name: 'Delicious Burger',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'fast-food',
    rating: 4.5,
    description: 'Juicy beef patty with fresh lettuce, tomatoes, and our special sauce',
    badge: 'Popular'
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    price: 15.99,
    image: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'fast-food',
    rating: 4.8,
    description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil',
    badge: 'Chef\'s Choice'
  },
  {
    id: '3',
    name: 'Fresh Orange Juice',
    price: 4.99,
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'beverages',
    rating: 4.2,
    description: 'Freshly squeezed orange juice packed with vitamin C'
  },
  {
    id: '4',
    name: 'Chocolate Cake',
    price: 8.99,
    image: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'desserts',
    rating: 4.9,
    description: 'Rich chocolate cake with creamy frosting and chocolate chips',
    badge: 'New'
  },
  {
    id: '5',
    name: 'Caesar Salad',
    price: 9.99,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'healthy',
    rating: 4.3,
    description: 'Fresh romaine lettuce with parmesan cheese and croutons'
  },
  {
    id: '6',
    name: 'Iced Coffee',
    price: 3.99,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'beverages',
    rating: 4.4,
    description: 'Cold brew coffee with ice and your choice of milk'
  },
  {
    id: '7',
    name: 'Chicken Tacos',
    price: 11.99,
    image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'fast-food',
    rating: 4.6,
    description: 'Three soft tacos with grilled chicken, salsa, and avocado'
  },
  {
    id: '8',
    name: 'Strawberry Smoothie',
    price: 6.99,
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'beverages',
    rating: 4.7,
    description: 'Creamy smoothie made with fresh strawberries and yogurt'
  },
  {
    id: '9',
    name: 'Tiramisu',
    price: 7.99,
    image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'desserts',
    rating: 4.8,
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone'
  },
  {
    id: '10',
    name: 'Quinoa Bowl',
    price: 13.99,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'healthy',
    rating: 4.4,
    description: 'Nutritious quinoa bowl with roasted vegetables and tahini dressing'
  }
];

const categories = [
  { id: 'all', name: 'All Items', icon: '🍽️', count: 0 },
  { id: 'fast-food', name: 'Fast Food', icon: '🍔', count: 0 },
  { id: 'beverages', name: 'Beverages', icon: '🥤', count: 0 },
  { id: 'desserts', name: 'Desserts', icon: '🍰', count: 0 },
  { id: 'healthy', name: 'Healthy', icon: '🥗', count: 0 }
];

const ProductListContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = sampleProducts;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, activeCategory]);

  // Update category counts
  const categoriesWithCounts = useMemo(() => {
    return categories.map(category => ({
      ...category,
      count: category.id === 'all' 
        ? sampleProducts.length 
        : sampleProducts.filter(product => product.category === category.id).length
    }));
  }, []);

  const handleAddToCart = (product: any) => {
    setCart(prev => [...prev, product]);
    // You can add toast notification here
    console.log('Added to cart:', product.name);
  };

  const handleViewDetails = (product: any) => {
    console.log('View details:', product.name);
    // You can open a modal or navigate to product details page
  };

  const handleToggleFavorite = (product: any) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(product.id)) {
        newFavorites.delete(product.id);
      } else {
        newFavorites.add(product.id);
      }
      return newFavorites;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <ShoppingBag className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Product Catalog
              </h1>
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Discover amazing products
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className={`flex items-center rounded-xl p-1 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-orange-500 text-white'
                    : isDarkMode
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-orange-500 text-white'
                    : isDarkMode
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <DarkModeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <CategoryTabs
            categories={categoriesWithCounts}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            isDarkMode={isDarkMode}
            isMobile={isMobile}
          />
        </div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Showing {filteredProducts.length} products
            {searchTerm && (
              <span> for "<span className="font-semibold text-orange-500">{searchTerm}</span>"</span>
            )}
          </p>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${searchTerm}-${viewMode}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isDarkMode={isDarkMode}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.has(product.id)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className={`text-6xl mb-4`}>🔍</div>
            <h3 className={`text-2xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              No products found
            </h3>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Try adjusting your search or filter criteria
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed bottom-6 right-6 p-4 rounded-2xl shadow-2xl ${
              isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
            } border-2 z-50`}
          >
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-6 h-6 text-orange-500" />
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {cart.length} items in cart
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductListContainer;