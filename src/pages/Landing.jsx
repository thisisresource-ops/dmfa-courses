import { Link } from 'react-router-dom'
import { config } from '../config'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="hero" style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.7), rgba(5,5,5,1)), url(${config.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}>
        <h1 className="hero-title">
          Elite Muay Thai Training
        </h1>
        <p className="hero-subtitle">
          {config.heroSubtitle}
        </p>
        <p className="hero-desc">
          {config.heroDesc}
        </p>
        <div className="hero-cta">
          <a href="#pricing" className="btn btn-lg">View Pricing</a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">2X</div>
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
      <section className="section-dark" id="credentials">
        <div className="section" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="section-header">
            <p className="section-label">Fighter Credentials</p>
            <h2 className="section-title">Dan McGowan's Record</h2>
          </div>
          <div className="credentials-grid">
            {config.credentials.map((cred, i) => (
              <div key={i} className="credential-item">
                <div className="credential-title">{cred.title}</div>
                <div className="credential-desc">{cred.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Dan McGowan - Documentary */}
      <section className="section-gradient">
        <div className="documentary-section">
          <div className="documentary-badge">Fighter Untold</div>
          <h2 className="documentary-title">Meet Dan McGowan</h2>
          <p className="documentary-text">
            Watch Dan's journey from young fighter to world champion
          </p>
          <p className="documentary-subtext">
            Watch the Champion: Fighter Untold documentary featuring Dan McGowan's journey
          </p>
        </div>
      </section>

      {/* Training Content */}
      <section className="section-dark" id="training">
        <div className="section" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="section-header">
            <p className="section-label">What You'll Learn</p>
            <h2 className="section-title">Training Content</h2>
            <p className="section-desc">
              Comprehensive Muay Thai instruction covering striking, defense, conditioning, and fight strategy.
            </p>
          </div>
          <div className="training-list">
            {config.trainingTopics.map((topic, i) => (
              <div key={i} className="training-item">
                <span className="training-check">{'\u2713'}</span>
                <span className="training-text">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section id="courses">
        <div className="section">
          <div className="section-header">
            <p className="section-label">Course Catalog</p>
            <h2 className="section-title">Courses</h2>
          </div>
          <div className="courses-grid">
            {config.courses.map((course, i) => (
              <div key={i} className="course-card">
                <div className="course-card-thumb" style={{
                  background: `linear-gradient(135deg, #18181b, rgba(82, 173, 83, 0.08))`,
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
      <section className="section-dark" id="pricing">
        <div className="section" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="section-header">
            <p className="section-label">Get Started</p>
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
          <div className="checkout-steps">
            <p className="checkout-step">
              <strong>Step 1:</strong> Purchase your plan via Stripe
            </p>
            <p className="checkout-step">
              <strong>Step 2:</strong> Click 'Sign Up' to create your account
            </p>
            <p className="checkout-note">
              Use the same email for both steps &bull; Secure checkout via Stripe
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="cta-section">
          <h2 className="cta-title">
            Ready to <span className="text-accent">Train</span>?
          </h2>
          <p className="cta-text">
            Join Dan McGowan's online Muay Thai training program.
          </p>
          <p className="cta-text" style={{ fontSize: '15px', marginBottom: '32px' }}>
            Access professional-level instruction from a proven world champion fighter and coach.
          </p>
          <a href="#pricing" className="btn btn-lg">View Pricing</a>
          <p className="cta-note">
            Suitable for all skill levels &mdash; beginner to advanced.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
