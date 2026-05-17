export interface SpotifyTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  durationMs: number;
  playCount: string;
  popularity: number; // 0-100
  genre: string;
  trend: 'up' | 'stable' | 'down';
}

export interface AudioProfile {
  name: string;
  value: number;
  fullMark: number;
}

export interface ListeningDay {
  day: string;
  minutes: number;
}

export interface SpotifyProfile {
  id: string;
  name: string;
  tier: 'Premium' | 'Free';
  followers: string;
  minutesPlayedThisYear: string;
  avatarUrl: string;
}

export interface LivePlayingState {
  isPlaying: boolean;
  progressMs: number;
  track: SpotifyTrack;
  lyrics: string[];
}

export interface SpotifyUserData {
  profile: SpotifyProfile;
  listeningStats: ListeningDay[];
  topTracks: SpotifyTrack[];
  nowPlaying: LivePlayingState;
}

export const spotifyUsersDb: Record<string, SpotifyUserData> = {
  alexmartinez: {
    profile: {
      id: 'alexmartinez',
      name: 'Alex Martinez',
      tier: 'Premium',
      followers: '412',
      minutesPlayedThisYear: '42,850 min',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
    },
    listeningStats: [
      { day: 'Mon', minutes: 85 },
      { day: 'Tue', minutes: 120 },
      { day: 'Wed', minutes: 95 },
      { day: 'Thu', minutes: 145 },
      { day: 'Fri', minutes: 210 },
      { day: 'Sat', minutes: 180 },
      { day: 'Sun', minutes: 160 },
    ],
    topTracks: [
      {
        id: '1',
        title: 'Sojourn',
        artist: 'Lojay & Sarz',
        album: 'Apala Pulse',
        coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=120&h=120&q=80',
        durationMs: 204000,
        playCount: '1.2M',
        popularity: 92,
        genre: 'Afrobeat',
        trend: 'up',
      },
      {
        id: '2',
        title: 'Midnight City',
        artist: 'M83',
        album: "Hurry Up, We're Dreaming",
        coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=120&h=120&q=80',
        durationMs: 243000,
        playCount: '890K',
        popularity: 88,
        genre: 'Synthwave',
        trend: 'stable',
      },
      {
        id: '3',
        title: 'Essence',
        artist: 'Wizkid feat. Tems',
        album: 'Made in Lagos',
        coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=120&h=120&q=80',
        durationMs: 248000,
        playCount: '2.5M',
        popularity: 95,
        genre: 'Afrobeat',
        trend: 'up',
      },
      {
        id: '4',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=120&h=120&q=80',
        durationMs: 200000,
        playCount: '3.4M',
        popularity: 98,
        genre: 'Pop',
        trend: 'down',
      },
      {
        id: '5',
        title: 'Lost in Yesterday',
        artist: 'Tame Impala',
        album: 'The Slow Rush',
        coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=120&h=120&q=80',
        durationMs: 250000,
        playCount: '620K',
        popularity: 84,
        genre: 'Indie',
        trend: 'stable',
      },
    ],
    nowPlaying: {
      isPlaying: true,
      progressMs: 64000,
      track: {
        id: 'live-track-1',
        title: 'Last Last',
        artist: 'Burna Boy',
        album: 'Love, Damini',
        coverUrl: 'https://images.unsplash.com/photo-1487180142328-054b783fc471?auto=format&fit=crop&w=240&h=240&q=80',
        durationMs: 172000,
        playCount: '5.6M',
        popularity: 97,
        genre: 'Afrobeat',
        trend: 'up',
      },
      lyrics: [
        'I need a hot girl (Omo)',
        'She say she need a workup',
        'E don cast, last, last',
        'Na everybody go chop breakfast',
        'Shayo kpatata, shayo kpatata',
        'I dey tell you, no dey look uba...',
      ],
    },
  },
  sarah_naija: {
    profile: {
      id: 'sarah_naija',
      name: 'Sarah Adeleke',
      tier: 'Premium',
      followers: '1,280',
      minutesPlayedThisYear: '86,420 min',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    },
    listeningStats: [
      { day: 'Mon', minutes: 110 },
      { day: 'Tue', minutes: 140 },
      { day: 'Wed', minutes: 125 },
      { day: 'Thu', minutes: 160 },
      { day: 'Fri', minutes: 250 },
      { day: 'Sat', minutes: 310 },
      { day: 'Sun', minutes: 190 },
    ],
    topTracks: [
      {
        id: 'food-track-1',
        title: 'Essence',
        artist: 'Wizkid feat. Tems',
        album: 'Made in Lagos',
        coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=120&h=120&q=80',
        durationMs: 248000,
        playCount: '2.5M',
        popularity: 95,
        genre: 'Afrobeat',
        trend: 'up',
      },
      {
        id: 'food-track-2',
        title: 'Rush',
        artist: 'Ayra Starr',
        album: '19 & Dangerous',
        coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=120&h=120&q=80',
        durationMs: 185000,
        playCount: '4.8M',
        popularity: 94,
        genre: 'Afrobeat',
        trend: 'up',
      },
      {
        id: 'food-track-3',
        title: 'Soweto',
        artist: 'Victony & Tempoe',
        album: 'Outlaw',
        coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=120&h=120&q=80',
        durationMs: 148000,
        playCount: '3.1M',
        popularity: 91,
        genre: 'Afrobeat',
        trend: 'stable',
      },
      {
        id: 'food-track-4',
        title: 'Calm Down',
        artist: 'Rema',
        album: 'Rave & Roses',
        coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=120&h=120&q=80',
        durationMs: 219000,
        playCount: '8.2M',
        popularity: 98,
        genre: 'Afrobeat',
        trend: 'up',
      },
    ],
    nowPlaying: {
      isPlaying: true,
      progressMs: 38000,
      track: {
        id: 'live-track-2',
        title: 'Rush',
        artist: 'Ayra Starr',
        album: '19 & Dangerous',
        coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=240&h=240&q=80',
        durationMs: 185000,
        playCount: '4.8M',
        popularity: 94,
        genre: 'Afrobeat',
        trend: 'up',
      },
      lyrics: [
        'E dey rush, e dey rush (rush)',
        'E dey rush wella, no time',
        'No be me say make you lazy',
        'No be me say make you dull...',
        'Dem go carry body, carry body',
      ],
    },
  },
  tunde_vibe: {
    profile: {
      id: 'tunde_vibe',
      name: 'Tunde Johnson',
      tier: 'Free',
      followers: '158',
      minutesPlayedThisYear: '18,200 min',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    },
    listeningStats: [
      { day: 'Mon', minutes: 45 },
      { day: 'Tue', minutes: 60 },
      { day: 'Wed', minutes: 55 },
      { day: 'Thu', minutes: 70 },
      { day: 'Fri', minutes: 95 },
      { day: 'Sat', minutes: 110 },
      { day: 'Sun', minutes: 80 },
    ],
    topTracks: [
      {
        id: 'innov-track-1',
        title: 'Bandana',
        artist: 'Fireboy DML & Asake',
        album: 'Playboy',
        coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=120&h=120&q=80',
        durationMs: 178000,
        playCount: '2.8M',
        popularity: 90,
        genre: 'Afrobeat',
        trend: 'up',
      },
      {
        id: 'innov-track-2',
        title: 'Cough (Odo)',
        artist: 'Kizz Daniel',
        album: 'Maverick',
        coverUrl: 'https://images.unsplash.com/photo-1487180142328-054b783fc471?auto=format&fit=crop&w=120&h=120&q=80',
        durationMs: 182000,
        playCount: '3.4M',
        popularity: 93,
        genre: 'Afrobeat',
        trend: 'up',
      },
      {
        id: 'innov-track-3',
        title: 'Calm Down',
        artist: 'Rema',
        album: 'Rave & Roses',
        coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=120&h=120&q=80',
        durationMs: 219000,
        playCount: '8.2M',
        popularity: 98,
        genre: 'Afrobeat',
        trend: 'up',
      },
    ],
    nowPlaying: {
      isPlaying: true,
      progressMs: 95000,
      track: {
        id: 'live-track-3',
        title: 'Bandana',
        artist: 'Fireboy DML & Asake',
        album: 'Playboy',
        coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=240&h=240&q=80',
        durationMs: 178000,
        playCount: '2.8M',
        popularity: 90,
        genre: 'Afrobeat',
        trend: 'up',
      },
      lyrics: [
        'Lowkey, lowkey (Lowkey)',
        'All of them are talking about me',
        'Bandana on my head, bandana',
        'No dey look uba, no dey copy uba...',
      ],
    },
  },
};

// Aliases for compatibility
export const mockSpotifyProfile = spotifyUsersDb.alexmartinez.profile;
export const mockListeningStats = spotifyUsersDb.alexmartinez.listeningStats;
export const mockTopTracks = spotifyUsersDb.alexmartinez.topTracks;
export const mockNowPlaying = spotifyUsersDb.alexmartinez.nowPlaying;
export const mockGenreStats = [
  { id: 'Afrobeat', label: 'Afrobeat', value: 38 },
  { id: 'Synthwave', label: 'Synthwave', value: 24 },
  { id: 'Pop', label: 'Pop', value: 18 },
  { id: 'Hip Hop', label: 'Hip Hop', value: 12 },
  { id: 'Ambient', label: 'Ambient', value: 8 },
];
export const mockAudioProfile = [
  { name: 'Energy', value: 84, fullMark: 100 },
  { name: 'Danceability', value: 76, fullMark: 100 },
  { name: 'Valence', value: 65, fullMark: 100 },
  { name: 'Acousticness', value: 22, fullMark: 100 },
  { name: 'Instrumental', value: 14, fullMark: 100 },
];
