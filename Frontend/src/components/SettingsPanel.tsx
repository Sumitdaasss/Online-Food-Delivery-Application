import React, { useState, useEffect } from 'react';
import { X, Settings, Bell, Moon, Sun, Volume2, VolumeX, Globe, Palette, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    sound: true,
    language: 'en',
    theme: 'orange',
    autoPlay: false,
    emailUpdates: true,
    pushNotifications: false,
  });

  const themes = [
    { name: 'orange', color: 'from-orange-500 to-red-500', emoji: '🧡' },
    { name: 'purple', color: 'from-purple-500 to-pink-500', emoji: '💜' },
    { name: 'blue', color: 'from-blue-500 to-cyan-500', emoji: '💙' },
    { name: 'green', color: 'from-green-500 to-emerald-500', emoji: '💚' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  ];

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const panelVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const mobileVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Desktop Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 h-full w-96 bg-white/95 backdrop-blur-lg shadow-2xl z-50 overflow-y-auto hidden md:block border-l-2 border-purple-200"
          >
            <div className="p-6">
              {/* Header */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between mb-8"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Settings ⚙️
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Settings Grid */}
              <div className="space-y-6">
                {/* Notifications */}
                <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-4 flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications 🔔
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700">Push Notifications</span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateSetting('notifications', !settings.notifications)}
                        className={`w-12 h-6 rounded-full transition-all duration-300 ${
                          settings.notifications ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      >
                        <motion.div
                          animate={{ x: settings.notifications ? 24 : 0 }}
                          className="w-6 h-6 bg-white rounded-full shadow-md"
                        />
                      </motion.button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700">Email Updates</span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateSetting('emailUpdates', !settings.emailUpdates)}
                        className={`w-12 h-6 rounded-full transition-all duration-300 ${
                          settings.emailUpdates ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      >
                        <motion.div
                          animate={{ x: settings.emailUpdates ? 24 : 0 }}
                          className="w-6 h-6 bg-white rounded-full shadow-md"
                        />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Appearance */}
                <motion.div variants={itemVariants} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-4 flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Appearance 🎨
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-700">Dark Mode</span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateSetting('darkMode', !settings.darkMode)}
                        className={`w-12 h-6 rounded-full transition-all duration-300 ${
                          settings.darkMode ? 'bg-purple-500' : 'bg-gray-300'
                        }`}
                      >
                        <motion.div
                          animate={{ x: settings.darkMode ? 24 : 0 }}
                          className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                        >
                          {settings.darkMode ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                        </motion.div>
                      </motion.button>
                    </div>
                    
                    <div>
                      <span className="text-purple-700 block mb-2">Theme Color</span>
                      <div className="grid grid-cols-4 gap-2">
                        {themes.map((theme) => (
                          <motion.button
                            key={theme.name}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateSetting('theme', theme.name)}
                            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${theme.color} flex items-center justify-center text-white font-bold border-2 ${
                              settings.theme === theme.name ? 'border-purple-500' : 'border-transparent'
                            }`}
                          >
                            {theme.emoji}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Audio */}
                <motion.div variants={itemVariants} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                  <h3 className="font-bold text-green-800 mb-4 flex items-center">
                    <Volume2 className="w-5 h-5 mr-2" />
                    Audio 🔊
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-green-700">Sound Effects</span>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateSetting('sound', !settings.sound)}
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${
                        settings.sound ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <motion.div
                        animate={{ x: settings.sound ? 24 : 0 }}
                        className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                      >
                        {settings.sound ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                      </motion.div>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Language */}
                <motion.div variants={itemVariants} className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-4 border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Language 🌍
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateSetting('language', lang.code)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                          settings.language === lang.code
                            ? 'border-orange-500 bg-orange-100 text-orange-800'
                            : 'border-orange-200 bg-white text-orange-700 hover:bg-orange-50'
                        }`}
                      >
                        <div className="text-lg">{lang.flag}</div>
                        <div className="text-xs font-medium">{lang.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Panel */}
          <motion.div
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-2xl z-50 max-h-[80vh] overflow-y-auto md:hidden rounded-t-3xl border-t-2 border-purple-200"
          >
            <div className="p-6">
              {/* Mobile Header */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between mb-6"
              >
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Settings ⚙️
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Mobile Settings - Simplified Grid */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants} className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                  <Bell className="w-6 h-6 text-blue-600 mb-2" />
                  <div className="text-sm font-medium text-blue-800">Notifications</div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateSetting('notifications', !settings.notifications)}
                    className={`w-8 h-4 rounded-full mt-2 transition-all duration-300 ${
                      settings.notifications ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.notifications ? 16 : 0 }}
                      className="w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </motion.button>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                  <Palette className="w-6 h-6 text-purple-600 mb-2" />
                  <div className="text-sm font-medium text-purple-800">Dark Mode</div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateSetting('darkMode', !settings.darkMode)}
                    className={`w-8 h-4 rounded-full mt-2 transition-all duration-300 ${
                      settings.darkMode ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.darkMode ? 16 : 0 }}
                      className="w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </motion.button>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-green-50 rounded-xl p-3 border border-green-200">
                  <Volume2 className="w-6 h-6 text-green-600 mb-2" />
                  <div className="text-sm font-medium text-green-800">Sound</div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateSetting('sound', !settings.sound)}
                    className={`w-8 h-4 rounded-full mt-2 transition-all duration-300 ${
                      settings.sound ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.sound ? 16 : 0 }}
                      className="w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </motion.button>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-orange-50 rounded-xl p-3 border border-orange-200">
                  <Globe className="w-6 h-6 text-orange-600 mb-2" />
                  <div className="text-sm font-medium text-orange-800">Language</div>
                  <div className="text-lg mt-1">
                    {languages.find(l => l.code === settings.language)?.flag}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;