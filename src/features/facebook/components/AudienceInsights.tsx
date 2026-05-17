import { ResponsiveLine } from '@nivo/line';
import type { DailyReach, AudienceDemographics } from '../api/mockData';
import { Users, TrendingUp } from 'lucide-react';


interface AudienceInsightsProps {
  dailyReach: DailyReach[];
  demographics: AudienceDemographics[];
}

export const AudienceInsights = ({ dailyReach, demographics }: AudienceInsightsProps) => {
  // Format daily reach into two data sets: Organic and Paid
  const chartData = [
    {
      id: 'Organic Reach',
      color: '#1877F2',
      data: dailyReach.map((item) => ({
        x: item.day,
        y: item.organic,
      })),
    },
    {
      id: 'Paid Reach',
      color: '#00C6FF',
      data: dailyReach.map((item) => ({
        x: item.day,
        y: item.paid,
      })),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Nivo Multi-line reach impressions chart */}
      <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-250">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-text-secondary">
              Reach Metrics
            </p>
            <h3 className="text-lg font-display font-bold text-text-primary">
              Organic vs Paid Impressions
            </h3>
          </div>
          <div className="flex items-center gap-1 bg-blue-500/10 text-blue-600 px-2.5 py-1 rounded-full text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            +22.7% Reach Lift
          </div>
        </div>

        <div className="h-64 w-full relative">
          <ResponsiveLine
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 40, left: 45 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 0, max: 'auto' }}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 8,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 0,
              tickPadding: 10,
              tickValues: 4,
            }}
            enableGridX={false}
            enableGridY={true}
            gridYValues={4}
            colors={['#1877F2', '#00C6FF']}
            lineWidth={2.5}
            enablePoints={false}
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
              legends: {
                text: {
                  fill: '#6B6B6B',
                  fontSize: 11,
                  fontFamily: 'DM Sans',
                },
              },
            }}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 35,
                itemsSpacing: 10,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 10,
                symbolShape: 'circle',
              },
            ]}
            tooltip={({ point }) => (
              <div className="bg-white/90 backdrop-blur-md border border-neutral-light p-3 rounded-lg shadow-card text-[11px] font-mono">
                <span className="text-text-secondary block font-display font-medium text-xs mb-1">
                  {point.data.x} Telemetry
                </span>
                <span className="font-bold text-[13px]" style={{ color: point.seriesColor }}>
                  {point.seriesId}: {point.data.yFormatted} views
                </span>
              </div>
            )}
          />
        </div>
      </div>

      {/* Audience Demographics */}
      <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-250">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-display font-bold text-text-primary">
            Audience Demographics
          </h3>
        </div>

        <div className="space-y-4">
          {demographics.map((demo) => {
            const totalPercent = demo.malePercentage + demo.femalePercentage;
            return (
              <div key={demo.ageGroup} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-text-primary">Age Group {demo.ageGroup}</span>
                  <span className="font-mono text-text-secondary">
                    Total: {totalPercent}% (M: {demo.malePercentage}% / F: {demo.femalePercentage}%)
                  </span>
                </div>

                <div className="flex h-3 w-full bg-neutral-light rounded-full overflow-hidden">
                  {/* Male Share (Blue) */}
                  <div
                    className="bg-blue-600 h-full transition-all duration-500"
                    style={{ width: `${demo.malePercentage}%` }}
                    title={`Male: ${demo.malePercentage}%`}
                  />
                  {/* Female Share (Pink/Purple) */}
                  <div
                    className="bg-purple-500 h-full transition-all duration-500"
                    style={{ width: `${demo.femalePercentage}%` }}
                    title={`Female: ${demo.femalePercentage}%`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
