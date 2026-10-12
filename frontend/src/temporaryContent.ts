export type TemporaryHeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
};

export const temporaryHeroSlides: TemporaryHeroSlide[] = [
  {
    id: 'official-president-cup-2026',
    title: 'Enterprise leadership for Maharashtra',
    subtitle: 'MACCIA connects business, industry and agriculture with trusted representation and statewide opportunity.',
    ctaText: 'Explore MACCIA',
    ctaLink: '/about',
    image: '/images/official/hero-president-cup-2026.webp',
    imageAlt: 'MACCIA President’s Cup presentation at an institutional programme in 2026',
    objectPosition: 'center 42%',
  },
  {
    id: 'official-business-network',
    title: 'A network built for business growth',
    subtitle: 'Meet enterprise leaders, exchange knowledge and build relationships across Maharashtra.',
    ctaText: 'Become a Member',
    ctaLink: '/membership/apply',
    image: '/images/official/hero-business-network.webp',
    imageAlt: 'MACCIA members and business leaders at a Chamber programme',
    objectPosition: 'center center',
  },
  {
    id: 'official-press-meeting',
    title: 'A trusted forum for industry voices',
    subtitle: 'Institutional events, policy dialogue and business programmes bring Maharashtra’s enterprise community together.',
    ctaText: 'View Event Highlights',
    ctaLink: '/events',
    image: '/images/official/hero-press-meeting.webp',
    imageAlt: 'MACCIA representatives at an official press meeting',
    objectPosition: 'center 38%',
  },
];

export const temporaryEvents = [
  {
    _id: '66f000000000000000000101', slug: 'government-schemes-business-opportunities-2025',
    title: { en: 'Government Schemes and Business Opportunities' },
    shortDescription: { en: 'A MACCIA seminar presenting government schemes, MSME support, finance and business-growth guidance on one platform.' },
    description: { en: 'MACCIA organised this seminar to help entrepreneurs understand government schemes, startup and MSME support, grants, loans and practical opportunities for business growth.' },
    date: '2025-09-18T00:00:00+05:30', eventType: 'recent', status: 'published',
    category: { en: 'Business Guidance' }, location: { en: 'MACCIA North Maharashtra Regional Office, Nashik' },
    featuredImage: '/images/official/event-government-schemes-2025.webp', isFeatured: true,
  },
  {
    _id: '66f000000000000000000102', slug: 'maccia-business-networking-meet-second-edition-2025',
    title: { en: 'MACCIA’s Business Networking Meet (2nd Edition)' },
    shortDescription: { en: 'Entrepreneurs, professionals and startups connected, exchanged ideas and explored new collaborations.' },
    description: { en: 'The second MACCIA Business Networking Meet brought together members and guests for practical conversations, new connections and guidance from angel investor and mentor Monica Gupta.' },
    date: '2025-09-17T00:00:00+05:30', eventType: 'recent', status: 'published',
    category: { en: 'Business Networking' }, location: { en: 'Mumbai' },
    featuredImage: '/images/official/event-networking-second-edition-2025.webp', isFeatured: true,
  },
  {
    _id: '66f000000000000000000103', slug: 'maccia-business-networking-meet-2025',
    title: { en: 'MACCIA Business Networking Meet' },
    shortDescription: { en: 'An open platform for entrepreneurs, startups, business owners and professionals to connect and grow.' },
    description: { en: 'MACCIA’s networking programme at Dadar Club welcomed entrepreneurs and professionals for introductions, business exchange and a guest session with Monica Gupta of Earlyseed Ventures.' },
    date: '2025-09-16T00:00:00+05:30', eventType: 'recent', status: 'published',
    category: { en: 'Business Networking' }, location: { en: 'Dadar Club, Mumbai' },
    featuredImage: '/images/official/event-business-networking-2025.webp', isFeatured: true,
  },
];

