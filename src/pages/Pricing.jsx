import { config } from '../config'
import PricingCard from '../components/PricingCard'
import Footer from '../components/Footer'

export default function Pricing() {
  return (
    <div>
      <section className="section">
        <div className="section-header">
          <p className="section-label">Get Started</p>
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
      </section>

      <Footer />
    </div>
  )
}
