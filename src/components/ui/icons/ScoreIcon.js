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
function ScoreIcon({
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
                  d="M13.5 13L17 9M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M6 12C6 8.68629 8.68629 6 12 6C13.0929 6 14.1175 6.29218 15 6.80269"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M2.50006 12.0001C2.50006 7.52172 2.50006 5.28255 3.8913 3.8913C5.28255 2.50006 7.52172 2.50006 12.0001 2.50006C16.4784 2.50006 18.7176 2.50006 20.1088 3.8913C21.5001 5.28255 21.5001 7.52172 21.5001 12.0001C21.5001 16.4784 21.5001 18.7176 20.1088 20.1088C18.7176 21.5001 16.4784 21.5001 12.0001 21.5001C7.52172 21.5001 5.28255 21.5001 3.8913 20.1088C2.50006 18.7176 2.50006 16.4784 2.50006 12.0001Z"
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
                  d="M2.50006 12.0001C2.50006 7.52172 2.50006 5.28255 3.8913 3.8913C5.28255 2.50006 7.52172 2.50006 12.0001 2.50006C16.4784 2.50006 18.7176 2.50006 20.1088 3.8913C21.5001 5.28255 21.5001 7.52172 21.5001 12.0001C21.5001 16.4784 21.5001 18.7176 20.1088 20.1088C18.7176 21.5001 16.4784 21.5001 12.0001 21.5001C7.52172 21.5001 5.28255 21.5001 3.8913 20.1088C2.50006 18.7176 2.50006 16.4784 2.50006 12.0001Z"
                  fill={duotoneColor}
                />
                <Circle cx="12.0601" cy="15.0523" r="1.92244" fill="white" />
                <Path
                  d="M13.5 13L17 9M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M6 12C6 8.68629 8.68629 6 12 6C13.0929 6 14.1175 6.29218 15 6.80269"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M2.50006 12.0001C2.50006 7.52172 2.50006 5.28255 3.8913 3.8913C5.28255 2.50006 7.52172 2.50006 12.0001 2.50006C16.4784 2.50006 18.7176 2.50006 20.1088 3.8913C21.5001 5.28255 21.5001 7.52172 21.5001 12.0001C21.5001 16.4784 21.5001 18.7176 20.1088 20.1088C18.7176 21.5001 16.4784 21.5001 12.0001 21.5001C7.52172 21.5001 5.28255 21.5001 3.8913 20.1088C2.50006 18.7176 2.50006 16.4784 2.50006 12.0001Z"
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
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.57861 3.57862C2.13372 5.02352 2.13372 7.34903 2.13372 12.0001C2.13372 16.6511 2.13372 18.9767 3.57861 20.4215C5.0235 21.8664 7.34901 21.8664 12.0001 21.8664H12.0001H12.0001C16.6511 21.8664 18.9766 21.8664 20.4215 20.4215C21.8664 18.9767 21.8664 16.6511 21.8664 12.0001V12.0001V12.0001C21.8664 7.34902 21.8664 5.02351 20.4215 3.57862C18.9766 2.13373 16.6511 2.13373 12.0001 2.13373C7.34903 2.13373 5.02351 2.13373 3.57861 3.57862ZM12 6.80001C9.12811 6.80001 6.8 9.12813 6.8 12C6.8 12.4418 6.44182 12.8 6 12.8C5.55817 12.8 5.2 12.4418 5.2 12C5.2 8.24447 8.24446 5.20001 12 5.20001C13.2373 5.20001 14.3996 5.53117 15.4006 6.11022C15.783 6.33146 15.9137 6.82084 15.6925 7.20329C15.4712 7.58574 14.9819 7.71642 14.5994 7.49518C13.8354 7.05322 12.9485 6.80001 12 6.80001ZM17.5268 8.39793C17.8593 8.68888 17.893 9.19429 17.6021 9.5268L14.2599 13.3465C14.5995 13.8098 14.8 14.3815 14.8 15C14.8 16.5464 13.5464 17.8 12 17.8C10.4536 17.8 9.2 16.5464 9.2 15C9.2 13.4536 10.4536 12.2 12 12.2C12.3455 12.2 12.6765 12.2626 12.9821 12.377L16.3979 8.47319C16.6889 8.14068 17.1943 8.10699 17.5268 8.39793ZM12 13.8C11.3372 13.8 10.8 14.3372 10.8 15C10.8 15.6628 11.3372 16.2 12 16.2C12.6628 16.2 13.2 15.6628 13.2 15C13.2 14.3372 12.6628 13.8 12 13.8Z"
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

export default ScoreIcon; 