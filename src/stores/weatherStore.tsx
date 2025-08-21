import { create } from 'zustand';
import { WeatherState, WeatherData, ForecastData, Location } from '@/types/weather';
import { weatherService } from '@/services/weatherService';

interface WeatherStore extends WeatherState {

  setCurrentWeather: (weather: WeatherData) => void;
  setForecast: (forecast: ForecastData) => void;
  setCurrentLocation: (location: Location) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUnit: (unit: 'metric' | 'imperial') => void;
  setTheme: (theme: 'light' | 'dark') => void;
  
  fetchWeather: (lat: number, lon: number) => Promise<void>;
  fetchWeatherByCity: (cityName: string) => Promise<void>;
  searchLocations: (query: string) => Promise<Location[]>;
  
  addToFavorites: (location: Location) => void;
  removeFromFavorites: (locationId: number) => void;
  toggleFavorite: (location: Location) => void;
  
  reset: () => void;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  currentLocation: null,
  favorites: [],
  isLoading: false,
  error: null,
  unit: 'metric',
  theme: 'light',
};

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  ...initialState,

  setCurrentWeather: (weather) => set({ currentWeather: weather }),
  
  setForecast: (forecast) => set({ forecast }),
  
  setCurrentLocation: (location) => set({ currentLocation: location }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  setUnit: (unit) => set({ unit }),
  
  setTheme: (theme) => set({ theme }),

  fetchWeather: async (lat: number, lon: number) => {
    const { unit } = get();
    set({ isLoading: true, error: null });
    
    try {
      const [weather, forecast] = await Promise.all([
        weatherService.getCurrentWeather(lat, lon, unit),
        weatherService.getForecast(lat, lon, unit),
      ]);
      
      set({
        currentWeather: weather,
        forecast,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch weather',
        isLoading: false,
      });
    }
  },

  fetchWeatherByCity: async (cityName: string) => {
    const { unit } = get();
    set({ isLoading: true, error: null });
    
    try {
      const [weather, forecast] = await Promise.all([
        weatherService.getWeatherByCity(cityName, unit),
        weatherService.getForecastByCity(cityName, unit),
      ]);
      
      const location: Location = {
        id: weather.id,
        name: weather.name,
        country: weather.sys.country,
        lat: weather.coord.lat,
        lon: weather.coord.lon,
      };
      
      set({
        currentWeather: weather,
        forecast,
        currentLocation: location,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch weather',
        isLoading: false,
      });
    }
  },

  searchLocations: async (query: string) => {
    try {
      return await weatherService.searchLocation(query);
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to search locations',
      });
      return [];
    }
  },

  addToFavorites: (location) => {
    const { favorites } = get();
    const isAlreadyFavorite = favorites.some(fav => fav.id === location.id);
    
    if (!isAlreadyFavorite) {
      set({ favorites: [...favorites, location] });
    }
  },

  removeFromFavorites: (locationId) => {
    const { favorites } = get();
    set({
      favorites: favorites.filter(fav => fav.id !== locationId),
    });
  },

  toggleFavorite: (location) => {
    const { favorites } = get();
    const isFavorite = favorites.some(fav => fav.id === location.id);
    
    if (isFavorite) {
      get().removeFromFavorites(location.id);
    } else {
      get().addToFavorites(location);
    }
  },

  reset: () => set(initialState),
})); 