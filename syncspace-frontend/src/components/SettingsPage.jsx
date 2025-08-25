import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const SettingsPage = () => {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <div className="h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <motion.div
        className="max-w-3xl mx-auto px-4 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">⚙️ Settings</h1>

        <div className="space-y-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
            <div>
              <h2 className="text-lg font-semibold">Dark Mode</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Toggle between light and dark themes.
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded hover:scale-105 transition-transform"
            >
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
            <div>
              <h2 className="text-lg font-semibold">Notifications</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Enable or disable app notifications.
              </p>
            </div>
            <button
              className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded hover:scale-105 transition-transform"
              onClick={() => alert('Notifications toggled (placeholder)')}
            >
              🔔 Toggle
            </button>
          </div>

          {/* Account Settings Placeholder */}
          <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
            <div>
              <h2 className="text-lg font-semibold">Account Settings</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage your account information.
              </p>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => alert('Account settings coming soon')}
            >
              Manage
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SettingsPage
