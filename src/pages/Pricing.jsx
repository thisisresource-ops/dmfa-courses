import { config } from '../config'
import PricingCard from '../components/PricingCard'
import Footer from '../components/Footer'

export default function Pricing() {
  return (
    <div>
      <section className="section">
        <div className="section-header">
          <div className="section-label">Pricing</div>
          <h2 className="section-title">Choose Your Plan</h2>
          <p className="section-desc">Full access to all courses with every plan. Cancel anytime.</p>
        </div>

        <div className="pricing-grid">
          {config.pricing.map(tier => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p className="text-muted" style={{ fontSize: '14px' }}>
            All plans include full access to 6 courses, 100+ lessons, progress tracking, and personal notes.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-dark">
        <div className="section" style={{ padding: '80px 0' }}>
          <div className="section-header">
            <h2 className="section-title">Common Questions</h2>
          </div>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            {[
              {
                q: 'What do I get access to?',
                a: 'All 6 complete courses with 100+ HD video lessons. New content is added regularly.'
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. Cancel from your account page at any time. You\'ll keep access until your current billing period ends.'
              },
              {
                q: 'Is this suitable for beginners?',
                a: 'These courses cover intermediate to advanced techniques. A basic understanding of Muay Thai fundamentals is recommended.'
              },
              {
                q: 'Can I watch on mobile?',
                a: 'Yes. The platform works on any device — phone, tablet, or desktop. Stream anywhere with an internet connection.'
              },
              {
                q: 'Who is Dan McGowan?',
                a: 'Dan McGowan is a 2x World Champion in Muay Thai with decades of competitive and coaching experience at the highest level.'
              },
            ].map((faq, i) => (
              <div key={i} style={{
                padding: '20px 0',
                borderBottom: i < 4 ? '1px solid var(--border)' : 'none'
              }}>
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '16px',
                  letterSpacing: '1px',
                  marginBottom: '8px'
                }}>{faq.q}</h4>
                <p className="text-secondary" style={{ fontSize: '14px', lineHeight: '1.6' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
