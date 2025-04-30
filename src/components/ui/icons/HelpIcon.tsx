import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface HelpIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function HelpIcon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: HelpIconProps) {
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
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M11.992 17H12.001"
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
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M11.992 17H12.001"
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
                <path
                  d="M12 1.09277C18.0239 1.09277 22.9072 5.97609 22.9072 12C22.9072 18.0239 18.0239 22.9072 12 22.9072C5.9761 22.9072 1.09278 18.0239 1.09277 12C1.09277 5.9761 5.9761 1.09278 12 1.09277ZM11.9922 15.751C11.4399 15.751 10.9923 16.1987 10.9922 16.751C10.9922 17.3032 11.4399 17.751 11.9922 17.751H12.001L12.1035 17.7461C12.6076 17.6948 13.001 17.2686 13.001 16.751C13.0009 16.2333 12.6076 15.8072 12.1035 15.7559L12.001 15.751H11.9922ZM12 6.34961C10.4536 6.34961 9.2002 7.60302 9.2002 9.14941C9.20021 9.59123 9.55818 9.94922 10 9.94922C10.4141 9.94922 10.7548 9.63471 10.7959 9.23145L10.8057 9.02637C10.8673 8.42138 11.3788 7.94922 12 7.94922C12.6628 7.94922 13.2002 8.48666 13.2002 9.14941C13.2002 9.32954 13.161 9.49923 13.0908 9.65137L13.0107 9.79688C12.8865 9.99002 12.7299 10.191 12.5449 10.4209C12.3682 10.6406 12.1585 10.8952 11.9707 11.1533C11.6007 11.6619 11.2002 12.3337 11.2002 13.1494V13.6494C11.2002 14.0912 11.5582 14.4492 12 14.4492C12.4418 14.4492 12.7998 14.0912 12.7998 13.6494V13.1494C12.7998 12.8606 12.9426 12.5374 13.2646 12.0947C13.4228 11.8774 13.5963 11.6668 13.791 11.4248C13.9774 11.1931 14.181 10.9342 14.3555 10.6631L14.4561 10.4951C14.6755 10.0952 14.7998 9.63586 14.7998 9.14941C14.7998 7.60302 13.5464 6.34961 12 6.34961Z"
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

export default HelpIcon; 