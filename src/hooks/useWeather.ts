import { useState, useEffect } from 'react';
import { WeatherData, ForecastDay, WeatherAlert } from '../types/weather';
import { getCurrentWeather, getForecast, getWeatherAlerts } from '../utils/weatherData';

export const useWeather = (initialCity: string = 'New York') => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState(initialCity);

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData, alertsData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
        getWeatherAlerts(),
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setAlerts(alertsData);
      setCurrentCity(city);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(initialCity);
  }, [initialCity]);

  const refreshWeather = () => {
    fetchWeatherData(currentCity);
  };

  const changeCity = (city: string) => {
    fetchWeatherData(city);
  };

  return {
    currentWeather,
    forecast,
    alerts,
    loading,
    error,
    currentCity,
    refreshWeather,
    changeCity,
  };
};