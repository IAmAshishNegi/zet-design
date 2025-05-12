import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface InfoIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

/**
 * InfoIcon component with three variants: stroke, duotone, and filled
 */
function InfoIcon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: InfoIconProps) {
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
                  d="M12 16.5V14.5"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M4.26779 18.8447C4.49267 20.515 5.87611 21.8235 7.55964 21.9009C8.97625 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97625 9.03397 7.55964 9.09909C5.87611 9.17649 4.49267 10.485 4.26779 12.1553C4.12103 13.2453 3.99998 14.3624 3.99998 15.5C3.99998 16.6376 4.12103 17.7547 4.26779 18.8447Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9"
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
                  d="M4.26779 18.8447C4.49267 20.515 5.87611 21.8235 7.55964 21.9009C8.97625 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97625 9.03397 7.55964 9.09909C5.87611 9.17649 4.49267 10.485 4.26779 12.1553C4.12103 13.2453 3.99998 14.3624 3.99998 15.5C3.99998 16.6376 4.12103 17.7547 4.26779 18.8447Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M12 16.5V14.5"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path 
                  d="M4.26779 18.8447C4.49267 20.515 5.87611 21.8235 7.55964 21.9009C8.97625 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97625 9.03397 7.55964 9.09909C5.87611 9.17649 4.49267 10.485 4.26779 12.1553C4.12103 13.2453 3.99998 14.3624 3.99998 15.5C3.99998 16.6376 4.12103 17.7547 4.26779 18.8447Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9"
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
                  d="M12 1.09961C14.9824 1.09961 17.4004 3.51767 17.4004 6.5V8.5C18.9574 8.93429 20.1549 10.2485 20.4463 11.8672L20.4756 12.0557L20.5811 12.8906C20.6791 13.7357 20.75 14.6089 20.75 15.5C20.75 16.3911 20.6791 17.2643 20.5811 18.1094L20.4756 18.9443C20.2125 20.8982 18.6362 22.4551 16.667 22.6367L16.4746 22.6504C15.0463 22.716 13.5958 22.75 12 22.75C10.8031 22.75 9.68793 22.7307 8.60254 22.6934L7.52539 22.6504C5.5317 22.5587 3.90063 21.0601 3.55371 19.1328L3.52441 18.9443C3.37629 17.8441 3.25 16.688 3.25 15.5C3.25 14.312 3.37629 13.1559 3.52441 12.0557L3.55371 11.8672C3.84509 10.2484 5.04244 8.93233 6.59961 8.49805V6.5C6.59961 3.51766 9.01766 1.09961 12 1.09961ZM12 13.7002C11.5582 13.7002 11.2002 14.0582 11.2002 14.5V16.5C11.2002 16.9418 11.5582 17.2998 12 17.2998C12.4418 17.2998 12.7998 16.9418 12.7998 16.5V14.5C12.7998 14.0582 12.4418 13.7002 12 13.7002ZM12 2.90039C10.0118 2.90039 8.40039 4.51178 8.40039 6.5V8.31445L8.60254 8.30664C9.68793 8.26931 10.8031 8.25 12 8.25C13.2713 8.25 14.4504 8.27249 15.5996 8.31445V6.5C15.5996 4.51177 13.9882 2.90039 12 2.90039Z"
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

export default InfoIcon; 