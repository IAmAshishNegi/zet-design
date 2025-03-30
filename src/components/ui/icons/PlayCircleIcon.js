import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { COLORS } from '../../../app/designSystem';

function PlayCircleIcon({ size = 24, color = 'primary.P200', className }) {
  // Handle color from design system
  const getColor = () => {
    if (typeof color === 'string' && color.includes('.')) {
      const [colorType, shade] = color.split('.');
      return COLORS[colorType]?.[shade] || COLORS.primary.P200;
    }
    return color;
  };

  return (
    <View className={className}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" stroke={getColor()} strokeWidth="1.5" />
        <Path 
          d="M15.5 11.134a1 1 0 0 1 0 1.732l-5 2.887a1 1 0 0 1-1.5-.866V9.113a1 1 0 0 1 1.5-.866l5 2.887z" 
          fill={getColor()} 
        />
      </Svg>
    </View>
  );
}

export default PlayCircleIcon; 