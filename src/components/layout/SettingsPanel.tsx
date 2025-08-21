import React from 'react';
import { View, ScrollView, StyleSheet, Switch, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '@/stores/weatherStore';
import { COLORS, SPACING } from '@/constants';

export const SettingsPanel: React.FC = () => {
  const { unit, theme, setUnit, setTheme, favorites, removeFromFavorites } = useWeatherStore();

  const handleUnitToggle = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS[theme].background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: COLORS[theme].text }]}>Settings</Text>
        </View>

        <View style={[styles.section, { backgroundColor: COLORS[theme].surface }]}>
          <Text style={[styles.sectionTitle, { color: COLORS[theme].text }]}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="thermometer" size={24} color="#FF9500" />
              <View style={styles.settingText}>
                <Text style={[styles.settingLabel, { color: COLORS[theme].text }]}>
                  Temperature Unit
                </Text>
                <Text style={[styles.settingDescription, { color: COLORS[theme].textSecondary }]}>
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
                <Text style={[styles.settingLabel, { color: COLORS[theme].text }]}>
                  Dark Theme
                </Text>
                <Text style={[styles.settingDescription, { color: COLORS[theme].textSecondary }]}>
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
        </View>

        <View style={[styles.section, { backgroundColor: COLORS[theme].surface }]}>
          <Text style={[styles.sectionTitle, { color: COLORS[theme].text }]}>
            Favorites ({favorites.length})
          </Text>
          
          {favorites.length === 0 ? (
            <View style={styles.emptyFavorites}>
              <Ionicons name="heart-outline" size={48} color="#8E8E93" />
              <Text style={[styles.emptyText, { color: COLORS[theme].textSecondary }]}>
                No favorite locations yet
              </Text>
            </View>
          ) : (
            favorites.map((location) => (
              <View key={location.id} style={styles.favoriteItem}>
                <View style={styles.favoriteInfo}>
                  <Ionicons name="location" size={20} color="#007AFF" />
                  <Text style={[styles.favoriteText, { color: COLORS[theme].text }]}>
                    {location.name}, {location.country}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
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
    padding: SPACING.lg,
    borderRadius: 16,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
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
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 14,
    marginTop: 2,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  favoriteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  favoriteText: {
    fontSize: 16,
    marginLeft: SPACING.sm,
  },
  emptyFavorites: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyText: {
    fontSize: 16,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
}); 