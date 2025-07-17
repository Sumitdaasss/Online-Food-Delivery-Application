import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { LoginRequest } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const { login, isLoginLoading, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema)
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data: LoginRequest) => {
    login(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 bg-green-300 rounded-full opacity-25 animate-bounce delay-1000"></div>
        <div className="absolute bottom-32 right-10 w-12 h-12 bg-pink-300 rounded-full opacity-20 animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-indigo-300 rounded-full opacity-30 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-orange-300 rounded-full opacity-25 animate-bounce delay-700"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        <div>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl relative">
              <span className="text-white font-bold text-3xl">F</span>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-spin" />
              <Heart className="absolute -bottom-1 -left-1 w-4 h-4 text-pink-300 animate-pulse" />
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center text-5xl font-bold text-white drop-shadow-lg"
          >
            Welcome back! 🎉
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-2 text-center text-xl text-white/90 drop-shadow"
          >
            Sign in to continue your food journey ✨
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 space-y-6 bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-purple-500" />
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  {...register('email')}
                  type="email"
                  className={`appearance-none relative block w-full px-14 py-4 border-2 rounded-2xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 bg-gradient-to-r from-purple-50 to-pink-50 ${
                    errors.email ? 'border-red-400 focus:ring-red-300' : 'border-purple-200'
                  }`}
                  placeholder="Enter your email ✉️"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
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
                <Lock className="w-4 h-4 mr-2 text-pink-500" />
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={`appearance-none relative block w-full px-14 py-4 border-2 rounded-2xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-500 transition-all duration-300 bg-gradient-to-r from-pink-50 to-red-50 ${
                    errors.password ? 'border-red-400 focus:ring-red-300' : 'border-pink-200'
                  }`}
                  placeholder="Enter your password 🔒"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors duration-200"
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
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoginLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isLoginLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <span className="flex items-center">
                  Sign in 🚀
                  <Sparkles className="ml-2 w-5 h-5 animate-pulse" />
                </span>
              )}
            </motion.button>
          </div>

          <div className="text-center">
            <p className="text-gray-600 font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
                Sign up here! 🎊
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border-2 border-blue-200">
            <h4 className="font-bold text-blue-800 mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Demo Credentials 🎭
            </h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Admin:</strong> admin@test.com / 123456</p>
              <p><strong>User:</strong> user@test.com / 123456</p>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default LoginPage;