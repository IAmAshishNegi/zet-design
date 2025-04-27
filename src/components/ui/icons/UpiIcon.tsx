import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

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
 * 
 */

interface UpiIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function UpiIcon({
  color = 'neutral.N500',
  secondaryColor = 'neutral.N100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: UpiIconProps) {
  return (
    <Icon
      color={color}
      secondaryColor={secondaryColor}
      size={size}
      width={width}
      height={height}
      strokeWidth={strokeWidth}
      variant={variant as 'stroke' | 'duotone' | 'filled'}
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
                  d="M9.63732 2.48499L14.4073 12.095L4.36732 21.695L9.63732 2.48499Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M12.6055 8.64475L14.095 2.095L18.875 11.695L8.83501 21.305L10.5289 15.7582"
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
                  d="M12.6055 8.64475L14.095 2.095L18.875 11.695L8.83501 21.305L10.5289 15.7582"
                  fill={duotoneColor}
                />
                <Path
                  d="M9.63732 2.48499L14.4073 12.095L4.36732 21.695L9.63732 2.48499Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M9.63732 2.48499L14.4073 12.095L4.36732 21.695L9.63732 2.48499Z"
                  stroke={duotoneColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M12.6055 8.64475L14.095 2.095L18.875 11.695L8.83501 21.305L10.5289 15.7582"
                  stroke={duotoneColor}
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
                <path
                  d="M19.7314 11.8438L7.44141 23.6074L9.10059 17.8604L3.40723 23.3047L9.50195 1.08789L12.2568 6.63867L13.8711 0.0742188L19.7314 11.8438ZM13.2217 8.58203L15.0186 12.2021L14.7529 12.457L11.1133 15.9365L10.2285 19.001L18.0176 11.5449L14.3184 4.11426L13.2217 8.58203Z"
                  fill={primaryColor}
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

export default UpiIcon; 