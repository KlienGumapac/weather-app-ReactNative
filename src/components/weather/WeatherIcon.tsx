import React from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '@/stores/weatherStore';
import { COLORS } from '@/constants';
import { getWeatherIcon } from '@/utils/weather';

interface WeatherIconProps {
  iconCode: string;
  size?: number;
  style?: ImageStyle;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  iconCode,
  size = 50,
  style,
}) => {
  const { theme } = useWeatherStore();
  
  const iconStyle = [
    styles.icon,
    {
      width: size,
      height: size,
    },
    style,
  ];

  return (
    <Image
      source={{ uri: getWeatherIcon(iconCode) }}
      style={iconStyle}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    tintColor: undefined,
  },
}); 