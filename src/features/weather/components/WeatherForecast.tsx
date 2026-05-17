import { ResponsiveLine } from '@nivo/line';
import { generateMockWeatherForecast } from '../api/mockData';

interface WeatherForecastProps {
  city: string;
}

export const WeatherForecast = ({ city }: WeatherForecastProps) => {
  const chartData = generateMockWeatherForecast(city);

  return (
    <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card transition-all duration-200 hover:shadow-glow">
      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Aggregated Forecast
        </span>
        <h3 className="text-xl font-display font-bold text-text-primary mt-1">
          7-Day Temperature Trend for {city}
        </h3>
      </div>
      <div className="w-full h-[300px]">
        <ResponsiveLine
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 40, left: 55 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.1f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            legend: 'Forecast Timeline',
            legendOffset: 34,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            legend: 'Temperature (°C)',
            legendOffset: -42,
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
              id: 'gradientAreaWeather',
              type: 'linearGradient',
              colors: [
                { offset: 0, color: '#6366F1', opacity: 0.15 },
                { offset: 1, color: '#6366F1', opacity: 0.01 },
              ],
            },
          ]}
          fill={[{ match: '*', id: 'gradientAreaWeather' }]}
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
          tooltip={({ point }) => (
            <div className="bg-surface/90 backdrop-blur-md border border-neutral-light px-3 py-2 rounded-lg shadow-card text-[11px] font-medium font-body flex flex-col gap-0.5">
              <span className="text-text-secondary font-mono text-[9px]">{point.data.x}</span>
              <span className="text-text-primary">
                Temp: <strong className="text-primary font-mono">{point.data.yFormatted}°C</strong>
              </span>
            </div>
          )}
        />
      </div>
    </div>
  );
};
export default WeatherForecast;
