import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useWeatherStore } from '../../stores/weatherStore';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof SPACING;
  margin?: keyof typeof SPACING;
  borderRadius?: keyof typeof BORDER_RADIUS;
  elevation?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'md',
  margin = 'sm',
  borderRadius = 'lg',
  elevation = 2,
}) => {
  const { theme } = useWeatherStore();
  
  const cardStyle = [
    styles.card,
    {
      backgroundColor: COLORS[theme].card,
      borderColor: COLORS[theme].border,
      padding: SPACING[padding],
      marginVertical: SPACING[margin],
      borderRadius: BORDER_RADIUS[borderRadius],
      shadowColor: COLORS[theme].shadow,
      shadowOffset: {
        width: 0,
        height: elevation,
      },
      shadowOpacity: 0.25,
      shadowRadius: elevation * 2,
      elevation,
    },
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
}); 