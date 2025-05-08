import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface CopyIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function CopyIcon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: CopyIconProps) {
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
                  d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9H16C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16V15Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
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
                  d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9H16C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16V15Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9H16C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16V15Z"
                  stroke={duotoneColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                  stroke={duotoneColor}
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
                  d="M16.5 9.5C19.3284 9.5 20.7424 9.50023 21.6211 10.3789C22.4998 11.2576 22.5 12.6716 22.5 15.5V16.5C22.5 19.3284 22.4998 20.7424 21.6211 21.6211C20.7424 22.4998 19.3284 22.5 16.5 22.5H15.5C12.6716 22.5 11.2576 22.4998 10.3789 21.6211C9.50023 20.7424 9.5 19.3284 9.5 16.5V15.5C9.5 12.6716 9.50023 11.2576 10.3789 10.3789C11.2576 9.50023 12.6716 9.5 15.5 9.5H16.5ZM10 1.5C11.6192 1.5 12.9216 1.49808 13.9541 1.62012C15.0086 1.74477 15.911 2.01044 16.6719 2.63477L16.8574 2.79492C17.0394 2.95984 17.2093 3.13807 17.3652 3.32813L17.4727 3.46485C17.9902 4.15564 18.235 4.95876 18.3594 5.88184C18.4348 6.44162 18.469 7.07951 18.4854 7.80274C17.9271 7.79507 17.3119 7.79199 16.6318 7.79199H15.3682C11.797 7.79199 10.0119 7.79287 8.90235 8.90235C7.79287 10.0119 7.79199 11.797 7.79199 15.3682V16.6318C7.79199 17.3119 7.79507 17.9271 7.80274 18.4854C7.07951 18.469 6.44162 18.4348 5.88184 18.3594C4.95876 18.235 4.15564 17.9902 3.46485 17.4727L3.32813 17.3652C3.13809 17.2093 2.95985 17.0394 2.79492 16.8574L2.63477 16.6719C2.01044 15.911 1.74477 15.0086 1.62012 13.9541C1.49808 12.9216 1.5 11.6192 1.5 10C1.5 8.38078 1.49808 7.07839 1.62012 6.0459C1.74477 4.9914 2.01042 4.08897 2.63477 3.32813L2.79492 3.14258C2.95984 2.96059 3.13808 2.79073 3.32813 2.63477L3.47266 2.52246C4.2026 1.97832 5.05723 1.73698 6.0459 1.62012C7.07839 1.49808 8.38078 1.5 10 1.5Z"
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

export default CopyIcon; 