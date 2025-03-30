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
function HomeIcon({
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
                  d="M15.0002 17C14.2007 17.6224 13.1504 18 12.0002 18C10.8499 18 9.79971 17.6224 9.00018 17" 
                  stroke={primaryColor} 
                  strokeWidth={strokeWidth} 
                  strokeLinecap="round"
                />
                <Path 
                  d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z" 
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
                  d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z" 
                  fill={duotoneColor}
                />
                <Path 
                  d="M15.0002 17C14.2007 17.6224 13.1504 18 12.0002 18C10.8499 18 9.79971 17.6224 9.00018 17" 
                  stroke={primaryColor} 
                  strokeWidth={strokeWidth} 
                  strokeLinecap="round"
                />
                <Path 
                  d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z" 
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
                  d="M1.89472 13.2708L1.89475 13.271L2.21004 15.3226L2.21005 15.3227C2.73418 18.7333 2.99625 20.4387 4.21945 21.4561C5.44265 22.4735 7.23092 22.4735 10.8075 22.4735H10.8075H13.1929H13.1929C16.7694 22.4735 18.5577 22.4735 19.7809 21.4561C21.0041 20.4388 21.2661 18.7335 21.7903 15.3232L21.7904 15.3226L22.1056 13.271L22.1057 13.2708C22.4753 10.8649 22.6602 9.66193 22.2053 8.59549C21.7505 7.52902 20.7414 6.79934 18.7229 5.34L17.2149 4.24965C14.7041 2.43425 13.4487 1.52655 12.0002 1.52655C10.5516 1.52655 9.29629 2.43422 6.78558 4.24954L6.78543 4.24965L5.27741 5.34C3.25906 6.79934 2.24988 7.52902 1.79502 8.59549C1.34015 9.66193 1.525 10.8649 1.89472 13.2708ZM8.99581 16.2683C8.62538 15.98 8.09132 16.0465 7.80295 16.4169C7.51459 16.7874 7.58111 17.3214 7.95155 17.6098C9.0433 18.4597 10.4622 18.9645 12 18.9645C13.5377 18.9645 14.9567 18.4597 16.0485 17.6098C16.4189 17.3214 16.4854 16.7873 16.197 16.4169C15.9087 16.0465 15.3746 15.98 15.0042 16.2683C14.2164 16.8816 13.1663 17.2645 12 17.2645C10.8336 17.2645 9.78365 16.8816 8.99581 16.2683Z" 
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

export default HomeIcon; 