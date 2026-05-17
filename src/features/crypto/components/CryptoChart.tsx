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
  const formattedData = data.prices.map(([timestamp, price]) => ({
    x: new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
    }),
    y: price,
  }));

  const chartData = [
    {
      id: coinName,
      color: '#6366F1',
      data: formattedData,
    },
  ];

  // Select 6 evenly spaced ticks to avoid label overlap completely
  const tickValues = [
    0,
    Math.floor(formattedData.length * 0.2),
    Math.floor(formattedData.length * 0.4),
    Math.floor(formattedData.length * 0.6),
    Math.floor(formattedData.length * 0.8),
    formattedData.length - 1,
  ].map((idx) => formattedData[idx]?.x).filter(Boolean);

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
          margin={{ top: 20, right: 20, bottom: 40, left: 65 }}
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
            tickSize: 0,
            tickPadding: 12,
            tickRotation: 0,
            tickValues: tickValues,
            legend: 'Timeline',
            legendOffset: 34,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            legend: 'Price (USD)',
            legendOffset: -54,
            legendPosition: 'middle',
          }}
          enableGridX={false}
          enableGridY={true}
          colors={['#6366F1']}
          lineWidth={2.5}
          enablePoints={false}
          enableArea={true}
          areaOpacity={0.06}
          useMesh={true}
          defs={[
            {
              id: 'gradientArea',
              type: 'linearGradient',
              colors: [
                { offset: 0, color: '#6366F1', opacity: 0.15 },
                { offset: 1, color: '#6366F1', opacity: 0.01 },
              ],
            },
          ]}
          fill={[{ match: '*', id: 'gradientArea' }]}
          theme={{
            axis: {
              legend: {
                text: {
                  fontFamily: 'General Sans, sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  fill: '#8c8c9c',
                },
              },
              ticks: {
                text: {
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                  fill: '#8c8c9c',
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
                strokeWidth: 1,
                strokeDasharray: '4 4',
              },
            },
          }}
          // Premium custom tooltip showing formatted price
          tooltip={({ point }) => (
            <div className="bg-surface/90 backdrop-blur-md border border-neutral-light px-3 py-2 rounded-lg shadow-card text-[11px] font-medium font-body flex flex-col gap-0.5">
              <span className="text-text-secondary font-mono text-[9px]">{point.data.x}</span>
              <span className="text-text-primary">
                Price: <strong className="text-primary font-mono">{point.data.yFormatted}</strong>
              </span>
            </div>
          )}
        />
      </div>
    </div>
  );
};
export default CryptoChart;
