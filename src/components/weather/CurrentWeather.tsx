import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '../../stores/weatherStore';
import { Card } from '../ui/Card';
import { Text } from '../ui/Text';
import { WeatherIcon } from './WeatherIcon';
import { 
  formatTemperature, 
  formatHumidity, 
  formatWindSpeed, 
  getWindDirection,
  getWeatherDescription,
  getFeelsLikeTemperature,
  getLocationName,
  isLocationFavorite
} from '../../utils/weather';
import { SPACING, COLORS } from '../../constants';

export const CurrentWeather: React.FC = () => {
  const { currentWeather, currentLocation, unit, favorites, toggleFavorite, theme } = useWeatherStore();

  if (!currentWeather) {
    return null;
  }

  const weather = currentWeather.weather[0];
  const location = currentLocation || {
    id: currentWeather.id,
    name: currentWeather.name,
    country: currentWeather.sys.country,
    lat: currentWeather.coord.lat,
    lon: currentWeather.coord.lon,
  };
  const isFavorite = isLocationFavorite(location, favorites);

  return (
    <Card>
      <View style={styles.header}>
        <View style={styles.locationHeader}>
          <Text variant="h2" weight="bold" align="center">
            {getLocationName(location)}
          </Text>
          <TouchableOpacity
            onPress={() => toggleFavorite(location)}
            style={styles.favoriteButton}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? COLORS[theme].error : COLORS[theme].textSecondary}
            />
          </TouchableOpacity>
        </View>
        <Text variant="body" color="textSecondary" align="center">
          {getWeatherDescription(currentWeather)}
        </Text>
      </View>

      <View style={styles.mainInfo}>
        <WeatherIcon iconCode={weather.icon} size={80} />
        <View style={styles.temperatureContainer}>
          <Text variant="h1" weight="bold">
            {formatTemperature(currentWeather.main.temp, unit)}
          </Text>
          <Text variant="body" color="textSecondary">
            Feels like {getFeelsLikeTemperature(currentWeather, unit)}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text variant="caption" color="textSecondary">Humidity</Text>
          <Text variant="body" weight="600">
            {formatHumidity(currentWeather.main.humidity)}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text variant="caption" color="textSecondary">Wind</Text>
          <Text variant="body" weight="600">
            {formatWindSpeed(currentWeather.wind.speed, unit)} {getWindDirection(currentWeather.wind.deg)}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text variant="caption" color="textSecondary">Pressure</Text>
          <Text variant="body" weight="600">
            {currentWeather.main.pressure} hPa
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: SPACING.lg,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  favoriteButton: {
    marginLeft: SPACING.sm,
    padding: SPACING.xs,
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  temperatureContainer: {
    marginLeft: SPACING.md,
    alignItems: 'flex-start',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
}); 