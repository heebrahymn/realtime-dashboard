import { ResponsiveLine } from '@nivo/line';
import type { ListeningDay, AudioProfile } from '../api/mockData';
import { mockGenreStats } from '../api/mockData';
import { Play, TrendingUp } from 'lucide-react';

interface ListeningInsightsProps {
  listeningStats: ListeningDay[];
  audioProfile: AudioProfile[];
}

export const ListeningInsights = ({ listeningStats, audioProfile }: ListeningInsightsProps) => {
  // Map listeningStats to Nivo line format
  const chartData = [
    {
      id: 'Listening Minutes',
      color: '#6366F1',
      data: listeningStats.map((item) => ({
        x: item.day,
        y: item.minutes,
      })),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Listening Time Chart */}
      <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-250">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-text-secondary">
              Activity Metrics
            </p>
            <h3 className="text-lg font-display font-bold text-text-primary">
              Weekly Listening Duration
            </h3>
          </div>
          <div className="flex items-center gap-1 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            +18.4% This Week
          </div>
        </div>

        {/* Nivo Line Chart Container */}
        <div className="h-64 w-full relative">
          <ResponsiveLine
            data={chartData}
            margin={{ top: 20, right: 15, bottom: 40, left: 35 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 0, max: 'auto' }}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 8,
              tickRotation: 0,
              legendOffset: 36,
              legendPosition: 'middle',
            }}
            axisLeft={{
              tickSize: 0,
              tickPadding: 10,
              tickValues: 4,
            }}
            enableGridX={false}
            enableGridY={true}
            gridYValues={4}
            colors={['#6366F1']}
            lineWidth={2.5}
            enablePoints={false}
            enableArea={true}
            areaOpacity={0.06}
            useMesh={true}
            theme={{
              grid: {
                line: {
                  stroke: '#E8E8EC',
                  strokeWidth: 1,
                },
              },
              axis: {
                ticks: {
                  text: {
                    fill: '#6B6B6B',
                    fontSize: 11,
                    fontFamily: 'JetBrains Mono',
                  },
                },
              },
            }}
            tooltip={({ point }) => (
              <div className="bg-white/90 backdrop-blur-md border border-neutral-light p-3 rounded-lg shadow-card text-[11px] font-mono">
                <span className="text-text-secondary block font-display font-medium text-xs mb-1">
                  {point.data.x} Activity
                </span>
                <span className="text-primary font-bold text-[13px]">
                  {point.data.yFormatted} mins streamed
                </span>
              </div>
            )}
            defs={[
              {
                id: 'areaGradient',
                type: 'linearGradient',
                colors: [
                  { offset: 0, color: '#6366F1', opacity: 0.15 },
                  { offset: 1, color: '#6366F1', opacity: 0.01 },
                ],
              },
            ]}
            fill={[{ match: '*', id: 'areaGradient' }]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Genre Breakdown */}
        <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-250">
          <h3 className="text-base font-display font-bold text-text-primary mb-4">
            Genre Affinity Breakdown
          </h3>
          <div className="space-y-3.5">
            {mockGenreStats.map((genre) => (
              <div key={genre.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-text-primary font-semibold">{genre.label}</span>
                  <span className="text-text-secondary font-mono">{genre.value}%</span>
                </div>
                <div className="w-full bg-neutral-light rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${genre.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Profile */}
        <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-250">
          <h3 className="text-base font-display font-bold text-text-primary mb-4">
            Sound Wave Attributes
          </h3>
          <div className="space-y-4">
            {audioProfile.map((profile) => (
              <div key={profile.name} className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-text-primary block truncate">
                    {profile.name}
                  </span>
                  {/* Subtle bar indicator */}
                  <div className="w-full bg-neutral-light rounded-full h-1.5 overflow-hidden mt-1">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${profile.value}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600 font-mono">
                    {profile.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
