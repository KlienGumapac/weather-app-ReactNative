import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useWeatherStore } from '../../stores/weatherStore';
import { Card } from '../ui/Card';
import { Text } from '../ui/Text';
import { WeatherIcon } from './WeatherIcon';
import { 
  formatTemperature, 
  formatDate,
  groupForecastByDay,
  getAverageTemperature
} from '../../utils/weather';
import { SPACING } from '../../constants';

export const Forecast: React.FC = () => {
  const { forecast, unit } = useWeatherStore();

  if (!forecast) {
    return null;
  }

  const groupedForecast = groupForecastByDay(forecast);

  return (
    <Card>
      <Text variant="h3" weight="bold" style={styles.title}>
        5-Day Forecast
      </Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {groupedForecast.slice(1, 6).map((day, index) => {
          const avgTemp = getAverageTemperature(day.items, unit);
          const weather = day.items[0]?.weather[0];
          
          return (
            <View key={index} style={styles.dayContainer}>
              <Text variant="caption" color="textSecondary" align="center">
                {formatDate(day.items[0].dt)}
              </Text>
              
              <WeatherIcon 
                iconCode={weather?.icon || '01d'} 
                size={40} 
                style={styles.icon}
              />
              
              <Text variant="body" weight="600" align="center">
                {formatTemperature(avgTemp, unit)}
              </Text>
              
              <Text variant="caption" color="textSecondary" align="center">
                {weather?.description || 'Unknown'}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: SPACING.md,
  },
  dayContainer: {
    alignItems: 'center',
    marginRight: SPACING.lg,
    minWidth: 80,
  },
  icon: {
    marginVertical: SPACING.sm,
  },
}); 