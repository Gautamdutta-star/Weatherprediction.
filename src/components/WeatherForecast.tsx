import React, { useState } from 'react';
import { ChevronRight, Droplets, Wind } from 'lucide-react';
import { ForecastDay } from '../types/weather';

interface WeatherForecastProps {
  forecast: ForecastDay[];
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">5-Day Forecast</h2>
      
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div key={index} className="space-y-3">
            <button
              onClick={() => setSelectedDay(selectedDay === index ? null : index)}
              className="w-full bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all duration-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">{day.icon}</div>
                <div className="text-left">
                  <p className="font-semibold">{day.day}</p>
                  <p className="text-white/70 text-sm">{day.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-semibold">{day.condition}</p>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Droplets className="w-3 h-3" />
                    <span>{day.precipitation}%</span>
                    <Wind className="w-3 h-3 ml-2" />
                    <span>{day.windSpeed} mph</span>
                  </div>
                </div>
                
                <div className="text-right min-w-[80px]">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">{day.high}°</span>
                    <span className="text-white/60">{day.low}°</span>
                  </div>
                </div>
                
                <ChevronRight 
                  className={`w-5 h-5 transition-transform duration-200 ${
                    selectedDay === index ? 'rotate-90' : ''
                  }`} 
                />
              </div>
            </button>

            {selectedDay === index && (
              <div className="bg-white/5 rounded-xl p-4 ml-4">
                <h4 className="font-semibold mb-4">Hourly Forecast</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {day.hourly.filter((_, i) => i % 4 === 0).map((hour, hourIndex) => (
                    <div key={hourIndex} className="bg-white/10 rounded-lg p-3 text-center">
                      <p className="text-sm text-white/70 mb-1">{hour.time}</p>
                      <div className="text-lg mb-1">{hour.icon}</div>
                      <p className="font-semibold">{hour.temperature}°</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Droplets className="w-3 h-3 text-blue-300" />
                        <span className="text-xs text-white/70">{hour.precipitation}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};