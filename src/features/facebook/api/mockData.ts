export interface FacebookPageProfile {
  id: string; // page username/id e.g. 'techvibe'
  pageName: string;
  category: string;
  avatarUrl: string;
  coverUrl: string;
  likes: number;
  followers: number;
  weeklyReach: number;
  engagementRate: number;
  adAccountStatus: 'Active' | 'Under Review' | 'Disabled';
  totalAdSpentThisMonth: number;
}

export interface FacebookPost {
  id: string;
  content: string;
  type: 'Video' | 'Photo' | 'Link' | 'Text';
  publishedAt: string;
  reach: number;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  clicks: number;
  ctr: number;
}

export interface AdCampaign {
  id: string;
  name: string;
  status: 'Active' | 'Paused';
  objective: 'Lead Generation' | 'Traffic' | 'Conversions' | 'Brand Awareness';
  budget: number;
  budgetType: 'Daily' | 'Lifetime';
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpr: number;
}

export interface DailyReach {
  day: string;
  organic: number;
  paid: number;
}

export interface AudienceDemographics {
  ageGroup: string;
  malePercentage: number;
  femalePercentage: number;
}

export interface FacebookPageData {
  profile: FacebookPageProfile;
  posts: FacebookPost[];
  campaigns: AdCampaign[];
  dailyReach: DailyReach[];
  demographics: AudienceDemographics[];
}

