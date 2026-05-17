import { ResponsiveLine } from '@nivo/line';
import { useCoinHistoryQuery } from '../hooks/useCoinData';

interface CryptoChartProps {
  coinId: string;
  coinName: string;
}

export const CryptoChart = ({ coinId, coinName }: CryptoChartProps) => {
  const { data, isLoading, error } = useCoinHistoryQuery(coinId);

  if (isLoading) {
    return (
      <div className="w-full h-[350px] bg-surface border border-neutral-light rounded-xl p-6 flex flex-col justify-between animate-pulse">
        <div className="h-6 w-48 bg-neutral-light rounded"></div>
        <div className="flex-1 w-full flex items-end gap-2 pt-6">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={idx}
              className="flex-1 bg-neutral-light rounded-t"
              style={{ height: `${Math.random() * 60 + 20}%` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full h-[350px] bg-surface border border-neutral-light rounded-xl p-6 flex items-center justify-center text-text-secondary">
        Failed to load chart telemetry data.
      </div>
    );
  }

  // Transform data for Nivo Line chart
  const chartData = [
    {
      id: coinName,
      color: '#6366F1',
      data: data.prices.map(([timestamp, price]) => ({
        x: new Date(timestamp).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        y: price,
      })),
    },
  ];

  return (
    <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card transition-all duration-200 hover:shadow-glow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Market Trend (7 Days)
          </span>
          <h3 className="text-xl font-display font-bold text-text-primary mt-1">
            {coinName} Price History
          </h3>
        </div>
      </div>
      <div className="w-full h-[320px]">
        <ResponsiveLine
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-$,.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -30,
            legend: 'Timeline',
            legendOffset: 45,
            legendPosition: 'middle',
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Price (USD)',
            legendOffset: -50,
            legendPosition: 'middle',
            truncateTickAt: 0,
          }}
          colors={['#6366F1']}
          pointSize={4}
          pointColor="#ffffff"
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableArea={true}
          areaOpacity={0.08}
          useMesh={true}
          theme={{
            axis: {
              legend: {
                text: {
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 12,
                  fill: '#6b6b6b',
                },
              },
              ticks: {
                text: {
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                  fill: '#9c9c9c',
                },
              },
            },
            grid: {
              line: {
                stroke: '#E8E8EC',
                strokeWidth: 1,
              },
            },
            crosshair: {
              line: {
                stroke: '#6366F1',
                strokeWidth: 1.5,
                strokeDasharray: '3 3',
              },
            },
          }}
        />
      </div>
    </div>
  );
};
