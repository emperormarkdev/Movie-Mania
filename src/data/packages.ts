export interface PromotionPackage {
  id: string;
  name: string;
  platform: 'facebook' | 'instagram' | 'tiktok' | 'telegram';
  price: number;
  formattedPrice: string;
  clipsCount: number;
  badge?: string;
  popular?: boolean;
  tagline: string;
  deliverables: string[];
  schedulingSupport: boolean; // whether they can choose same-day vs next-day
  icon: string;
  accentColor: string;
  platformColor: string;
}

export const PROMOTION_PACKAGES: PromotionPackage[] = [
  {
    id: 'instagram',
    name: 'Instagram Promotion',
    platform: 'instagram',
    price: 15000,
    formattedPrice: '₦15,000',
    clipsCount: 2,
    popular: true,
    badge: 'HIGH ENGAGEMENT',
    tagline: 'Spotlight your movie with Reels & Story buzz to thousands of film lovers.',
    deliverables: [
      '2 High-Quality Promotional Clips (Reels)',
      'Option for Same-Day or Next-Day Staggered Posting',
      'Official Handles & Cast Tagged in Caption',
      'Targeted Film & Cinema Hashtags',
      'Permanent Feed Placement'
    ],
    schedulingSupport: true,
    icon: 'Instagram',
    accentColor: '#E1306C',
    platformColor: 'from-pink-600 to-purple-600'
  },
  {
    id: 'facebook',
    name: 'Facebook Promotion',
    platform: 'facebook',
    price: 15000,
    formattedPrice: '₦15,000',
    clipsCount: 2,
    popular: false,
    badge: 'VIRAL REACH',
    tagline: 'Massive organic sharing across active movie communities and cinema groups.',
    deliverables: [
      '2 High-Impact Promotional Clips',
      'Option for Same-Day or Next-Day Staggered Posting',
      'Full Movie Synopsis & Streaming / Ticket Link in Caption',
      'Optimized for Facebook Video Feeds & Group Shares',
      'Direct Click-Through Traffic'
    ],
    schedulingSupport: true,
    icon: 'Facebook',
    accentColor: '#1877F2',
    platformColor: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'tiktok',
    name: 'TikTok Promotion',
    platform: 'tiktok',
    price: 5000,
    formattedPrice: '₦5,000',
    clipsCount: 1,
    popular: false,
    badge: 'GEN-Z & VIRALITY',
    tagline: 'Hook mobile viewers fast with algorithmic feed placement and trending sound synergy.',
    deliverables: [
      '1 Ultra-Engaging Vertical Video (9:16)',
      'Optimized Hook & SEO-Indexed Film Keywords',
      'Official Account Tagged',
      'Comment Section Engagement'
    ],
    schedulingSupport: false,
    icon: 'Video',
    accentColor: '#00F2FE',
    platformColor: 'from-cyan-500 to-fuchsia-500'
  },
  {
    id: 'telegram',
    name: 'Telegram Promotion',
    platform: 'telegram',
    price: 5000,
    formattedPrice: '₦5,000',
    clipsCount: 1,
    popular: false,
    badge: 'INSTANT ALERTS',
    tagline: 'Push directly to dedicated movie lovers, cinema buffs, and download channels.',
    deliverables: [
      '1 Dedicated Channel Broadcast Post',
      'High-Resolution Movie Poster / Clip Preview',
      'Direct Clickable Link (YouTube, Netflix, Cinema Booking)',
      'Pinned Notification for Maximum Eyeballs'
    ],
    schedulingSupport: false,
    icon: 'Send',
    accentColor: '#2AABEE',
    platformColor: 'from-sky-500 to-blue-600'
  }
];

export const ALL_IN_ONE_BUNDLE = {
  id: 'all-in-one',
  name: 'Complete All-Platform Takeover',
  price: 40000,
  formattedPrice: '₦40,000',
  tagline: 'Dominate everywhere: Facebook, Instagram, TikTok & Telegram all together.',
  totalClips: 6, // 2 FB + 2 IG + 1 TikTok + 1 Telegram
  platforms: ['Instagram', 'Facebook', 'TikTok', 'Telegram'],
  badge: 'MAXIMUM EXPOSURE'
};

export const CONTACT_INFO = {
  brandName: 'Movie Mania',
  whatsappNumber: '08147300090',
  whatsappFormatted: '+234 814 730 0090',
  whatsappDirectUrl: 'https://wa.me/2348147300090',
  supportNote: 'Payment confirms booking. Direct inquiries on WhatsApp.'
};

export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'tiktok' | 'telegram';
  label: string;
  handle: string;
  url: string;
  description: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'instagram',
    label: 'Instagram',
    handle: '@thisismoviemania',
    url: 'https://www.instagram.com/thisismoviemania',
    description: 'Reels, film spotlights and behind-the-scenes promos.',
  },
  {
    platform: 'facebook',
    label: 'Facebook',
    handle: 'Movie Mania',
    url: 'https://www.facebook.com/share/19twT3Ucwe/',
    description: 'Video feeds, group shares and cinema releases.',
  },
  {
    platform: 'tiktok',
    label: 'TikTok',
    handle: '@thisismoviemania',
    url: 'https://www.tiktok.com/@thisismoviemania',
    description: 'Vertical cuts built for the algorithm.',
  },
  {
    platform: 'telegram',
    label: 'Telegram',
    handle: 'MoviemaniansPage',
    url: 'https://t.me/MoviemaniansPage',
    description: 'Broadcast posts straight to movie lovers.',
  },
];

