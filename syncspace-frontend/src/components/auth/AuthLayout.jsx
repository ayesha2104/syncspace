import { motion } from 'framer-motion'
import { Outlet, Link } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-gray-100 dark:bg-gray-800">
        <h1 className="text-3xl font-semibold text-center mb-6">SyncSpace</h1>
        <Outlet />
        <div className="text-center mt-6 text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            {window.location.pathname === '/login' ? (
              <>Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link></>
            ) : (
              <>Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></>
            )}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default AuthLayout
