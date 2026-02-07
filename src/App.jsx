import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import PasswordGate from './components/PasswordGate'
import { ProgressProvider } from './context/ProgressContext'
import Nav from './components/Nav'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Pricing from './pages/Pricing'
import Dashboard from './pages/Dashboard'
import Course from './pages/Course'
import Lesson from './pages/Lesson'
import Account from './pages/Account'

// Layout with Nav for public pages
function PublicLayout() {
  return (
    <div className="app-container">
      <Nav />
      <Outlet />
    </div>
  )
}

// Layout with Nav for protected pages + ProgressProvider
function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <ProgressProvider>
      <div className="app-container">
        <Nav />
        <Outlet />
      </div>
    </ProgressProvider>
  )
}

// Auth pages - no nav, redirect if already logged in
function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default function App() {
  return (
    <PasswordGate>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public pages with nav */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<Pricing />} />
          </Route>

          {/* Auth pages - no nav */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected pages */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses/:slug" element={<Course />} />
            <Route path="/courses/:slug/:lessonSlug" element={<Lesson />} />
            <Route path="/account" element={<Account />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </PasswordGate>
  )
}
