import type { SpotifyTrack, ListeningDay, SpotifyProfile, LivePlayingState, SpotifyUserData } from './mockData';
import { spotifyUsersDb } from './mockData';

// Dynamic listener profile generator
const generateSpotifyUser = (userId: string): SpotifyUserData => {
  const cleanId = userId.toLowerCase().trim();
  const name = userId.charAt(0).toUpperCase() + userId.slice(1);
  
  const followersCount = Math.floor(Math.random() * 2500) + 60;
  const minutesCount = Math.floor(Math.random() * 95000) + 6000;
  
  const avatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80'
  ];
  const avatarUrl = avatars[Math.floor(Math.random() * avatars.length)];

  return {
    profile: {
      id: cleanId,
      name,
      tier: Math.random() > 0.35 ? 'Premium' : 'Free',
      followers: followersCount.toLocaleString(),
      minutesPlayedThisYear: `${minutesCount.toLocaleString()} min`,
      avatarUrl,
    },
    listeningStats: [
      { day: 'Mon', minutes: Math.floor(Math.random() * 110) + 35 },
      { day: 'Tue', minutes: Math.floor(Math.random() * 110) + 35 },
      { day: 'Wed', minutes: Math.floor(Math.random() * 110) + 35 },
      { day: 'Thu', minutes: Math.floor(Math.random() * 110) + 35 },
      { day: 'Fri', minutes: Math.floor(Math.random() * 170) + 45 },
      { day: 'Sat', minutes: Math.floor(Math.random() * 230) + 55 },
      { day: 'Sun', minutes: Math.floor(Math.random() * 170) + 45 },
    ],
    topTracks: [
      {
        id: `${cleanId}-track-1`,
        title: `Live Wave - ${name} Mix`,
        artist: `${name} & Crew`,
        album: `Telemetry Sessions Vol. 2`,
        coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=120&h=120&q=80',
        durationMs: 182000,
        playCount: `${(Math.random() * 6 + 0.5).toFixed(1)}M`,
        popularity: Math.floor(Math.random() * 15) + 80,
        genre: 'Afrobeat',
        trend: 'up',
      },
      {
        id: `${cleanId}-track-2`,
        title: `Synthesized Echoes`,
        artist: 'The Digital Synth',
        album: 'Offline Pulse',
        coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=120&h=120&q=80',
        durationMs: 218000,
        playCount: `${Math.floor(Math.random() * 950) + 120}K`,
        popularity: Math.floor(Math.random() * 15) + 70,
        genre: 'Synthwave',
        trend: 'stable',
      }
    ],
    nowPlaying: {
      isPlaying: true,
      progressMs: Math.floor(Math.random() * 75000) + 15000,
      track: {
        id: `${cleanId}-live`,
        title: `Playing Live - ${name} Radio`,
        artist: `${name}`,
        album: `Self-Generated Station`,
        coverUrl: 'https://images.unsplash.com/photo-1487180142328-054b783fc471?auto=format&fit=crop&w=240&h=240&q=80',
        durationMs: 180000,
        playCount: '1.2M',
        popularity: 88,
        genre: 'Afrobeat',
        trend: 'up',
      },
      lyrics: [
        `Welcome to ${name}'s custom Spotify node!`,
        'Every single search generates a unique playlist',
        'No pre-set limits or pre-programmed bounds',
        'Try typing in any name and watch it spin!',
      ],
    },
  };
};

const getUserData = (userId: string) => {
  const normalized = userId.toLowerCase().trim();
  if (!spotifyUsersDb[normalized]) {
    spotifyUsersDb[normalized] = generateSpotifyUser(userId);
  }
  return spotifyUsersDb[normalized];
};

export const fetchSpotifyProfile = async (userId: string = 'alexmartinez'): Promise<SpotifyProfile> => {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return getUserData(userId).profile;
};

export const fetchSpotifyTopTracks = async (userId: string = 'alexmartinez'): Promise<SpotifyTrack[]> => {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return getUserData(userId).topTracks;
};

export const fetchSpotifyListeningStats = async (userId: string = 'alexmartinez'): Promise<ListeningDay[]> => {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return getUserData(userId).listeningStats;
};

export const fetchSpotifyNowPlaying = async (userId: string = 'alexmartinez'): Promise<LivePlayingState> => {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return getUserData(userId).nowPlaying;
};

// Search list of available Spotify accounts
export interface UserSearchResult {
  id: string;
  name: string;
  tier: string;
  avatarUrl: string;
}

export const searchSpotifyProfiles = async (query: string): Promise<UserSearchResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const items = Object.values(spotifyUsersDb).map((u) => ({
    id: u.profile.id,
    name: u.profile.name,
    tier: u.profile.tier,
    avatarUrl: u.profile.avatarUrl,
  }));

  if (!query) return items;

  const term = query.toLowerCase().trim();
  const filtered = items.filter(
    (item) => item.name.toLowerCase().includes(term) || item.tier.toLowerCase().includes(term)
  );

  // If user doesn't exist, append the dynamic creation recommendation option!
  const alreadyExists = items.some((item) => item.id === term);
  if (!alreadyExists && term.length > 0) {
    filtered.push({
      id: term,
      name: `✨ Fetch stream: "${query}"`,
      tier: 'Listen to dynamic station instantly',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80',
    });
  }

  return filtered;
};
