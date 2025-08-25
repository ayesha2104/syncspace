import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const FocusModePage = () => {
  // Timer state
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)

  // Note Modal state
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [noteText, setNoteText] = useState('')

  // Task Modal state
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [taskText, setTaskText] = useState('')

  // Countdown effect
  useEffect(() => {
    let timer
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    }
    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <motion.div
        className="h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🧘 Focus Mode</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
            Enter a zone of deep work — no distractions, just you and your task.
          </p>

          {/* Timer */}
          <div className="text-center mb-4 text-3xl font-mono">
            {formatTime(timeLeft)}
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? 'Pause Timer' : 'Start Timer'}
            </button>

            <button
              className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-5 py-2 rounded hover:scale-105 transition"
              onClick={() => setShowNoteModal(true)}
            >
              Write Note
            </button>

            <button
              className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition"
              onClick={() => setShowTaskModal(true)}
            >
              Quick Task
            </button>
          </div>
        </div>
      </motion.div>

      {/* Write Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2">Write a Note</h2>
            <textarea
              className="w-full h-32 p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                className="text-gray-500 hover:text-red-500"
                onClick={() => setShowNoteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => {
                  console.log('Note saved:', noteText)
                  setShowNoteModal(false)
                  setNoteText('')
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2">Quick Task</h2>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Enter your task..."
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                className="text-gray-500 hover:text-red-500"
                onClick={() => setShowTaskModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => {
                  console.log('Task added:', taskText)
                  setShowTaskModal(false)
                  setTaskText('')
                }}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FocusModePage
