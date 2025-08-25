import React, { useEffect, useState } from 'react'
import NoteModal from './NoteModal'
import { motion, AnimatePresence } from 'framer-motion'

const NotesPage = () => {
  const [notes, setNotes] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('syncspace-notes')
    if (saved) setNotes(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('syncspace-notes', JSON.stringify(notes))
  }, [notes])

  const handleAddNote = (newNote) => {
    setNotes([
      { id: Date.now(), ...newNote, pinned: false },
      ...notes,
    ])
  }

  const handleUpdateNote = (updatedNote) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
  }

  const handleDeleteNote = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?')
    if (confirmDelete) {
      setNotes(notes.filter((note) => note.id !== id))
    }
  }

  const togglePin = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    ))
  }

  const openCreateModal = () => {
    setEditingNote(null)
    setIsModalOpen(true)
  }

  const openEditModal = (note) => {
    setEditingNote(note)
    setIsModalOpen(true)
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedNotes = [...filteredNotes].sort((a, b) => b.pinned - a.pinned)

  return (
    <div className="h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-semibold">📝 Your Notes</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          <motion.button
            onClick={openCreateModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg"
          >
            + New Note
          </motion.button>
        </div>
      </div>

      {/* Notes List */}
      {sortedNotes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {sortedNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl bg-gray-100 dark:bg-gray-800 p-4 shadow-md hover:shadow-lg transition-shadow relative"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold">{note.title}</h2>
                  {note.pinned && <span className="text-yellow-500 text-sm">📌</span>}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-4">
                  {note.content}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {note.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => openEditModal(note)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleDeleteNote(note.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => togglePin(note.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    {note.pinned ? 'Unpin' : 'Pin'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-gray-500 dark:text-gray-400">
          No notes yet. Click “+ New Note” to create one.
        </div>
      )}

      {/* Modal */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddNote}
        onUpdate={handleUpdateNote}
        editingNote={editingNote}
      />
    </div>
  )
}

export default NotesPage
