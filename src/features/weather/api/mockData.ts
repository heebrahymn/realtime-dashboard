export interface MockWeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

export const mockWeatherCollection: Record<string, MockWeatherData> = {
  london: {
    name: 'London',
    main: { temp: 14.5, feels_like: 13.8, humidity: 82, pressure: 1012 },
    wind: { speed: 4.6, deg: 210 },
    weather: [{ main: 'Clouds', description: 'broken clouds', icon: '04d' }]
  },
  newyork: {
    name: 'New York',
    main: { temp: 22.1, feels_like: 21.9, humidity: 64, pressure: 1016 },
    wind: { speed: 5.1, deg: 180 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }]
  },
  tokyo: {
    name: 'Tokyo',
    main: { temp: 18.2, feels_like: 17.5, humidity: 76, pressure: 1008 },
    wind: { speed: 3.2, deg: 90 },
    weather: [{ main: 'Rain', description: 'light rain', icon: '10d' }]
  },
  paris: {
    name: 'Paris',
    main: { temp: 16.8, feels_like: 16.2, humidity: 72, pressure: 1014 },
    wind: { speed: 3.8, deg: 240 },
    weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '03d' }]
  },
  lagos: {
    name: 'Lagos',
    main: { temp: 31.0, feels_like: 36.5, humidity: 80, pressure: 1010 },
    wind: { speed: 4.1, deg: 160 },
    weather: [{ main: 'Thunderstorm', description: 'thunderstorm with rain', icon: '11d' }]
  }
};

export const getMockWeather = (city: string): MockWeatherData => {
  const sanitized = city.toLowerCase().replace(/\s+/g, '');
  return mockWeatherCollection[sanitized] || {
    name: city.charAt(0).toUpperCase() + city.slice(1),
    main: { temp: 20.0, feels_like: 19.5, humidity: 60, pressure: 1013 },
    wind: { speed: 3.0, deg: 0 },
    weather: [{ main: 'Clouds', description: 'partly cloudy', icon: '02d' }]
  };
};

// Generates simulated historical daily temperatures for a city to show in Nivo chart
export const generateMockWeatherForecast = (city: string) => {
  const baseTemp = getMockWeather(city).main.temp;
  const data: { x: string; y: number }[] = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  days.forEach((day, idx) => {
    // Generate fluctuations based on index
    const dev = (Math.sin(idx * 1.5) * 3) + (Math.random() - 0.5) * 2;
    data.push({
      x: day,
      y: parseFloat((baseTemp + dev).toFixed(1))
    });
  });

  return [
    {
      id: 'Temperature',
      color: '#6366F1',
      data
    }
  ];
};
