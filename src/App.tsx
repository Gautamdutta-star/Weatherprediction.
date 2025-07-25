import React from 'react';
import { RefreshCw, Cloud } from 'lucide-react';
import { useWeather } from './hooks/useWeather';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherForecast } from './components/WeatherForecast';
import { WeatherAlerts } from './components/WeatherAlerts';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const {
    currentWeather,
    forecast,
    alerts,
    loading,
    error,
    currentCity,
    refreshWeather,
    changeCity,
  } = useWeather('New York');

  const getBackgroundGradient = () => {
    if (!currentWeather) return 'from-blue-600 via-blue-700 to-blue-800';
    
    switch (currentWeather.condition.toLowerCase()) {
      case 'sunny':
        return 'from-orange-400 via-yellow-500 to-orange-600';
      case 'partly cloudy':
        return 'from-blue-400 via-blue-500 to-blue-600';
      case 'cloudy':
        return 'from-gray-500 via-gray-600 to-gray-700';
      case 'rainy':
        return 'from-gray-600 via-blue-700 to-gray-800';
      case 'stormy':
        return 'from-gray-800 via-purple-900 to-gray-900';
      case 'snow':
        return 'from-blue-200 via-blue-400 to-blue-600';
      default:
        return 'from-blue-600 via-blue-700 to-blue-800';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-3">
              <Cloud className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">WeatherCast</h1>
              <p className="text-white/80">Accurate weather predictions</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <SearchBar onCitySelect={changeCity} currentCity={currentCity} />
            <button
              onClick={refreshWeather}
              disabled={loading}
              className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 text-white hover:bg-white/30 transition-all duration-200 disabled:opacity-50"
              title="Refresh weather data"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        {/* Weather Alerts */}
        {alerts.length > 0 && (
          <div className="mb-8">
            <WeatherAlerts alerts={alerts} />
          </div>
        )}

        {/* Main Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-red-100 mb-4">Oops! Something went wrong</h2>
            <p className="text-red-200 mb-6">{error}</p>
            <button
              onClick={refreshWeather}
              className="bg-red-500/30 hover:bg-red-500/40 text-red-100 px-6 py-3 rounded-xl transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        ) : currentWeather ? (
          <div className="space-y-8">
            {/* Current Weather */}
            <CurrentWeather weather={currentWeather} />
            
            {/* Forecast */}
            <WeatherForecast forecast={forecast} />
          </div>
        ) : null}

        {/* Footer */}
        <footer className="mt-16 text-center text-white/60">
          <p className="text-sm">
            Weather data updates every hour • Built with React & TypeScript
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;