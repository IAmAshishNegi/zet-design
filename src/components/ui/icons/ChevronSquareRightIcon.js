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
                  d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
                <Path
                  d="M10.2537 7.63416C10.2537 7.63416 13.7463 10.8495 13.7463 12C13.7463 13.1505 10.2537 16.3658 10.2537 16.3658"
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
                  d="M10.2537 7.63416C10.2537 7.63416 13.7463 10.8495 13.7463 12C13.7463 13.1505 10.2537 16.3658 10.2537 16.3658"
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
              d="M3.65842 3.65842C2.22723 5.08962 2.22723 7.39308 2.22723 12C2.22723 16.6069 2.22723 18.9104 3.65842 20.3416C5.08961 21.7728 7.39307 21.7728 12 21.7728H12H12C16.6069 21.7728 18.9104 21.7728 20.3416 20.3416C21.7728 18.9104 21.7728 16.6069 21.7728 12V12V12C21.7728 7.39307 21.7728 5.08961 20.3416 3.65842C18.9104 2.22723 16.6069 2.22723 12 2.22723C7.39308 2.22723 5.08962 2.22723 3.65842 3.65842ZM10.8585 7.3245C10.5537 7.04396 10.0793 7.06357 9.79873 7.36831C9.5182 7.67304 9.53807 8.14771 9.84276 8.42827L9.84415 8.42956L9.85043 8.43536L9.87634 8.45943C9.89936 8.48087 9.93358 8.51289 9.97739 8.55425C10.0651 8.63702 10.1909 8.75705 10.3423 8.90467C10.6456 9.20058 11.048 9.60421 11.4484 10.0389C11.8518 10.4767 12.2394 10.931 12.5216 11.3301C12.663 11.5301 12.7666 11.7006 12.8322 11.8366C12.876 11.9274 12.8914 11.9798 12.8968 12C12.8914 12.0202 12.876 12.0726 12.8322 12.1634C12.7666 12.2994 12.663 12.4699 12.5216 12.6699C12.2394 13.069 11.8518 13.5234 11.4484 13.9612C11.048 14.3958 10.6456 14.7994 10.3423 15.0953C10.1909 15.243 10.0651 15.363 9.97739 15.4458C9.93358 15.4871 9.89936 15.5191 9.87634 15.5406L9.85043 15.5647L9.84415 15.5705L9.84248 15.572C9.5378 15.8525 9.5182 16.327 9.79873 16.6317C10.0793 16.9364 10.5539 16.9559 10.8586 16.6754L10.8595 16.6746L10.8617 16.6726L10.8695 16.6653L10.8988 16.6381C10.9241 16.6145 10.9608 16.5802 11.0071 16.5364C11.0999 16.4489 11.2317 16.3232 11.3897 16.1691C11.7049 15.8616 12.1273 15.438 12.5516 14.9776C12.9729 14.5203 13.4101 14.0116 13.7465 13.5357C13.9144 13.2982 14.0685 13.053 14.1833 12.815C14.2911 12.5914 14.3995 12.3036 14.3995 12C14.3995 11.6964 14.2911 11.4086 14.1833 11.185C14.0685 10.947 13.9144 10.7019 13.7465 10.4643C13.4101 9.98841 12.9729 9.47972 12.5516 9.02243C12.1273 8.56198 11.7049 8.13843 11.3897 7.83094C11.2317 7.67685 11.0999 7.55113 11.0071 7.46356C10.9608 7.41976 10.9241 7.38546 10.8988 7.36189L10.8695 7.33471L10.8617 7.32743L10.8585 7.3245ZM10.3505 7.87629C10.8585 7.3245 10.8584 7.32444 10.8585 7.3245L10.3505 7.87629ZM10.4013 16.1789L10.8586 16.6754C10.8585 16.6754 10.8585 16.6755 10.4013 16.1789Z" 
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