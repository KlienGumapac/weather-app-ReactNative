import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useWeatherStore } from '../../stores/weatherStore';
import { COLORS, FONT_SIZES } from '../../constants';

interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold' | '600';
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color,
  align = 'left',
  weight = 'normal',
  style,
  ...props
}) => {
  const { theme } = useWeatherStore();
  
  const textStyle = [
    styles.text,
    {
      color: color || COLORS[theme].text,
      fontSize: getFontSize(variant),
      fontWeight: weight,
      textAlign: align,
    },
    style,
  ];

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};

const getFontSize = (variant: TextProps['variant']) => {
  switch (variant) {
    case 'h1':
      return FONT_SIZES.xxxl;
    case 'h2':
      return FONT_SIZES.xxl;
    case 'h3':
      return FONT_SIZES.xl;
    case 'body':
      return FONT_SIZES.md;
    case 'caption':
      return FONT_SIZES.sm;
    case 'label':
      return FONT_SIZES.xs;
    default:
      return FONT_SIZES.md;
  }
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'System',
  },
}); 