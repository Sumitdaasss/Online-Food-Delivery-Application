import React from 'react';
import { ChefHat, Clock, Star, TrendingUp, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoriesShowcase: React.FC = () => {
  const categories = [
    {
      name: 'Biryani',
      emoji: '🍛',
      description: 'Aromatic rice dishes with authentic spices',
      items: 8,
      popular: true,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Burgers',
      emoji: '🍔',
      description: 'Juicy patties with fresh ingredients',
      items: 6,
      popular: false,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Pizzas',
      emoji: '🍕',
      description: 'Wood-fired pizzas with premium toppings',
      items: 7,
      popular: true,
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50',
      image: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Curries',
      emoji: '🍛',
      description: 'Rich and flavorful traditional curries',
      items: 5,
      popular: false,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Drinks',
      emoji: '🥤',
      description: 'Refreshing beverages and smoothies',
      items: 9,
      popular: false,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      image: 'https://images.pexels.com/photos/1542252/pexels-photo-1542252.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Desserts',
      emoji: '🍰',
      description: 'Sweet treats and delightful desserts',
      items: 6,
      popular: true,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      image: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Snacks',
      emoji: '🍿',
      description: 'Quick bites and appetizers',
      items: 5,
      popular: false,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Pasta',
      emoji: '🍝',
      description: 'Italian pasta with authentic sauces',
      items: 4,
      popular: false,
      color: 'from-teal-500 to-green-500',
      bgColor: 'from-teal-50 to-green-50',
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-25"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-15"
        />
        <Sparkles className="absolute top-1/4 right-1/4 w-12 h-12 text-purple-300 opacity-40 animate-pulse" />
        <Heart className="absolute bottom-1/4 left-1/4 w-10 h-10 text-pink-300 opacity-35 animate-bounce" />
        <Star className="absolute top-1/3 left-1/5 w-8 h-8 text-yellow-300 opacity-30 animate-spin" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
            <ChefHat className="mr-4 w-12 h-12 text-purple-500" />
            Food Categories 🍽️✨
          </h2>
          <p className="text-2xl text-purple-700 font-medium max-w-3xl mx-auto">
            Explore our amazing variety of delicious food categories! 🌟
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateY: 5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              className="group relative"
            >
              <Link
                to={`/menu?category=${category.name}`}
                className="block bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border-2 border-white/50 hover:border-purple-200 transition-all duration-300"
              >
                {/* Popular badge */}
                {category.popular && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1"
                  >
                    <TrendingUp className="w-3 h-3" />
                    <span>Popular</span>
                  </motion.div>
                )}

                {/* Image section */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.bgColor} opacity-60`} />
                  
                  {/* Floating emoji */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-4 left-4 text-4xl"
                  >
                    {category.emoji}
                  </motion.div>
                </div>

                {/* Content section */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                      {category.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{category.items} items</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">4.5+ rating</span>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`px-4 py-2 rounded-xl bg-gradient-to-r ${category.color} text-white text-sm font-bold shadow-lg`}
                    >
                      Explore →
                    </motion.div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center"
                  >
                    <div className="text-3xl mb-2">{category.emoji}</div>
                    <div className="text-lg font-bold text-purple-800">View {category.name}</div>
                    <div className="text-sm text-purple-600">{category.items} delicious options</div>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '50+', label: 'Food Items', icon: '🍽️' },
            { number: '8', label: 'Categories', icon: '📂' },
            { number: '4.8', label: 'Average Rating', icon: '⭐' },
            { number: '1000+', label: 'Happy Customers', icon: '😊' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-200 shadow-lg"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;