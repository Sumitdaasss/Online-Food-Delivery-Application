import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFoods } from '../hooks/useFoods';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import EmptyState from '../components/ui/EmptyState';
import { FoodItem } from '../types';

const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const { data: foods, isLoading, error } = useFoods();

  const categories = useMemo(() => {
    if (!foods) return ['All'];
    const uniqueCategories = Array.from(new Set(foods.map(food => food.category)));
    return ['All', ...uniqueCategories];
  }, [foods]);

  const filteredItems = useMemo(() => {
    // If searching, use search results; otherwise use all foods
    const itemsToFilter = isSearching ? searchResults : (foods || []);

    let filtered = itemsToFilter;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(item => 
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    // Sort items
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [foods, searchResults, isSearching, selectedCategory, sortBy, priceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const handleSearchResults = (results: FoodItem[]) => {
    setSearchResults(results);
  };

  const handleSearchTermChange = (term: string) => {
    setIsSearching(term.length > 0);
    if (!term) {
      setSearchResults([]);
    }
  };

  const clearFilters = () => {
    setSearchResults([]);
    setIsSearching(false);
    setSelectedCategory('All');
    setSortBy('name');
    setPriceRange([0, 1000]);
    setSearchParams({});
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-lg font-medium text-gray-600">Loading menu items... 🍽️</p>
        </div>
      </div>
    );
  }

  // Don't show error page, just log it and continue
  if (error) {
    console.warn('Failed to load menu items, continuing with empty data:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Menu</h1>
          <p className="text-xl text-gray-600">Discover delicious meals from our extensive collection</p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar 
              onSearchResults={handleSearchResults}
              onSearchTermChange={handleSearchTermChange}
              placeholder="Search our delicious menu... 🍽️"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors duration-200"
            >
              Clear All
            </button>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t pt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="flex-1"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-gray-600 text-lg">
            Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {isSearching && ` from search results`}
          </p>
        </motion.div>

        {/* Food Items Grid */}
        {filteredItems.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredItems.map((item, index) => (
              <FoodCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        ) : (
          <EmptyState
            icon={Filter}
            title={isSearching ? "No search results" : "No items found"}
            description={isSearching ? "Try searching for something else or browse our categories." : "No items match your current filters. Try adjusting your search criteria."}
            action={{
              label: 'Clear Filters',
              onClick: clearFilters
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MenuPage;