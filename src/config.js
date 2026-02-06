// DMFA Courses Configuration

export const config = {
  businessName: 'Dan McGowan Fight Academy',
  tagline: '2x World Champion Muay Thai',
  description: 'Learn elite Muay Thai striking from a 2x World Champion. 6 courses, 100+ video lessons — train on your schedule, from anywhere.',

  // Supabase
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',

  // n8n webhook base
  n8nBase: 'https://n8n.thisisresource.co.uk/webhook',

  // Webhook endpoints
  webhooks: {
    createCheckout: 'https://n8n.thisisresource.co.uk/webhook/dmfa-create-checkout',
    stripeWebhook: 'https://n8n.thisisresource.co.uk/webhook/dmfa-stripe-webhook',
    billingPortal: 'https://n8n.thisisresource.co.uk/webhook/dmfa-billing-portal',
    videoToken: 'https://n8n.thisisresource.co.uk/webhook/dmfa-video-token',
  },

  // Pricing tiers
  pricing: [
    {
      id: 'monthly',
      name: 'Monthly',
      price: 14.99,
      interval: 'month',
      description: 'Full access, cancel anytime',
      stripePriceId: '', // Set after Stripe setup
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      price: 44.99,
      interval: '3 months',
      description: 'Save 25% vs monthly',
      savings: '25%',
      stripePriceId: '',
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: 59.50,
      originalPrice: 119.99,
      interval: 'year',
      description: 'Best value — save 50%',
      savings: '50%',
      popular: true,
      stripePriceId: '',
    },
  ],

  // Course list (for landing page preview before DB is seeded)
  courses: [
    { title: 'Kick Exchange', lessons: 18, description: 'Master the art of trading kicks effectively' },
    { title: 'Elbow Set Ups', lessons: 16, description: 'Devastating elbow techniques and entries' },
    { title: 'Beating a Southpaw', lessons: 20, description: 'Strategies to dominate southpaw opponents' },
    { title: 'Body Kick Set Ups', lessons: 15, description: 'Set up powerful body kicks that land clean' },
    { title: 'Body & Low Kick Fakes', lessons: 17, description: 'Use fakes to create openings and score' },
    { title: 'Teep Fakes', lessons: 14, description: 'The push kick — fakes, timing, and distance control' },
  ],

  // Social / contact
  instagram: '@mcgowanmuaythai',
  website: 'danmcgowanfightacademy.com',
}

export default config
