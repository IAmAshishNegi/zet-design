import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';

/**
 * HomeIcon component with three variants: stroke, duotone, and filled
 * 
 * @param {Object} props - Component props
 * @param {string} props.color - Primary icon color (from theme or direct hex)
 * @param {string} props.secondaryColor - Secondary color for duotone variant
 * @param {number} props.size - Icon size (width and height)
 * @param {number} props.width - Custom width (overrides size)
 * @param {number} props.height - Custom height (overrides size)
 * @param {number} props.strokeWidth - Width of stroke for outlined variant
 * @param {string} props.variant - Icon variant: 'stroke', 'duotone', or 'filled'
 * @param {Object} props.style - Additional styles for the icon container
 */
function ChevronRightIcon({
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
  return (
    <Icon
      color={color}
      secondaryColor={secondaryColor}
      size={size}
      width={width}
      height={height}
      strokeWidth={strokeWidth}
      variant={variant}
      style={style}
      {...props}
    >
      {({ primaryColor, duotoneColor, strokeWidth, variant, width, height }) => {
        switch (variant) {
          case 'stroke':
            return (
              <Svg
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
              >
                <Path
                  d="M9 18C9 18 15 13.5811 15 12C15 10.4188 9 6 9 6"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            );
          
          case 'duotone':
            return (
              <Svg
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
              >
                 <Path
                  d="M9 18C9 18 15 13.5811 15 12C15 10.4188 9 6 9 6"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            );
          
          case 'filled':
            return (
              <Svg 
                width={width} 
                height={height} 
                viewBox="0 0 24 24" 
                fill="none"
              >
               
               <Path
                  d="M9 18C9 18 15 13.5811 15 12C15 10.4188 9 6 9 6"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            );
            
          default:
            return null;
        }
      }}
    </Icon>
  );
}

export default ChevronRightIcon; 