// src/components/LandingPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import Lottie from 'lottie-react'
import animationData from '../assets/workspace.json' // your downloaded Lottie file

const features = [
  { icon: '📝', label: 'Notes' },
  { icon: '✅', label: 'Tasks' },
  { icon: '📁', label: 'Files' },
  { icon: '🧠', label: 'Projects' },
  { icon: '📊', label: 'Analytics' },
  { icon: '🧭', label: 'Focus Mode' },
]

const LandingPage = () => {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <motion.div
      className="h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      {/* Navbar */}
      <motion.header className="w-full h-16 flex items-center justify-between px-6 border-b border-gray-300 dark:border-gray-700">
        <div className="text-4xl font-bold text-white-600">SyncSpace</div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium hover:underline">Login</Link>
          <Link to="/signup" className="text-sm font-medium hover:underline">Sign Up</Link>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded hover:scale-105 transition-transform"
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </motion.header>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <motion.aside className="w-64 border-r border-gray-300 dark:border-gray-700 p-4">
          <nav className="flex flex-col gap-4">
            <Link to="/notes">📝 Notes</Link>
            <Link to="/tasks">✅ Tasks</Link>
            <Link to="/files">📁 Files</Link>
            <Link to="/projects">🧠 Projects</Link>
            <Link to="/analytics">📊 Analytics</Link>
            <Link to="/focus">🧭 Focus Mode</Link>
            <Link to="/settings">⚙️ Settings</Link>
            <Link to="/support">📞 Support</Link>
          </nav>
        </motion.aside>

        {/* Main */}
        <motion.main className="flex-1 p-8 overflow-y-auto">
          <div className="text-center mt-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Welcome to <span className="text-blue-600 dark:text-blue-400">SyncSpace</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Organize your <span className="font-semibold">notes</span>, <span className="font-semibold">tasks</span>, <span className="font-semibold">files</span>, and more in one seamless platform.
            </p>
          </div>

          {/* Lottie + Features */}
          <div className="flex flex-col md:flex-row justify-center items-center mt-12 gap-10">
            {/* Lottie Animation */}
            <motion.div
              className="w-72 md:w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Lottie animationData={animationData} loop={true} />
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center shadow-md hover:scale-105 transition-transform"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <div className="font-semibold">{feature.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.main>
      </div>
    </motion.div>
  )
}

export default LandingPage
