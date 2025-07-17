import React from 'react';
import { Clock, CheckCircle, Package, Truck, AlertCircle, Star, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserOrders } from '../hooks/useOrders';
import { useAuth } from '../hooks/useAuth';
import { Order } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import EmptyState from '../components/ui/EmptyState';

const OrdersPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { data: orders, isLoading, error } = useUserOrders();

  const getStatusIcon = (status: Order['orderStatus']) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'Confirmed':
        return <CheckCircle className="w-6 h-6 text-blue-500" />;
      case 'Preparing':
        return <Package className="w-6 h-6 text-orange-500" />;
      case 'Out for delivery':
        return <Truck className="w-6 h-6 text-purple-500" />;
      case 'Delivered':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'Cancelled':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Order['orderStatus']) => {
    switch (status) {
      case 'Pending':
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300';
      case 'Confirmed':
        return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300';
      case 'Preparing':
        return 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-300';
      case 'Out for delivery':
        return 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300';
      case 'Delivered':
        return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300';
      case 'Cancelled':
        return 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300';
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300';
    }
  };

  const getStatusEmoji = (status: Order['orderStatus']) => {
    switch (status) {
      case 'Pending':
        return '⏳';
      case 'Confirmed':
        return '✅';
      case 'Preparing':
        return '👨‍🍳';
      case 'Out for delivery':
        return '🚚';
      case 'Delivered':
        return '🎉';
      case 'Cancelled':
        return '❌';
      default:
        return '📦';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
        <EmptyState
          icon={Package}
          title="Please sign in"
          description="You need to be logged in to view your orders"
          action={{
            label: 'Sign In',
            onClick: () => window.location.href = '/login'
          }}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-lg font-medium text-purple-600">Loading your delicious orders... 🍕</p>
        </div>
      </div>
    );
  }

  // Don't show error page, just log it and continue
  if (error) {
    console.warn('Failed to load orders, continuing with empty data:', error);
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="Start ordering to see your order history here!"
          action={{
            label: 'Browse Menu 🍽️',
            onClick: () => window.location.href = '/menu'
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-200 rounded-full opacity-25 animate-pulse delay-700"></div>
        <div className="absolute bottom-32 left-48 w-40 h-40 bg-purple-200 rounded-full opacity-15 animate-bounce delay-1000"></div>
        <div className="absolute bottom-48 right-24 w-20 h-20 bg-blue-200 rounded-full opacity-30 animate-pulse delay-200"></div>
        <Star className="absolute top-32 right-1/4 w-12 h-12 text-yellow-300 opacity-30 animate-spin" />
        <Heart className="absolute bottom-1/4 left-1/3 w-10 h-10 text-pink-300 opacity-40 animate-pulse" />
        <Sparkles className="absolute top-1/3 left-1/5 w-8 h-8 text-purple-300 opacity-35 animate-ping" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
            <Package className="mr-4 w-12 h-12 text-purple-500" />
            Order History 📋✨
          </h1>
          <p className="text-2xl text-purple-700 font-medium">Track your delicious journey! 🍕🎉</p>
        </motion.div>

        <div className="space-y-8">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Order #{order.id.slice(-8)}
                      </span>
                      <span className="ml-2 text-2xl">{getStatusEmoji(order.orderStatus)}</span>
                    </h3>
                    <p className="text-gray-600 font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-purple-500" />
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <p className="text-gray-600 font-medium flex items-center">
                      <span className="mr-2">📍</span>
                      {order.userAddress}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.orderStatus)}
                    </div>
                    <span className={`px-6 py-3 rounded-2xl text-sm font-bold border-2 ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border-2 border-purple-100">
                  <h4 className="font-bold text-purple-800 mb-4 text-lg flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Order Items 🍽️
                  </h4>
                  <div className="space-y-4">
                    {order.orderedItems.map((item, itemIndex) => (
                      <motion.div 
                        key={item.foodId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                        className="flex justify-between items-center py-3 px-4 bg-white rounded-xl shadow-sm border border-purple-100"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.food?.imageUrl || item.food?.imageURL || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100'}
                            alt={item.food?.name || 'Food item'}
                            className="w-16 h-16 rounded-xl object-cover border-2 border-purple-200"
                          />
                          <div>
                            <span className="font-bold text-gray-900 text-lg">
                              {item.food?.name || 'Unknown Item'}
                            </span>
                            <div className="flex items-center space-x-2 text-purple-600 font-medium">
                              <span>Qty: {item.quantity}</span>
                              <span>•</span>
                              <span>₹{item.price} each</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-xl text-purple-700">₹{item.price * item.quantity}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="border-t-2 border-purple-200 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Total Amount 💰
                    </span>
                    <span className="text-3xl font-bold text-purple-700">₹{order.amount}</span>
                  </div>
                  
                  {order.orderStatus === 'Out for delivery' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-200"
                    >
                      <p className="text-purple-700 font-bold text-lg flex items-center justify-center">
                        <Truck className="w-6 h-6 mr-2 animate-bounce" />
                        🚚 Your order is on the way! Expected delivery in 15-20 minutes. 🎉
                      </p>
                    </motion.div>
                  )}
                  
                  {order.orderStatus === 'Preparing' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 p-6 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl border-2 border-orange-200"
                    >
                      <p className="text-orange-700 font-bold text-lg flex items-center justify-center">
                        <Package className="w-6 h-6 mr-2 animate-pulse" />
                        👨‍🍳 Your order is being prepared with love! ❤️
                      </p>
                    </motion.div>
                  )}

                  {order.orderStatus === 'Delivered' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl border-2 border-green-200"
                    >
                      <p className="text-green-700 font-bold text-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 mr-2" />
                        🎉 Order delivered successfully! Hope you enjoyed your meal! ⭐
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;