import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '@/stores/weatherStore';
import { COLORS, SPACING } from '@/constants';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onClose: () => void;
}

const menuItems = [
  { id: 'weather', icon: 'partly-sunny', label: 'Weather' },
  { id: 'settings', icon: 'settings', label: 'Settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onClose }) => {
  const { theme } = useWeatherStore();

  return (
    <View style={[styles.sidebar, { backgroundColor: COLORS[theme].surface }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: COLORS[theme].text }]}>Weather App</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={COLORS[theme].text} />
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              activeTab === item.id && {
                backgroundColor: COLORS[theme].primary + '20',
                borderLeftWidth: 4,
                borderLeftColor: COLORS[theme].primary,
              },
            ]}
            onPress={() => {
              onTabChange(item.id);
              onClose();
            }}
          >
            <Ionicons
              name={item.icon as any}
              size={24}
              color={activeTab === item.id ? COLORS[theme].primary : COLORS[theme].textSecondary}
            />
            <Text
              style={[
                styles.menuLabel,
                {
                  color: activeTab === item.id ? COLORS[theme].primary : COLORS[theme].text,
                },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.version, { color: COLORS[theme].textSecondary }]}>
          Version 1.0.0
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: SPACING.xs,
  },
  menuContainer: {
    flex: 1,
    paddingTop: SPACING.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: 12,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: SPACING.md,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  version: {
    fontSize: 12,
    textAlign: 'center',
  },
}); 