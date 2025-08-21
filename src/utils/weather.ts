import { WeatherData, ForecastData, Location } from '../types/weather';
import { API_CONFIG } from '../constants';

export const formatTemperature = (temp: number, unit: 'metric' | 'imperial'): string => {
  const roundedTemp = Math.round(temp);
  const symbol = unit === 'metric' ? '°C' : '°F';
  return `${roundedTemp}${symbol}`;
};

export const formatWindSpeed = (speed: number, unit: 'metric' | 'imperial'): string => {
  const unitText = unit === 'metric' ? 'm/s' : 'mph';
  return `${Math.round(speed)} ${unitText}`;
};

export const formatHumidity = (humidity: number): string => {
  return `${humidity}%`;
};

export const formatPressure = (pressure: number): string => {
  return `${pressure} hPa`;
};

export const formatVisibility = (visibility: number): string => {
  const km = visibility / 1000;
  return `${km.toFixed(1)} km`;
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const getWeatherIcon = (iconCode: string): string => {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const convertToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

export const convertToCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

export const getLocationName = (location: Location): string => {
  return `${location.name}, ${location.country}`;
};

export const isLocationFavorite = (location: Location, favorites: Location[]): boolean => {
  return favorites.some(fav => fav.id === location.id);
};

export const groupForecastByDay = (forecast: ForecastData) => {
  const grouped: { [key: string]: any[] } = {};
  
  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });
  
  return Object.entries(grouped).map(([date, items]) => ({
    date,
    items: items.sort((a, b) => a.dt - b.dt),
  }));
};

export const getAverageTemperature = (items: any[], unit: 'metric' | 'imperial'): number => {
  const temps = items.map(item => item.main.temp);
  const avg = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
  return Math.round(avg);
};

export const getWeatherDescription = (weatherData: WeatherData): string => {
  return weatherData.weather[0]?.description || 'Unknown';
};

export const getFeelsLikeTemperature = (weatherData: WeatherData, unit: 'metric' | 'imperial'): string => {
  return formatTemperature(weatherData.main.feels_like, unit);
}; 