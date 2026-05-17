import { z } from 'zod';
import { getMockWeather } from './mockData';

export const WeatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    humidity: z.number(),
    pressure: z.number(),
  }),
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
  }),
  weather: z.array(
    z.object({
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
});

export type WeatherData = z.infer<typeof WeatherSchema>;

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (city: string): Promise<WeatherData> => {
  if (!OPENWEATHER_API_KEY) {
    // Gracefully fall back to rich local mock data immediately if key is missing
    console.info(`VITE_OPENWEATHER_API_KEY not configured. Falling back to mock weather telemetry for: ${city}`);
    return getMockWeather(city);
  }

  try {
    const res = await fetch(
      `${OPENWEATHER_BASE_URL}/weather?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    return WeatherSchema.parse(data);
  } catch (error) {
    console.warn(`OpenWeather fetch failed for ${city}, returning mock data:`, error);
    return getMockWeather(city);
  }
};
