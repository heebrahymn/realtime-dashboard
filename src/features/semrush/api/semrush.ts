import type { SemrushDomainData, SemrushDomainProfile, TrafficTrend, TopKeyword, CompetitorOverlap } from './mockData';
import { semrushDomainsDb } from './mockData';

const getDeterministicSeed = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const generateCompetitors = (domain: string, seed: number): CompetitorOverlap[] => {
  const baseName = domain.split('.')[0] || 'site';
  
  const comps = [
    `${baseName}-rival.com`,
    `top-${baseName}s.net`,
  ];
  
  const score1 = 30 + (seed % 65);
  const score2 = Math.max(10, score1 - 15);
  
  return [
    {
      domain: comps[0],
      competitionLevel: 40 + (seed % 45),
      commonKeywords: 500 + ((seed * 3) % 45000),
      seKeywords: 2000 + ((seed * 7) % 98000),
      authorityScore: score1,
    },
    {
      domain: comps[1],
      competitionLevel: 20 + ((seed * 2) % 35),
      commonKeywords: 100 + ((seed * 4) % 15000),
      seKeywords: 1000 + ((seed * 8) % 78000),
      authorityScore: score2,
    }
  ];
};

const generateDomainData = (domainQuery: string): SemrushDomainData => {
  const cleanDomain = domainQuery.toLowerCase().trim();
  const seed = getDeterministicSeed(cleanDomain);
  
  // Establish the domain scale:
  // 0 = Enterprise, 1 = Mid-Market / Startup, 2 = Small Business / Niche Blog
  const scale = seed % 3; 
  
  let authorityScore = 0;
  let organicTraffic = 0;
  let category = '';
  
  const categories = ['Technology', 'E-commerce', 'Finance & Banking', 'SaaS & Cloud', 'News & Publishing', 'Healthcare'];
  category = categories[seed % categories.length];

  if (scale === 0) {
    // Enterprise (huge authority, huge traffic)
    authorityScore = 80 + (seed % 20); // 80 - 99
    organicTraffic = 10000000 + (seed % 90000000); // 10M - 100M
  } else if (scale === 1) {
    // Mid-market (medium authority, decent traffic)
    authorityScore = 45 + (seed % 35); // 45 - 79
    organicTraffic = 300000 + (seed % 9700000); // 300K - 10M
  } else {
    // Small/Niche (lower stats)
    authorityScore = 15 + (seed % 30); // 15 - 44
    organicTraffic = 5000 + (seed % 295000); // 5K - 300K
  }
  
  const paidTraffic = Math.floor(organicTraffic * ((seed % 15) / 100)); // 0% - 14% paid traffic ratio
  const backlinks = organicTraffic * (3 + (seed % 10)); // 3x to 12x organic traffic
  const referringDomains = Math.floor(backlinks / (10 + (seed % 90))); // Ratio of links to referring domains

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Dynamic but deterministic trend curve:
  const trends: TrafficTrend[] = months.map((month, idx) => {
    const varianceFactor = 0.8 + Math.sin(seed + idx) * 0.15; // Beautiful distinct sine-wave curve for organic traffic
    return {
      month,
      organic: Math.floor(organicTraffic * varianceFactor),
      paid: Math.floor(paidTraffic * (0.9 + Math.cos(seed + idx) * 0.1)),
    };
  });

  const intents: TopKeyword['intent'][] = ['Informational', 'Navigational', 'Commercial', 'Transactional'];
  const keywordSuffixes = ['login', 'reviews', 'api', 'pricing', 'competitors', 'alternatives'];
  
  const keywords: TopKeyword[] = keywordSuffixes.map((suffix, idx) => {
    const kwSeed = seed + idx;
    return {
      id: `${cleanDomain}-kw-${idx}`,
      keyword: `${cleanDomain.split('.')[0]} ${suffix}`,
      position: 1 + (kwSeed % 15), // Top 15 rankings
      volume: Math.floor(organicTraffic * 0.05 * (1 / (idx + 1))), // Scale volume deterministically
      kd: 20 + (kwSeed % 79), // 20% to 99% difficulty
      cpc: parseFloat((0.5 + (kwSeed % 15) * 0.75).toFixed(2)),
      intent: intents[kwSeed % intents.length],
    };
  });

  return {
    profile: {
      id: cleanDomain,
      domain: cleanDomain,
      authorityScore,
      organicTraffic,
      paidTraffic,
      backlinks,
      referringDomains,
      category,
    },
    trends,
    keywords,
    competitors: generateCompetitors(cleanDomain, seed)
  };
};


const getDomainData = (domain: string) => {
  const normalized = domain.toLowerCase().trim();
  if (!semrushDomainsDb[normalized]) {
    semrushDomainsDb[normalized] = generateDomainData(domain);
  }
  return semrushDomainsDb[normalized];
};

export const fetchDomainOverview = async (domain: string = 'amazon.com'): Promise<SemrushDomainProfile> => {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return getDomainData(domain).profile;
};

export const fetchOrganicTrends = async (domain: string = 'amazon.com'): Promise<TrafficTrend[]> => {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return getDomainData(domain).trends;
};

export const fetchTopKeywords = async (domain: string = 'amazon.com'): Promise<TopKeyword[]> => {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return getDomainData(domain).keywords;
};

export const fetchCompetitorData = async (domain: string = 'amazon.com'): Promise<CompetitorOverlap[]> => {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return getDomainData(domain).competitors;
};

export interface DomainSearchResult {
  id: string;
  domain: string;
  category: string;
}

export const searchDomains = async (query: string): Promise<DomainSearchResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const items = Object.values(semrushDomainsDb).map((d) => ({
    id: d.profile.id,
    domain: d.profile.domain,
    category: d.profile.category,
  }));

  if (!query) return items;

  const term = query.toLowerCase().trim();
  const filtered = items.filter(
    (item) => item.domain.toLowerCase().includes(term) || item.category.toLowerCase().includes(term)
  );

  const alreadyExists = items.some((item) => item.id === term);
  if (!alreadyExists && term.length > 0) {
    filtered.push({
      id: term,
      domain: `✨ Analyze domain: "${query}"`,
      category: 'Simulate full SEO & competitor telemetry instantly',
    });
  }

  return filtered;
};
