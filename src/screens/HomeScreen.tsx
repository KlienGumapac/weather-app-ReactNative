import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useWeatherStore } from '@/stores/weatherStore';
import { Container } from '@/components/ui/Container';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/ui/SearchBar';
import { CurrentWeather } from '@/components/weather/CurrentWeather';
import { Forecast } from '@/components/weather/Forecast';
import { SPACING } from '@/constants';

export const HomeScreen: React.FC = () => {
  const {
    currentWeather,
    forecast,
    currentLocation,
    isLoading,
    error,
    fetchWeather,
    fetchWeatherByCity,
  } = useWeatherStore();

  useEffect(() => {
   
    if (!currentWeather && !currentLocation) {
      fetchWeatherByCity('London');
    }
  }, []);

  const handleSearch = async (query: string) => {
    await fetchWeatherByCity(query);
  };

  const handleRefresh = async () => {
    if (currentLocation) {
      await fetchWeather(currentLocation.lat, currentLocation.lon);
    } else if (currentWeather) {
      await fetchWeatherByCity(currentWeather.name);
    }
  };

  const handleLocationPress = async () => {
  
    console.log('Location services not implemented yet');
  };

  if (error) {
    return (
      <Container>
        <View style={styles.errorContainer}>
          <Text variant="h3" weight="bold" align="center">
            Oops! Something went wrong
          </Text>
          <Text variant="body" color="textSecondary" align="center" style={styles.errorText}>
            {error}
          </Text>
          <Button title="Try Again" onPress={handleRefresh} style={styles.errorButton} />
        </View>
      </Container>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text variant="h1" weight="bold">
              Weather
            </Text>
            <Button
              title="Location"
              variant="outline"
              size="small"
              onPress={handleLocationPress}
            />
          </View>

          <SearchBar onSearch={handleSearch} loading={isLoading} />

          {currentWeather && <CurrentWeather />}
          {forecast && <Forecast />}

          {!currentWeather && !isLoading && (
            <View style={styles.emptyState}>
              <Text variant="h3" weight="bold" align="center">
                Welcome to Weather App
              </Text>
              <Text variant="body" color="textSecondary" align="center" style={styles.emptyText}>
                Search for a city to get started
              </Text>
            </View>
          )}
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  errorText: {
    marginVertical: SPACING.md,
  },
  errorButton: {
    marginTop: SPACING.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xxl,
  },
  emptyText: {
    marginTop: SPACING.md,
  },
}); 