export const temporaryNews = [
  {
    _id: '66f000000000000000000201', slug: 'maccia-business-networking-forum-mumbai-2025',
    title: { en: 'MACCIA Business Networking Forum Mumbai Chapter Begins with Strong Participation' },
    excerpt: { en: 'The inaugural Mumbai chapter meeting brought together approximately 60 members to build connections and explore collaboration.' },
    content: { en: 'The inaugural MACCIA Business Networking Forum meeting at Dadar Club brought entrepreneurs and business leaders together for introductions, exchange and collaboration. Chamber representatives outlined the Forum’s objectives and the opportunities available through an active member network.' },
    publishDate: '2025-07-23T00:00:00+05:30', status: 'published', category: { en: 'Member Network' },
    featuredImage: '/images/official/news-mbn-forum-2025.webp', isFeatured: true,
  },
  {
    _id: '66f000000000000000000202', slug: 'industry-skill-meet-2025',
    title: { en: 'Industry Skill Meet – Empowering Industry through Skill Initiatives' },
    excerpt: { en: 'Industry, education and government representatives discussed skills, certification and workforce development initiatives.' },
    content: { en: 'MACCIA convened leaders from industry, trade, services and academic institutions for a focused discussion on skill development, certification and workforce empowerment through Government of India and Government of Maharashtra initiatives.' },
    publishDate: '2025-08-09T00:00:00+05:30', status: 'published', category: { en: 'Skills & Industry' },
    featuredImage: '/images/official/news-industry-skill-meet-2025.webp', isFeatured: true,
  },
  {
    _id: '66f000000000000000000203', slug: 'national-handloom-day-2025',
    title: { en: 'National Handloom Day 2025 – Heritage Hands: A Tapestry of Weaves' },
    excerpt: { en: 'MACCIA’s Women Entrepreneurs Committee celebrated Indian weaving traditions through dialogue, exhibition and fashion.' },
    content: { en: 'The Women Entrepreneurs Committee of MACCIA marked National Handloom Day at Oricon House with a panel discussion, a handloom and handcrafted exhibition, and a fashion presentation celebrating India’s weaving traditions and sustainable enterprise.' },
    publishDate: '2025-08-07T00:00:00+05:30', status: 'published', category: { en: 'Women Entrepreneurs' },
    featuredImage: '/images/official/news-national-handloom-day-2025.webp', isFeatured: true,
  },
];

export const temporaryVenues = [
  {
    _id: '66f000000000000000000301', slug: 'kr-bedmutha-auditorium', name: { en: 'K.R. Bedmutha Auditorium' },
    description: { en: 'A purpose-built auditorium suitable for annual meetings, conferences and seminars.' }, capacity: 50,
    idealUsage: { en: 'AGMs, conferences and seminars' }, images: ['/images/official/venue-kr-bedmutha-auditorium.webp'], isActive: true,
  },
  {
    _id: '66f000000000000000000302', slug: 'darbar-hall', name: { en: 'Darbar Hall' },
    description: { en: 'An intimate hall for focused social and business meetings.' }, capacity: 15,
    idealUsage: { en: 'Social and business meetings' }, images: ['/images/official/venue-darbar-hall.webp'], isActive: true,
  },
  {
    _id: '66f000000000000000000303', slug: 'executive-board-room', name: { en: 'Executive Board Room' },
    description: { en: 'A formal board room for interviews, arbitrations and business discussions.' }, capacity: 12,
    idealUsage: { en: 'Interviews, arbitrations and business meetings' }, images: ['/images/official/venue-executive-board-room.webp'], isActive: true,
  },
];

export const serviceImages: Record<string, { image: string; alt: string; position?: string }> = {
  'certificate-of-origin': { image: '/images/official/service-certificate-of-origin.webp', alt: 'MACCIA Certificate of Origin service' },
  'visa-facilitation': { image: '/images/official/service-visa-facilitation.webp', alt: 'MACCIA visa facilitation service' },
  'training-and-workshops': { image: '/images/official/service-training-workshops.webp', alt: 'MACCIA training and workshop programme' },
  'arbitration-and-mediation-centre-of-maccia': { image: '/images/official/service-arbitration-mediation.webp', alt: 'MACCIA arbitration and mediation service' },
  'venue-booking': { image: '/images/official/service-conference-venue-hire.webp', alt: 'MACCIA conference and venue facilities' },
};
