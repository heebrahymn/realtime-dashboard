import { useQuery } from '@tanstack/react-query';
import { fetchCurrentWeather } from '../api/openweather';

export const useWeatherQuery = (city: string) => {
  return useQuery({
    queryKey: ['weather', city.toLowerCase().trim()],
    queryFn: () => fetchCurrentWeather(city),
    staleTime: 1000 * 60 * 10, // Weather telemetry changes slowly, 10 min cache
    enabled: city.trim().length > 0,
  });
};
