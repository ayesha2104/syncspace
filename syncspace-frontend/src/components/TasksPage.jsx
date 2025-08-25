// src/components/TasksPage.jsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TasksPage = () => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('Low')

  // Load tasks
  useEffect(() => {
    const saved = localStorage.getItem('tasks')
    if (saved) setTasks(JSON.parse(saved))
  }, [])

  // Save tasks
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = () => {
    if (!title.trim()) return
    const newTask = {
      id: Date.now(),
      title,
      dueDate,
      priority,
      completed: false,
    }
    setTasks([newTask, ...tasks])
    setTitle('')
    setDueDate('')
    setPriority('Low')
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const getPriorityColor = (level) => {
    const base = 'px-2 py-1 rounded-full text-xs font-medium'
    switch (level) {
      case 'High': return `${base} bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300`
      case 'Medium': return `${base} bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`
      default: return `${base} bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300`
    }
  }

  return (
    <motion.div
      className="p-6 md:px-12 lg:px-24 min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-4xl font-bold mb-6">✅ Your Tasks</h1>

      {/* Task Input */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="col-span-2 px-4 py-2 rounded-xl border dark:border-gray-700 dark:bg-gray-900"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-4 py-2 rounded-xl border dark:border-gray-700 dark:bg-gray-900"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-2 rounded-xl border dark:border-gray-700 dark:bg-gray-900"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <button
          onClick={handleAddTask}
          className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
        >
          ➕ Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 dark:text-gray-400 mt-10"
          >
            ✨ You're all caught up. Add your first task!
          </motion.div>
        ) : (
          tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`p-5 rounded-2xl shadow-md border transition-colors ${
                task.completed
                  ? 'bg-green-100 dark:bg-green-900 opacity-70 line-through'
                  : 'bg-gray-50 dark:bg-gray-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-4">
                    {task.dueDate && <span>📅 {task.dueDate}</span>}
                    <span className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleComplete(task.id)}
                  className="ml-4 px-3 py-1 rounded-xl text-sm bg-green-500 hover:bg-green-600 text-white transition"
                >
                  {task.completed ? 'Undo' : 'Mark Done'}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}

export default TasksPage
