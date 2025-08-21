import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useWeatherStore } from '@/stores/weatherStore';
import { Sidebar } from '@/components/layout/Sidebar';
import { WeatherPanel } from '@/components/layout/WeatherPanel';
import { SearchPanel } from '@/components/layout/SearchPanel';
import { SettingsPanel } from '@/components/layout/SettingsPanel';
import { COLORS } from '@/constants';

type ActiveSection = 'weather' | 'cities' | 'map' | 'settings';

export const MainLayout: React.FC = () => {
  const { theme } = useWeatherStore();
  const [activeSection, setActiveSection] = useState<ActiveSection>('weather');

  const renderContent = () => {
    switch (activeSection) {
      case 'weather':
        return <WeatherPanel />;
      case 'cities':
        return <SearchPanel />;
      case 'map':
        return (
          <View style={styles.placeholderContainer}>
            <Text style={[styles.placeholderText, { color: COLORS[theme].text }]}>
              Map View Coming Soon
            </Text>
          </View>
        );
      case 'settings':
        return <SettingsPanel />;
      default:
        return <WeatherPanel />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS[theme].background }]}>
      <Sidebar activeSection={activeSection} onSectionChange={(section: string) => setActiveSection(section as ActiveSection)} />
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
  },
}); 