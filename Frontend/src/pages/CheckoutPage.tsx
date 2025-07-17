import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, Clock, CheckCircle, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCart, useClearCart } from '../hooks/useCart';
import { useCreateOrder } from '../hooks/useOrders';
import { useAuth } from '../hooks/useAuth';
import { CreateOrderRequest } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';

const schema = yup.object({
  userAddress: yup.string().required('Address is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  paymentMethod: yup.string().required('Payment method is required'),
});

type FormData = {
  userAddress: string;
  phoneNumber: string;
  paymentMethod: string;
};

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { data: cart } = useCart();
  const createOrderMutation = useCreateOrder();
  const clearCartMutation = useClearCart();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const deliveryFee = 49;
  const gstRate = 0.18;
  const subtotal = cart?.totalAmount || 0;
  const gst = Math.round(subtotal * gstRate);
  const totalAmount = subtotal + deliveryFee + gst;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <EmptyState
          icon={CreditCard}
          title="Please sign in"
          description="You need to be logged in to checkout"
          action={{
            label: 'Sign In',
            onClick: () => navigate('/login')
          }}
        />
      </div>
    );
  }

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <EmptyState
          icon={CreditCard}
          title="Your cart is empty"
          description="Add some items to your cart before checkout"
          action={{
            label: 'Browse Menu',
            onClick: () => navigate('/menu')
          }}
        />
      </div>
    );
  }

  const onSubmit = async (data: FormData) => {
    if (!user || !cart) return;

    const orderData: CreateOrderRequest = {
      orderedItems: cart.items.map(item => ({
        foodId: item.foodId,
        price: item.price,
        quantity: item.quantity
      })),
      userAddress: data.userAddress,
      email: user.email,
      phoneNumber: data.phoneNumber,
      amount: totalAmount.toString(),
      orderStatus: 'Pending'
    };

    try {
      await createOrderMutation.mutateAsync(orderData);
      clearCartMutation.mutate();
      navigate('/orders');
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-xl text-gray-600">Complete your order</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery & Payment</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* User Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
                  />
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    {...register('phoneNumber')}
                    type="tel"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Delivery Address</span>
                </label>
                <textarea
                  {...register('userAddress')}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.userAddress ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your complete delivery address"
                />
                {errors.userAddress && (
                  <p className="mt-1 text-sm text-red-600">{errors.userAddress.message}</p>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                    { value: 'upi', label: 'UPI Payment', icon: null },
                    { value: 'cod', label: 'Cash on Delivery', icon: null }
                  ].map(({ value, label, icon: Icon }) => (
                    <label key={value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                      <input
                        {...register('paymentMethod')}
                        type="radio"
                        value={value}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      {Icon && <Icon className="w-5 h-5 text-gray-400" />}
                      <span className="font-medium">{label}</span>
                    </label>
                  ))}
                </div>
                {errors.paymentMethod && (
                  <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={createOrderMutation.isPending}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {createOrderMutation.isPending ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order - ₹{totalAmount}</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.foodId} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.food?.imageUrl || item.food?.imageURL || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100'}
                      alt={item.food?.name || 'Food item'}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.food?.name || 'Unknown Item'}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
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
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-xl">
              <div className="flex items-center space-x-2 text-green-700">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Estimated Delivery: 30-45 minutes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;