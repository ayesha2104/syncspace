// src/components/FilesPage.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const FilesPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const filePreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type
    }))
    setUploadedFiles(prev => [...prev, ...filePreviews])
  }

  const renderPreview = (fileObj) => {
    if (fileObj.type.startsWith('image/')) {
      return <img src={fileObj.url} alt="preview" className="max-h-40 rounded" />
    } else if (fileObj.type === 'application/pdf') {
      return <iframe src={fileObj.url} title="pdf-preview" className="w-full h-64 border rounded" />
    } else {
      return <p className="text-gray-500">📄 {fileObj.file.name} ({fileObj.type})</p>
    }
  }

  return (
    <motion.div
      className="min-h-screen p-8 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">📁 Your Files</h1>

      <div className="mb-4">
        <input 
          type="file" 
          multiple 
          onChange={handleFileChange} 
          className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {uploadedFiles.map((fileObj, idx) => (
          <motion.div 
            key={idx} 
            className="p-4 border dark:border-gray-700 rounded-lg shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
          >
            {renderPreview(fileObj)}
            <p className="mt-2 text-sm text-center truncate">{fileObj.file.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default FilesPage
