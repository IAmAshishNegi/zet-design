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
function RewardIcon({
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
                  d="M12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2C11.6117 4.48692 11.2315 5.82158 10 8C8.79908 7.4449 8.5 7 8 5.75C6 8 4 11 4 14C4 18.4183 7.58172 22 12 22Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinejoin="round"
                />
                <Path
                  d="M10 17L14 13"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M10 13H10.009M13.991 17H14"
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
                  d="M12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2C11.6117 4.48692 11.2315 5.82158 10 8C8.79908 7.4449 8.5 7 8 5.75C6 8 4 11 4 14C4 18.4183 7.58172 22 12 22Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2C11.6117 4.48692 11.2315 5.82158 10 8C8.79908 7.4449 8.5 7 8 5.75C6 8 4 11 4 14C4 18.4183 7.58172 22 12 22Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinejoin="round"
                />
                <Path
                  d="M10 17L14 13"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M10 13H10.009M13.991 17H14"
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
                  d="M12.45 1.40001L12.0002 1.99971C12.45 1.40001 12.4502 1.40013 12.4504 1.40029L12.4509 1.4007L12.4526 1.40195L12.4581 1.40609L12.4776 1.42088C12.4943 1.43361 12.5183 1.45206 12.5493 1.47604C12.6112 1.524 12.7006 1.59411 12.8135 1.68491C13.0395 1.86645 13.3601 2.131 13.7439 2.46682C14.5104 3.13754 15.5343 4.09721 16.5606 5.25173C18.5779 7.52119 20.75 10.7037 20.75 14C20.75 18.8325 16.8325 22.75 12 22.75C7.16751 22.75 3.25 18.8325 3.25 14C3.25 10.7037 5.42215 7.52119 7.43944 5.25173C7.61213 5.05746 7.8731 4.96645 8.12915 5.01121C8.3852 5.05597 8.59982 5.23012 8.69636 5.47146C8.94563 6.09466 9.10783 6.41451 9.30773 6.64882C9.40619 6.76424 9.52614 6.87278 9.6987 6.98716C10.6012 5.26796 10.9217 4.04475 11.259 1.88431C11.2996 1.62419 11.4736 1.40441 11.7175 1.30525C11.9614 1.20608 12.2394 1.24205 12.45 1.40001ZM8.95 13C8.95 12.4201 9.4201 11.95 10 11.95H10.009C10.5889 11.95 11.059 12.4201 11.059 13C11.059 13.5799 10.5889 14.05 10.009 14.05H10C9.4201 14.05 8.95 13.5799 8.95 13ZM12.941 17C12.941 16.4201 13.4111 15.95 13.991 15.95H14C14.5799 15.95 15.05 16.4201 15.05 17C15.05 17.5799 14.5799 18.05 14 18.05H13.991C13.4111 18.05 12.941 17.5799 12.941 17ZM14.5303 12.4697C14.8232 12.7626 14.8232 13.2374 14.5303 13.5303L10.5303 17.5303C10.2374 17.8232 9.76256 17.8232 9.46967 17.5303C9.17678 17.2374 9.17678 16.7626 9.46967 16.4697L13.4697 12.4697C13.7626 12.1768 14.2374 12.1768 14.5303 12.4697Z"
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

export default RewardIcon; 