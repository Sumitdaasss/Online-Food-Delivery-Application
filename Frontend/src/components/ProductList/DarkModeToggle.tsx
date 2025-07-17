import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDarkMode, onToggle }) => {
  const toggleVariants = {
    light: {
      backgroundColor: '#fbbf24',
      justifyContent: 'flex-start'
    },
    dark: {
      backgroundColor: '#1f2937',
      justifyContent: 'flex-end'
    }
  };

  const iconVariants = {
    light: {
      rotate: 0,
      scale: 1
    },
    dark: {
      rotate: 180,
      scale: 1
    }
  };

  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative">
      <motion.button
        variants={toggleVariants}
        animate={isDarkMode ? 'dark' : 'light'}
        onClick={onToggle}
        className="relative flex items-center w-16 h-8 rounded-full p-1 shadow-lg hover:shadow-xl transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          layout
          className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <motion.div
            variants={iconVariants}
            animate={isDarkMode ? 'dark' : 'light'}
            transition={{ duration: 0.3 }}
          >
            {isDarkMode ? (
              <Moon className="w-4 h-4 text-gray-700" />
            ) : (
              <Sun className="w-4 h-4 text-yellow-600" />
            )}
          </motion.div>
        </motion.div>
      </motion.button>

      {/* Floating sparkles */}
      <motion.div
        variants={sparkleVariants}
        animate="animate"
        className="absolute -top-1 -right-1"
      >
        <Sparkles className="w-3 h-3 text-yellow-400 opacity-70" />
      </motion.div>
      
      <motion.div
        variants={sparkleVariants}
        animate="animate"
        className="absolute -bottom-1 -left-1"
        style={{ animationDelay: '1s' }}
      >
        <Sparkles className="w-2 h-2 text-blue-400 opacity-60" />
      </motion.div>
    </div>
  );
};

export default DarkModeToggle;