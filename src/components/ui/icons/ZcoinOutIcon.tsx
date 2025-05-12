import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface ZcoinOutIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function ZcoinOutIcon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: ZcoinOutIconProps) {
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
                  d="M14 2.20004C13.3538 2.06886 12.6849 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M9.2506 9.76543H14.0076L9.2506 15.202H14.0076"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M16.998 7.00195L21.1739 2.82375M21.998 6.48019L21.8798 3.3887C21.8798 2.66006 21.4448 2.20607 20.6523 2.14881L17.5282 2.00195"
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
                  d="M22.229 11.9073C22.229 17.5844 17.6268 22.1866 11.9497 22.1866C6.27258 22.1866 1.67036 17.5844 1.67036 11.9073C1.67036 6.23016 6.27258 1.62794 11.9497 1.62794C17.6268 1.62794 22.229 6.23016 22.229 11.9073Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M14 2.20004C13.3538 2.06886 12.6849 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M9.2506 9.76543H14.0076L9.2506 15.202H14.0076"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M16.998 7.00195L21.1739 2.82375M21.998 6.48019L21.8798 3.3887C21.8798 2.66006 21.4448 2.20607 20.6523 2.14881L17.5282 2.00195"
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
                  d="M12 1C12.5641 1 13.1189 1.0428 13.6611 1.125L14.1992 1.21973L14.2979 1.24512C14.782 1.3955 15.0835 1.89188 14.9805 2.39941C14.8773 2.90663 14.4066 3.2454 13.9023 3.19531L13.8008 3.17969L13.3613 3.10254C12.9178 3.03531 12.4633 3 12 3C7.02943 3 3 7.02943 3 12C3 16.9705 7.02944 21 12 21C16.9705 21 21 16.9705 21 12C21 11.5367 20.9647 11.0822 20.8975 10.6387L20.8203 10.1992L20.8047 10.0977C20.7546 9.59326 21.0941 9.12248 21.6016 9.01953C22.1089 8.91685 22.6046 9.21817 22.7549 9.70215L22.7803 9.80078L22.875 10.3389C22.9572 10.8811 23 11.4358 23 12C23 18.0751 18.0751 23 12 23C5.92486 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM14.1533 8.77637C14.4863 8.82537 14.7772 9.0401 14.9189 9.35254C15.0605 9.66504 15.0302 10.0249 14.8477 10.3076L14.7607 10.4238L11.4551 14.2021H14.0078L14.1104 14.207C14.6143 14.2585 15.0078 14.6846 15.0078 15.2021C15.0077 15.7197 14.6143 16.1458 14.1104 16.1973L14.0078 16.2021H9.25098C8.85874 16.2021 8.50304 15.9723 8.34082 15.6152C8.17875 15.2581 8.23992 14.8392 8.49805 14.5439L11.8037 10.7656H9.25098C8.69876 10.7656 8.25108 10.3178 8.25098 9.76562C8.25098 9.21334 8.69869 8.76562 9.25098 8.76562H14.0078L14.1533 8.77637ZM20.5889 1.33887L20.6123 1.33984L20.8252 1.36328C21.3192 1.43387 21.7959 1.62888 22.165 2.00488C22.5846 2.4325 22.7587 2.98661 22.7656 3.54297H22.7676L22.8496 5.95898C22.8634 6.36936 22.6247 6.74667 22.248 6.91016C21.8713 7.07339 21.4327 6.98977 21.1426 6.69922L19.9668 5.52051L18.3047 7.18359C17.9143 7.57402 17.2812 7.57383 16.8906 7.18359C16.5003 6.79305 16.5002 6.16 16.8906 5.76953L18.5547 4.10449L17.3789 2.9248C17.0873 2.63237 17.0054 2.19101 17.1729 1.81348C17.3403 1.43602 17.7223 1.19984 18.1348 1.21973L20.5889 1.33887Z"
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


export default ZcoinOutIcon; 