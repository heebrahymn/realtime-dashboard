export interface SemrushDomainProfile {
  id: string;
  domain: string;
  authorityScore: number;
  organicTraffic: number;
  paidTraffic: number;
  backlinks: number;
  referringDomains: number;
  category: string;
}

export interface TrafficTrend {
  month: string;
  organic: number;
  paid: number;
}

export interface TopKeyword {
  id: string;
  keyword: string;
  position: number;
  volume: number;
  kd: number; // Keyword Difficulty 0-100
  cpc: number; // Cost per click
  intent: 'Informational' | 'Navigational' | 'Commercial' | 'Transactional';
}

export interface CompetitorOverlap {
  domain: string;
  competitionLevel: number; // % overlap
  commonKeywords: number;
  seKeywords: number; // Total search engine keywords
  authorityScore: number;
}

export interface SemrushDomainData {
  profile: SemrushDomainProfile;
  trends: TrafficTrend[];
  keywords: TopKeyword[];
  competitors: CompetitorOverlap[];
}

export const semrushDomainsDb: Record<string, SemrushDomainData> = {};
