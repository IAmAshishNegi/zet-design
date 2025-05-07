import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface GroceriesIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function GroceriesIcon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: GroceriesIconProps) {
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
              <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M4 9H20L19.7129 13.2084C19.4477 17.1272 16.1841 20.1703 12.254 20.1297C8.33193 20.089 5.11736 17.0169 4.88097 13.1264L4 9Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
              </Svg>
            );
          
          case 'duotone':
            return (
              <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
                <Path
                  opacity="0.2"
                  d="M4 9H20L19.7129 13.2084C19.4477 17.1272 16.1841 20.1703 12.254 20.1297C8.33193 20.089 5.11736 17.0169 4.88097 13.1264L4 9Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M4 9H20L19.7129 13.2084C19.4477 17.1272 16.1841 20.1703 12.254 20.1297C8.33193 20.089 5.11736 17.0169 4.88097 13.1264L4 9Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
              </Svg>
            );
          
          case 'filled':
            return (
              <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M8.75 7C8.75 5.20507 10.2051 3.75 12 3.75C13.7949 3.75 15.25 5.20507 15.25 7V8.25H16.75V7C16.75 4.37665 14.6234 2.25 12 2.25C9.37665 2.25 7.25 4.37665 7.25 7V8.25H8.75V7Z"
                  fill={primaryColor}
                />
                <Path
                  d="M3.38697 8.26242C3.27494 8.25421 3.17515 8.33154 3.1506 8.44107L2.26963 12.5675C1.98257 14.0402 2.19124 15.5754 2.86124 16.9113C3.53124 18.2471 4.62223 19.3001 5.97553 19.9216C7.32882 20.5431 8.87033 20.7007 10.3518 20.3712C11.8334 20.0418 13.1747 19.2432 14.1598 18.0985C14.3657 17.8518 14.741 17.8177 14.9877 18.0235C15.2344 18.2294 15.2685 18.6047 15.0626 18.8514C13.9193 20.1731 12.352 21.086 10.6209 21.4632C8.88985 21.8405 7.09034 21.6606 5.49481 20.9472C3.89928 20.2339 2.59347 19.0252 1.78128 17.4976C0.969089 15.97 0.69691 14.2069 1.00493 12.4997L1.84947 8.56149C1.92766 8.12337 2.32682 7.81883 2.76494 7.89702L20.235 10.603C20.6731 10.6812 20.9777 11.0804 20.8995 11.5185L20.1866 15.1244C20.108 15.5622 20.4119 15.9619 20.8497 16.0405C21.2876 16.1191 21.6872 15.8152 21.7658 15.3774L22.4787 11.7715C22.7135 10.458 21.7999 9.16158 20.4864 8.92681L3.38697 8.26242Z"
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

export default GroceriesIcon; 