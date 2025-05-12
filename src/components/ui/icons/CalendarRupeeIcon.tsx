import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface CalendarRupeeIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function CalendarRupeeIcon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: CalendarRupeeIconProps) {
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
                  d="M17 2V5M7 2V5"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M13 3.5H11C7.22876 3.5 5.34315 3.5 4.17157 4.67157C3 5.84315 3 7.72876 3 11.5V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V11.5C21 7.72876 21 5.84315 19.8284 4.67157C18.6569 3.5 16.7712 3.5 13 3.5Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M3.5 8.5H20.5"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M10.0811 13.7109H14.4268"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <Path
                  d="M12.4794 18.0196L10.236 15.4306H11.7668C12.3524 15.4306 12.825 14.9579 12.825 14.3724V12.8627C12.825 12.2772 12.3524 11.8045 11.7668 11.8045H9.63635H14.5393"
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
                  d="M2.96477 18.5381V8.7406L20.6908 8.74061V18.5381C20.5088 20.4937 19.9941 21.2772 17.8025 21.7095H5.85303C3.85157 21.2432 3.33265 20.4485 2.96477 18.5381Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M17 2V5M7 2V5"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M13 3.5H11C7.22876 3.5 5.34315 3.5 4.17157 4.67157C3 5.84315 3 7.72876 3 11.5V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V11.5C21 7.72876 21 5.84315 19.8284 4.67157C18.6569 3.5 16.7712 3.5 13 3.5Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M3.5 8.5H20.5"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M10.1299 13.8574H14.4756"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <Path
                  d="M12.5282 18.166L10.2848 15.577H11.8156C12.4012 15.577 12.8738 15.1043 12.8738 14.5188V13.0091C12.8738 12.4236 12.4012 11.9509 11.8156 11.9509H9.68517H14.5881"
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
                  d="M17 1.15039C17.4694 1.15039 17.8496 1.53056 17.8496 2V3.25195C18.8009 3.43022 19.6024 3.76306 20.2559 4.41016L20.3926 4.55273C21.0551 5.2805 21.3564 6.18354 21.5029 7.2627C21.6557 8.38813 21.6533 9.82617 21.6533 11.6279V14.0498C21.6533 15.8519 21.6558 17.2905 21.5029 18.416C21.3564 19.4948 21.0549 20.3974 20.3926 21.125L20.2559 21.2686C19.4984 22.0184 18.5417 22.3458 17.3838 22.5C16.2492 22.651 14.798 22.6494 12.9775 22.6494H11.0215C9.20091 22.6494 7.74984 22.6511 6.61524 22.5C5.5297 22.3554 4.62108 22.0587 3.8877 21.4043L3.74317 21.2686C2.98454 20.5174 2.65239 19.5666 2.4961 18.416C2.34328 17.2905 2.34571 15.8519 2.34571 14.0498V11.6279C2.34571 9.82624 2.34339 8.38811 2.4961 7.2627C2.65232 6.11214 2.98489 5.16139 3.74317 4.41016L3.8877 4.27441C4.51384 3.71555 5.26776 3.41829 6.15039 3.25293V2C6.15039 1.53056 6.53056 1.15039 7 1.15039C7.46944 1.15039 7.84961 1.53056 7.84961 2V3.07324C8.75232 3.02888 9.8043 3.0293 11.0215 3.0293H12.9775C14.1952 3.0293 15.2475 3.02883 16.1504 3.07324V2C16.1504 1.53056 16.5306 1.15039 17 1.15039ZM4.06348 9.25C4.04663 9.92627 4.04492 10.7097 4.04492 11.6279V14.0498C4.04492 15.9001 4.04705 17.202 4.18067 18.1865C4.31092 19.1456 4.55224 19.6771 4.93946 20.0605L5.09278 20.1982C5.46942 20.5035 5.98907 20.7011 6.83985 20.8145C7.83618 20.9471 9.15334 20.9492 11.0215 20.9492H12.9775C14.8456 20.9492 16.1628 20.947 17.1592 20.8145C18.1316 20.685 18.6712 20.4449 19.0596 20.0605L19.1982 19.9092C19.5056 19.5377 19.7044 19.0257 19.8184 18.1865C19.952 17.202 19.9541 15.9001 19.9541 14.0498V11.6279C19.9541 10.7097 19.9534 9.92626 19.9365 9.25H4.06348ZM14.54 11.2051C14.8711 11.2055 15.1397 11.4736 15.1397 11.8047C15.1395 12.1357 14.871 12.4039 14.54 12.4043H13.3594C13.4011 12.55 13.4258 12.7041 13.4258 12.8633V13.1113H14.4268C14.7581 13.1114 15.0264 13.3796 15.0264 13.7109C15.0263 14.0423 14.7581 14.3105 14.4268 14.3105H13.4258V14.3721C13.4257 15.2886 12.6841 16.0299 11.7676 16.0303H11.5498L12.9336 17.627C13.15 17.8774 13.1232 18.2568 12.873 18.4736C12.6228 18.6905 12.2435 18.663 12.0264 18.4131L9.78321 15.8232C9.62951 15.6458 9.593 15.3952 9.69043 15.1816C9.78801 14.968 10.0014 14.8311 10.2363 14.8311H11.7676C12.0213 14.8306 12.2255 14.6259 12.2256 14.3721V14.3105H10.0811C9.74974 14.3105 9.48148 14.0423 9.48145 13.7109C9.48145 13.3796 9.74972 13.1114 10.0811 13.1113H12.2256V12.8633C12.2256 12.6409 12.0687 12.4566 11.8594 12.4141L11.7676 12.4043H9.63672C9.30543 12.4043 9.03724 12.1359 9.03711 11.8047C9.03711 11.5148 9.24229 11.2728 9.51563 11.2168L9.63672 11.2051H14.54Z"
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

export default CalendarRupeeIcon; 