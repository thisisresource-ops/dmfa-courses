import { Link } from 'react-router-dom'
import { config } from '../config'

export default function Footer() {
  return (
    <footer className="footer">
      <img src={config.logoUrl} alt={config.businessName} className="footer-logo" onError={(e) => { e.target.style.display = 'none' }} />
      <div className="footer-right">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} McGowan Muay Thai. All rights reserved.
        </p>
        <p className="footer-tagline">
          Authentic Muay Thai. World Champion Training.
        </p>
      </div>
    </footer>
  )
}
