import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';

/**
 * CheckboxIcon component with three variants: stroke, duotone, and filled
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
function CheckboxIcon({
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
                  d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M8 12.5L10.5 15L16 9"
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
                  d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M8 12.5L10.5 15L16 9"
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
                  d="M3.52395 3.52396C2.06969 4.97823 2.06969 7.31882 2.06969 12C2.06969 16.6812 2.06969 19.0218 3.52395 20.4761C4.97822 21.9303 7.31881 21.9303 12 21.9303H12H12C16.6812 21.9303 19.0218 21.9303 20.4761 20.4761C21.9303 19.0218 21.9303 16.6812 21.9303 12V12V12C21.9303 7.31881 21.9303 4.97822 20.4761 3.52396C19.0218 2.0697 16.6811 2.0697 12 2.0697C7.31881 2.0697 4.97822 2.0697 3.52395 3.52396ZM16.5897 9.5406C16.8883 9.2149 16.8663 8.70885 16.5406 8.41029C16.2149 8.11174 15.7088 8.13374 15.4103 8.45944L10.4749 13.8435L8.56568 11.9343C8.25326 11.6219 7.74673 11.6219 7.43431 11.9343C7.12189 12.2468 7.12189 12.7533 7.43431 13.0657L9.93431 15.5657C10.0886 15.72 10.2992 15.8046 10.5174 15.7998C10.7355 15.7951 10.9423 15.7014 11.0897 15.5406L16.5897 9.5406Z"
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

export default CheckboxIcon;
