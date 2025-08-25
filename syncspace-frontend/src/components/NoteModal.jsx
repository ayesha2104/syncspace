import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NoteModal = ({ isOpen, onClose, onAdd, onUpdate, editingNote }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title)
      setContent(editingNote.content)
      setTags(editingNote.tags.join(', '))
    } else {
      setTitle('')
      setContent('')
      setTags('')
    }
  }, [editingNote])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newNote = {
      id: editingNote?.id || Date.now(),
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      pinned: editingNote?.pinned || false,
    }

    if (editingNote) {
      onUpdate(newNote)
    } else {
      onAdd(newNote)
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editingNote ? 'Edit Note' : 'New Note'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
              />
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={4}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
              />
              <div className="flex justify-end gap-2">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editingNote ? 'Update' : 'Add'}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NoteModal
