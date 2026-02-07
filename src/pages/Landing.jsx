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
          Elite <span className="accent">Muay Thai</span><br />Training
        </h1>
        <p className="hero-subtitle">
          {config.heroSubtitle}
        </p>
        <p className="hero-desc">
          World-class techniques from a fighter who competed and won at the highest levels.
        </p>
        <p className="hero-desc">
          Master authentic Muay Thai with proven training methods used by professional fighters.
        </p>
        <div className="hero-cta">
          <a href="#pricing" className="btn btn-lg btn-cta">View Pricing <span className="btn-arrow">&#10132;</span></a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value text-accent">2X</div>
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
            <h2 className="section-title">DAN McGOWAN'S <span className="accent">RECORD</span></h2>
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
          <h2 className="documentary-title">MEET <span className="accent">DAN McGOWAN</span></h2>
          <p className="documentary-text">
            Watch Dan's journey from young fighter to world champion
          </p>
          <div className="documentary-video">
            <iframe
              src="https://www.youtube.com/embed/GwJsw7AsHcc"
              title="Fighter Untold - Dan McGowan"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="documentary-subtext">
            Champion: Fighter Untold documentary featuring Dan McGowan's journey
          </p>
        </div>
      </section>

      {/* Training Content */}
      <section className="section-dark" id="training">
        <div className="section" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="section-header">
            <p className="section-label">What You'll Learn</p>
            <h2 className="section-title">TRAINING <span className="accent">CONTENT</span></h2>
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


      {/* Pricing */}
      <section className="section-dark" id="pricing">
        <div className="section" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="section-header">
            <p className="section-label">Get Started</p>
            <h2 className="section-title">CHOOSE YOUR <span className="accent">PLAN</span></h2>
            <p className="section-desc">
              Get instant access to world-class Muay Thai training. All plans include full course access.
            </p>
          </div>
          <div className="pricing-grid">
            {config.pricing.map(tier => (
              <div key={tier.id} className={`pricing-card ${tier.popular ? 'popular' : ''}`}>
                {tier.badge && <div className="pricing-badge">{tier.badge}</div>}
                {tier.savings && !tier.badge && <div className="pricing-badge pricing-badge-sale">{tier.savings}</div>}

                <h3 className="pricing-name">{tier.name}</h3>

                {tier.originalPrice && (
                  <div className="pricing-original">&pound;{tier.originalPrice.toFixed(2)}</div>
                )}

                <div className="pricing-price">
                  <span className="pricing-price-symbol">&pound;</span>
                  {tier.price.toFixed(2)}
                  <span className="pricing-interval">/{tier.interval}</span>
                </div>

                <p className={`pricing-desc ${tier.savings ? 'pricing-desc-savings' : ''}`}>{tier.description}</p>

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
      <section className="section-dark">
        <div className="cta-section">
          <h2 className="cta-title">
            READY TO <span className="text-accent">TRAIN</span>?
          </h2>
          <p className="cta-text">
            Join Dan McGowan's online Muay Thai training program.
          </p>
          <p className="cta-text-sm">
            Access professional-level instruction from a proven world champion fighter and coach.
          </p>
          <a href="#pricing" className="btn btn-lg btn-cta">View Pricing <span className="btn-arrow">&#10132;</span></a>
          <p className="cta-note">
            Suitable for all skill levels &mdash; beginner to advanced.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
