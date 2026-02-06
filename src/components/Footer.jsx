import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <span className="text-accent">DMFA</span> Courses
      </div>
      <p className="footer-text">
        Dan McGowan Fight Academy &mdash; 2x World Champion Muay Thai
      </p>
      <div className="footer-links">
        <Link to="/pricing">Pricing</Link>
        <Link to="/login">Sign In</Link>
        <a href="https://www.instagram.com/mcgowanmuaythai/" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </footer>
  )
}
