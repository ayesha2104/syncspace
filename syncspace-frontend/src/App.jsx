// App.jsx
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import NotesPage from './components/NotesPage'
import TasksPage from './components/TasksPage'
import FilesPage from './components/FilesPage'
import { ThemeProvider } from './context/ThemeContext'
import LoginPage from './components/auth/LoginPage'
import SignupPage from './components/auth/SignupPage'
import ProjectsPage from './components/ProjectsPage'
import AnalyticsPage from './components/AnalyticsPage'

import FocusModePage from './components/FocusModePage'
import SettingsPage from './components/SettingsPage'
import SupportPage from './components/SupportPage'


function App() {
  const location = useLocation()

  return (
    <ThemeProvider>
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/files" element={<FilesPage />} />
        <Route path="/projects" element={<ProjectsPage/>} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/focus" element={<FocusModePage/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>} />

      </Routes>
    </AnimatePresence>
    </ThemeProvider>
  )
}

export default App
