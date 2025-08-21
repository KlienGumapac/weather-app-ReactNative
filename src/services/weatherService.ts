import axios from 'axios';
import { WeatherData, ForecastData, Location } from '../types/weather';
import { API_CONFIG } from '../constants';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
});

export const weatherService = {
  async getCurrentWeather(
    lat: number,
    lon: number,
    unit: 'metric' | 'imperial' = 'metric'
  ): Promise<WeatherData> {
    try {
      const response = await api.get('/weather', {
        params: {
          lat,
          lon,
          appid: API_CONFIG.API_KEY,
          units: unit,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw new Error('Failed to fetch current weather');
    }
  },

  async getForecast(
    lat: number,
    lon: number,
    unit: 'metric' | 'imperial' = 'metric'
  ): Promise<ForecastData> {
    try {
      const response = await api.get('/forecast', {
        params: {
          lat,
          lon,
          appid: API_CONFIG.API_KEY,
          units: unit,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw new Error('Failed to fetch forecast');
    }
  },

  async searchLocation(query: string): Promise<Location[]> {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct`,
        {
          params: {
            q: query,
            limit: 5,
            appid: API_CONFIG.API_KEY,
          },
        }
      );
      
      return response.data.map((item: any) => ({
        id: item.id || Math.random(),
        name: item.name,
        country: item.country,
        lat: item.lat,
        lon: item.lon,
      }));
    } catch (error) {
      console.error('Error searching location:', error);
      throw new Error('Failed to search location');
    }
  },

  async getWeatherByCity(
    cityName: string,
    unit: 'metric' | 'imperial' = 'metric'
  ): Promise<WeatherData> {
    try {
      const response = await api.get('/weather', {
        params: {
          q: cityName,
          appid: API_CONFIG.API_KEY,
          units: unit,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      throw new Error('Failed to fetch weather for city');
    }
  },

  async getForecastByCity(
    cityName: string,
    unit: 'metric' | 'imperial' = 'metric'
  ): Promise<ForecastData> {
    try {
      const response = await api.get('/forecast', {
        params: {
          q: cityName,
          appid: API_CONFIG.API_KEY,
          units: unit,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast by city:', error);
      throw new Error('Failed to fetch forecast for city');
    }
  },
}; 