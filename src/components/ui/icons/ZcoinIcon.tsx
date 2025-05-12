import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface ZcoinIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function ZcoinIcon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: ZcoinIconProps) {
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
                <circle
                  cx="12"
                  cy="11.9587"
                  r="10.381"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <path
                  d="M9.11264 8.70016H14.8874L9.11264 15.2998H14.8874"
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
                <Circle cx="12" cy="11.9587" r="11.131" fill={duotoneColor} />
                <Circle
                  cx="12"
                  cy="11.9587"
                  r="10.381"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M9.11264 8.70016H14.8874L9.11264 15.2998H14.8874"
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
                  d="M12 0.828125C18.1475 0.82813 23.1309 5.81149 23.1309 11.959C23.1307 18.1064 18.1474 23.0898 12 23.0898C5.85259 23.0898 0.869294 18.1064 0.869141 11.959C0.869141 5.81148 5.8525 0.828125 12 0.828125ZM9.1123 7.9502C8.69825 7.95038 8.3623 8.28609 8.3623 8.7002C8.36232 9.11428 8.69826 9.45001 9.1123 9.4502H13.2334L8.54785 14.8057C8.35427 15.027 8.30829 15.3415 8.42969 15.6094C8.55124 15.8773 8.81815 16.0497 9.1123 16.0498H14.8867L14.9639 16.0459C15.342 16.0074 15.6367 15.6881 15.6367 15.2998C15.6367 14.9116 15.342 14.5922 14.9639 14.5537L14.8867 14.5498H10.7656L15.4512 9.19434C15.6449 8.97298 15.6917 8.65852 15.5703 8.39062C15.4487 8.1227 15.181 7.9502 14.8867 7.9502H9.1123Z"
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

export default ZcoinIcon; 