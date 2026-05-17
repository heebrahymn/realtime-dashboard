import { useState, useRef, useEffect } from 'react';
import {
  useSpotifyProfileQuery,
  useSpotifyTopTracksQuery,
  useSpotifyListeningStatsQuery,
  useSpotifyNowPlayingQuery,
  useSpotifySearchQuery,
} from '../features/spotify/hooks/useSpotifyData';
import { NowPlaying } from '../features/spotify/components/NowPlaying';
import { ListeningInsights } from '../features/spotify/components/ListeningInsights';
import { TopTracks } from '../features/spotify/components/TopTracks';
import { Award, Loader2, Search, ChevronDown, Check } from 'lucide-react';

export const Spotify = () => {
  const [userId, setUserId] = useState<string>('alexmartinez');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parameterized React Query hooks
  const { data: profile, isLoading: isProfileLoading } = useSpotifyProfileQuery(userId);
  const { data: topTracks, isLoading: isTracksLoading } = useSpotifyTopTracksQuery(userId);
  const { data: listeningStats, isLoading: isStatsLoading } = useSpotifyListeningStatsQuery(userId);
  const { data: nowPlaying, isLoading: isNowPlayingLoading } = useSpotifyNowPlayingQuery(userId);

  // Spotify search autocomplete resolver
  const { data: searchResults } = useSpotifySearchQuery(searchQuery);

  const isLoading = isProfileLoading || isTracksLoading || isStatsLoading || isNowPlayingLoading;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectUser = (id: string) => {
    setUserId(id);
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  // Popular user lookup chips
  const popularUsers = [
    { id: 'alexmartinez', label: 'Alex' },
    { id: 'sarah_naija', label: 'Sarah (Afrobeat)' },
    { id: 'tunde_vibe', label: 'Tunde' },
  ];

  // Specific custom audio radar profile signatures matching each user's music tastes
  const userAudioProfiles: Record<string, { name: string; value: number; fullMark: number }[]> = {
    alexmartinez: [
      { name: 'Energy', value: 84, fullMark: 100 },
      { name: 'Danceability', value: 76, fullMark: 100 },
      { name: 'Valence', value: 65, fullMark: 100 },
      { name: 'Acousticness', value: 22, fullMark: 100 },
      { name: 'Instrumental', value: 14, fullMark: 100 },
    ],
    sarah_naija: [
      { name: 'Energy', value: 95, fullMark: 100 },
      { name: 'Danceability', value: 92, fullMark: 100 },
      { name: 'Valence', value: 82, fullMark: 100 },
      { name: 'Acousticness', value: 12, fullMark: 100 },
      { name: 'Instrumental', value: 4, fullMark: 100 },
    ],
    tunde_vibe: [
      { name: 'Energy', value: 72, fullMark: 100 },
      { name: 'Danceability', value: 85, fullMark: 100 },
      { name: 'Valence', value: 68, fullMark: 100 },
      { name: 'Acousticness', value: 28, fullMark: 100 },
      { name: 'Instrumental', value: 18, fullMark: 100 },
    ],
  };

  const currentAudioProfile = userAudioProfiles[userId] || userAudioProfiles.alexmartinez;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Search Header for Spotify Accounts */}
      <div className="bg-surface border border-neutral-light rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 font-bold block">
            Spotify Live Audio Hub
          </span>
          <h2 className="text-base font-display font-bold text-text-primary">
            Active Listeners & Streams Database
          </h2>
        </div>

        {/* Autocomplete Search input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full md:w-auto relative">
          <div ref={dropdownRef} className="relative flex-1 sm:w-80">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search listeners (e.g. alex, sarah)..."
                className="w-full pl-10 pr-10 py-2 border border-neutral-light rounded-lg text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-surface transition-shadow shadow-sm"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
              />
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Glassmorphic Autocomplete dropdown */}
            {isDropdownOpen && searchResults && (
              <div className="absolute left-0 right-0 mt-1.5 bg-surface/95 backdrop-blur-md border border-neutral-light rounded-lg shadow-card z-50 overflow-hidden divide-y divide-neutral-light/50">
                {searchResults.length === 0 ? (
                  <div className="p-4 text-xs font-mono text-text-secondary text-center">
                    No active accounts found
                  </div>
                ) : (
                  searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => selectUser(result.id)}
                      className="w-full flex items-center gap-3 p-3 text-left hover:bg-neutral-light/50 transition-colors cursor-pointer group"
                    >
                      <img
                        src={result.avatarUrl}
                        alt={result.name}
                        className="w-8 h-8 rounded-full object-cover border border-neutral-light"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-display font-bold text-text-primary group-hover:text-emerald-500 transition-colors truncate">
                          {result.name}
                        </p>
                        <p className="text-[10px] text-text-secondary truncate">{result.tier} Account</p>
                      </div>
                      {userId === result.id && <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Quick chips selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {popularUsers.map((pop) => (
              <button
                key={pop.id}
                onClick={() => selectUser(pop.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                  userId === pop.id
                    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-sm'
                    : 'bg-surface hover:bg-neutral-light/65 text-text-secondary border-neutral-light'
                }`}
              >
                {pop.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="text-sm font-mono text-text-secondary">Syncing audio streams...</p>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Dynamic Profile Header Card */}
          <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-250 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            {/* Decorative dynamic soundwave vector absolute layout in background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-primary/5 opacity-60 pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center gap-5 relative z-10">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm">
                <img src={profile?.avatarUrl} alt={profile?.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                  <h1 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
                    Spotify Music Stream
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/15 shadow-sm">
                    <Award className="w-3 h-3 text-emerald-500" />
                    {profile?.tier}
                  </span>
                </div>
                <p className="text-text-secondary text-[14px] font-body mt-1">
                  Active listener account:{' '}
                  <span className="font-semibold text-text-primary">{profile?.name}</span> • Followers:{' '}
                  <span className="font-semibold text-text-primary">{profile?.followers}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 relative z-10 bg-white/70 backdrop-blur-md border border-neutral-light/50 px-5 py-3 rounded-lg shadow-sm">
              <div className="text-center">
                <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary block">
                  Audio Telemetry
                </span>
                <span className="text-lg font-display font-bold text-emerald-500 block mt-0.5">Active Node</span>
              </div>
              <div className="w-px h-8 bg-neutral-light" />
              <div className="text-center">
                <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary block">
                  Time Streamed
                </span>
                <span className="text-lg font-display font-bold text-text-primary block mt-0.5">
                  {profile?.minutesPlayedThisYear}
                </span>
              </div>
            </div>
          </div>

          {/* Main Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Now Playing controls (utilizing key=userId to cleanly reset playhead slider & lyrics!) */}
            <div className="lg:col-span-5">
              {nowPlaying && <NowPlaying key={userId} initialState={nowPlaying} />}
            </div>

            {/* Right: Insights charts and attributed progress bars */}
            <div className="lg:col-span-7">
              {listeningStats && (
                <ListeningInsights
                  key={userId}
                  listeningStats={listeningStats}
                  audioProfile={currentAudioProfile}
                />
              )}
            </div>
          </div>

          {/* Top Tracks list */}
          {topTracks && <TopTracks key={userId} tracks={topTracks} />}
        </div>
      )}
    </div>
  );
};

export default Spotify;
