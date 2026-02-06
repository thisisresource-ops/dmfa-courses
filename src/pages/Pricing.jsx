import { config } from '../config'
import PricingCard from '../components/PricingCard'
import Footer from '../components/Footer'

export default function Pricing() {
  return (
    <div>
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Choose Your Plan</h2>
          <p className="section-desc">
            Get instant access to world-class Muay Thai training. All plans include full course access.
          </p>
        </div>

        <div className="pricing-grid">
          {config.pricing.map(tier => (
            <PricingCard key={tier.id} tier={tier} />
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

      <Footer />
    </div>
  )
}
