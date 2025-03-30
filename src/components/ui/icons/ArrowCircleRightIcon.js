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
function ChevronSquareRightIcon({
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
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M16 12H8M16 12C16 12.7002 14.0057 14.0085 13.5 14.5M16 12C16 11.2998 14.0057 9.99153 13.5 9.5"
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
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <path
                  d="M16 12H8M16 12C16 12.7002 14.0057 14.0085 13.5 14.5M16 12C16 11.2998 14.0057 9.99153 13.5 9.5"
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
                  d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM14.0227 8.96219C13.7257 8.67349 13.2509 8.68023 12.9622 8.97726C12.6735 9.27428 12.6802 9.74911 12.9773 10.0378C13.1388 10.1949 13.396 10.3971 13.6407 10.5893L13.6976 10.6341C13.9434 10.827 14.2061 11.0333 14.4548 11.2439L14.4619 11.25H8C7.58579 11.25 7.25 11.5858 7.25 12C7.25 12.4142 7.58579 12.75 8 12.75H14.4619L14.4548 12.7561C14.2061 12.9668 13.9433 13.1731 13.6976 13.366L13.6976 13.366L13.6407 13.4107C13.396 13.6029 13.1389 13.8051 12.9773 13.9622C12.6802 14.2509 12.6735 14.7257 12.9622 15.0227C13.2509 15.3198 13.7257 15.3265 14.0227 15.0378C14.114 14.9491 14.2958 14.8035 14.5672 14.5903L14.6271 14.5433C14.8693 14.3532 15.1533 14.1302 15.4245 13.9005C15.7151 13.6543 16.0168 13.3787 16.2515 13.1032C16.369 12.9652 16.485 12.8096 16.5746 12.6422C16.661 12.4807 16.75 12.2583 16.75 12C16.75 11.7417 16.661 11.5193 16.5746 11.3578C16.485 11.1904 16.369 11.0348 16.2515 10.8968C16.0168 10.6213 15.7151 10.3458 15.4245 10.0995C15.1534 9.86983 14.8693 9.64686 14.6272 9.4568L14.6272 9.45676L14.5672 9.40971C14.2958 9.19652 14.114 9.05089 14.0227 8.96219Z"
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

export default ChevronSquareRightIcon; 