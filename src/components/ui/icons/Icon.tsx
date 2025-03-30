import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { colors } from '../../../styles/theme';

interface IconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
  children: (props: {
    primaryColor: string;
    duotoneColor: string;
    strokeWidth: number;
    variant: string;
    width: number;
    height: number;
  }) => ReactNode;
}

/**
 * Base Icon component with common props and functionality
 */
function Icon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  children,
  ...props
}: IconProps) {
  // Process colors to handle both direct values and theme references
  const getColor = (colorValue: string): string => {
    if (typeof colorValue === 'string' && colorValue.includes('.')) {
      const [colorType, shade] = colorValue.split('.');
      return colors[colorType]?.[shade] || colorValue;
    }
    return colorValue;
  };
  
  const primaryColor = getColor(color);
  const duotoneColor = getColor(secondaryColor);
  
  // Determine final dimensions
  const finalWidth = width || size;
  const finalHeight = height || size;
  
  return (
    <View style={[{ width: finalWidth, height: finalHeight }, style]} {...props}>
      {children({
        primaryColor,
        duotoneColor,
        strokeWidth,
        variant,
        width: finalWidth,
        height: finalHeight,
      })}
    </View>
  );
}

export default Icon; 