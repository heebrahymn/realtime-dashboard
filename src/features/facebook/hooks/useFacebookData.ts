import { useQuery } from '@tanstack/react-query';
import {
  fetchFacebookProfile,
  fetchFacebookPosts,
  fetchAdCampaigns,
  fetchDailyReach,
  fetchAudienceDemographics,
  searchFacebookProfiles,
} from '../api/facebook';

export const useFacebookProfileQuery = (pageId: string) => {
  return useQuery({
    queryKey: ['facebook-profile', pageId],
    queryFn: () => fetchFacebookProfile(pageId),
    staleTime: 1000 * 60 * 10,
  });
};

export const useFacebookPostsQuery = (pageId: string) => {
  return useQuery({
    queryKey: ['facebook-posts', pageId],
    queryFn: () => fetchFacebookPosts(pageId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useFacebookAdCampaignsQuery = (pageId: string) => {
  return useQuery({
    queryKey: ['facebook-ad-campaigns', pageId],
    queryFn: () => fetchAdCampaigns(pageId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useFacebookDailyReachQuery = (pageId: string) => {
  return useQuery({
    queryKey: ['facebook-daily-reach', pageId],
    queryFn: () => fetchDailyReach(pageId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useFacebookDemographicsQuery = (pageId: string) => {
  return useQuery({
    queryKey: ['facebook-demographics', pageId],
    queryFn: () => fetchAudienceDemographics(pageId),
    staleTime: 1000 * 60 * 10,
  });
};

export const useFacebookSearchQuery = (query: string) => {
  return useQuery({
    queryKey: ['facebook-search', query],
    queryFn: () => searchFacebookProfiles(query),
    staleTime: 1000 * 30, // 30 seconds
  });
};
