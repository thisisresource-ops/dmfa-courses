import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { config } from '../config'

export default function PricingCard({ tier }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!tier.stripePriceId) {
      alert('Stripe is not yet configured. Coming soon!')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(config.webhooks.createCheckout, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: tier.stripePriceId,
          email: user?.email || '',
          userId: user?.id || '',
          successUrl: window.location.origin + '/dashboard',
          cancelUrl: window.location.origin + '/pricing',
        })
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      alert('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className={`pricing-card ${tier.popular ? 'popular' : ''}`}>
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
        {(tier.features || []).map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <button
        className="btn btn-full"
        onClick={handleSubscribe}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get Started'}
      </button>
    </div>
  )
}
