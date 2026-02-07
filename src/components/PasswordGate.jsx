import { useState, useEffect } from 'react'
import { config } from '../config'

const SITE_PASSWORD = 'hardiman26'
const STORAGE_KEY = 'dmfa_site_access'

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === 'granted') {
      setUnlocked(true)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === SITE_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'granted')
      setUnlocked(true)
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  if (unlocked) return children

  return (
    <div className="gate-page" style={{ minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        <img
          src={config.logoUrl}
          alt={config.businessName}
          style={{ height: '120px', marginBottom: '40px' }}
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError('') }}
            autoFocus
            style={{ marginBottom: '16px', textAlign: 'center' }}
          />
          {error && (
            <p style={{ color: 'var(--error)', fontSize: '13px', marginBottom: '12px' }}>{error}</p>
          )}
          <button type="submit" className="btn btn-full" style={{ borderRadius: '8px' }}>
            Access Site
          </button>
        </form>
      </div>
    </div>
  )
}
