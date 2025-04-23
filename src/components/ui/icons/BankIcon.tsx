import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface BankIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function BankIcon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: BankIconProps) {
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
                  d="M2 8.57C2 7.37 2.48 6.64 3.48 6.09L7.59 3.8C9.74 2.6 10.82 2 12 2C13.18 2 14.26 2.6 16.41 3.8L20.52 6.09C21.52 6.65 22 7.38 22 8.57C22 8.89 22 9.06 21.96 9.19C21.77 9.89 21.14 10 20.53 10H3.47C2.86 10 2.22 9.89 2.04 9.19C2 9.06 2 8.89 2 8.57Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M11.5149 6.79714C11.5149 7.19448 11.837 7.51662 12.2344 7.51662C12.6317 7.51662 12.9538 7.19448 12.9538 6.79714C12.9538 6.3998 12.6317 6.07767 12.2344 6.07767C11.837 6.07767 11.5149 6.3998 11.5149 6.79714Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M4 10V18.5M8 10V18.5"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M16 10V18.5M20 10V18.5"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M19 18.5H5C3.34 18.5 2 19.84 2 21.5C2 21.78 2.22 22 2.5 22H21.5C21.78 22 22 21.78 22 21.5C22 19.84 20.66 18.5 19 18.5Z"
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
                  d="M3.92014 9.74007H8.17656V18.6076H3.92014V9.74007Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M15.6898 9.74007H19.9462V18.6076H15.6898V9.74007Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M2 8.57C2 7.37 2.48 6.64 3.48 6.09L7.59 3.8C9.74 2.6 10.82 2 12 2C13.18 2 14.26 2.6 16.41 3.8L20.52 6.09C21.52 6.65 22 7.38 22 8.57C22 8.89 22 9.06 21.96 9.19C21.77 9.89 21.14 10 20.53 10H3.47C2.86 10 2.22 9.89 2.04 9.19C2 9.06 2 8.89 2 8.57Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M2 8.57C2 7.37 2.48 6.64 3.48 6.09L7.59 3.8C9.74 2.6 10.82 2 12 2C13.18 2 14.26 2.6 16.41 3.8L20.52 6.09C21.52 6.65 22 7.38 22 8.57C22 8.89 22 9.06 21.96 9.19C21.77 9.89 21.14 10 20.53 10H3.47C2.86 10 2.22 9.89 2.04 9.19C2 9.06 2 8.89 2 8.57Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M11.5149 6.79714C11.5149 7.19448 11.837 7.51662 12.2344 7.51662C12.6317 7.51662 12.9538 7.19448 12.9538 6.79714C12.9538 6.3998 12.6317 6.07767 12.2344 6.07767C11.837 6.07767 11.5149 6.3998 11.5149 6.79714Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M4 10V18.5M8 10V18.5"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M16 10V18.5M20 10V18.5"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M19 18.5H5C3.34 18.5 2 19.84 2 21.5C2 21.78 2.22 22 2.5 22H21.5C21.78 22 22 21.78 22 21.5C22 19.84 20.66 18.5 19 18.5Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M19 18.5H5C3.34 18.5 2 19.84 2 21.5C2 21.78 2.22 22 2.5 22H21.5C21.78 22 22 21.78 22 21.5C22 19.84 20.66 18.5 19 18.5Z"
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
                  d="M20.7435 6.34175L16.5253 3.99294C14.3107 2.76581 13.2082 2.15224 12.0002 2.15224C10.7922 2.15224 9.68016 2.76581 7.47516 3.99294L3.25689 6.34175C2.23109 6.90738 1.73257 7.66475 1.73257 8.89188C1.73257 9.22743 1.73257 9.3904 1.77091 9.52462C1.96265 10.2436 2.61457 10.3587 3.24731 10.3587H20.7627C21.3954 10.3587 22.0473 10.2436 22.2391 9.52462C22.2774 9.3904 22.2774 9.21784 22.2774 8.89188C22.2774 7.66475 21.7789 6.90738 20.7531 6.34175H20.7435ZM12.0002 8.17286C11.4729 8.17286 11.0415 7.74145 11.0415 7.21416C11.0415 6.68688 11.4633 6.25547 12.0002 6.25547C12.5275 6.25547 12.9589 6.68688 12.9589 7.21416C12.9589 7.74145 12.5275 8.17286 12.0002 8.17286Z"
                  fill={primaryColor}
                />
                <Path
                  d="M19.085 18.1241H4.91544C3.23772 18.1241 1.87637 19.6964 1.87637 21.633C1.87637 21.9589 2.10646 22.2178 2.38448 22.2178H21.6255C21.9035 22.2178 22.1336 21.9589 22.1336 21.633C22.1336 19.6964 20.7723 18.1241 19.0946 18.1241H19.085Z"
                  fill={primaryColor}
                />
                <Path
                  d="M19.085 17.5393C19.4589 17.5393 19.8136 17.6256 20.1491 17.7694V11.0394H16.113V17.5393H19.085Z"
                  fill={primaryColor}
                />
                <Path
                  d="M4.91544 17.5393H7.8874V11.0394H3.8417V17.7694C4.17724 17.6256 4.53196 17.5393 4.90585 17.5393H4.91544Z"
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

export default BankIcon; 