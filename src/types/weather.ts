export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  icon: string;
}

export interface ForecastDay {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  description: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  icon: string;
  hourly: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  precipitation: number;
  icon: string;
}

export interface WeatherAlert {
  type: 'warning' | 'watch' | 'advisory';
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
}