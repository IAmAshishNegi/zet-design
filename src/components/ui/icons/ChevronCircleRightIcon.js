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
function ChevronCircleRightIcon({
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
                  d="M10.9967 16.0066C10.9967 16.0066 15.0033 13.0558 15.0033 12C15.0033 10.9441 10.9967 7.99344 10.9967 7.99344"
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
                  d="M10.9967 16.0066C10.9967 16.0066 15.0033 13.0558 15.0033 12C15.0033 10.9441 10.9967 7.99344 10.9967 7.99344"
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
                  d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM11.4415 7.38956C11.1079 7.14393 10.6384 7.21518 10.3928 7.54871C10.1472 7.88221 10.2188 8.35196 10.5523 8.5976L10.554 8.5989L10.5618 8.60463L10.5935 8.62822C10.6217 8.64919 10.6634 8.68044 10.7168 8.72079C10.8237 8.8015 10.977 8.91847 11.1613 9.06227C11.5307 9.35049 12.0206 9.74367 12.5083 10.1671C12.9997 10.5938 13.4719 11.0366 13.8152 11.4252C13.9877 11.6203 14.1118 11.7842 14.1888 11.9119C14.2115 11.9496 14.2268 11.9787 14.2371 12C14.2268 12.0213 14.2115 12.0505 14.1888 12.0881C14.1118 12.2158 13.9877 12.3797 13.8152 12.5749C13.4719 12.9635 12.9997 13.4062 12.5083 13.8329C12.0206 14.2564 11.5306 14.6496 11.1613 14.9378C10.977 15.0816 10.8237 15.1986 10.7168 15.2793C10.6634 15.3196 10.6217 15.3509 10.5935 15.3719L10.5618 15.3954L10.554 15.4012L10.5519 15.4027C10.2184 15.6483 10.1472 16.1178 10.3928 16.4514C10.6384 16.7849 11.1081 16.856 11.4416 16.6104L11.4426 16.6097L11.4452 16.6078L11.4546 16.6008L11.4899 16.5746C11.5204 16.5518 11.5648 16.5186 11.6209 16.4762C11.7331 16.3915 11.8928 16.2696 12.0842 16.1203C12.4661 15.8223 12.9778 15.4118 13.4917 14.9656C14.0019 14.5226 14.5314 14.0297 14.9393 13.5681C15.1425 13.3381 15.3313 13.0983 15.4734 12.8625C15.6031 12.6474 15.7533 12.3409 15.7533 12C15.7533 11.6592 15.6032 11.3527 15.4734 11.1375C15.3313 10.9018 15.1425 10.6619 14.9393 10.432C14.5314 9.97035 14.0019 9.47744 13.4917 9.03447C12.9778 8.58826 12.4661 8.17777 12.0842 7.87974C11.8928 7.73041 11.7331 7.60861 11.6209 7.52383C11.5647 7.48143 11.5204 7.44825 11.4899 7.42548L11.4546 7.39928L11.4452 7.3923L11.4415 7.38956ZM10.9967 16.0066L11.4416 16.6104C11.4415 16.6105 11.4415 16.6105 10.9967 16.0066Z"
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

export default ChevronCircleRightIcon; 