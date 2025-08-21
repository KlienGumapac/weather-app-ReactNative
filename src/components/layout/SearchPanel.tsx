import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '@/stores/weatherStore';
import { SearchBar } from '@/components/ui/SearchBar';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import { COLORS, SPACING } from '@/constants';
import { Location } from '@/types/weather';
import { formatTemperature, formatTime } from '@/utils/weather';

export const SearchPanel: React.FC = () => {
  const { theme, favorites, currentWeather, fetchWeatherByCity } = useWeatherStore();
  const [recentSearches, setRecentSearches] = useState<Array<{
    location: Location;
    weather: any;
    timestamp: number;
  }>>([]);

  const handleSearch = async (query: string) => {
    try {
      await fetchWeatherByCity(query);
      // Add to recent searches
      if (currentWeather) {
        const newSearch = {
          location: {
            id: currentWeather.id,
            name: currentWeather.name,
            country: currentWeather.sys.country,
            lat: currentWeather.coord.lat,
            lon: currentWeather.coord.lon,
          },
          weather: currentWeather,
          timestamp: Date.now(),
        };
        setRecentSearches(prev => [newSearch, ...prev.slice(0, 4)]);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleLocationPress = (location: Location) => {
    fetchWeatherByCity(`${location.name}, ${location.country}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS[theme].background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: COLORS[theme].text }]}>Search Cities</Text>
        </View>

        <SearchBar onSearch={handleSearch} placeholder="Search for a city..." />

        {recentSearches.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: COLORS[theme].textSecondary }]}>
              LATEST SEARCHES
            </Text>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={`${search.location.id}-${search.timestamp}`}
                style={[
                  styles.searchItem,
                  { backgroundColor: COLORS[theme].surface },
                  index === 0 && { backgroundColor: COLORS[theme].primary + '20' },
                ]}
                onPress={() => handleLocationPress(search.location)}
              >
                <WeatherIcon 
                  iconCode={search.weather.weather[0]?.icon || '01d'} 
                  size={24} 
                />
                <View style={styles.searchItemContent}>
                  <Text style={[styles.cityName, { color: COLORS[theme].text }]}>
                    {search.location.name}
                  </Text>
                  <Text style={[styles.timeText, { color: COLORS[theme].textSecondary }]}>
                    {formatTime(search.timestamp / 1000)}
                  </Text>
                </View>
                <Text style={[styles.temperature, { color: COLORS[theme].text }]}>
                  {formatTemperature(search.weather.main.temp, 'metric')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {favorites.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: COLORS[theme].textSecondary }]}>
              FAVORITE CITIES
            </Text>
            {favorites.map((location) => (
              <TouchableOpacity
                key={location.id}
                style={[styles.searchItem, { backgroundColor: COLORS[theme].surface }]}
                onPress={() => handleLocationPress(location)}
              >
                <Ionicons name="heart" size={24} color="#FF6B6B" />
                <View style={styles.searchItemContent}>
                  <Text style={[styles.cityName, { color: COLORS[theme].text }]}>
                    {location.name}
                  </Text>
                  <Text style={[styles.countryText, { color: COLORS[theme].textSecondary }]}>
                    {location.country}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
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
  header: {
    paddingVertical: SPACING.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.sm,
  },
  searchItemContent: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  cityName: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 12,
    marginTop: 2,
  },
  countryText: {
    fontSize: 12,
    marginTop: 2,
  },
  temperature: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 