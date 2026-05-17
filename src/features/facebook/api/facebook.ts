import type { FacebookPageProfile, FacebookPost, AdCampaign, DailyReach, AudienceDemographics, FacebookPageData } from './mockData';
import { facebookPagesDb } from './mockData';

// Dynamic page generator on-the-fly
const generateFacebookPage = (pageId: string): FacebookPageData => {
  const cleanId = pageId.toLowerCase().trim();
  const name = pageId.charAt(0).toUpperCase() + pageId.slice(1);
  
  const likes = Math.floor(Math.random() * 280000) + 8000;
  const followers = Math.floor(likes * 1.12);
  const weeklyReach = Math.floor(followers * 3.4);
  const engagementRate = parseFloat((Math.random() * 7 + 2.5).toFixed(1));
  const adSpent = Math.floor(Math.random() * 160000) + 12000;
  
  const categories = ['Public Figure', 'Digital Creator', 'Brand / Product', 'Entertainment Site', 'Community Hub'];
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  const avatars = [
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&q=80'
  ];
  const avatarUrl = avatars[Math.floor(Math.random() * avatars.length)];
  
  const coverUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';

  return {
    profile: {
      id: cleanId,
      pageName: name,
      category,
      avatarUrl,
      coverUrl,
      likes,
      followers,
      weeklyReach,
      engagementRate,
      adAccountStatus: 'Active',
      totalAdSpentThisMonth: adSpent,
    },
    posts: [
      {
        id: `${cleanId}-post-1`,
        content: `Official update from ${name}! We are excited to announce our brand new telemetry dashboard integration rolling out today. Let us know what you think! 🚀🔥 #TelemetryBoard #${name}`,
        type: 'Photo',
        publishedAt: '2 hours ago',
        reach: Math.floor(followers * 0.28),
        engagement: { 
          likes: Math.floor(followers * 0.04), 
          comments: Math.floor(followers * 0.012), 
          shares: Math.floor(followers * 0.006) 
        },
        clicks: Math.floor(followers * 0.045),
        ctr: parseFloat((Math.random() * 11 + 4.2).toFixed(1)),
      },
      {
        id: `${cleanId}-post-2`,
        content: `Watch our exclusive behind-the-scenes video detailing how we are scaling our engineering operations across Lagos. 🎥🎙️`,
        type: 'Video',
        publishedAt: '1 day ago',
        reach: Math.floor(followers * 0.48),
        engagement: { 
          likes: Math.floor(followers * 0.055), 
          comments: Math.floor(followers * 0.018), 
          shares: Math.floor(followers * 0.009) 
        },
        clicks: Math.floor(followers * 0.078),
        ctr: parseFloat((Math.random() * 14 + 5.1).toFixed(1)),
      }
    ],
    campaigns: [
      {
        id: `${cleanId}-camp-1`,
        name: `${name} Brand Awareness - Nigeria`,
        status: 'Active',
        objective: 'Brand Awareness',
        budget: Math.floor(Math.random() * 7000) + 3000,
        budgetType: 'Daily',
        spent: Math.floor(adSpent * 0.45),
        impressions: Math.floor(adSpent * 1.6),
        clicks: Math.floor(adSpent * 0.095),
        ctr: parseFloat((Math.random() * 4.8 + 1.6).toFixed(2)),
        cpr: Math.floor(Math.random() * 280) + 60,
      },
      {
        id: `${cleanId}-camp-2`,
        name: `${name} Lead Generation - Conversions`,
        status: 'Paused',
        objective: 'Lead Generation',
        budget: Math.floor(Math.random() * 14000) + 6000,
        budgetType: 'Daily',
        spent: Math.floor(adSpent * 0.55),
        impressions: Math.floor(adSpent * 1.95),
        clicks: Math.floor(adSpent * 0.048),
        ctr: parseFloat((Math.random() * 2.9 + 0.9).toFixed(2)),
        cpr: Math.floor(Math.random() * 850) + 210,
      }
    ],
    dailyReach: [
      { day: 'Mon', organic: Math.floor(followers * 0.14), paid: Math.floor(followers * 0.07) },
      { day: 'Tue', organic: Math.floor(followers * 0.17), paid: Math.floor(followers * 0.08) },
      { day: 'Wed', organic: Math.floor(followers * 0.15), paid: Math.floor(followers * 0.11) },
      { day: 'Thu', organic: Math.floor(followers * 0.19), paid: Math.floor(followers * 0.14) },
      { day: 'Fri', organic: Math.floor(followers * 0.24), paid: Math.floor(followers * 0.18) },
      { day: 'Sat', organic: Math.floor(followers * 0.26), paid: Math.floor(followers * 0.10) },
      { day: 'Sun', organic: Math.floor(followers * 0.21), paid: Math.floor(followers * 0.09) },
    ],
    demographics: [
      { ageGroup: '18-24', malePercentage: Math.floor(Math.random() * 25) + 15, femalePercentage: Math.floor(Math.random() * 25) + 15 },
      { ageGroup: '25-34', malePercentage: Math.floor(Math.random() * 30) + 20, femalePercentage: Math.floor(Math.random() * 30) + 20 },
      { ageGroup: '35-44', malePercentage: Math.floor(Math.random() * 20) + 5, femalePercentage: Math.floor(Math.random() * 20) + 5 },
      { ageGroup: '45-54', malePercentage: Math.floor(Math.random() * 10) + 1, femalePercentage: Math.floor(Math.random() * 10) + 1 },
      { ageGroup: '55+', malePercentage: Math.floor(Math.random() * 5) + 1, femalePercentage: Math.floor(Math.random() * 5) + 1 },
    ],
  };
};

