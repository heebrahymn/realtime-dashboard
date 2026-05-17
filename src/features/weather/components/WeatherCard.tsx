import type { WeatherData } from '../api/openweather';
import { Cloud, Sun, CloudRain, CloudLightning, Wind, Droplets, Thermometer, Compass } from 'lucide-react';

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard = ({ data }: WeatherCardProps) => {
  const weatherType = data.weather[0]?.main.toLowerCase() || '';

  // Get dynamic background gradient & representative icon based on weather condition
  const getWeatherStyling = () => {
    if (weatherType.includes('clear')) {
      return {
        gradient: 'from-amber-500/10 via-orange-500/5 to-transparent border-amber-500/20',
        text: 'text-amber-500',
        icon: <Sun className="w-16 h-16 text-amber-500 animate-spin-slow" />,
      };
    }
    if (weatherType.includes('rain') || weatherType.includes('drizzle')) {
      return {
        gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent border-blue-500/20',
        text: 'text-blue-500',
        icon: <CloudRain className="w-16 h-16 text-blue-500 animate-bounce" />,
      };
    }
    if (weatherType.includes('thunder')) {
      return {
        gradient: 'from-purple-500/10 via-indigo-600/5 to-transparent border-purple-500/20',
        text: 'text-purple-500',
        icon: <CloudLightning className="w-16 h-16 text-purple-500 animate-pulse" />,
      };
    }
    // Default/Cloudy fallback
    return {
      gradient: 'from-slate-400/10 via-neutral-400/5 to-transparent border-slate-400/20',
      text: 'text-text-secondary',
      icon: <Cloud className="w-16 h-16 text-text-secondary animate-pulse" />,
    };
  };

  const styling = getWeatherStyling();

  return (
    <div className={`bg-surface border rounded-xl p-8 shadow-card flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden bg-gradient-to-br ${styling.gradient}`}>
      <div className="flex-1 space-y-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-text-secondary font-mono">
            Active Telemetry Cell
          </span>
          <h2 className="text-4xl font-display font-bold text-text-primary mt-1">
            {data.name}
          </h2>
          <p className="text-text-secondary capitalize text-sm font-medium mt-0.5">
            {data.weather[0]?.description}
          </p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-6xl font-display font-bold tracking-tight text-text-primary">
            {Math.round(data.main.temp)}°C
          </span>
          <span className="text-text-secondary text-sm">
            Feels like {Math.round(data.main.feels_like)}°C
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {styling.icon}
      </div>

      {/* Grid of Weather Sub-Metrics */}
      <div className="w-full md:w-auto grid grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-neutral-light pt-6 md:pt-0 md:pl-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-background rounded-lg">
            <Wind className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="text-xs text-text-secondary block">Wind Speed</span>
            <span className="font-mono text-sm font-bold text-text-primary">
              {data.wind.speed} m/s
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-background rounded-lg">
            <Droplets className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="text-xs text-text-secondary block">Humidity</span>
            <span className="font-mono text-sm font-bold text-text-primary">
              {data.main.humidity}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-background rounded-lg">
            <Thermometer className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="text-xs text-text-secondary block">Pressure</span>
            <span className="font-mono text-sm font-bold text-text-primary">
              {data.main.pressure} hPa
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-background rounded-lg">
            <Compass className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="text-xs text-text-secondary block">Wind Direction</span>
            <span className="font-mono text-sm font-bold text-text-primary">
              {data.wind.deg}°
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
