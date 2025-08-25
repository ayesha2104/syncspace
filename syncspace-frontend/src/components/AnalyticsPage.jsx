// src/components/AnalyticsPage.jsx
import React from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { motion } from 'framer-motion'

const sampleData = [
  { name: 'Mon', tasks: 4, notes: 2, files: 1 },
  { name: 'Tue', tasks: 3, notes: 3, files: 2 },
  { name: 'Wed', tasks: 5, notes: 2, files: 4 },
  { name: 'Thu', tasks: 2, notes: 1, files: 3 },
  { name: 'Fri', tasks: 6, notes: 5, files: 2 },
  { name: 'Sat', tasks: 1, notes: 0, files: 0 },
  { name: 'Sun', tasks: 0, notes: 1, files: 1 },
]

const AnalyticsPage = () => {
  return (
    <motion.div
      className="p-8 bg-white dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold mb-6">📈 Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tasks Completed Over Time (Line Chart) */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Tasks Over the Week</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tasks" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Notes vs Files Created (Bar Chart) */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Notes and Files Created</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="notes" fill="#82ca9d" />
              <Bar dataKey="files" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}

export default AnalyticsPage
