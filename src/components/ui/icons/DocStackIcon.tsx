import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface DocStackIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function DocStackIcon({
  color = 'neutral.500',
  secondaryColor = 'neutral.100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: DocStackIconProps) {
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
                  d="M14.4998 19H12.4998C9.67139 19 8.25718 19 7.3785 18.1213C6.49982 17.2426 6.49982 15.8284 6.49982 13V8C6.49982 5.17157 6.49982 3.75736 7.3785 2.87868C8.25718 2 9.67139 2 12.4998 2H13.843C14.6605 2 15.0692 2 15.4368 2.15224C15.8043 2.30448 16.0933 2.59351 16.6714 3.17157L19.3282 5.82843C19.9063 6.40648 20.1953 6.69552 20.3476 7.06306C20.4998 7.4306 20.4998 7.83935 20.4998 8.65685V13C20.4998 15.8284 20.4998 17.2426 19.6211 18.1213C18.7425 19 17.3282 19 14.4998 19Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M14.9998 2.5V3.5C14.9998 5.38562 14.9998 6.32843 15.5856 6.91421C16.1714 7.5 17.1142 7.5 18.9998 7.5H19.9998"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M6.49942 5C4.84257 5 3.49942 6.34315 3.49942 8V16C3.49942 18.8285 3.49942 20.2427 4.3781 21.1213C5.25678 22 6.67099 22 9.49942 22H14.4998C16.1566 22 17.4998 20.6568 17.4998 19"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M10 11H14M10 15H17"
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
                  d="M3.32138 6.78208C3.32138 5.60557 4.27513 4.65183 5.45163 4.65183V4.65183C6.10511 4.65183 6.63491 5.18147 6.63511 5.83494L6.63714 12.6354L6.59807 15.7352C6.57689 17.4153 7.93958 18.7853 9.61978 18.773L17.2139 18.7174C17.6721 18.7141 18.0453 19.0845 18.0453 19.5427V19.5427C18.0453 21.0925 16.789 22.3488 15.2392 22.3488H6.66773C4.81959 22.3488 3.32138 20.8506 3.32138 19.0025V6.78208Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M15.2811 6.29474V3.71018C15.2811 2.9711 16.0574 2.48863 16.6746 2.89511C17.8087 3.64191 18.6411 4.5143 19.5638 5.75474C20.0421 6.39762 19.5648 7.29474 18.7636 7.29474H16.2811C15.7289 7.29474 15.2811 6.84702 15.2811 6.29474Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M14.4998 19H12.4998C9.67139 19 8.25718 19 7.3785 18.1213C6.49982 17.2426 6.49982 15.8284 6.49982 13V8C6.49982 5.17157 6.49982 3.75736 7.3785 2.87868C8.25718 2 9.67139 2 12.4998 2H13.843C14.6605 2 15.0692 2 15.4368 2.15224C15.8043 2.30448 16.0933 2.59351 16.6714 3.17157L19.3282 5.82843C19.9063 6.40648 20.1953 6.69552 20.3476 7.06306C20.4998 7.4306 20.4998 7.83935 20.4998 8.65685V13C20.4998 15.8284 20.4998 17.2426 19.6211 18.1213C18.7425 19 17.3282 19 14.4998 19Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M14.9998 2.5V3.5C14.9998 5.38562 14.9998 6.32843 15.5856 6.91421C16.1714 7.5 17.1142 7.5 18.9998 7.5H19.9998"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M6.49942 5C4.84257 5 3.49942 6.34315 3.49942 8V16C3.49942 18.8285 3.49942 20.2427 4.3781 21.1213C5.25678 22 6.67099 22 9.49942 22H14.4998C16.1566 22 17.4998 20.6568 17.4998 19"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M10 11H14M10 15H17"
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
                  d="M5.25977 4.63147C5.14764 5.53926 5.14648 6.70814 5.14648 8.24963V13.8824C5.14648 17.0683 5.1473 18.662 6.13672 19.652C7.12661 20.6419 8.71993 20.6422 11.9062 20.6422H14.1592C15.6563 20.6422 16.8018 20.6394 17.6982 20.5367C17.2249 21.7026 16.0828 22.526 14.7471 22.526H9.4375C6.43404 22.526 4.93208 22.5255 3.99902 21.5924C3.06635 20.6594 3.06641 19.1571 3.06641 16.1539V7.65881C3.06675 6.2462 3.98644 5.04844 5.25977 4.63147ZM13.8633 1.49084C14.7296 1.49084 15.1632 1.49068 15.5527 1.65198C15.9422 1.81334 16.2486 2.12035 16.8613 2.73303L19.6777 5.54846C20.2903 6.16099 20.5964 6.46757 20.7578 6.85706C20.9191 7.24661 20.9189 7.68004 20.9189 8.54651V13.15C20.9189 16.1476 20.9186 17.6465 19.9873 18.5778C19.0561 19.5089 17.5572 19.5094 14.5596 19.5094H12.4395C9.44192 19.5094 7.94298 19.509 7.01172 18.5778C6.08051 17.6465 6.08008 16.1476 6.08008 13.15V7.85022C6.08008 4.85262 6.08063 3.35381 7.01172 2.42249C7.94298 1.49122 9.44192 1.49084 12.4395 1.49084H13.8633ZM10 14.2994C9.61352 14.2994 9.3 14.6132 9.2998 14.9996C9.2998 15.3862 9.6134 15.6998 10 15.6998H17L17.1406 15.6852C17.4598 15.62 17.7002 15.338 17.7002 14.9996C17.7 14.6614 17.4597 14.3792 17.1406 14.3141L17 14.2994H10ZM10 10.2994C9.61352 10.2994 9.3 10.6132 9.2998 10.9996C9.2998 11.3862 9.6134 11.6998 10 11.6998H14L14.1406 11.6852C14.4598 11.62 14.7002 11.338 14.7002 10.9996C14.7 10.6614 14.4597 10.3792 14.1406 10.3141L14 10.2994H10ZM15.251 2.92639C15.2412 2.93031 15.241 2.94631 15.2402 2.97815L15.2363 3.1217C15.1899 5.07386 15.1668 6.05038 15.7656 6.65491C16.3646 7.25942 17.3412 7.24501 19.2939 7.21643L19.4893 7.2135C19.5196 7.21306 19.5353 7.21296 19.5391 7.20374C19.5407 7.19925 19.5389 7.19439 19.5342 7.18811L19.5107 7.16272L15.2939 2.95667C15.2716 2.93435 15.2607 2.92274 15.251 2.92639Z"
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

export default DocStackIcon; 