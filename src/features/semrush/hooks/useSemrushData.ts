import { useQuery } from '@tanstack/react-query';
import {
  fetchDomainOverview,
  fetchOrganicTrends,
  fetchTopKeywords,
  fetchCompetitorData,
  searchDomains
} from '../api/semrush';

export const useSemrushOverviewQuery = (domain: string) => {
  return useQuery({
    queryKey: ['semrush-overview', domain],
    queryFn: () => fetchDomainOverview(domain),
    staleTime: 5 * 60 * 1000,
  });
};

export const useSemrushTrendsQuery = (domain: string) => {
  return useQuery({
    queryKey: ['semrush-trends', domain],
    queryFn: () => fetchOrganicTrends(domain),
    staleTime: 5 * 60 * 1000,
  });
};

export const useSemrushKeywordsQuery = (domain: string) => {
  return useQuery({
    queryKey: ['semrush-keywords', domain],
    queryFn: () => fetchTopKeywords(domain),
    staleTime: 5 * 60 * 1000,
  });
};

export const useSemrushCompetitorsQuery = (domain: string) => {
  return useQuery({
    queryKey: ['semrush-competitors', domain],
    queryFn: () => fetchCompetitorData(domain),
    staleTime: 5 * 60 * 1000,
  });
};

export const useSemrushSearchQuery = (query: string) => {
  return useQuery({
    queryKey: ['semrush-search', query],
    queryFn: () => searchDomains(query),
    enabled: true,
  });
};
