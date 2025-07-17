import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, useAddToCart, useRemoveFromCart, useClearCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import EmptyState from '../components/ui/EmptyState';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data: cart, isLoading, error } = useCart();
  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveFromCart();
  const clearCartMutation = useClearCart();

  const deliveryFee = 49;
  const gstRate = 0.18;
  const subtotal = cart?.totalAmount || 0;
  const gst = Math.round(subtotal * gstRate);
  const totalAmount = subtotal + deliveryFee + gst;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <EmptyState
          icon={ShoppingBag}
          title="Please sign in"
          description="You need to be logged in to view your cart"
          action={{
            label: 'Sign In',
            onClick: () => navigate('/login')
          }}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-lg font-medium text-gray-600">Loading your cart... 🛒</p>
        </div>
      </div>
    );
  }

  // Don't show error page, just log it and continue
  if (error) {
    console.warn('Failed to load cart, continuing with empty cart:', error);
  }

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add some delicious items to get started!"
          action={{
            label: 'Browse Menu',
            onClick: () => navigate('/menu')
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-xl text-gray-600">Review your order before checkout</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Cart Items</h2>
                  <button
                    onClick={() => clearCartMutation.mutate()}
                    disabled={clearCartMutation.isPending}
                    className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center space-x-1 disabled:opacity-50"
                  >
                    {clearCartMutation.isPending ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        <span>Clear All</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                <AnimatePresence>
                  {cart.items.map((item, index) => (
                    <motion.div
                      key={item.foodId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.food?.imageUrl || item.food?.imageURL || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200'}
                          alt={item.food?.name || 'Food item'}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 truncate">
                            {item.food?.name || 'Unknown Item'}
                          </h3>
                          <p className="text-gray-500 text-sm truncate">
                            {item.food?.description || 'No description'}
                          </p>
                          <p className="text-orange-600 font-medium">₹{item.price}</p>
                        </div>

                        <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-2">
                          <button
                            onClick={() => removeFromCartMutation.mutate(item.foodId)}
                            disabled={removeFromCartMutation.isPending}
                            className="p-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200 disabled:opacity-50"
                          >
                            {removeFromCartMutation.isPending ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              <Minus className="w-4 h-4" />
                            )}
                          </button>
                          
                          <span className="w-8 text-center font-bold text-orange-600">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => addToCartMutation.mutate(item.foodId)}
                            disabled={addToCartMutation.isPending}
                            className="p-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200 disabled:opacity-50"
                          >
                            {addToCartMutation.isPending ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">₹{deliveryFee}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">₹{gst}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/checkout"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition-colors duration-200 text-center flex items-center justify-center space-x-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  to="/menu"
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 rounded-xl font-bold transition-colors duration-200 text-center block"
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <div className="flex items-center space-x-2 text-green-700">
                  <span className="font-medium">🚚 Free delivery on orders above ₹500</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;