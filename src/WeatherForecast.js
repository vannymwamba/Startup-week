import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain } from 'lucide-react';

const WeatherForecast = () => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    // In a real app, you'd fetch this data from a weather API
    setForecast([
      { date: '2024-07-15', temp: 75, condition: 'sunny' },
      { date: '2024-07-16', temp: 72, condition: 'cloudy' },
      { date: '2024-07-17', temp: 68, condition: 'rainy' },
    ]);
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return <Sun className="text-yellow-400" />;
      case 'cloudy': return <Cloud className="text-gray-400" />;
      case 'rainy': return <CloudRain className="text-blue-400" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Weather Forecast</h3>
      <div className="grid grid-cols-3 gap-4">
        {forecast && forecast.map((day, index) => (
          <div key={index} className="text-center">
            <p>{new Date(day.date).toLocaleDateString()}</p>
            {getWeatherIcon(day.condition)}
            <p>{day.temp}°F</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;