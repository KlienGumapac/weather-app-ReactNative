import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '../../stores/weatherStore';
import { COLORS, SPACING } from '../../constants';
import { Text } from './Text';

interface BottomNavigationProps {
  currentScreen: 'home' | 'settings';
  onScreenChange: (screen: 'home' | 'settings') => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentScreen,
  onScreenChange,
}) => {
  const { theme } = useWeatherStore();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: COLORS[theme].card,
          borderTopColor: COLORS[theme].border,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onScreenChange('home')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={currentScreen === 'home' ? 'home' : 'home-outline'}
          size={24}
          color={currentScreen === 'home' ? COLORS[theme].primary : COLORS[theme].textSecondary}
        />
        <Text
          variant="caption"
          color={currentScreen === 'home' ? 'primary' : 'textSecondary'}
          align="center"
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => onScreenChange('settings')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={currentScreen === 'settings' ? 'settings' : 'settings-outline'}
          size={24}
          color={currentScreen === 'settings' ? COLORS[theme].primary : COLORS[theme].textSecondary}
        />
        <Text
          variant="caption"
          color={currentScreen === 'settings' ? 'primary' : 'textSecondary'}
          align="center"
        >
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingBottom: 20,
    paddingTop: SPACING.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
}); 
 