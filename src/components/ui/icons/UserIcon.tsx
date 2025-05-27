import React from 'react';
import { Svg, Path, G } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface UserIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function UserIcon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: UserIconProps) {
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
                  d="M15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M17 18C17 15.2386 14.7614 13 12 13C9.23858 13 7 15.2386 7 18"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M21 13V11C21 7.22876 21 5.34315 19.8284 4.17157C18.6569 3 16.7712 3 13 3H11C7.22876 3 5.34315 3 4.17157 4.17157C3 5.34315 3 7.22876 3 11V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H13C16.7712 21 18.6569 21 19.8284 19.8284C21 18.6569 21 16.7712 21 13Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="square"
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
                  d="M13 3C16.7712 3 18.6566 3.00031 19.8281 4.17188C20.9997 5.34346 21 7.22878 21 11V13C21 16.7712 20.9997 18.6566 19.8281 19.8281C18.6566 20.9997 16.7712 21 13 21H11C7.22878 21 5.34346 20.9997 4.17188 19.8281C3.00031 18.6566 3 16.7712 3 13V11C3 7.22876 3.00031 5.34345 4.17188 4.17188C5.34345 3.00031 7.22876 3 11 3H13ZM12 13C9.23858 13 7 15.3254 7 18.1934L16.9932 17.9258C16.8593 15.182 14.6751 13 12 13ZM12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10Z"
                  stroke={duotoneColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M17 18C17 15.2386 14.7614 13 12 13C9.23858 13 7 15.2386 7 18"
                  stroke={duotoneColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M21 13V11C21 7.22876 21 5.34315 19.8284 4.17157C18.6569 3 16.7712 3 13 3H11C7.22876 3 5.34315 3 4.17157 4.17157C3 5.34315 3 7.22876 3 11V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H13C16.7712 21 18.6569 21 19.8284 19.8284C21 18.6569 21 16.7712 21 13Z"
                  stroke={duotoneColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="square"
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
                  d="M13 2.09961C14.8601 2.09961 16.3456 2.09852 17.5088 2.25488C18.6978 2.41475 19.684 2.75426 20.4648 3.53516L20.6064 3.68359C21.2878 4.43969 21.5952 5.37645 21.7451 6.49121C21.9015 7.65435 21.9004 9.13991 21.9004 11V13C21.9004 14.8601 21.9015 16.3456 21.7451 17.5088C21.5952 18.6235 21.2879 19.5603 20.6064 20.3164L20.4648 20.4648C19.684 21.2457 18.6978 21.5853 17.5088 21.7451C16.3456 21.9015 14.8601 21.9004 13 21.9004H11C9.13991 21.9004 7.65435 21.9015 6.49121 21.7451C5.37645 21.5952 4.43969 21.2878 3.68359 20.6064L3.53516 20.4648C2.75426 19.684 2.41475 18.6978 2.25488 17.5088C2.09852 16.3456 2.09961 14.8601 2.09961 13V11C2.09961 9.13991 2.09852 7.65435 2.25488 6.49121C2.41475 5.30216 2.75428 4.31604 3.53516 3.53516L3.68359 3.39355C4.4397 2.71216 5.37644 2.40476 6.49121 2.25488C7.65435 2.09852 9.13991 2.09961 11 2.09961H13ZM12 6.99805C10.2952 6.99805 8.91309 8.38022 8.91309 10.085C8.91319 11.1607 9.46439 12.1067 10.2988 12.6592C8.10158 13.3654 6.50496 15.4012 6.50488 17.8174V18.5342H17.4951V17.8174C17.495 15.4009 15.8979 13.3651 13.7002 12.6592C14.535 12.1068 15.0868 11.161 15.0869 10.085C15.0869 8.38021 13.7048 6.99805 12 6.99805Z"
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

export default UserIcon; 