export const facebookPagesDb: Record<string, FacebookPageData> = {
  techvibe: {
    profile: {
      id: 'techvibe',
      pageName: 'TechVibe Nigeria',
      category: 'Media & Technology Company',
      avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      likes: 48250,
      followers: 52190,
      weeklyReach: 184900,
      engagementRate: 5.8,
      adAccountStatus: 'Active',
      totalAdSpentThisMonth: 124800,
    },
    posts: [
      {
        id: 'post-1',
        content: 'Top 5 Tech Hubs in Lagos to watch in 2026. From Yaba to Lekki, innovation is scaling rapidly! 🚀 #LagosTech #NigeriaInnovates',
        type: 'Photo',
        publishedAt: '2 hours ago',
        reach: 12450,
        engagement: { likes: 980, comments: 245, shares: 112 },
        clicks: 1420,
        ctr: 11.4,
      },
      {
        id: 'post-2',
        content: 'Exclusive Interview: How local startups are solving cross-border payment bottlenecks across Sub-Saharan Africa. Watch the full episode below! 🎙️',
        type: 'Video',
        publishedAt: '1 day ago',
        reach: 28400,
        engagement: { likes: 2150, comments: 489, shares: 354 },
        clicks: 4120,
        ctr: 14.5,
      },
      {
        id: 'post-3',
        content: 'NGX Stock Market rallies as major banking stocks hit record-high caps. Read our full investment simulation analysis here:',
        type: 'Link',
        publishedAt: '3 days ago',
        reach: 18900,
        engagement: { likes: 740, comments: 115, shares: 89 },
        clicks: 2950,
        ctr: 15.6,
      },
      {
        id: 'post-4',
        content: 'Happy Sunday to all our followers! What are you building or researching this week? Let us know in the comments! 💻✨',
        type: 'Text',
        publishedAt: '5 days ago',
        reach: 9400,
        engagement: { likes: 520, comments: 198, shares: 24 },
        clicks: 340,
        ctr: 3.6,
      },
    ],
    campaigns: [
      {
        id: 'camp-1',
        name: 'Q2 Tech Incubator Leads - Lagos',
        status: 'Active',
        objective: 'Lead Generation',
        budget: 5000,
        budgetType: 'Daily',
        spent: 42500,
        impressions: 89400,
        clicks: 3820,
        ctr: 4.27,
        cpr: 210,
      },
      {
        id: 'camp-2',
        name: 'Web simulation Traffic - Nigeria Wide',
        status: 'Active',
        objective: 'Traffic',
        budget: 3500,
        budgetType: 'Daily',
        spent: 24500,
        impressions: 61200,
        clicks: 4950,
        ctr: 8.09,
        cpr: 45,
      },
      {
        id: 'camp-3',
        name: 'Fintech App Installs - Retargeting',
        status: 'Paused',
        objective: 'Conversions',
        budget: 15000,
        budgetType: 'Daily',
        spent: 57800,
        impressions: 120500,
        clicks: 2140,
        ctr: 1.78,
        cpr: 680,
      },
    ],
    dailyReach: [
      { day: 'Mon', organic: 12400, paid: 8500 },
      { day: 'Tue', organic: 14200, paid: 9100 },
      { day: 'Wed', organic: 13500, paid: 12000 },
      { day: 'Thu', organic: 16100, paid: 14800 },
      { day: 'Fri', organic: 19500, paid: 18500 },
      { day: 'Sat', organic: 22000, paid: 11000 },
      { day: 'Sun', organic: 18400, paid: 9500 },
    ],
    demographics: [
      { ageGroup: '18-24', malePercentage: 35, femalePercentage: 25 },
      { ageGroup: '25-34', malePercentage: 45, femalePercentage: 40 },
      { ageGroup: '35-44', malePercentage: 15, femalePercentage: 25 },
      { ageGroup: '45-54', malePercentage: 4, femalePercentage: 8 },
      { ageGroup: '55+', malePercentage: 1, femalePercentage: 2 },
    ],
  },
  naijafoodies: {
    profile: {
      id: 'naijafoodies',
      pageName: 'Naija Foodies',
      category: 'Food & Beverage / Restaurant Brand',
      avatarUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      likes: 125400,
      followers: 142000,
      weeklyReach: 489200,
      engagementRate: 9.2,
      adAccountStatus: 'Active',
      totalAdSpentThisMonth: 189000,
    },
    posts: [
      {
        id: 'food-post-1',
        content: 'Revealing the secret ingredient in our signature smoky Party Jollof! Watch the full video review below to master the recipe at home! 🍲🔥 #NaijaFood #JollofRice',
        type: 'Video',
        publishedAt: '3 hours ago',
        reach: 48500,
        engagement: { likes: 4800, comments: 1250, shares: 980 },
        clicks: 8120,
        ctr: 16.7,
      },
      {
        id: 'food-post-2',
        content: 'We reviewed the top 5 local Buka spots in Mainland Lagos! Did your favorite spot make the list? Check out our article: 🍢😋',
        type: 'Link',
        publishedAt: '2 days ago',
        reach: 32000,
        engagement: { likes: 1950, comments: 450, shares: 320 },
        clicks: 5400,
        ctr: 16.8,
      },
      {
        id: 'food-post-3',
        content: 'Tag that one friend who simply cannot survive a single week without fresh Suya! 🍢😂 #SuyaLove #LagosNightlife',
        type: 'Photo',
        publishedAt: '4 days ago',
        reach: 21000,
        engagement: { likes: 3280, comments: 920, shares: 140 },
        clicks: 1100,
        ctr: 5.2,
      },
    ],
    campaigns: [
      {
        id: 'food-camp-1',
        name: 'Fast Food Delivery Promo - Lagos',
        status: 'Active',
        objective: 'Traffic',
        budget: 8000,
        budgetType: 'Daily',
        spent: 72000,
        impressions: 184500,
        clicks: 11300,
        ctr: 6.12,
        cpr: 120,
      },
      {
        id: 'food-camp-2',
        name: 'Jollof Masterclass Video Leads',
        status: 'Active',
        objective: 'Lead Generation',
        budget: 4500,
        budgetType: 'Daily',
        spent: 31500,
        impressions: 59000,
        clicks: 4425,
        ctr: 7.5,
        cpr: 180,
      },
      {
        id: 'food-camp-3',
        name: 'Sunday Brunch Conversions',
        status: 'Paused',
        objective: 'Conversions',
        budget: 12000,
        budgetType: 'Daily',
        spent: 24000,
        impressions: 48000,
        clicks: 1530,
        ctr: 3.18,
        cpr: 450,
      },
    ],
    dailyReach: [
      { day: 'Mon', organic: 22000, paid: 15000 },
      { day: 'Tue', organic: 24500, paid: 18200 },
      { day: 'Wed', organic: 28000, paid: 21000 },
      { day: 'Thu', organic: 31000, paid: 26500 },
      { day: 'Fri', organic: 38000, paid: 35000 },
      { day: 'Sat', organic: 45000, paid: 22000 },
      { day: 'Sun', organic: 35000, paid: 17500 },
    ],
    demographics: [
      { ageGroup: '18-24', malePercentage: 25, femalePercentage: 35 },
      { ageGroup: '25-34', malePercentage: 30, femalePercentage: 45 },
      { ageGroup: '35-44', malePercentage: 20, femalePercentage: 30 },
      { ageGroup: '45-54', malePercentage: 15, femalePercentage: 18 },
      { ageGroup: '55+', malePercentage: 10, femalePercentage: 7 },
    ],
  },
  lagosinnovators: {
    profile: {
      id: 'lagosinnovators',
      pageName: 'Lagos Innovators',
      category: 'Business & Startup Consultant',
      avatarUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      likes: 15200,
      followers: 18900,
      weeklyReach: 74200,
      engagementRate: 4.5,
      adAccountStatus: 'Active',
      totalAdSpentThisMonth: 85000,
    },
    posts: [
      {
        id: 'innov-post-1',
        content: 'Apply now for the Lagos Innovators seed grants program! ₦5,000,000 in equity-free funding for local technology founders scaling early prototypes. 💡🚀',
        type: 'Link',
        publishedAt: '1 day ago',
        reach: 19800,
        engagement: { likes: 1540, comments: 395, shares: 412 },
        clicks: 4230,
        ctr: 21.4,
      },
      {
        id: 'innov-post-2',
        content: 'Announcing our next cohort mentorship facilitators. Join veteran SaaS builders and venture consultants next Monday:',
        type: 'Photo',
        publishedAt: '4 days ago',
        reach: 8400,
        engagement: { likes: 510, comments: 112, shares: 54 },
        clicks: 820,
        ctr: 9.8,
      },
    ],
    campaigns: [
      {
        id: 'innov-camp-1',
        name: 'Yaba Tech Incubator Registration',
        status: 'Active',
        objective: 'Lead Generation',
        budget: 15000,
        budgetType: 'Daily',
        spent: 125000,
        impressions: 215000,
        clicks: 12600,
        ctr: 5.86,
        cpr: 820,
      },
      {
        id: 'innov-camp-2',
        name: 'SME Hackathon Advert - Nigeria Wide',
        status: 'Paused',
        objective: 'Traffic',
        budget: 6000,
        budgetType: 'Daily',
        spent: 18000,
        impressions: 48000,
        clicks: 1980,
        ctr: 4.12,
        cpr: 320,
      },
    ],
    dailyReach: [
      { day: 'Mon', organic: 8000, paid: 4000 },
      { day: 'Tue', organic: 9500, paid: 4500 },
      { day: 'Wed', organic: 11000, paid: 6800 },
      { day: 'Thu', organic: 10000, paid: 7200 },
      { day: 'Fri', organic: 12000, paid: 8500 },
      { day: 'Sat', organic: 9000, paid: 5000 },
      { day: 'Sun', organic: 7500, paid: 3500 },
    ],
    demographics: [
      { ageGroup: '18-24', malePercentage: 45, femalePercentage: 20 },
      { ageGroup: '25-34', malePercentage: 50, femalePercentage: 35 },
      { ageGroup: '35-44', malePercentage: 12, femalePercentage: 15 },
      { ageGroup: '45-54', malePercentage: 5, femalePercentage: 8 },
      { ageGroup: '55+', malePercentage: 2, femalePercentage: 1 },
    ],
  },
};

// Maintain compatibility for single-user imports
export const mockFacebookProfile = facebookPagesDb.techvibe.profile;
export const mockFacebookPosts = facebookPagesDb.techvibe.posts;
export const mockAdCampaigns = facebookPagesDb.techvibe.campaigns;
export const mockDailyReach = facebookPagesDb.techvibe.dailyReach;
export const mockAudienceDemographics = facebookPagesDb.techvibe.demographics;
