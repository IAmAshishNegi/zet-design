import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface ShoppingIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function ShoppingIcon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: ShoppingIconProps) {
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
                  d="M16 8H17.1597C18.1999 8 19.0664 8.79732 19.1528 9.83391L19.8195 17.8339C19.9167 19.0153 18.9965 20 17.8127 20H6.18733C5.00354 20 4.08334 19.0153 4.18051 17.8339L4.84718 9.83391C4.93356 8.79732 5.80009 8 6.84027 8H8M16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            );
          
          case 'duotone':
            return (
              <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M19.1528 9.83391L19.8195 17.8339C19.9167 19.0153 18.9965 20 17.8127 20H6.18733C5.00354 20 4.08334 19.0153 4.18051 17.8339L4.84718 9.83391C4.93356 8.79732 5.80009 8 6.84027 8H17.1597C18.1999 8 19.0664 8.79732 19.1528 9.83391Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M16 8H17.1597C18.1999 8 19.0664 8.79732 19.1528 9.83391L19.8195 17.8339C19.9167 19.0153 18.9965 20 17.8127 20H6.18733C5.00354 20 4.08334 19.0153 4.18051 17.8339L4.84718 9.83391C4.93356 8.79732 5.80009 8 6.84027 8H8M16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            );
          
          case 'filled':
            return (
              <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M8.75 8C8.75 6.20507 10.2051 4.75 12 4.75C13.7949 4.75 15.25 6.20507 15.25 8C15.25 9.79493 13.7949 11.25 12 11.25C10.2051 11.25 8.75 9.79493 8.75 8Z"
                  fill={primaryColor}
                />
                <Path
                  d="M17.1597 7.25H16.75V8C16.75 10.0711 14.8031 11.75 12.5 11.75H11.5C9.19692 11.75 7.25 10.0711 7.25 8V7.25H6.84027C5.44926 7.25 4.29454 8.32616 4.17672 9.71303L3.51006 17.713C3.37479 19.3156 4.61238 20.75 6.18733 20.75H17.8127C19.3876 20.75 20.6252 19.3156 20.4899 17.713L19.8233 9.71303C19.7055 8.32616 18.5507 7.25 17.1597 7.25Z"
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

export default ShoppingIcon; 