// src/components/Signup.jsx
import React, { useState } from 'react'
import AuthForm from './AuthForm'
import { motion } from 'framer-motion'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignup = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    // TODO: Connect to backend signup route
    console.log('Signup:', { email, password })
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
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <AuthForm
          type="signup"
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
          onSubmit={handleSignup}
          showConfirmPassword={true}
          buttonText="Sign Up"
        />
      </div>
    </motion.div>
  )
}

export default Signup
