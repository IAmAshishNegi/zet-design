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
function CreditCardIcon({
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
                  d="M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M10 16H11.5"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M14.5 16H18"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M2 9H22"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
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
                  d="M2.1203 16.3707V9.27121L21.8502 9.18866V16.123C21.6318 18.252 20.9475 19.0892 18.3005 19.6728H5.42238C3.27515 19.2411 2.50382 18.566 2.1203 16.3707Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M10 16H11.5"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M14.5 16H18"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M2 9H22"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
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
d="M1.52335 12C1.52335 11.2014 1.52335 10.4889 1.53438 9.85002H22.4656C22.4767 10.4889 22.4767 11.2014 22.4767 12C22.4767 15.7061 22.4767 17.5591 21.3737 18.7963C21.1972 18.9942 21.0028 19.1771 20.7925 19.3432C19.4781 20.3813 17.5093 20.3813 13.5715 20.3813H10.4285C6.49077 20.3813 4.5219 20.3813 3.20743 19.3432C2.99718 19.1771 2.80274 18.9942 2.62633 18.7963C1.52335 17.5591 1.52335 15.7061 1.52335 12ZM22.3891 8.15002H1.61092C1.7271 6.81478 1.99741 5.90912 2.62633 5.2037C2.80274 5.00582 2.99718 4.82282 3.20743 4.65678C4.5219 3.61868 6.49077 3.61868 10.4285 3.61868H13.5715C17.5093 3.61868 19.4781 3.61868 20.7925 4.65678C21.0028 4.82282 21.1972 5.00582 21.3737 5.2037C22.0026 5.90912 22.2729 6.81478 22.3891 8.15002ZM10.2662 16C10.2662 15.5582 10.6243 15.2 11.0662 15.2H12.5662C13.008 15.2 13.3662 15.5582 13.3662 16C13.3662 16.4418 13.008 16.8 12.5662 16.8H11.0662C10.6243 16.8 10.2662 16.4418 10.2662 16ZM14.7662 16C14.7662 15.5582 15.1243 15.2 15.5662 15.2H19.0662C19.508 15.2 19.8662 15.5582 19.8662 16C19.8662 16.4418 19.508 16.8 19.0662 16.8H15.5662C15.1243 16.8 14.7662 16.4418 14.7662 16Z" 
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

export default CreditCardIcon; 