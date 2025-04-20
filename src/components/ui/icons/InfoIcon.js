import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';

/**
 * HomeIcon component with three variants: stroke, duotone, and filled
 * 
 * @param {Object} props - Component props
 * @param {string} props.color - Primary icon color (from theme or direct hex)
 * @param {string} props.secondaryColor - Secondary color for duotone variant
 * @param {number} props.size - Icon size (width and height)
 * @param {number} props.width - Custom width (overrides size)
 * @param {number} props.height - Custom height (overrides size)
 * @param {number} props.strokeWidth - Width of stroke for outlined variant
 * @param {string} props.variant - Icon variant: 'stroke', 'duotone', or 'filled'
 * @param {Object} props.style - Additional styles for the icon container
 */
function InfoIcon({
  color = 'neutral.N500',
  secondaryColor = 'neutral.N100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}) {
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
                  d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M11.992 8H12.001"
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
                  d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M11.992 8H12.001"
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
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.47208 12C1.47208 6.18559 6.18559 1.47208 12 1.47208C17.8144 1.47208 22.5279 6.18558 22.5279 12C22.5279 17.8144 17.8144 22.5279 12 22.5279C6.18558 22.5279 1.47208 17.8144 1.47208 12ZM10.8744 8.14699C10.8744 7.53345 11.3718 7.03607 11.9854 7.03607H11.9941C12.6076 7.03607 13.105 7.53345 13.105 8.14699C13.105 8.76054 12.6076 9.25791 11.9941 9.25791H11.9854C11.3718 9.25791 10.8744 8.76054 10.8744 8.14699ZM11.894 10.2968C12.1111 10.326 12.3937 10.4017 12.632 10.64C12.8702 10.8782 12.9461 11.1608 12.9753 11.3781C13.0001 11.5623 13 11.7796 12.9999 11.9767V11.9767L12.9999 12.0111V16.8412C12.9999 17.268 12.6539 17.614 12.2271 17.614C11.8002 17.614 11.4542 17.268 11.4542 16.8412V12.0111C11.4542 11.9369 11.4542 11.8739 11.4537 11.8184C11.3982 11.8179 11.3352 11.8179 11.261 11.8179C10.8342 11.8179 10.4882 11.4719 10.4882 11.045C10.4882 10.6182 10.8342 10.2722 11.261 10.2722L11.2954 10.2722C11.4924 10.2721 11.7098 10.272 11.894 10.2968Z"
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