import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Clock, Star, TrendingUp, ArrowRight, Sparkles, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFoods } from '../hooks/useFoods';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import FloatingFoodElements from '../components/FloatingFoodElements';
import OffersSection from '../components/OffersSection';
import CategoriesShowcase from '../components/CategoriesShowcase';
import SettingsPanel from '../components/SettingsPanel';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import { FoodItem } from '../types';

const HomePage: React.FC = () => {
  const [showSettings, setShowSettings] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<FoodItem[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const { data: foods, isLoading, error } = useFoods();

  const featuredItems = foods?.slice(0, 6) || [];
  const trendingItems = foods?.slice(6, 10) || [];
  
  const categories = [
    'Biryani', 'Burgers', 'Pizzas', 'Curries', 'Drinks', 'Desserts'
  ];

  const handleSearchResults = (results: FoodItem[]) => {
    setSearchResults(results);
  };

  const handleSearchTermChange = (term: string) => {
    setIsSearching(term.length > 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-lg font-medium text-gray-600">Loading delicious food... 🍕</p>
        </div>
      </div>
    );
  }

  // Don't show error page, just log it and continue with empty data
  if (error) {
    console.warn('Failed to load foods, continuing with empty data:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FloatingFoodElements />
      
      {/* Settings Panel */}
      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
      
      {/* Floating Settings Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowSettings(true)}
        className="fixed bottom-6 right-6 z-30 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
      >
        <Settings className="w-6 h-6" />
      </motion.button>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-white py-20 overflow-hidden z-10">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating food elements in hero */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-20 text-6xl opacity-20"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🍕
          </motion.div>
          <motion.div
            className="absolute top-32 right-32 text-5xl opacity-25"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -15, 15, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            🍔
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-40 text-4xl opacity-20"
            animate={{ 
              y: [0, -10, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            🍜
          </motion.div>
          <motion.div
            className="absolute bottom-32 right-20 text-5xl opacity-30"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            🍰
          </motion.div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Delicious Food,
                <br />
                <span className="text-yellow-300 flex items-center">
                  Lightning Fast
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="ml-4"
                  >
                    ⚡
                  </motion.span>
                </span>
              </h1>
              <p className="text-xl mb-8 text-gray-100 leading-relaxed">
                Experience the finest culinary delights delivered fresh to your doorstep. 
                From local favorites to international cuisines, we've got it all.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/menu"
                    className="group bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 text-center flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>Order Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/menu"
                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-all duration-200 text-center flex items-center justify-center space-x-2"
                  >
                    <span>Explore Menu</span>
                    <span className="text-xl">🍽️</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Delicious Food"
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </div>
          
          {/* Hero Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <SearchBar 
              onSearchResults={handleSearchResults}
              onSearchTermChange={handleSearchTermChange}
              placeholder="What are you craving today? 🍕🍔🍜"
              className="max-w-3xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Search Results Section */}
      {isSearching && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Search Results</h2>
              <p className="text-xl text-gray-600">
                Found {searchResults.length} delicious {searchResults.length === 1 ? 'item' : 'items'} for you! 🎉
              </p>
            </motion.div>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.map((item, index) => (
                  <FoodCard key={item.id} item={item} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-8">Try searching for something else or browse our categories below</p>
                <Link
                  to="/menu"
                  className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-colors duration-200"
                >
                  <span>Browse All Items</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Offers Section */}
      {!isSearching && <OffersSection />}

      {/* Features Section */}
      {!isSearching && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Foodies?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're committed to delivering exceptional food experiences with unmatched quality, speed, and convenience.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: 'Lightning Fast',
                  description: 'Get your food delivered in 30 minutes or less, guaranteed fresh and hot.',
                  color: 'orange'
                },
                {
                  icon: ChefHat,
                  title: 'Premium Quality',
                  description: 'Partner with top restaurants to bring you the highest quality meals.',
                  color: 'green'
                },
                {
                  icon: Star,
                  title: 'Top Rated',
                  description: 'Rated #1 food delivery service with thousands of satisfied customers.',
                  color: 'blue'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center p-8 rounded-2xl hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm border border-white/20"
                >
                  <motion.div 
                    className={`w-20 h-20 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6 relative`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className={`w-10 h-10 text-${feature.color}-600`} />
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✨
                    </motion.div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Categories Section */}
      {!isSearching && <CategoriesShowcase />}

      {/* Featured Items Section */}
      {!isSearching && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Items</h2>
              <p className="text-xl text-gray-600">Try our most popular dishes loved by customers</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems.map((item, index) => (
                <FoodCard key={item.id} item={item} index={index} />
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/menu"
                className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <span>View All Items</span>
                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Trending Section */}
      {!isSearching && trendingItems.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
                <TrendingUp className="w-10 h-10 text-orange-600" />
                <span>Trending Now</span>
              </h2>
              <p className="text-xl text-gray-600">Highly rated items that customers can't get enough of</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {trendingItems.map((item, index) => (
                <FoodCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;