import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  isDarkMode: boolean;
  isMobile?: boolean;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  isDarkMode,
  isMobile = false
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const activeTab = categories.find(cat => cat.id === activeCategory);

  const tabVariants = {
    inactive: { 
      scale: 1,
      backgroundColor: isDarkMode ? '#374151' : '#f3f4f6'
    },
    active: { 
      scale: 1.05,
      backgroundColor: isDarkMode ? '#ea580c' : '#ea580c'
    },
    hover: { 
      scale: 1.02,
      y: -2
    }
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  if (isMobile) {
    return (
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          } shadow-lg`}
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{activeTab?.icon}</span>
            <span className="font-semibold">{activeTab?.name}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              {activeTab?.count}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>

        {isDropdownOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`absolute top-full left-0 right-0 mt-2 rounded-2xl border-2 shadow-2xl z-50 ${
              isDarkMode
                ? 'bg-gray-800 border-gray-600'
                : 'bg-white border-gray-200'
            } overflow-hidden`}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ backgroundColor: isDarkMode ? '#4b5563' : '#f9fafb' }}
                onClick={() => {
                  onCategoryChange(category.id);
                  setIsDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between p-4 transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : isDarkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeCategory === category.id
                    ? 'bg-white/20 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-wrap gap-3 justify-center"
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          variants={tabVariants}
          initial="inactive"
          animate={activeCategory === category.id ? "active" : "inactive"}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center space-x-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
            activeCategory === category.id
              ? 'text-white'
              : isDarkMode
                ? 'text-gray-300 hover:text-white'
                : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          <span className="text-xl">{category.icon}</span>
          <span>{category.name}</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            activeCategory === category.id
              ? 'bg-white/20 text-white'
              : isDarkMode
                ? 'bg-gray-600 text-gray-300'
                : 'bg-gray-200 text-gray-600'
          }`}>
            {category.count}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategoryTabs;