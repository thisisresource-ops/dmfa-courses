// DMFA Courses Configuration

export const config = {
  businessName: 'McGowan Muay Thai',
  tagline: '2x World Champion',
  heroTitle: 'Elite Muay Thai Training',
  heroSubtitle: 'Learn from 2x World Champion Dan McGowan',
  heroDesc: 'World-class techniques from a fighter who competed and won at the highest levels. Master authentic Muay Thai with proven training methods used by professional fighters.',

  // Dan's photo from original site
  heroImage: 'https://images.squarespace-cdn.com/content/v1/65494f4b68f4bc6c7193988d/0a525680-fd07-4935-9b62-1b35dc29cc22/IMG_3471.jpeg',
  logoUrl: '/logo.png',

  // Supabase
  supabaseUrl: (import.meta.env.VITE_SUPABASE_URL || '').trim(),
  supabaseAnonKey: (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim(),

  // n8n webhook base
  n8nBase: 'https://n8n.thisisresource.co.uk/webhook',

  // Webhook endpoints
  webhooks: {
    createCheckout: 'https://n8n.thisisresource.co.uk/webhook/dmfa-create-checkout',
    stripeWebhook: 'https://n8n.thisisresource.co.uk/webhook/dmfa-stripe-webhook',
    billingPortal: 'https://n8n.thisisresource.co.uk/webhook/dmfa-billing-portal',
    videoToken: 'https://n8n.thisisresource.co.uk/webhook/dmfa-video-token',
  },

  // Pricing tiers (matched from original site)
  pricing: [
    {
      id: 'monthly',
      name: 'Monthly',
      price: 14.99,
      interval: 'month',
      description: 'Perfect for trying out the program',
      features: [
        'Full access to all courses',
        '100+ video lessons',
        'Cross-device sync',
        'Personal progress notes',
        'Cancel anytime',
      ],
      stripePriceId: '',
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      price: 44.99,
      interval: '3 months',
      description: 'Save vs monthly',
      popular: true,
      badge: 'Most Popular',
      features: [
        'Full access to all courses',
        '100+ video lessons',
        'Cross-device sync',
        'Personal progress notes',
        'Priority support',
        'Best value for money',
      ],
      stripePriceId: '',
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: 59.50,
      originalPrice: 119.99,
      interval: 'year',
      description: 'Save \u00a360.49 \u2014 Limited Time!',
      savings: 'Black Friday Sale',
      features: [
        'Full access to all courses',
        '100+ video lessons',
        'Cross-device sync',
        'Personal progress notes',
        'Priority support',
        'Early access to new content',
        'Maximum savings',
      ],
      stripePriceId: '',
    },
  ],

  // Credentials (matched from original)
  credentials: [
    { title: '2x World Champion', desc: 'Elite level championship titles' },
    { title: '3x Junior World Champion', desc: 'Dominated youth competition circuit' },
    { title: 'Former UK #1', desc: 'Top-ranked British Muay Thai fighter' },
    { title: '40+ Professional Fights', desc: 'Extensive ring experience worldwide' },
    { title: 'Competed in Thailand', desc: 'Fought and defeated Thai champions' },
    { title: 'Professional Coach', desc: 'Training fighters for 10+ years' },
  ],

  // Course list (matched from original site)
  courses: [
    { title: 'Winning Kick Exchange', lessons: 7, description: 'Master kick exchange techniques' },
    { title: 'Elbow Set Ups', lessons: 11, description: 'Advanced elbow techniques and setups' },
    { title: 'Beating a Southpaw', lessons: 11, description: 'Strategic approach to fighting southpaw opponents' },
    { title: 'Body Kick Set Ups', lessons: 15, description: 'Comprehensive body kick techniques and strategies' },
    { title: 'Body & Low Kick Fakes', lessons: 9, description: 'Deceptive kick techniques to outsmart opponents' },
    { title: 'Teep Fakes', lessons: 15, description: 'Master the art of teep fakes' },
  ],

  // Training content topics (from original)
  trainingTopics: [
    'Authentic Muay Thai striking fundamentals and advanced combinations',
    'Defensive techniques including blocks, parries, and evasive movement',
    'Fighter conditioning and strength training protocols',
    'Clinch work: controlling opponents and landing knees and elbows',
    'Pad work techniques for developing power and accuracy',
    'Ring generalship and fight IQ development',
    'Mental preparation and competition mindset training',
    'Technical analysis from Dan\'s 40+ professional fights',
  ],

  // Social / contact
  instagram: '@mcgowanmuaythai',
  website: 'danmcgowanfightacademy.com',
}

export default config
