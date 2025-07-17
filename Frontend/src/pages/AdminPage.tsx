import React, { useState } from 'react';
import { Plus, Edit, Trash2, Upload, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFoods, useCreateFood, useDeleteFood } from '../hooks/useFoods';
import { useAllOrders, useUpdateOrderStatus, useDeleteOrder } from '../hooks/useOrders';
import { useAuth } from '../hooks/useAuth';
import { FoodItem, Order } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import EmptyState from '../components/ui/EmptyState';

const foodSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
});

type FoodFormData = {
  name: string;
  description: string;
  category: string;
  price: number;
};

const AdminPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'foods' | 'orders'>('foods');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const { data: foods, isLoading: foodsLoading, error: foodsError, refetch: refetchFoods } = useFoods();
  const { data: orders, isLoading: ordersLoading, error: ordersError } = useAllOrders();
  const createFoodMutation = useCreateFood();
  const deleteFoodMutation = useDeleteFood();
  const updateOrderStatusMutation = useUpdateOrderStatus();
  const deleteOrderMutation = useDeleteOrder();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FoodFormData>({
    resolver: yupResolver(foodSchema)
  });

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <EmptyState
          icon={X}
          title="Access Denied"
          description="You need admin privileges to access this page"
          action={{
            label: 'Go Home',
            onClick: () => window.location.href = '/'
          }}
        />
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmitFood = async (data: FoodFormData) => {
    if (!selectedFile) {
      alert('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('food', JSON.stringify(data));
    formData.append('file', selectedFile);

    try {
      await createFoodMutation.mutateAsync(formData);
      setShowAddModal(false);
      reset();
      setSelectedFile(null);
      setPreviewUrl('');
    } catch (error) {
      console.error('Failed to create food item:', error);
    }
  };

  const handleDeleteFood = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this food item?')) {
      try {
        await deleteFoodMutation.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete food item:', error);
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateOrderStatusMutation.mutateAsync({ orderId, status });
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrderMutation.mutateAsync(orderId);
      } catch (error) {
        console.error('Failed to delete order:', error);
      }
    }
  };

  const getStatusColor = (status: Order['orderStatus']) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'Preparing':
        return 'bg-orange-100 text-orange-800';
      case 'Out for delivery':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-xl text-gray-600">Manage your food items and orders</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('foods')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'foods'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Food Management
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'orders'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Order Management
              </button>
            </nav>
          </div>
        </div>

        {/* Food Management Tab */}
        {activeTab === 'foods' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Food Items</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Food Item</span>
              </button>
            </div>

            {foodsLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : foodsError ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No food items available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods?.map((food) => (
                  <motion.div
                    key={food.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <img
                      src={food.imageUrl || food.imageURL || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'}
                      alt={food.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{food.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{food.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-orange-600 font-bold">₹{food.price}</span>
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                          {food.category}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteFood(food.id)}
                          disabled={deleteFoodMutation.isPending}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 disabled:opacity-50"
                        >
                          {deleteFoodMutation.isPending ? (
                            <LoadingSpinner size="sm" />
                          ) : (
                            <>
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Order Management Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Orders</h2>

            {ordersLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : ordersError ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No orders available</p>
              </div>
            ) : orders && orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Order #{order.id.slice(-8)}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        <p className="text-gray-600 text-sm">📧 {order.email}</p>
                        <p className="text-gray-600 text-sm">📞 {order.phoneNumber}</p>
                        <p className="text-gray-600 text-sm">📍 {order.userAddress}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          disabled={deleteOrderMutation.isPending}
                          className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
                      <div className="space-y-2">
                        {order.orderedItems.map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span>{item.food?.name || 'Unknown Item'} x{item.quantity}</span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        {['Pending', 'Confirmed', 'Preparing', 'Out for delivery', 'Delivered'].map((status) => (
                          <button
                            key={status}
                            onClick={() => handleUpdateOrderStatus(order.id, status)}
                            disabled={updateOrderStatusMutation.isPending}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200 ${
                              order.orderStatus === status
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                      <span className="text-lg font-bold text-gray-900">₹{order.amount}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={X}
                title="No orders found"
                description="No orders have been placed yet"
              />
            )}
          </div>
        )}

        {/* Add Food Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Add New Food Item</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmitFood)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Food Name
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter food name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      {...register('description')}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.description ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter description"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      {...register('category')}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.category ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select category</option>
                      <option value="Biryani">Biryani</option>
                      <option value="Burgers">Burgers</option>
                      <option value="Pizzas">Pizzas</option>
                      <option value="Curries">Curries</option>
                      <option value="Drinks">Drinks</option>
                      <option value="Desserts">Desserts</option>
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹)
                    </label>
                    <input
                      {...register('price')}
                      type="number"
                      step="0.01"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.price ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter price"
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Food Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        ) : (
                          <Upload className="w-12 h-12 text-gray-400" />
                        )}
                        <span className="text-sm text-gray-600">
                          {selectedFile ? selectedFile.name : 'Click to upload image'}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={createFoodMutation.isPending}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {createFoodMutation.isPending ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Add Food</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPage;