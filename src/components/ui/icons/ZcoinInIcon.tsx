import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface ZcoinInIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function ZcoinInIcon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: ZcoinInIconProps) {
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
                  d="M14 2.22179C13.3538 2.09076 12.6849 2.02197 12 2.02197C6.47715 2.02197 2 6.49421 2 12.011C2 17.5277 6.47715 22 12 22C17.5228 22 22 17.5277 22 12.011C22 11.3269 21.9311 10.6587 21.8 10.0132"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M8.8786 9.34029H14.3796L8.8786 15.6271H14.3796"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M21.9951 2L17.8193 6.17362M16.9951 2.52119L17.1133 5.60928C17.1133 6.33713 17.5484 6.79062 18.3409 6.84782L21.465 6.99451"
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
                  d="M14 2.22179C13.3538 2.09076 12.6849 2.02197 12 2.02197C6.47715 2.02197 2 6.49421 2 12.011C2 17.5277 6.47715 22 12 22C17.5228 22 22 17.5277 22 12.011C22 11.3269 21.9311 10.6587 21.8 10.0132"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M8.8786 9.34029H14.3796L8.8786 15.6271H14.3796"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M21.9951 2L17.8193 6.17362M16.9951 2.52119L17.1133 5.60928C17.1133 6.33713 17.5484 6.79062 18.3409 6.84782L21.465 6.99451"
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
                  d="M12 1.02148C12.5641 1.02148 13.1189 1.06534 13.6611 1.14746L14.1982 1.24219L14.2979 1.26758C14.7818 1.41799 15.0832 1.91355 14.9805 2.4209C14.8774 2.92811 14.4066 3.26783 13.9023 3.21777L13.8018 3.20215L13.3613 3.125C12.9178 3.05785 12.4633 3.02246 12 3.02246C7.0284 3.02246 3 7.04825 3 12.0117C3.00039 16.9748 7.02864 21.001 12 21.001C16.9713 21.001 20.9996 16.9748 21 12.0117C21 11.5494 20.9646 11.095 20.8975 10.6523L20.8203 10.2129L20.8047 10.1113C20.7546 9.60722 21.0935 9.13745 21.6006 9.03418C22.1081 8.9311 22.6045 9.23162 22.7549 9.71582L22.7803 9.81445L22.875 10.3516C22.9572 10.8932 23 11.4482 23 12.0117C22.9996 18.0814 18.0738 23.001 12 23.001C5.92614 23.001 1.00039 18.0814 1 12.0117C1 5.94161 5.9259 1.02148 12 1.02148ZM14.4717 8.33984C14.8639 8.33985 15.2196 8.56971 15.3818 8.92676C15.5236 9.23927 15.494 9.59896 15.3115 9.88184L15.2246 9.99805L11.1748 14.627H14.4717L14.5742 14.6318C15.0782 14.6832 15.4715 15.1095 15.4717 15.627C15.4715 16.1445 15.0782 16.5697 14.5742 16.6211L14.4717 16.627H8.9707C8.57846 16.6269 8.22275 16.3972 8.06055 16.04C7.89863 15.6828 7.95948 15.263 8.21777 14.9678L12.2676 10.3398H8.9707C8.41844 10.3398 7.9707 9.89211 7.9707 9.33984C7.97094 8.78778 8.41859 8.33987 8.9707 8.33984H14.4717ZM20.7578 1.82031C21.1484 1.43011 21.7815 1.4299 22.1719 1.82031C22.562 2.21075 22.562 2.84391 22.1719 3.23438L20.5078 4.89941L21.6836 6.0791C21.9751 6.37144 22.0569 6.81301 21.8896 7.19043C21.7222 7.56779 21.3401 7.8039 20.9277 7.78418L18.4736 7.66504L18.4502 7.66406L18.2373 7.64062C17.7432 7.5701 17.2667 7.37508 16.8975 6.99902C16.4777 6.57137 16.3038 6.01742 16.2969 5.46094H16.2949L16.2129 3.04492C16.1991 2.63445 16.4376 2.25715 16.8145 2.09375C17.1913 1.93072 17.6299 2.01402 17.9199 2.30469L19.0957 3.4834L20.7578 1.82031Z"
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

export default ZcoinInIcon; 