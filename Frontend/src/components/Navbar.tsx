import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Home, Menu, Clock, LogOut, Settings, Sparkles, Heart, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import SearchBar from './SearchBar';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { data: cart } = useCart();
  const [showMobileSearch, setShowMobileSearch] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;
  const totalItems = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const navItems = [
    { path: '/', icon: Home, label: 'Home', color: 'from-pink-500 to-rose-500' },
    { path: '/menu', icon: Menu, label: 'Menu', color: 'from-orange-500 to-red-500' },
    { path: '/products', icon: ShoppingCart, label: 'Products', color: 'from-purple-500 to-indigo-500' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: totalItems, color: 'from-green-500 to-emerald-500' },
    ...(isAuthenticated ? [{ path: '/orders', icon: Clock, label: 'Orders', color: 'from-purple-500 to-indigo-500' }] : []),
    ...(user?.role === 'admin' ? [{ path: '/admin', icon: Settings, label: 'Admin', color: 'from-blue-500 to-cyan-500' }] : []),
  ];

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b-2 border-gradient-to-r from-pink-200 to-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg relative"
              >
                <span className="text-white font-bold text-2xl">F</span>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin" />
                <Heart className="absolute -bottom-1 -left-1 w-3 h-3 text-pink-300 animate-pulse" />
              </motion.div>
              <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-orange-700 group-hover:via-pink-700 group-hover:to-purple-700 transition-all duration-300">
                Foodies ✨
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map(({ path, icon: Icon, label, badge, color }) => (
                <Link
                  key={path}
                  to={path}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                      isActive(path)
                        ? `text-white bg-gradient-to-r ${color} shadow-lg`
                        : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:shadow-md'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:block">{label}</span>
                    {badge && badge > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg"
                      >
                        {badge > 99 ? '99+' : badge}
                      </motion.span>
                    )}
                  </motion.div>
                </Link>
              ))}

              {/* Desktop Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-bold text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 hover:shadow-md"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:block">Search</span>
              </motion.button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex lg:hidden items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
              >
                <Search className="w-5 h-5" />
              </motion.button>
              
              {navItems.slice(0, 3).map(({ path, icon: Icon, badge, color }) => (
                <Link
                  key={path}
                  to={path}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      isActive(path)
                        ? `text-white bg-gradient-to-r ${color} shadow-lg`
                        : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {badge && badge > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                      >
                        {badge > 9 ? '9+' : badge}
                      </motion.span>
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* User Section */}
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center space-x-4 ml-6 pl-6 border-l-2 border-purple-200">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-gray-700 font-bold hidden sm:block"
                >
                  <span className="text-purple-600">Hi,</span>{' '}
                  <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {user?.name} 👋
                  </span>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-bold text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 transition-all duration-300 hover:shadow-md"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:block">Logout</span>
                </motion.button>
              </div>
            ) : (
              <Link
                to="/login"
                className="group ml-6 hidden lg:block"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    isActive('/login') || isActive('/register')
                      ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                      : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-md'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block">Sign In 🚀</span>
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Search Bar Overlay */}
      {showMobileSearch && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white/95 backdrop-blur-md border-b border-gray-200 p-4 sticky top-20 z-40"
        >
          <SearchBar 
            onSearchTermChange={(term) => {
              if (!term) setShowMobileSearch(false);
            }}
          />
        </motion.div>
      )}
    </>
  );
};

export default Navbar;