import React from 'react';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { WeatherAlert } from '../types/weather';

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

export const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'watch':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return 'bg-red-500/20 border-red-500/30 text-red-100';
      case 'severe':
        return 'bg-orange-500/20 border-orange-500/30 text-orange-100';
      case 'moderate':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-100';
      default:
        return 'bg-blue-500/20 border-blue-500/30 text-blue-100';
    }
  };

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`backdrop-blur-md border rounded-xl p-4 ${getAlertColor(alert.severity)}`}
        >
          <div className="flex items-start gap-3">
            {getAlertIcon(alert.type)}
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{alert.title}</h3>
              <p className="text-sm opacity-90">{alert.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};