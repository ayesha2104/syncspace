// src/components/Login.jsx
import React, { useState } from 'react'
import AuthForm from './AuthForm'
import { motion } from 'framer-motion'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    // TODO: Connect to backend login route
    console.log('Login:', { email, password })
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
        <AuthForm
          type="login"
          email={email}
          password={password}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleLogin}
          buttonText="Log In"
        />
      </div>
    </motion.div>
  )
}

export default Login
