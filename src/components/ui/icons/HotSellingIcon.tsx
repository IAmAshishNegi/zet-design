import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface HotSellingIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function HotSellingIcon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: HotSellingIconProps) {
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
                  d="M12 9.5C10.5 9.5, 9.5 10, 8.5 13.5C8.66667 12.6667, 9.1 11, 10.5 11C12.5 11, 11 13, 13 13C15 13, 15.5 11, 16.5 9C15.3333 10.1667, 14 9.5, 12 9.5Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M12 19.5C10.5 19.5, 9.5 20, 8.5 23.5C8.66667 22.6667, 9.1 21, 10.5 21C12.5 21, 11 23, 13 23C15 23, 15.5 21, 16.5 19C15.3333 20.1667, 14 19.5, 12 19.5Z"
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
                  d="M12 9.5C10.5 9.5, 9.5 10, 8.5 13.5C8.66667 12.6667, 9.1 11, 10.5 11C12.5 11, 11 13, 13 13C15 13, 15.5 11, 16.5 9C15.3333 10.1667, 14 9.5, 12 9.5Z"
                  fill={duotoneColor}
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M12 19.5C10.5 19.5, 9.5 20, 8.5 23.5C8.66667 22.6667, 9.1 21, 10.5 21C12.5 21, 11 23, 13 23C15 23, 15.5 21, 16.5 19C15.3333 20.1667, 14 19.5, 12 19.5Z"
                  fill={duotoneColor}
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
                  d="M13.4763 5.25C13.2644 4.91594 12.8958 4.7 12.5 4.7C11.6716 4.7 11 5.37157 11 6.2V7.7C11 8.14183 11.3582 8.5 11.8 8.5C12.2418 8.5 12.6 8.14183 12.6 7.7V6.2C12.6 6.14477 12.6448 6.1 12.7 6.1C12.7552 6.1 12.8 6.14477 12.8 6.2V10.3C12.8 10.7418 13.1582 11.1 13.6 11.1C14.0418 11.1 14.4 10.7418 14.4 10.3V6.2C14.4 6.14477 14.4448 6.1 14.5 6.1C14.5552 6.1 14.6 6.14477 14.6 6.2V8.9C14.6 9.34183 14.9582 9.7 15.4 9.7C15.8418 9.7 16.2 9.34183 16.2 8.9V6.2C16.2 5.37157 15.5284 4.7 14.7 4.7C14.2802 4.7 13.903 4.32548 13.4763 5.25Z"
                  fill={primaryColor}
                />
                <Path
                  d="M10.1 9.5C9.32157 9.5 8.7 10.1216 8.7 11V12.5C8.7 12.8958 8.91594 13.2644 9.25 13.4763C8.32548 13.903 8.7 14.2802 8.7 14.7C8.7 15.5284 9.37157 16.2 10.2 16.2V17.8C10.2 18.2418 10.5582 18.6 11 18.6C11.4418 18.6 11.8 18.2418 11.8 17.8V13.7C11.8 13.2582 11.4418 12.9 11 12.9C10.5582 12.9 10.2 13.2582 10.2 13.7V15.1C10.2 15.1552 10.1552 15.2 10.1 15.2C10.0448 15.2 10 15.1552 10 15.1V11C10 10.9448 10.0448 10.9 10.1 10.9C10.1552 10.9 10.2 10.9448 10.2 11V12.5C10.2 12.9418 10.5582 13.3 11 13.3C11.4418 13.3 11.8 12.9418 11.8 12.5V11C11.8 10.1216 11.1784 9.5 10.4 9.5H10.1Z"
                  fill={primaryColor}
                />
                <Path
                  d="M9 19.2C8.33726 19.2 7.8 19.7373 7.8 20.4V20.5C7.8 20.7761 7.97909 21.0 8.2 21.25C7.41421 21.0344 7.7 21.7015 7.7 22.1C7.7 22.8284 8.27157 23.4 9 23.4H10.1C10.4866 23.4 10.8 23.0866 10.8 22.7C10.8 22.3134 10.4866 22 10.1 22H9.7V19.9C9.7 19.8448 9.75523 19.8 9.85 19.8C9.9 19.8 9.9 19.8448 9.9 19.9V21.6C9.9 21.9866 10.2134 22.3 10.6 22.3C10.9866 22.3 11.3 21.9866 11.3 21.6V20.4C11.3 19.7373 10.7627 19.2 10.1 19.2H9Z"
                  fill={primaryColor}
                />
                <Path
                  d="M15.5 19.2C14.8373 19.2 14.3 19.7373 14.3 20.4V21.6C14.3 21.9866 14.6134 22.3 15 22.3C15.3866 22.3 15.7 21.9866 15.7 21.6V19.9C15.7 19.8448 15.7552 19.8 15.8 19.8C15.8448 19.8 15.9 19.8448 15.9 19.9V22C15.9 22.3866 16.2134 22.7 16.6 22.7C16.9866 22.7 17.3 22.3866 17.3 22V20.4C17.3 19.7373 16.7627 19.2 16.1 19.2H15.5Z"
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

export default HotSellingIcon; 