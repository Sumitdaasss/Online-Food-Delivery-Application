import React, { useState, useEffect } from 'react';
import { Gift, Clock, Star, Sparkles, Zap, Crown, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OffersSection: React.FC = () => {
  const [currentOffer, setCurrentOffer] = useState(0);
  const [spinValue, setSpinValue] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonAmount, setWonAmount] = useState<number | null>(null);

  const offers = [
    {
      id: 1,
      title: "🎉 Grand Opening Special!",
      description: "Get 50% OFF on your first order",
      discount: "50% OFF",
      code: "GRAND50",
      validUntil: "Dec 31, 2024",
      color: "from-pink-500 to-rose-500",
      icon: Crown,
      emoji: "👑"
    },
    {
      id: 2,
      title: "🍕 Pizza Bonanza!",
      description: "Buy 2 Pizzas, Get 1 FREE",
      discount: "Buy 2 Get 1",
      code: "PIZZA321",
      validUntil: "Jan 15, 2025",
      color: "from-orange-500 to-red-500",
      icon: Gift,
      emoji: "🍕"
    },
    {
      id: 3,
      title: "⚡ Flash Sale!",
      description: "Lightning deals every hour",
      discount: "Up to 70%",
      code: "FLASH70",
      validUntil: "Today Only",
      color: "from-purple-500 to-indigo-500",
      icon: Zap,
      emoji: "⚡"
    },
    {
      id: 4,
      title: "💝 Weekend Special!",
      description: "Free delivery + 30% off",
      discount: "30% OFF",
      code: "WEEKEND30",
      validUntil: "This Weekend",
      color: "from-green-500 to-emerald-500",
      icon: Heart,
      emoji: "💝"
    }
  ];

  const spinPrizes = [10, 25, 50, 100, 5, 75, 20, 200];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const randomPrize = spinPrizes[Math.floor(Math.random() * spinPrizes.length)];
    const randomRotation = 1440 + (Math.random() * 360); // At least 4 full rotations
    
    setSpinValue(randomRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setWonAmount(randomPrize);
      setTimeout(() => setWonAmount(null), 3000);
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-25"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-20"
        />
        <Sparkles className="absolute top-1/3 right-1/3 w-8 h-8 text-yellow-400 opacity-30 animate-pulse" />
        <Star className="absolute bottom-1/3 right-1/4 w-6 h-6 text-pink-400 opacity-40 animate-spin" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            🎁 Amazing Offers! 🎁
          </h2>
          <p className="text-2xl text-purple-700 font-medium">Don't miss out on these incredible deals! ✨</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Offers Carousel */}
          <div className="relative">
            <motion.div
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border-2 border-white/50 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentOffer}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className={`bg-gradient-to-r ${offers[currentOffer].color} rounded-2xl p-6 text-white relative overflow-hidden`}
                >
                  {/* Floating elements */}
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-4 right-4 text-4xl opacity-30"
                  >
                    {offers[currentOffer].emoji}
                  </motion.div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      {React.createElement(offers[currentOffer].icon, { className: "w-8 h-8 mr-3" })}
                      <h3 className="text-2xl font-bold">{offers[currentOffer].title}</h3>
                    </div>
                    
                    <p className="text-lg mb-4 opacity-90">{offers[currentOffer].description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold mb-1">{offers[currentOffer].discount}</div>
                        <div className="text-sm opacity-80">Code: {offers[currentOffer].code}</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm opacity-80 mb-2">
                          <Clock className="w-4 h-4 mr-1" />
                          Valid until {offers[currentOffer].validUntil}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white text-gray-800 px-6 py-2 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200"
                        >
                          Claim Now! 🎉
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Offer indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {offers.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setCurrentOffer(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentOffer ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Spin to Win */}
          <div className="relative">
            <motion.div
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border-2 border-white/50 text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6">
                🎰 Spin to Win! 🎰
              </h3>
              
              <div className="relative w-64 h-64 mx-auto mb-8">
                {/* Spin wheel */}
                <motion.div
                  animate={{ rotate: spinValue }}
                  transition={{ duration: 3, ease: "easeOut" }}
                  className="w-full h-full rounded-full border-8 border-yellow-400 relative overflow-hidden shadow-2xl"
                  style={{
                    background: `conic-gradient(
                      from 0deg,
                      #ff6b6b 0deg 45deg,
                      #4ecdc4 45deg 90deg,
                      #45b7d1 90deg 135deg,
                      #96ceb4 135deg 180deg,
                      #feca57 180deg 225deg,
                      #ff9ff3 225deg 270deg,
                      #54a0ff 270deg 315deg,
                      #5f27cd 315deg 360deg
                    )`
                  }}
                >
                  {/* Prize segments */}
                  {spinPrizes.map((prize, index) => (
                    <div
                      key={index}
                      className="absolute w-full h-full flex items-center justify-center text-white font-bold text-lg"
                      style={{
                        transform: `rotate(${index * 45}deg)`,
                        transformOrigin: 'center'
                      }}
                    >
                      <div
                        className="absolute"
                        style={{
                          top: '20px',
                          transform: `rotate(${-index * 45}deg)`
                        }}
                      >
                        ₹{prize}
                      </div>
                    </div>
                  ))}
                </motion.div>
                
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
                </div>
                
                {/* Center button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg disabled:opacity-50"
                >
                  {isSpinning ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⚡
                    </motion.div>
                  ) : (
                    'SPIN!'
                  )}
                </motion.button>
              </div>
              
              <p className="text-gray-600 mb-4">Spin the wheel and win amazing cashback! 💰</p>
              <p className="text-sm text-gray-500">*One spin per day. Terms and conditions apply.</p>
              
              {/* Win notification */}
              <AnimatePresence>
                {wonAmount && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center"
                  >
                    <div className="text-center text-white">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: 2 }}
                        className="text-6xl mb-4"
                      >
                        🎉
                      </motion.div>
                      <h4 className="text-3xl font-bold mb-2">Congratulations!</h4>
                      <p className="text-xl">You won ₹{wonAmount} cashback!</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Coming Soon Offers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
            🚀 Coming Soon! 🚀
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "🍔 Burger Festival", date: "Jan 20, 2025", description: "All burgers at 40% off!" },
              { title: "🍕 Pizza Party Week", date: "Feb 1, 2025", description: "Buy 1 Get 2 Free on all pizzas!" },
              { title: "🎂 Birthday Special", date: "Feb 14, 2025", description: "Free cake with every order!" }
            ].map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg"
              >
                <h4 className="text-xl font-bold text-purple-800 mb-2">{offer.title}</h4>
                <p className="text-purple-600 font-medium mb-2">{offer.date}</p>
                <p className="text-gray-600">{offer.description}</p>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-4 text-2xl"
                >
                  ⏰
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSection;