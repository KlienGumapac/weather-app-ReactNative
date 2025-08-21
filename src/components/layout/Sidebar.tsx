import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '@/stores/weatherStore';
import { COLORS, SPACING } from '@/constants';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'weather', icon: 'partly-sunny', label: 'Weather' },
  { id: 'cities', icon: 'list', label: 'Cities' },
  { id: 'map', icon: 'location', label: 'Map' },
  { id: 'settings', icon: 'settings', label: 'Settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { theme } = useWeatherStore();

  return (
    <View style={[styles.sidebar, { backgroundColor: COLORS[theme].surface }]}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.menuItem,
            activeSection === item.id && {
              backgroundColor: COLORS[theme].primary,
            },
          ]}
          onPress={() => onSectionChange(item.id)}
        >
          <Ionicons
            name={item.icon as any}
            size={24}
            color={activeSection === item.id ? '#fff' : COLORS[theme].textSecondary}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 80,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItem: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
}); 