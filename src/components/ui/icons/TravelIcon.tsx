import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface TravelIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function TravelIcon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: TravelIconProps) {
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
                  d="M6 13.5L6 14.5C6 16.157 7.343 17.5 9 17.5L15 17.5C16.657 17.5 18 16.157 18 14.5L18 13.5C18 13.224 17.776 13 17.5 13L6.5 13C6.224 13 6 13.224 6 13.5Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M9 7L15 7"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M8 9L16 9"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M4 17.5H20"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M7 4.99999L17 5C18.1046 5 19 5.89543 19 7V11.5C19 12.0523 18.5523 12.5 18 12.5H6C5.44772 12.5 5 12.0523 5 11.5V7C5 5.89543 5.89543 4.99999 7 4.99999Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
              </Svg>
            );
          
          case 'duotone':
            return (
              <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M7 4.99999L17 5C18.1046 5 19 5.89543 19 7V11.5C19 12.0523 18.5523 12.5 18 12.5H6C5.44772 12.5 5 12.0523 5 11.5V7C5 5.89543 5.89543 4.99999 7 4.99999Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M6 13.5L6 14.5C6 16.157 7.343 17.5 9 17.5L15 17.5C16.657 17.5 18 16.157 18 14.5L18 13.5C18 13.224 17.776 13 17.5 13L6.5 13C6.224 13 6 13.224 6 13.5Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M9 7L15 7"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M8 9L16 9"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M4 17.5H20"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M7 4.99999L17 5C18.1046 5 19 5.89543 19 7V11.5C19 12.0523 18.5523 12.5 18 12.5H6C5.44772 12.5 5 12.0523 5 11.5V7C5 5.89543 5.89543 4.99999 7 4.99999Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
              </Svg>
            );
          
          case 'filled':
            return (
              <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M5.5 7C5.5 6.17157 6.17157 5.5 7 5.5H17C17.8284 5.5 18.5 6.17157 18.5 7V11.5C18.5 11.7761 18.2761 12 18 12H6C5.72386 12 5.5 11.7761 5.5 11.5V7Z"
                  fill={primaryColor}
                />
                <Path
                  d="M5.5 14.5C5.5 16.433 7.067 18 9 18H15C16.933 18 18.5 16.433 18.5 14.5V13C18.5 12.4477 18.0523 12 17.5 12H6.5C5.94772 12 5.5 12.4477 5.5 13V14.5Z"
                  fill={primaryColor}
                />
                <Path
                  d="M4 18C4 17.7239 4.22386 17.5 4.5 17.5H19.5C19.7761 17.5 20 17.7239 20 18C20 18.2761 19.7761 18.5 19.5 18.5H4.5C4.22386 18.5 4 18.2761 4 18Z"
                  fill={primaryColor}
                />
                <Path
                  d="M15 7C15 6.72386 14.7761 6.5 14.5 6.5H9.5C9.22386 6.5 9 6.72386 9 7C9 7.27614 9.22386 7.5 9.5 7.5H14.5C14.7761 7.5 15 7.27614 15 7Z"
                  fill={primaryColor}
                />
                <Path
                  d="M16 9C16 8.72386 15.7761 8.5 15.5 8.5H8.5C8.22386 8.5 8 8.72386 8 9C8 9.27614 8.22386 9.5 8.5 9.5H15.5C15.7761 9.5 16 9.27614 16 9Z"
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

export default TravelIcon; 