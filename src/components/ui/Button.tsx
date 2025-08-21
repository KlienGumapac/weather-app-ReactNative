import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useWeatherStore } from '../../stores/weatherStore';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../../constants';
import { Text } from './Text';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  ...props
}) => {
  const { theme } = useWeatherStore();
  
  const buttonStyle = [
    styles.button,
    {
      backgroundColor: getBackgroundColor(variant, theme),
      borderColor: getBorderColor(variant, theme),
      paddingHorizontal: getPadding(size),
      paddingVertical: getPadding(size),
      borderRadius: BORDER_RADIUS.md,
      opacity: disabled ? 0.6 : 1,
    },
    style,
  ];

  const textColor = getTextColor(variant, theme);

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Text
          variant="body"
          color={textColor}
          weight="600"
          align="center"
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const getBackgroundColor = (variant: ButtonProps['variant'], theme: 'light' | 'dark') => {
  switch (variant) {
    case 'primary':
      return COLORS[theme].primary;
    case 'secondary':
      return COLORS[theme].secondary;
    case 'outline':
      return 'transparent';
    default:
      return COLORS[theme].primary;
  }
};

const getBorderColor = (variant: ButtonProps['variant'], theme: 'light' | 'dark') => {
  switch (variant) {
    case 'outline':
      return COLORS[theme].primary;
    default:
      return 'transparent';
  }
};

const getTextColor = (variant: ButtonProps['variant'], theme: 'light' | 'dark') => {
  switch (variant) {
    case 'outline':
      return COLORS[theme].primary;
    default:
      return '#FFFFFF';
  }
};

const getPadding = (size: ButtonProps['size']) => {
  switch (size) {
    case 'small':
      return SPACING.sm;
    case 'large':
      return SPACING.lg;
    default:
      return SPACING.md;
  }
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 