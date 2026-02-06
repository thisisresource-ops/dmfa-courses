import { Link } from 'react-router-dom'
import { config } from '../config'

export default function Footer() {
  return (
    <footer className="footer">
      <img src={config.logoUrl} alt={config.businessName} style={{ height: '48px', marginBottom: '12px' }} onError={(e) => { e.target.style.display = 'none' }} />
      <div className="footer-brand">
        <span className="text-accent">McGowan</span> Muay Thai
      </div>
      <p className="footer-text">
        Authentic Muay Thai. World Champion Training.
      </p>
      <p className="footer-text" style={{ marginTop: '16px' }}>
        &copy; {new Date().getFullYear()} McGowan Muay Thai. All rights reserved.
      </p>
    </footer>
  )
}
