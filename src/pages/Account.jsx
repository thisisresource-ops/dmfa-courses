import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { config } from '../config'

export default function Account() {
  const { user, profile, signOut, hasActiveSubscription } = useAuth()
  const [portalLoading, setPortalLoading] = useState(false)

  const handleManageSubscription = async () => {
    if (!profile?.stripe_customer_id) {
      alert('No subscription found. Please subscribe first.')
      return
    }

    setPortalLoading(true)
    try {
      const session = await (await import('../lib/supabase')).supabase?.auth.getSession()
      const token = session?.data?.session?.access_token

      const res = await fetch(config.webhooks.billingPortal, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerId: profile.stripe_customer_id,
          returnUrl: window.location.origin + '/account',
        })
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      alert('Unable to open billing portal. Please try again.')
    }
    setPortalLoading(false)
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const tierName = () => {
    switch (profile?.subscription_tier) {
      case 'monthly': return 'Monthly'
      case 'quarterly': return 'Quarterly'
      case 'yearly': return 'Yearly'
      default: return profile?.subscription_tier || 'None'
    }
  }

  return (
    <div className="account-page">
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', letterSpacing: '1px', marginBottom: '32px' }}>
        Account
      </h1>

      {/* Profile */}
      <div className="account-section">
        <h3 className="account-section-title">Profile</h3>
        <div className="account-row">
          <span className="account-row-label">Name</span>
          <span className="account-row-value">
            {profile?.full_name || user?.user_metadata?.full_name || 'Not set'}
          </span>
        </div>
        <div className="account-row">
          <span className="account-row-label">Email</span>
          <span className="account-row-value">{user?.email}</span>
        </div>
        <div className="account-row">
          <span className="account-row-label">Member since</span>
          <span className="account-row-value">{formatDate(user?.created_at)}</span>
        </div>
      </div>

      {/* Subscription */}
      <div className="account-section">
        <h3 className="account-section-title">Subscription</h3>
        <div className="account-row">
          <span className="account-row-label">Status</span>
          <span className={`subscription-status ${hasActiveSubscription() ? 'active' : 'inactive'}`}>
            {profile?.subscription_status || 'Inactive'}
          </span>
        </div>
        {profile?.subscription_tier && (
          <div className="account-row">
            <span className="account-row-label">Plan</span>
            <span className="account-row-value">{tierName()}</span>
          </div>
        )}
        {profile?.subscription_period_end && (
          <div className="account-row">
            <span className="account-row-label">
              {hasActiveSubscription() ? 'Renews' : 'Expired'}
            </span>
            <span className="account-row-value">{formatDate(profile.subscription_period_end)}</span>
          </div>
        )}

        <div style={{ marginTop: '16px' }}>
          {hasActiveSubscription() ? (
            <button
              className="btn-outline"
              onClick={handleManageSubscription}
              disabled={portalLoading}
              style={{ width: '100%' }}
            >
              {portalLoading ? 'Loading...' : 'Manage Subscription'}
            </button>
          ) : (
            <a href="/pricing" className="btn btn-full" style={{ textDecoration: 'none', display: 'block' }}>
              Subscribe Now
            </a>
          )}
        </div>
      </div>

      {/* Sign Out */}
      <div className="account-section" style={{ textAlign: 'center' }}>
        <button className="btn-ghost" onClick={signOut} style={{ color: 'var(--text-muted)' }}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
