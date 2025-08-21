import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWeatherStore } from '../../stores/weatherStore';
import { COLORS, SPACING } from '../../constants';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof SPACING;
  backgroundColor?: string;
  safeArea?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  padding = 'md',
  backgroundColor,
  safeArea = true,
}) => {
  const { theme } = useWeatherStore();
  const insets = useSafeAreaInsets();
  
  const containerStyle = [
    styles.container,
    {
      backgroundColor: backgroundColor || COLORS[theme].background,
      paddingHorizontal: SPACING[padding],
      ...(safeArea && {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }),
    },
    style,
  ];

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 