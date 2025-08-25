// src/components/ProjectsPage.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'

const columnsData = [
  { id: 'todo', title: 'To Do' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

const labelColors = {
  Bug: 'bg-red-500',
  Feature: 'bg-blue-500',
  Design: 'bg-green-500',
}

const ProjectsPage = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  })

  const [showFormColumn, setShowFormColumn] = useState(null)
  const [formData, setFormData] = useState({ title: '', label: 'Feature' })

  const handleAddTask = (columnId) => {
    if (!formData.title) return
    const newTask = { ...formData, id: Date.now() }
    setTasks((prev) => ({
      ...prev,
      [columnId]: [...prev[columnId], newTask],
    }))
    setFormData({ title: '', label: 'Feature' })
    setShowFormColumn(null)
  }

  const handleRemoveTask = (columnId, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((task) => task.id !== taskId),
    }))
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white transition-all">
      
      {/* Top Navbar */}
      <motion.header
        className="w-full h-16 flex items-center justify-between px-6 border-b border-gray-300 dark:border-gray-700"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🗂️ Projects</h1>
      </motion.header>

      {/* Kanban Board Columns */}
      <div className="flex gap-4 p-6 overflow-x-auto flex-1">
        {columnsData.map((column) => (
          <motion.div
            key={column.id}
            className="w-80 min-w-[20rem] bg-gray-100 dark:bg-gray-800 rounded-xl p-4 shadow-md flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-bold mb-4">{column.title}</h2>

            <div className="flex flex-col gap-3 flex-1">
              {tasks[column.id].map((task) => (
                <motion.div
                  key={task.id}
                  className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <span
                    className={`absolute top-2 right-2 text-xs text-white px-2 py-1 rounded-full ${labelColors[task.label]}`}
                  >
                    {task.label}
                  </span>
                  <p className="text-sm">{task.title}</p>
                  <button
                    onClick={() => handleRemoveTask(column.id, task.id)}
                    className="absolute bottom-2 right-2 text-xs text-gray-400 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Add Task Form */}
            {showFormColumn === column.id ? (
              <div className="mt-4 flex flex-col gap-2">
                <input
                  className="p-2 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm"
                  placeholder="Task title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                />
                <select
                  className="p-2 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm"
                  value={formData.label}
                  onChange={(e) => setFormData((prev) => ({ ...prev, label: e.target.value }))}
                >
                  <option>Bug</option>
                  <option>Feature</option>
                  <option>Design</option>
                </select>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setShowFormColumn(null)}
                    className="text-sm text-gray-400 hover:text-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAddTask(column.id)}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowFormColumn(column.id)}
                className="mt-4 text-sm flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Plus size={16} /> Add Task
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage
