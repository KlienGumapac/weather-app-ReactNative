import React from 'react';
import { View, ScrollView, StyleSheet, Switch, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '@/stores/weatherStore';
import { COLORS, SPACING } from '@/constants';

interface SettingsContentProps {
  onMenuPress: () => void;
}

export const SettingsContent: React.FC<SettingsContentProps> = ({ onMenuPress }) => {
  const { unit, theme, setUnit, setTheme, favorites, removeFromFavorites } = useWeatherStore();

  const handleUnitToggle = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS[theme].background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={COLORS[theme].text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS[theme].text }]}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
                <TouchableOpacity
                  onPress={() => removeFromFavorites(location.id)}
                  style={styles.removeButton}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <View style={[styles.section, { backgroundColor: COLORS[theme].surface }]}>
          <Text style={[styles.sectionTitle, { color: COLORS[theme].text }]}>About</Text>
          
          <View style={styles.aboutItem}>
            <Text style={[styles.aboutLabel, { color: COLORS[theme].text }]}>
              Weather App
            </Text>
            <Text style={[styles.aboutValue, { color: COLORS[theme].textSecondary }]}>
              Version 1.0.0
            </Text>
          </View>
          
          <View style={styles.aboutItem}>
            <Text style={[styles.aboutLabel, { color: COLORS[theme].text }]}>
              Data Source
            </Text>
            <Text style={[styles.aboutValue, { color: COLORS[theme].textSecondary }]}>
              OpenWeatherMap API
            </Text>
          </View>
        </View>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  section: {
    padding: SPACING.lg,
    borderRadius: 20,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
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
  removeButton: {
    padding: SPACING.xs,
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
  aboutItem: {
    paddingVertical: SPACING.sm,
  },
  aboutLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  aboutValue: {
    fontSize: 14,
    marginTop: 2,
  },
}); 