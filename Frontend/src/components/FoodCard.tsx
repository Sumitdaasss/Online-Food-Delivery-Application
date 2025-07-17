import React from 'react';
import { Star, Plus, Minus, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { FoodItem } from '../types';
import { useAddToCart, useRemoveFromCart, useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './ui/LoadingSpinner';

interface FoodCardProps {
  item: FoodItem;
  index?: number;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, index = 0 }) => {
  const { isAuthenticated } = useAuth();
  const { data: cart } = useCart();
  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveFromCart();

  const cartItem = cart?.items?.find(cartItem => cartItem.foodId === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return;
    }
    addToCartMutation.mutate(item.id);
  };

  const handleRemoveFromCart = () => {
    if (!isAuthenticated) return;
    removeFromCartMutation.mutate(item.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group relative"
    >
      {/* Floating sparkles */}
      <motion.div
        className="absolute -top-2 -right-2 z-10"
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-6 h-6 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
      
      <div className="relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={item.imageUrl || item.imageURL || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={item.name}
          className="w-full h-48 object-cover transition-transform duration-300"
        />
        
        {/* Floating food emoji */}
        <motion.div
          className="absolute top-2 left-2 text-2xl"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {item.category === 'Biryani' && '🍛'}
          {item.category === 'Burgers' && '🍔'}
          {item.category === 'Pizzas' && '🍕'}
          {item.category === 'Curries' && '🍛'}
          {item.category === 'Drinks' && '🥤'}
          {item.category === 'Desserts' && '🍰'}
          {item.category === 'Snacks' && '🍿'}
          {item.category === 'Pasta' && '🍝'}
        </motion.div>
        
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span>4.5</span>
        </div>
        <motion.div 
          className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
          whileHover={{ scale: 1.1 }}
        >
          {item.category}
        </motion.div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{item.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.1 }}
            >
              ₹{item.price}
            </motion.span>
          </div>
          
          {quantity > 0 ? (
            <motion.div 
              className="flex items-center space-x-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-2 border border-orange-200"
              whileHover={{ scale: 1.05 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRemoveFromCart}
                disabled={removeFromCartMutation.isPending}
                className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transition-all duration-200 disabled:opacity-50 shadow-md"
              >
                {removeFromCartMutation.isPending ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Minus className="w-4 h-4" />
                )}
              </motion.button>
              
              <motion.span 
                className="w-8 text-center font-bold text-orange-600 text-lg"
                key={quantity}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {quantity}
              </motion.span>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                disabled={addToCartMutation.isPending}
                className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transition-all duration-200 disabled:opacity-50 shadow-md"
              >
                {addToCartMutation.isPending ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending || !isAuthenticated}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white p-3 rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {addToCartMutation.isPending ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-1" />
                  <span className="text-sm font-bold">Add</span>
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;