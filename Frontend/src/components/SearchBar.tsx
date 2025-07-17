import React, { useState, useEffect } from 'react';
import { Search, X, Filter, TrendingUp, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFoods } from '../hooks/useFoods';
import { FoodItem } from '../types';

interface SearchBarProps {
  onSearchResults?: (results: FoodItem[]) => void;
  onSearchTermChange?: (term: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchResults,
  onSearchTermChange,
  placeholder = "Search for delicious food... 🍕",
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const { data: foods } = useFoods();

  // Popular search terms
  const popularSearches = [
    'Biryani', 'Pizza', 'Burger', 'Chicken', 'Desserts', 'Drinks'
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Search functionality
  useEffect(() => {
    if (!foods || !searchTerm.trim()) {
      setSearchResults([]);
      onSearchResults?.([]);
      return;
    }

    const filtered = foods.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filtered);
    onSearchResults?.(filtered);
  }, [searchTerm, foods, onSearchResults]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchTermChange?.(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSearchSubmit = (term: string) => {
    if (term.trim()) {
      // Add to recent searches
      const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowSuggestions(false);
    onSearchResults?.([]);
    onSearchTermChange?.('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    handleSearchSubmit(suggestion);
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Main Search Input */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className={`relative transition-all duration-300 ${
          isSearchFocused 
            ? 'transform scale-105 shadow-2xl' 
            : 'shadow-lg hover:shadow-xl'
        }`}>
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
            isSearchFocused ? 'text-orange-500' : 'text-gray-400'
          }`} />
          
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => {
              setIsSearchFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setIsSearchFocused(false);
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit(searchTerm);
              }
            }}
            placeholder={placeholder}
            className={`w-full pl-12 pr-12 py-4 text-lg font-medium rounded-2xl border-2 transition-all duration-300 bg-white/95 backdrop-blur-sm ${
              isSearchFocused
                ? 'border-orange-500 ring-4 ring-orange-500/20 bg-white'
                : 'border-gray-300 hover:border-orange-300'
            } focus:outline-none placeholder-gray-500`}
          />
          
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </motion.button>
          )}
        </div>

        {/* Search Results Count */}
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 text-center"
          >
            <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (isSearchFocused || searchTerm) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
          >
            {/* Search Results */}
            {searchTerm && searchResults.length > 0 && (
              <div className="p-4">
                <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <Search className="w-4 h-4 mr-2 text-orange-500" />
                  Search Results
                </h4>
                <div className="space-y-2">
                  {searchResults.slice(0, 5).map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02, x: 5 }}
                      onClick={() => handleSuggestionClick(item.name)}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-orange-50 cursor-pointer transition-all duration-200"
                    >
                      <img
                        src={item.imageUrl || item.imageURL || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100'}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                        <p className="text-sm text-gray-500">{item.category} • ₹{item.price}</p>
                      </div>
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {searchTerm && searchResults.length === 0 && (
              <div className="p-6 text-center">
                <div className="text-4xl mb-2">🔍</div>
                <h4 className="font-medium text-gray-900 mb-1">No results found</h4>
                <p className="text-sm text-gray-500">Try searching for something else</p>
              </div>
            )}

            {/* Recent Searches */}
            {!searchTerm && recentSearches.length > 0 && (
              <div className="p-4 border-b border-gray-100">
                <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  Recent Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSuggestionClick(search)}
                      className="px-3 py-2 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      {search}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            {!searchTerm && (
              <div className="p-4">
                <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-orange-500" />
                  Popular Searches
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {popularSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSuggestionClick(search)}
                      className="p-3 bg-gradient-to-r from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100 text-gray-700 hover:text-orange-700 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                    >
                      {search}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;