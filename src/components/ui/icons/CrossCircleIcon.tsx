import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface CrossCircleIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function CrossCircleIcon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: CrossCircleIconProps) {
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
                  d="M14.9994 15L9 9M9.00064 15L15 9"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
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
                  d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M14.9994 15L9 9M9.00064 15L15 9"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
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
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 1.66113C6.29 1.66113 1.66113 6.29 1.66113 12C1.66113 17.71 6.29 22.3389 12 22.3389C17.71 22.3389 22.3389 17.71 22.3389 12C22.3389 6.29 17.71 1.66113 12 1.66113ZM8.7226 8.72256C9.00978 8.43541 9.47536 8.43543 9.76251 8.72261L12 10.9603L14.2375 8.72261C14.5246 8.43543 14.9902 8.43541 15.2774 8.72255C15.5646 9.0097 15.5646 9.47528 15.2774 9.76246L13.0399 12.0003L15.2769 14.2375C15.564 14.5247 15.564 14.9903 15.2768 15.2775C14.9897 15.5646 14.5241 15.5646 14.2369 15.2774L12 13.0402L9.7631 15.2774C9.47595 15.5646 9.01037 15.5646 8.72319 15.2775C8.43601 14.9903 8.43599 14.5247 8.72313 14.2375L10.9602 12.0003L8.72255 9.76246C8.4354 9.47529 8.43542 9.0097 8.7226 8.72256Z"
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

export default CrossCircleIcon; 