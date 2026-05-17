import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Sparkles } from 'lucide-react';
import type { LivePlayingState } from '../api/mockData';

interface NowPlayingProps {
  initialState: LivePlayingState;
}

export const NowPlaying = ({ initialState }: NowPlayingProps) => {
  const [isPlaying, setIsPlaying] = useState(initialState.isPlaying);
  const [progressMs, setProgressMs] = useState(initialState.progressMs);
  const durationMs = initialState.track.durationMs;

  // Auto-progress simulated track every second when isPlaying is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgressMs((prev) => {
          if (prev >= durationMs) {
            return 0; // Loop track
          }
          return prev + 1000;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, durationMs]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const skipForward = () => setProgressMs((prev) => Math.min(prev + 10000, durationMs));
  const skipBackward = () => setProgressMs((prev) => Math.max(prev - 10000, 0));

  const progressPercent = Math.min((progressMs / durationMs) * 100, 100);

  const formatTime = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Determine which lyric line to show based on progress
  const activeLyricIndex = Math.min(
    Math.floor((progressMs / durationMs) * initialState.lyrics.length),
    initialState.lyrics.length - 1
  );

  return (
    <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-250 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
      
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/15">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Playing
          </span>
          
          {/* Interactive CSS Music Equalizer visualizer */}
          <div className="flex items-end gap-[3px] h-4">
            {[1, 2, 3, 4, 5].map((idx) => (
              <span
                key={idx}
                className="w-[3px] bg-primary rounded-t-full origin-bottom"
                style={{
                  height: isPlaying ? '100%' : '20%',
                  animation: isPlaying ? `equalizerBounce 1.2s ease-in-out infinite alternate` : 'none',
                  animationDelay: `${idx * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-5 mb-6">
          <div className="relative group w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
            <img
              src={initialState.track.coverUrl}
              alt={initialState.track.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Music className="w-6 h-6 text-white animate-pulse" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h3 className="text-xl font-display font-bold text-text-primary tracking-tight truncate">
              {initialState.track.title}
            </h3>
            <p className="text-primary text-[14px] font-semibold truncate mt-1">
              {initialState.track.artist}
            </p>
            <p className="text-text-secondary text-xs truncate mt-0.5">
              Album: {initialState.track.album}
            </p>

            <span className="inline-flex items-center gap-1 mt-2.5 text-[10px] uppercase tracking-wider font-bold text-text-secondary">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              {initialState.track.genre} • Pop Score {initialState.track.popularity}%
            </span>
          </div>
        </div>

        {/* Live Lyrics Telemetry Display */}
        <div className="bg-neutral-light/50 border border-neutral-light rounded-lg p-4 mb-6">
          <p className="text-[10px] font-mono uppercase tracking-wider text-text-secondary mb-2">
            Simulated Lyrics Feed
          </p>
          <div className="h-16 flex flex-col justify-center overflow-hidden relative">
            <div className="space-y-1.5 transition-all duration-300">
              {initialState.lyrics.map((line, idx) => {
                const isSelected = idx === activeLyricIndex;
                return (
                  <p
                    key={idx}
                    className={`text-center font-display font-medium transition-all duration-300 ${
                      isSelected
                        ? 'text-[14px] text-primary font-bold scale-100 opacity-100'
                        : 'text-xs text-text-secondary scale-95 opacity-40 h-0 overflow-hidden'
                    }`}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Track Slider Timeline progress */}
        <div className="space-y-1.5">
          <div className="w-full bg-neutral-light rounded-full h-1.5 relative overflow-hidden group cursor-pointer">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-text-secondary">
            <span>{formatTime(progressMs)}</span>
            <span>{formatTime(durationMs)}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-text-secondary">
            <Volume2 className="w-4 h-4" />
            <span className="text-[11px] font-mono">Stream Active</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={skipBackward}
              className="p-2 hover:bg-neutral-light text-text-secondary hover:text-text-primary rounded-full transition-colors cursor-pointer"
              title="Seek -10s"
            >
              <SkipBack className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={togglePlay}
              className="p-3 bg-primary hover:bg-primary-hover text-white rounded-full transition-all shadow-glow hover:scale-105 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
            </button>
            <button
              onClick={skipForward}
              className="p-2 hover:bg-neutral-light text-text-secondary hover:text-text-primary rounded-full transition-colors cursor-pointer"
              title="Seek +10s"
            >
              <SkipForward className="w-4.5 h-4.5" />
            </button>
          </div>

          <div className="text-[11px] font-mono text-emerald-500 font-bold uppercase tracking-wider">
            320kbps AAC
          </div>
        </div>
      </div>
    </div>
  );
};
