import { ArrowUpRight, ArrowDownRight, Minus, Play, Heart } from 'lucide-react';
import type { SpotifyTrack } from '../api/mockData';

interface TopTracksProps {
  tracks: SpotifyTrack[];
}

export const TopTracks = ({ tracks }: TopTracksProps) => {
  const formatDuration = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-250">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-text-secondary">
            User Favorites
          </p>
          <h3 className="text-lg font-display font-bold text-text-primary">
            Top Tracks This Month
          </h3>
        </div>
        <span className="text-xs font-semibold text-text-secondary bg-neutral-light/50 px-2.5 py-1 rounded-full border border-neutral-light">
          Updated Daily
        </span>
      </div>

      <div className="space-y-4">
        {tracks.map((track, idx) => (
          <div
            key={track.id}
            className="flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-neutral-light hover:bg-neutral-light/20 transition-all duration-200 group"
          >
            {/* Rank Index */}
            <span className="text-sm font-mono font-bold text-text-secondary w-4 text-center">
              {idx + 1}
            </span>

            {/* Album Cover Art with hover action */}
            <div className="w-12 h-12 rounded-md overflow-hidden relative flex-shrink-0 shadow-sm">
              <img
                src={track.coverUrl}
                alt={track.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                <Play className="w-5 h-5 text-white fill-white scale-90 group-hover:scale-100 transition-transform" />
              </div>
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-display font-bold text-text-primary truncate">
                {track.title}
              </h4>
              <p className="text-xs text-text-secondary truncate mt-0.5">
                {track.artist} • <span className="font-medium text-[11px]">{track.album}</span>
              </p>
            </div>

            {/* Play counts / Popularity score bar */}
            <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0 text-right">
              <span className="text-xs font-mono font-bold text-text-primary">
                {track.playCount} plays
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-16 bg-neutral-light rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${track.popularity}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-text-secondary">
                  {track.popularity}%
                </span>
              </div>
            </div>

            {/* Trend Indicator */}
            <div className="flex items-center gap-3 pl-2 border-l border-neutral-light/50 flex-shrink-0">
              {track.trend === 'up' && (
                <span className="text-emerald-500 bg-emerald-500/10 p-1 rounded-full" title="Trending Up">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              )}
              {track.trend === 'down' && (
                <span className="text-red-500 bg-red-500/10 p-1 rounded-full" title="Trending Down">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </span>
              )}
              {track.trend === 'stable' && (
                <span className="text-text-secondary bg-neutral-light p-1 rounded-full" title="Stable">
                  <Minus className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
            
            {/* Quick action button */}
            <button className="p-1.5 hover:bg-neutral-light text-text-secondary hover:text-red-500 rounded-full transition-colors cursor-pointer hidden md:block">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
