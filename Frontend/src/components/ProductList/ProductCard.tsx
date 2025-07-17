import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Eye, Heart, Star, Sparkles } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  isDarkMode: boolean;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  isFavorite: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isDarkMode,
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
  isFavorite
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const menuVariants = {
    hidden: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const badgeVariants = {
    animate: {
      rotate: [0, -5, 5, -5, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={`relative group cursor-pointer ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
          : 'bg-white border-gray-200 hover:bg-gray-50'
      } rounded-2xl border-2 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Badge */}
      {product.badge && (
        <motion.div
          variants={badgeVariants}
          animate="animate"
          className="absolute top-3 left-3 z-20 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
        >
          {product.badge}
        </motion.div>
      )}

      {/* Floating Sparkle */}
      <motion.div
        variants={sparkleVariants}
        animate="animate"
        className="absolute top-3 right-3 z-20"
      >
        <Sparkles className={`w-5 h-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'} opacity-70`} />
      </motion.div>

      {/* Favorite Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(product);
        }}
        className={`absolute top-3 right-12 z-20 p-2 rounded-full transition-all duration-200 ${
          isFavorite 
            ? 'bg-red-500 text-white' 
            : isDarkMode 
              ? 'bg-gray-700 text-gray-300 hover:bg-red-500 hover:text-white' 
              : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
        } shadow-lg`}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
      </motion.button>

      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${
          isDarkMode ? 'from-gray-900/50 to-transparent' : 'from-black/20 to-transparent'
        }`} />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} line-clamp-1`}>
            {product.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {product.rating}
            </span>
          </div>
        </div>
        
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-2`}>
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className={`text-2xl font-bold ${
            isDarkMode ? 'text-green-400' : 'text-green-600'
          }`}>
            ${product.price}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            isDarkMode 
              ? 'bg-gray-700 text-gray-300' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {product.category}
          </span>
        </div>
      </div>

      {/* Hover Menu */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`absolute bottom-4 left-4 right-4 ${
              isDarkMode 
                ? 'bg-gray-900/95 border-gray-600' 
                : 'bg-white/95 border-gray-200'
            } backdrop-blur-sm border rounded-xl p-4 shadow-2xl z-30`}
          >
            <div className="flex items-center justify-between space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(product);
                }}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </div>
            
            <div className={`mt-3 pt-3 border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Price: <span className="font-bold">${product.price}</span>
                </span>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Rating: <span className="font-bold">{product.rating}/5</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductCard;