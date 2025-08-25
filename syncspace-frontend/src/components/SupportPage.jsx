import React, { useState } from 'react'
import { motion } from 'framer-motion'

const SupportPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thanks for reaching out! We’ll get back to you soon.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="h-full min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <motion.div
        className="max-w-4xl mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center">💬 Support</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Need help or have a question? We’re here for you.
        </p>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
          />
          <textarea
            name="message"
            placeholder="How can we help?"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 h-32"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">📖 Frequently Asked Questions</h2>
          <ul className="space-y-4">
            <li>
              <p className="font-medium">🧠 What is SyncSpace?</p>
              <p className="text-gray-600 dark:text-gray-400">
                SyncSpace is a collaborative productivity app that helps you manage notes, tasks, files, projects, and focus — all in one space.
              </p>
            </li>
            <li>
              <p className="font-medium">👨‍💻 How do I report a bug?</p>
              <p className="text-gray-600 dark:text-gray-400">
                Use the contact form above or email us directly at <span className="text-blue-500">support@syncspace.app</span>.
              </p>
            </li>
            <li>
              <p className="font-medium">📅 Is there a calendar integration?</p>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! Navigate to the calendar page to manage your schedule.
              </p>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

export default SupportPage
