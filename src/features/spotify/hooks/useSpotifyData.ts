import { useQuery } from '@tanstack/react-query';
import {
  fetchSpotifyProfile,
  fetchSpotifyTopTracks,
  fetchSpotifyListeningStats,
  fetchSpotifyNowPlaying,
  searchSpotifyProfiles,
} from '../api/spotify';

export const useSpotifyProfileQuery = (userId: string) => {
  return useQuery({
    queryKey: ['spotify-profile', userId],
    queryFn: () => fetchSpotifyProfile(userId),
    staleTime: 1000 * 60 * 10,
  });
};

export const useSpotifyTopTracksQuery = (userId: string) => {
  return useQuery({
    queryKey: ['spotify-top-tracks', userId],
    queryFn: () => fetchSpotifyTopTracks(userId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useSpotifyListeningStatsQuery = (userId: string) => {
  return useQuery({
    queryKey: ['spotify-listening-stats', userId],
    queryFn: () => fetchSpotifyListeningStats(userId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useSpotifyNowPlayingQuery = (userId: string) => {
  return useQuery({
    queryKey: ['spotify-now-playing', userId],
    queryFn: () => fetchSpotifyNowPlaying(userId),
    staleTime: 1000 * 60 * 1, // Cache 1 minute since it represents "live" playing state
  });
};

export const useSpotifySearchQuery = (query: string) => {
  return useQuery({
    queryKey: ['spotify-search', query],
    queryFn: () => searchSpotifyProfiles(query),
    staleTime: 1000 * 30, // 30 seconds
  });
};
