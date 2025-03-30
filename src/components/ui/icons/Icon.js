import React from 'react';
import { View } from 'react-native';
import { getColor } from '../../../app/styleUtils';

/**
 * Base Icon component with common props and functionality
 * 
 * @param {Object} props - Component props
 * @param {string} props.color - Primary icon color (from theme or direct hex)
 * @param {string} props.secondaryColor - Secondary color for duotone icons
 * @param {number} props.size - Icon size (width and height)
 * @param {number} props.width - Custom width (overrides size)
 * @param {number} props.height - Custom height (overrides size)
 * @param {number} props.strokeWidth - Width of stroke for outlined icons
 * @param {string} props.variant - Icon variant (stroke, duotone, filled)
 * @param {Object} props.style - Additional styles for the icon container
 */
function Icon({
  color = 'neutral.N500',
  secondaryColor = 'neutral.N100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}) {
  // Process colors to handle both direct values and theme references
  const primaryColor = getColor(color) || color;
  const duotoneColor = getColor(secondaryColor) || secondaryColor;
  
  // Determine final dimensions
  const finalWidth = width || size;
  const finalHeight = height || size;
  
  return (
    <View style={[{ width: finalWidth, height: finalHeight }, style]} {...props}>
      {props.children({
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