import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Nav() {
  const { isAuthenticated, user, profile, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link'

  const getInitial = () => {
    if (profile?.full_name) return profile.full_name.charAt(0).toUpperCase()
    if (user?.email) return user.email.charAt(0).toUpperCase()
    return '?'
  }

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">
        <span className="nav-logo-text">
          <span className="nav-logo-accent">DMFA</span> Courses
        </span>
      </Link>

      <button className="nav-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '\u2715' : '\u2630'}
      </button>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className={isActive('/dashboard')} onClick={() => setMenuOpen(false)}>
              Courses
            </Link>
            <Link to="/account" className={isActive('/account')} onClick={() => setMenuOpen(false)}>
              Account
            </Link>
            <button className="btn-ghost" onClick={() => { signOut(); setMenuOpen(false); }}>
              Sign Out
            </button>
            <Link to="/account" className="nav-avatar" onClick={() => setMenuOpen(false)}>
              {getInitial()}
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className={isActive('/')} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/pricing" className={isActive('/pricing')} onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>
            <Link to="/login" className={isActive('/login')} onClick={() => setMenuOpen(false)}>
              Sign In
            </Link>
            <Link to="/register" className="btn btn-sm" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
