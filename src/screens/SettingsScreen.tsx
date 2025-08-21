import React from 'react';
import { View, ScrollView, StyleSheet, Switch } from 'react-native';
import { useWeatherStore } from '@/stores/weatherStore';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, COLORS } from '@/constants';

export const SettingsScreen: React.FC = () => {
  const { unit, theme, setUnit, setTheme, favorites, removeFromFavorites } = useWeatherStore();

  const handleUnitToggle = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleRemoveFavorite = (locationId: number) => {
    removeFromFavorites(locationId);
  };

  return (
    <Container>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="h1" weight="bold">
            Settings
          </Text>
        </View>

        <Card>
          <Text variant="h3" weight="bold" style={styles.sectionTitle}>
            Preferences
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="thermometer" size={24} color="#FF9500" />
              <View style={styles.settingText}>
                <Text variant="body" weight="600">
                  Temperature Unit
                </Text>
                <Text variant="caption" color="textSecondary">
                  {unit === 'metric' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
                </Text>
              </View>
            </View>
            <Switch
              value={unit === 'imperial'}
              onValueChange={handleUnitToggle}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={unit === 'imperial' ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon" size={24} color="#5856D6" />
              <View style={styles.settingText}>
                <Text variant="body" weight="600">
                  Dark Theme
                </Text>
                <Text variant="caption" color="textSecondary">
                  {theme === 'dark' ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={handleThemeToggle}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </Card>

        <Card>
          <Text variant="h3" weight="bold" style={styles.sectionTitle}>
            Favorites ({favorites.length})
          </Text>
          
          {favorites.length === 0 ? (
            <View style={styles.emptyFavorites}>
              <Ionicons name="heart-outline" size={48} color="#8E8E93" />
              <Text variant="body" color="textSecondary" align="center" style={styles.emptyText}>
                No favorite locations yet
              </Text>
              <Text variant="caption" color="textSecondary" align="center">
                Add cities to your favorites to access them quickly
              </Text>
            </View>
          ) : (
            favorites.map((location) => (
              <View key={location.id} style={styles.favoriteItem}>
                <View style={styles.favoriteInfo}>
                  <Ionicons name="location" size={20} color="#007AFF" />
                  <Text variant="body" weight="600" style={styles.favoriteText}>
                    {location.name}, {location.country}
                  </Text>
                </View>
                <Button
                  title="Remove"
                  variant="outline"
                  size="small"
                  onPress={() => handleRemoveFavorite(location.id)}
                />
              </View>
            ))
          )}
        </Card>

        <Card>
          <Text variant="h3" weight="bold" style={styles.sectionTitle}>
            About
          </Text>
          
          <View style={styles.aboutItem}>
            <Text variant="body" weight="600">
              Weather App
            </Text>
            <Text variant="caption" color="textSecondary">
              Version 1.0.0
            </Text>
          </View>
          
          <View style={styles.aboutItem}>
            <Text variant="body" weight="600">
              Data Source
            </Text>
            <Text variant="caption" color="textSecondary">
              OpenWeatherMap API
            </Text>
          </View>
        </Card>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  favoriteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  favoriteText: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  emptyFavorites: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyText: {
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  aboutItem: {
    paddingVertical: SPACING.sm,
  },
}); 