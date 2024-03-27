import { useEffect, useState } from "react";

// Define a type for the weather data
interface WeatherData {
  name: string;
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
  };
}

export function useFetchWeather(lat: number | undefined, lng: number | undefined) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        const NEXT_PUBLIC_WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${NEXT_PUBLIC_WEATHER_API_KEY}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [lat, lng]);

  return { weatherData, loading, error };
}