const getPageData = (pageId: string) => {
  const normalized = pageId.toLowerCase().trim();
  if (!facebookPagesDb[normalized]) {
    facebookPagesDb[normalized] = generateFacebookPage(pageId);
  }
  return facebookPagesDb[normalized];
};

export const fetchFacebookProfile = async (pageId: string = 'techvibe'): Promise<FacebookPageProfile> => {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return getPageData(pageId).profile;
};

export const fetchFacebookPosts = async (pageId: string = 'techvibe'): Promise<FacebookPost[]> => {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return getPageData(pageId).posts;
};

export const fetchAdCampaigns = async (pageId: string = 'techvibe'): Promise<AdCampaign[]> => {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return getPageData(pageId).campaigns;
};

export const fetchDailyReach = async (pageId: string = 'techvibe'): Promise<DailyReach[]> => {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return getPageData(pageId).dailyReach;
};

export const fetchAudienceDemographics = async (pageId: string = 'techvibe'): Promise<AudienceDemographics[]> => {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return getPageData(pageId).demographics;
};

// Search list of available telemetry pages
export interface PageSearchResult {
  id: string;
  pageName: string;
  category: string;
  avatarUrl: string;
}

export const searchFacebookProfiles = async (query: string): Promise<PageSearchResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const items = Object.values(facebookPagesDb).map((p) => ({
    id: p.profile.id,
    pageName: p.profile.pageName,
    category: p.profile.category,
    avatarUrl: p.profile.avatarUrl,
  }));

  if (!query) return items;

  const term = query.toLowerCase().trim();
  const filtered = items.filter(
    (item) => item.pageName.toLowerCase().includes(term) || item.category.toLowerCase().includes(term)
  );

  // If page doesn't exist, append the dynamic creation recommendation option!
  const alreadyExists = items.some((item) => item.id === term);
  if (!alreadyExists && term.length > 0) {
    filtered.push({
      id: term,
      pageName: `✨ Fetch page: "${query}"`,
      category: 'Simulate full social & ad telemetry instantly',
      avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&h=80&q=80',
    });
  }

  return filtered;
};
