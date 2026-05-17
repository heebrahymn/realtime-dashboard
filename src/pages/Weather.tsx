import { useState } from 'react';
import { useWeatherQuery } from '../features/weather/hooks/useWeatherData';
import { WeatherCard } from '../features/weather/components/WeatherCard';
import { WeatherForecast } from '../features/weather/components/WeatherForecast';
import { Search } from 'lucide-react';

const PRESETS = ['London', 'New York', 'Tokyo', 'Paris', 'Lagos'];

export const Weather = () => {
  const [searchCity, setSearchCity] = useState('London');
  const [inputValue, setInputValue] = useState('');
  const { data, isLoading, error } = useWeatherQuery(searchCity);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchCity(inputValue.trim());
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3">
            Climate Observability
          </span>
          <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight mb-2">
            Weather Station
          </h1>
          <p className="text-text-secondary text-[15px] font-body">
            Realtime atmospheric conditions and meteorological telemetry.
          </p>
        </div>

        {/* Dynamic Search Box */}
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-80">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search city (e.g. Lagos)..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-light rounded-md bg-surface text-text-primary font-body text-sm focus:outline-none focus:border-primary transition-all duration-150"
            />
            <Search className="w-4 h-4 text-text-secondary absolute left-3 top-3" />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md font-medium text-sm hover:bg-primary-hover active:translate-y-0.5 transition-all duration-150 cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {/* Quick Navigation Presets */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-light pb-4">
        {PRESETS.map((city) => {
          const isActive = searchCity.toLowerCase() === city.toLowerCase();
          return (
            <button
              key={city}
              onClick={() => {
                setSearchCity(city);
                setInputValue('');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-primary text-white shadow-glow'
                  : 'bg-surface border border-neutral-light text-text-secondary hover:border-text-secondary'
              }`}
            >
              {city}
            </button>
          );
        })}
      </div>

      {/* Weather Content Output */}
      {isLoading ? (
        <div className="w-full h-48 bg-surface border border-neutral-light rounded-xl animate-pulse flex flex-col justify-between p-8">
          <div className="space-y-3">
            <div className="h-6 w-32 bg-neutral-light rounded"></div>
            <div className="h-4 w-48 bg-neutral-light rounded"></div>
          </div>
          <div className="h-10 w-24 bg-neutral-light rounded"></div>
        </div>
      ) : error || !data ? (
        <div className="bg-surface border border-neutral-light rounded-xl p-8 text-center text-text-secondary">
          Could not fetch weather telemetry for "{searchCity}". Please verify city name.
        </div>
      ) : (
        <div className="space-y-8">
          <WeatherCard data={data} />
          <WeatherForecast city={data.name} />
        </div>
      )}
    </div>
  );
};
export default Weather;
