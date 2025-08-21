import React, { useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '@/stores/weatherStore';
import { SearchBar } from '@/components/ui/SearchBar';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import { COLORS, SPACING } from '@/constants';
import { 
  formatTemperature, 
  formatTime,
  getWeatherDescription,
  groupForecastByDay,
  getAverageTemperature
} from '@/utils/weather';

interface WeatherContentProps {
  onMenuPress: () => void;
}

export const WeatherContent: React.FC<WeatherContentProps> = ({ onMenuPress }) => {
  const { 
    currentWeather, 
    forecast, 
    unit, 
    theme, 
    toggleFavorite, 
    favorites,
    fetchWeatherByCity 
  } = useWeatherStore();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentWeather]);

  const handleSearch = async (query: string) => {
    await fetchWeatherByCity(query);
  };

  if (!currentWeather) {
    return (
      <View style={[styles.container, { backgroundColor: COLORS[theme].background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
            <Ionicons name="menu" size={24} color={COLORS[theme].text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: COLORS[theme].text }]}>Weather</Text>
          <View style={styles.headerSpacer} />
        </View>

        <SearchBar onSearch={handleSearch} placeholder="Search for a city..." />

        <View style={styles.placeholderContainer}>
          <Animated.View style={[styles.placeholderContent, { opacity: fadeAnim }]}>
            <Ionicons name="partly-sunny" size={80} color={COLORS[theme].textSecondary} />
            <Text style={[styles.placeholderText, { color: COLORS[theme].text }]}>
              Search for a city to see weather information
            </Text>
          </Animated.View>
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

  return (
    <View style={[styles.container, { backgroundColor: COLORS[theme].background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={COLORS[theme].text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS[theme].text }]}>Weather</Text>
        <View style={styles.headerSpacer} />
      </View>

      <SearchBar onSearch={handleSearch} placeholder="Search for a city..." />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={[
            styles.weatherCard,
            { 
              backgroundColor: COLORS[theme].surface,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Location Header */}
          <View style={styles.locationHeader}>
            <View>
              <Text style={[styles.cityName, { color: COLORS[theme].text }]}>
                {currentWeather.name}
              </Text>
              <Text style={[styles.countryName, { color: COLORS[theme].textSecondary }]}>
                {currentWeather.sys.country}
              </Text>
            </View>
            <TouchableOpacity 
              onPress={() => toggleFavorite(location)}
              style={styles.favoriteButton}
            >
              <Animated.View style={{ transform: [{ scale: isFavorite ? 1.2 : 1 }] }}>
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={28}
                  color={isFavorite ? '#FF6B6B' : COLORS[theme].textSecondary}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* Current Weather */}
          <View style={styles.currentWeather}>
            <View style={styles.temperatureSection}>
              <Text style={[styles.temperature, { color: COLORS[theme].text }]}>
                {formatTemperature(currentWeather.main.temp, unit)}
              </Text>
              <Text style={[styles.feelsLike, { color: COLORS[theme].textSecondary }]}>
                Feels like {formatTemperature(currentWeather.main.feels_like, unit)}
              </Text>
            </View>
            <View style={styles.weatherIconSection}>
              <WeatherIcon iconCode={weather.icon} size={100} />
              <Text style={[styles.description, { color: COLORS[theme].textSecondary }]}>
                {getWeatherDescription(currentWeather)}
              </Text>
            </View>
          </View>

          {/* Weather Details */}
          <View style={styles.weatherDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="water" size={20} color="#4FC3F7" />
              <Text style={[styles.detailLabel, { color: COLORS[theme].textSecondary }]}>Humidity</Text>
              <Text style={[styles.detailValue, { color: COLORS[theme].text }]}>
                {currentWeather.main.humidity}%
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="speedometer" size={20} color="#FF9800" />
              <Text style={[styles.detailLabel, { color: COLORS[theme].textSecondary }]}>Pressure</Text>
              <Text style={[styles.detailValue, { color: COLORS[theme].text }]}>
                {currentWeather.main.pressure} hPa
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="airplane" size={20} color="#9C27B0" />
              <Text style={[styles.detailLabel, { color: COLORS[theme].textSecondary }]}>Wind</Text>
              <Text style={[styles.detailValue, { color: COLORS[theme].text }]}>
                {Math.round(currentWeather.wind.speed)} m/s
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Forecast */}
        {forecast && (
          <Animated.View 
            style={[
              styles.forecastCard,
              { 
                backgroundColor: COLORS[theme].surface,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={[styles.forecastTitle, { color: COLORS[theme].text }]}>
              Today's Forecast
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {forecast.list.slice(0, 8).map((item, index) => {
                const hour = new Date(item.dt * 1000).getHours();
                const timeString = hour === 0 ? '12 AM' : 
                                 hour === 12 ? '12 PM' : 
                                 hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
                
                return (
                  <View key={index} style={styles.hourlyItem}>
                    <Text style={[styles.hourText, { color: COLORS[theme].textSecondary }]}>
                      {timeString}
                    </Text>
                    <WeatherIcon iconCode={item.weather[0].icon} size={40} />
                    <Text style={[styles.hourTemp, { color: COLORS[theme].text }]}>
                      {formatTemperature(item.main.temp, unit)}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: 50,
    paddingBottom: SPACING.md,
  },
  menuButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: SPACING.md,
  },
  headerSpacer: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  placeholderContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  weatherCard: {
    borderRadius: 20,
    padding: SPACING.lg,
    marginTop: SPACING.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
    zIndex: 1,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  countryName: {
    fontSize: 16,
    marginTop: 2,
  },
  favoriteButton: {
    padding: SPACING.xs,
  },
  currentWeather: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  temperatureSection: {
    flex: 1,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  feelsLike: {
    fontSize: 16,
    marginTop: 4,
  },
  weatherIconSection: {
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    marginTop: SPACING.xs,
    textTransform: 'capitalize',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    marginTop: SPACING.xs,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  forecastCard: {
    borderRadius: 20,
    padding: SPACING.lg,
    marginTop: SPACING.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.md,
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