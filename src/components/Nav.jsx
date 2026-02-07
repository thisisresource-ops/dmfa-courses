import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { config } from '../config'

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
        <img src={config.logoUrl} alt={config.businessName} style={{ height: '80px' }} onError={(e) => { e.target.style.display = 'none' }} />
      </Link>

      <button className="nav-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '\u2715' : '\u2630'}
      </button>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className={isActive('/dashboard')} onClick={() => setMenuOpen(false)}>
              Training
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
            <a href="#credentials" className="nav-link" onClick={() => setMenuOpen(false)}>
              About Dan
            </a>
            <a href="#training" className="nav-link" onClick={() => setMenuOpen(false)}>
              Training
            </a>
            <a href="#credentials-section" className="nav-link" onClick={() => setMenuOpen(false)}>
              Credentials
            </a>
            <Link to="/login" className={isActive('/login')} onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" className="btn" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', padding: '8px 18px', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '13px', borderRadius: '8px' }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
