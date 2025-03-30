import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../../../app/designSystem';

function ArrowIcon({ width = 24, height = 24, color = 'primary.P200', className }) {
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
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
          d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
          stroke={getColor()}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3.5 12H20.33"
          stroke={getColor()}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export default ArrowIcon; 