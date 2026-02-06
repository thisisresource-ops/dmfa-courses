import { Link } from 'react-router-dom'
import { config } from '../config'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">2x World Champion</div>
        <h1 className="hero-title">
          <span className="accent">Dan McGowan</span><br />
          Fight Academy
        </h1>
        <p className="hero-subtitle">
          Learn elite Muay Thai striking from a 2x World Champion.
          6 courses, 100+ video lessons — train on your schedule, from anywhere.
        </p>
        <div className="hero-cta">
          <Link to="/register" className="btn btn-lg">Start Learning</Link>
          <Link to="/pricing" className="btn-outline" style={{ padding: '18px 36px', fontSize: '16px' }}>View Pricing</Link>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">6</div>
            <div className="hero-stat-label">Courses</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">100+</div>
            <div className="hero-stat-label">Lessons</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">2x</div>
            <div className="hero-stat-label">World Champion</div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-dark">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 40px' }}>
          <div className="credentials-grid">
            <div className="credential-item">
              <div className="credential-icon">&#127942;</div>
              <div className="credential-title">2x World Champion</div>
              <div className="credential-desc">Multiple world titles in Muay Thai</div>
            </div>
            <div className="credential-item">
              <div className="credential-icon">&#129354;</div>
              <div className="credential-title">100+ Lessons</div>
              <div className="credential-desc">Comprehensive striking curriculum</div>
            </div>
            <div className="credential-item">
              <div className="credential-icon">&#127941;</div>
              <div className="credential-title">HD Video</div>
              <div className="credential-desc">Professional quality instruction</div>
            </div>
            <div className="credential-item">
              <div className="credential-icon">&#128640;</div>
              <div className="credential-title">Learn Anywhere</div>
              <div className="credential-desc">Stream on any device, anytime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="section">
        <div className="section-header">
          <div className="section-label">Curriculum</div>
          <h2 className="section-title">6 Complete Courses</h2>
          <p className="section-desc">Every technique broken down step by step</p>
        </div>
        <div className="courses-grid">
          {config.courses.map((course, i) => (
            <div key={i} className="course-card">
              <div className="course-card-thumb">
                <div className="course-card-icon">&#129354;</div>
                <div className="course-card-lessons">{course.lessons} lessons</div>
              </div>
              <div className="course-card-body">
                <h3 className="course-card-title">{course.title}</h3>
                <p className="course-card-desc">{course.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/register" className="btn">Get Full Access</Link>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="section-dark">
        <div className="section" style={{ padding: '80px 0' }}>
          <div className="section-header">
            <div className="section-label">Training</div>
            <h2 className="section-title">What You'll Master</h2>
          </div>
          <div className="credentials-grid">
            <div className="credential-item">
              <div className="credential-title">Kick Exchange</div>
              <div className="credential-desc">Dominate the kicking game with advanced exchange patterns</div>
            </div>
            <div className="credential-item">
              <div className="credential-title">Elbow Set Ups</div>
              <div className="credential-desc">Devastating entries and set ups for close-range elbows</div>
            </div>
            <div className="credential-item">
              <div className="credential-title">Southpaw Strategy</div>
              <div className="credential-desc">Complete tactical approach to beating southpaw fighters</div>
            </div>
            <div className="credential-item">
              <div className="credential-title">Fakes & Feints</div>
              <div className="credential-desc">Body kicks, low kicks, and teep fakes that create openings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section">
        <div className="section-header">
          <div className="section-label">Pricing</div>
          <h2 className="section-title">Simple, Affordable Plans</h2>
          <p className="section-desc">Full access to everything, starting from &pound;14.99/month</p>
        </div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {config.pricing.map(tier => (
            <div key={tier.id} className={`pricing-card ${tier.popular ? 'popular' : ''}`} style={{ flex: '1', maxWidth: '340px', minWidth: '280px' }}>
              {tier.popular && <div className="pricing-badge">Best Value</div>}
              <h3 className="pricing-name">{tier.name}</h3>
              {tier.originalPrice && (
                <div className="pricing-original">&pound;{tier.originalPrice.toFixed(2)}</div>
              )}
              <div className="pricing-price">
                <span className="pricing-price-symbol">&pound;</span>
                {tier.price.toFixed(2)}
              </div>
              <div className="pricing-interval">per {tier.interval}</div>
              {tier.savings && <div className="pricing-savings">Save {tier.savings}</div>}
              <p className="pricing-desc">{tier.description}</p>
              <Link to="/register" className="btn btn-full" style={{ textDecoration: 'none' }}>Get Started</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark">
        <div style={{ padding: '80px 40px', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', marginBottom: '16px', letterSpacing: '1px' }}>
            Ready to <span className="text-accent">Train</span>?
          </h2>
          <p className="text-secondary" style={{ fontSize: '16px', marginBottom: '32px', lineHeight: '1.7' }}>
            Join Dan McGowan Fight Academy and start learning from a 2x World Champion today.
            Cancel anytime, no commitment.
          </p>
          <Link to="/register" className="btn btn-lg">Start Your Training</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
