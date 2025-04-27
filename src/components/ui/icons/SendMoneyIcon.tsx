import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

/**
 * SendMoneyIcon component with three variants: stroke, duotone, and filled
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
 * 
 */

interface SendMoneyIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'stroke' | 'duotone' | 'filled';
  style?: ViewStyle;
}

function SendMoneyIcon({
  color = 'neutral.N500',
  secondaryColor = 'neutral.N100',
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'stroke',
  style,
  ...props
}: SendMoneyIconProps) {
  return (
    <Icon
      color={color}
      secondaryColor={secondaryColor}
      size={size}
      width={width}
      height={height}
      strokeWidth={strokeWidth}
      variant={variant as 'stroke' | 'duotone' | 'filled'}
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
                  d="M9.39053 11.4858H14.5907"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M12.2604 16.6417L9.57586 13.5436H11.4077C12.1084 13.5436 12.674 12.978 12.674 12.2773V10.4708C12.674 9.77011 12.1084 9.20451 11.4077 9.20451H8.85831H14.7254"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M13.7742 2.49539C13.7742 2.49539 12.6839 2.50146 12 2.50146C7.52166 2.50146 5.28249 2.50146 3.89124 3.89271C2.5 5.28395 2.5 7.52312 2.5 12.0015C2.5 16.4798 2.5 18.719 3.89124 20.1103C5.28249 21.5015 7.52166 21.5015 12 21.5015C16.4783 21.5015 18.7175 21.5015 20.1088 20.1103C21.5 18.719 21.5 16.4798 21.5 12.0015C21.5 11.3176 21.5 10.5015 21.5 10.5015"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M17.2115 6.7854L20.6758 3.32107M21.4644 6.52702L21.3818 3.88602C21.3818 3.15737 20.9467 2.70339 20.1542 2.64612L17.3594 2.52722"
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
                  d="M2.64569 11.3384C2.64569 7.56712 2.64569 5.6815 3.81726 4.50993C4.98884 3.33836 6.87445 3.33836 10.6457 3.33836H16.9255C18.8111 3.33836 19.7539 3.33836 20.3397 3.92414C20.9255 4.50993 20.9255 5.45274 20.9255 7.33836V13.6569C20.9255 17.4282 20.9255 19.3138 19.7539 20.4854C18.5823 21.6569 16.6967 21.6569 12.9255 21.6569H10.6457C6.87446 21.6569 4.98884 21.6569 3.81726 20.4854C2.64569 19.3138 2.64569 17.4282 2.64569 13.6569V11.3384Z"
                  fill={duotoneColor}
                />
                <Path
                  d="M9.39052 11.4858H14.5907"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M12.2604 16.6417L9.57584 13.5436H11.4077C12.1084 13.5436 12.674 12.978 12.674 12.2773V10.4708C12.674 9.77011 12.1084 9.20451 11.4077 9.20451H8.85829H14.7254"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M13.7742 2.49539C13.7742 2.49539 12.6839 2.50146 12 2.50146C7.52166 2.50146 5.28249 2.50146 3.89124 3.89271C2.5 5.28395 2.5 7.52312 2.5 12.0015C2.5 16.4798 2.5 18.719 3.89124 20.1103C5.28249 21.5015 7.52166 21.5015 12 21.5015C16.4783 21.5015 18.7175 21.5015 20.1088 20.1103C21.5 18.719 21.5 16.4798 21.5 12.0015C21.5 11.3176 21.5 10.5015 21.5 10.5015"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M17.2115 6.7854L20.6758 3.32107M21.4644 6.52702L21.3818 3.88602C21.3818 3.15737 20.9467 2.70339 20.1542 2.64612L17.3594 2.52722"
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
                  d="M9.39052 11.4858H14.5907"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M12.2604 16.6417L9.57584 13.5436H11.4077C12.1084 13.5436 12.674 12.978 12.674 12.2773V10.4708C12.674 9.77011 12.1084 9.20451 11.4077 9.20451H8.85829H14.7254"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth} 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M13.7742 2.49539C13.7742 2.49539 12.6839 2.50146 12 2.50146C7.52166 2.50146 5.28249 2.50146 3.89124 3.89271C2.5 5.28395 2.5 7.52312 2.5 12.0015C2.5 16.4798 2.5 18.719 3.89124 20.1103C5.28249 21.5015 7.52166 21.5015 12 21.5015C16.4783 21.5015 18.7175 21.5015 20.1088 20.1103C21.5 18.719 21.5 16.4798 21.5 12.0015C21.5 11.3176 21.5 10.5015 21.5 10.5015"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M17.2115 6.7854L20.6758 3.32107M21.4644 6.30127L21.3818 3.88602C21.3818 3.15737 20.9467 2.70339 20.1542 2.64612L17.7004 2.52722L21.4644 6.30127Z"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
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

export default SendMoneyIcon; 