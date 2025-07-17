import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isDarkMode: boolean;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  isDarkMode,
  placeholder = "Search products..."
}) => {
  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`} />
        
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-12 pr-12 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500/20'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500/20'
          } text-lg font-medium shadow-lg hover:shadow-xl`}
        />
        
        {searchTerm && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearSearch}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-all duration-200 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </div>
      
      {/* Search suggestions or results count */}
      {searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute top-full left-0 right-0 mt-2 p-3 rounded-xl shadow-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
          } border z-50`}
        >
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Searching for: <span className="font-semibold text-orange-500">"{searchTerm}"</span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;