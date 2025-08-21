import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '@/stores/weatherStore';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import { COLORS, SPACING } from '@/constants';
import { 
  formatTemperature, 
  formatDate, 
  getWeatherDescription,
  groupForecastByDay,
  getAverageTemperature
} from '@/utils/weather';

export const WeatherPanel: React.FC = () => {
  const { currentWeather, forecast, unit, theme, toggleFavorite, favorites } = useWeatherStore();

  if (!currentWeather) {
    return (
      <View style={[styles.container, { backgroundColor: COLORS[theme].background }]}>
        <View style={styles.placeholderContainer}>
          <Text style={[styles.placeholderText, { color: COLORS[theme].text }]}>
            Search for a city to see weather information
          </Text>
        </View>
      </View>
    );
  }

  const weather = currentWeather.weather[0];
  const location = {
    id: currentWeather.id,
    name: currentWeather.name,
    country: currentWeather.sys.country,
    lat: currentWeather.coord.lat,
    lon: currentWeather.coord.lon,
  };
  const isFavorite = favorites.some(fav => fav.id === location.id);

  const groupedForecast = forecast ? groupForecastByDay(forecast) : [];

  return (
    <View style={[styles.container, { backgroundColor: COLORS[theme].background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.currentWeatherCard, { backgroundColor: COLORS[theme].surface }]}>
          <View style={styles.locationHeader}>
            <Text style={[styles.cityName, { color: COLORS[theme].text }]}>
              {currentWeather.name}
            </Text>
            <TouchableOpacity onPress={() => toggleFavorite(location)}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? '#FF6B6B' : COLORS[theme].textSecondary}
              />
            </TouchableOpacity>
          </View>
          
          <Text style={[styles.chanceOfRain, { color: COLORS[theme].textSecondary }]}>
            Chance of rain: 0%
          </Text>
          
          <View style={styles.temperatureSection}>
            <Text style={[styles.temperature, { color: COLORS[theme].text }]}>
              {formatTemperature(currentWeather.main.temp, unit)}
            </Text>
            <WeatherIcon iconCode={weather.icon} size={80} />
          </View>
          
          <Text style={[styles.description, { color: COLORS[theme].textSecondary }]}>
            {getWeatherDescription(currentWeather)}
          </Text>
        </View>

        {forecast && (
          <View style={[styles.forecastCard, { backgroundColor: COLORS[theme].surface }]}>
            <Text style={[styles.forecastTitle, { color: COLORS[theme].text }]}>
              TODAY'S FORECAST
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {forecast.list.slice(0, 8).map((item, index) => (
                <View key={index} style={styles.hourlyItem}>
                  <Text style={[styles.hourText, { color: COLORS[theme].textSecondary }]}>
                    {new Date(item.dt * 1000).getHours()}:00
                  </Text>
                  <WeatherIcon iconCode={item.weather[0].icon} size={32} />
                  <Text style={[styles.hourTemp, { color: COLORS[theme].text }]}>
                    {formatTemperature(item.main.temp, unit)}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  scrollView: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    textAlign: 'center',
  },
  currentWeatherCard: {
    padding: SPACING.lg,
    borderRadius: 16,
    marginTop: SPACING.lg,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  chanceOfRain: {
    fontSize: 14,
    marginBottom: SPACING.md,
  },
  temperatureSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  forecastCard: {
    padding: SPACING.lg,
    borderRadius: 16,
    marginTop: SPACING.md,
  },
  forecastTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  hourlyItem: {
    alignItems: 'center',
    marginRight: SPACING.lg,
    minWidth: 60,
  },
  hourText: {
    fontSize: 12,
    marginBottom: SPACING.xs,
  },
  hourTemp: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: SPACING.xs,
  },
}); 