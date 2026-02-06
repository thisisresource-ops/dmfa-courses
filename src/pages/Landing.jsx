import { Link } from 'react-router-dom'
import { config } from '../config'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="hero" style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(5,5,5,0.95)), url(${config.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}>
        <h1 className="hero-title">
          Elite Muay Thai Training
        </h1>
        <p className="hero-subtitle" style={{ maxWidth: '700px' }}>
          {config.heroSubtitle}
        </p>
        <p className="hero-subtitle" style={{ fontSize: '16px', maxWidth: '650px', marginTop: '-20px' }}>
          {config.heroDesc}
        </p>
        <div className="hero-cta">
          <Link to="/pricing" className="btn btn-lg">View Pricing</Link>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">2x</div>
            <div className="hero-stat-label">World Champion</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">40+</div>
            <div className="hero-stat-label">Pro Fights</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">10+</div>
            <div className="hero-stat-label">Years Coaching</div>
          </div>
        </div>
      </section>

      {/* Dan McGowan's Record */}
      <section className="section-dark">
        <div className="section" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="section-header">
            <h2 className="section-title">Dan McGowan's Record</h2>
          </div>
          <div className="credentials-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {config.credentials.map((cred, i) => (
              <div key={i} className="credential-item" style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '24px',
              }}>
                <div className="credential-title" style={{ color: 'var(--accent)', marginBottom: '8px' }}>
                  {cred.title}
                </div>
                <div className="credential-desc">{cred.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Content */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Training Content</h2>
          <p className="section-desc">
            Comprehensive Muay Thai instruction covering striking, defense, conditioning, and fight strategy.
          </p>
        </div>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {config.trainingTopics.map((topic, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '12px 0',
              borderBottom: i < config.trainingTopics.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ color: 'var(--accent)', fontWeight: 'bold', flexShrink: 0 }}>{'\u2713'}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>{topic}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Course Cards */}
      <section className="section-dark">
        <div className="section" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="section-header">
            <h2 className="section-title">Courses</h2>
          </div>
          <div className="courses-grid">
            {config.courses.map((course, i) => (
              <div key={i} className="course-card">
                <div className="course-card-thumb" style={{
                  background: `linear-gradient(135deg, var(--bg-tertiary), rgba(82, 173, 83, 0.1))`,
                }}>
                  <div className="course-card-lessons">{course.lessons} lessons</div>
                </div>
                <div className="course-card-body">
                  <h3 className="course-card-title">{course.title}</h3>
                  <p className="course-card-desc">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Choose Your Plan</h2>
          <p className="section-desc">
            Get instant access to world-class Muay Thai training. All plans include full course access.
          </p>
        </div>
        <div className="pricing-grid">
          {config.pricing.map(tier => (
            <div key={tier.id} className={`pricing-card ${tier.popular ? 'popular' : ''}`}>
              {tier.badge && <div className="pricing-badge">{tier.badge}</div>}
              {tier.savings && !tier.badge && <div className="pricing-badge">{tier.savings}</div>}

              <h3 className="pricing-name">{tier.name}</h3>

              {tier.originalPrice && (
                <div className="pricing-original">&pound;{tier.originalPrice.toFixed(2)}</div>
              )}

              <div className="pricing-price">
                <span className="pricing-price-symbol">&pound;</span>
                {tier.price.toFixed(2)}
              </div>

              <div className="pricing-interval">per {tier.interval}</div>

              {tier.savings && <div className="pricing-savings">{tier.savings}</div>}

              <p className="pricing-desc">{tier.description}</p>

              <ul className="pricing-features">
                {tier.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <Link to="/register" className="btn btn-full" style={{ textDecoration: 'none' }}>
                Get Started
              </Link>
            </div>
          ))}
        </div>

        {/* Checkout instructions */}
        <div style={{
          maxWidth: '500px',
          margin: '40px auto 0',
          textAlign: 'center',
          padding: '24px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>
            <strong style={{ color: 'var(--accent)' }}>Step 1:</strong> Purchase your plan via Stripe
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>
            <strong style={{ color: 'var(--accent)' }}>Step 2:</strong> Click 'Sign Up' to create your account
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '12px' }}>
            Use the same email for both steps &bull; Secure checkout via Stripe
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark">
        <div style={{ padding: '80px 40px', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '16px', fontWeight: '700' }}>
            Ready to <span className="text-accent">Train</span>?
          </h2>
          <p className="text-secondary" style={{ fontSize: '16px', marginBottom: '12px', lineHeight: '1.7' }}>
            Join Dan McGowan's online Muay Thai training program.
          </p>
          <p className="text-secondary" style={{ fontSize: '15px', marginBottom: '32px', lineHeight: '1.7' }}>
            Access professional-level instruction from a proven world champion fighter and coach.
          </p>
          <Link to="/pricing" className="btn btn-lg">View Pricing</Link>
          <p className="text-muted" style={{ fontSize: '13px', marginTop: '16px' }}>
            Suitable for all skill levels &mdash; beginner to advanced.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
