import React from 'react';
import { motion } from 'framer-motion';

const FloatingFoodElements: React.FC = () => {
  const foodEmojis = ['🍕', '🍔', '🍟', '🌮', '🍜', '🍱', '🍣', '🥗', '🍰', '🧁', '🍪', '🥤'];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {foodEmojis.map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: 0,
          }}
          animate={{
            y: -100,
            rotate: 360,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          {emoji}
        </motion.div>
      ))}
      
      {/* Additional floating elements */}
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={`bubble-${index}`}
          className="absolute w-4 h-4 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full opacity-30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            y: -50,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 8 + 12,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingFoodElements;