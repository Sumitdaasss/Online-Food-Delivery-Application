import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { RegisterRequest } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

type FormData = RegisterRequest & { confirmPassword: string };

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigate = useNavigate();
  const { register: registerUser, isRegisterLoading, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data: FormData) => {
    const { confirmPassword, ...registerData } = data;
    registerUser(registerData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-24 h-24 bg-yellow-300 rounded-full opacity-20 animate-bounce delay-300"></div>
        <div className="absolute top-40 right-24 w-20 h-20 bg-pink-300 rounded-full opacity-25 animate-pulse delay-700"></div>
        <div className="absolute bottom-24 left-40 w-28 h-28 bg-purple-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 right-16 w-16 h-16 bg-orange-300 rounded-full opacity-30 animate-pulse delay-200"></div>
        <div className="absolute top-1/2 left-1/5 w-12 h-12 bg-red-300 rounded-full opacity-25 animate-ping delay-500"></div>
        <div className="absolute top-1/4 right-1/4 w-10 h-10 bg-indigo-300 rounded-full opacity-20 animate-bounce delay-800"></div>
        <Star className="absolute top-20 right-1/3 w-8 h-8 text-yellow-300 opacity-30 animate-spin" />
        <Heart className="absolute bottom-1/3 left-1/4 w-6 h-6 text-pink-300 opacity-40 animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        <div>
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="flex justify-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl relative">
              <span className="text-white font-bold text-3xl">F</span>
              <Star className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-spin" />
              <Sparkles className="absolute -bottom-1 -left-1 w-5 h-5 text-cyan-300 animate-pulse" />
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center text-5xl font-bold text-white drop-shadow-lg"
          >
            Join the Family! 🌟
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-2 text-center text-xl text-white/90 drop-shadow"
          >
            Create your account and start your delicious journey! 🍕✨
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 space-y-6 bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <User className="w-4 h-4 mr-2 text-emerald-500" />
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
                <input
                  {...register('name')}
                  type="text"
                  className={`appearance-none relative block w-full px-14 py-4 border-2 rounded-2xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 transition-all duration-300 bg-gradient-to-r from-emerald-50 to-cyan-50 ${
                    errors.name ? 'border-red-400 focus:ring-red-300' : 'border-emerald-200'
                  }`}
                  placeholder="Enter your full name 👤"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-2 text-sm text-red-600 font-medium"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <User className="w-4 h-4 mr-2 text-cyan-500" />
                Mobile Number
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  {...register('mobile')}
                  type="tel"
                  className={`appearance-none relative block w-full px-14 py-4 border-2 rounded-2xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:border-cyan-500 transition-all duration-300 bg-gradient-to-r from-cyan-50 to-blue-50 ${
                    errors.mobile ? 'border-red-400 focus:ring-red-300' : 'border-cyan-200'
                  }`}
                  placeholder="Enter your mobile number 📱"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              {errors.mobile && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-2 text-sm text-red-600 font-medium"
                >
                  {errors.mobile.message}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-cyan-500" />
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  {...register('email')}
                  type="email"
                  className={`appearance-none relative block w-full px-14 py-4 border-2 rounded-2xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:border-cyan-500 transition-all duration-300 bg-gradient-to-r from-cyan-50 to-blue-50 ${
                    errors.email ? 'border-red-400 focus:ring-red-300' : 'border-cyan-200'
                  }`}
                  placeholder="Enter your email ✉️"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-2 text-sm text-red-600 font-medium"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-blue-500" />
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={`appearance-none relative block w-full px-14 py-4 border-2 rounded-2xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 bg-gradient-to-r from-blue-50 to-indigo-50 ${
                    errors.password ? 'border-red-400 focus:ring-red-300' : 'border-blue-200'
                  }`}
                  placeholder="Create a strong password 🔒"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-2 text-sm text-red-600 font-medium"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-indigo-500" />
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`appearance-none relative block w-full px-14 py-4 border-2 rounded-2xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300 bg-gradient-to-r from-indigo-50 to-purple-50 ${
                    errors.confirmPassword ? 'border-red-400 focus:ring-red-300' : 'border-indigo-200'
                  }`}
                  placeholder="Confirm your password 🔐"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-indigo-600 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-2 text-sm text-red-600 font-medium"
                >
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isRegisterLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 hover:from-emerald-700 hover:via-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isRegisterLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <span className="flex items-center">
                  Create Account 🎉
                  <Star className="ml-2 w-5 h-5 animate-pulse" />
                </span>
              )}
            </motion.button>
          </div>

          <div className="text-center">
            <p className="text-gray-600 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 transition-all duration-200">
                Sign in here! 🚀
              </Link>
            </p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;