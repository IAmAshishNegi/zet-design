import React from 'react';
import { Svg, Path } from 'react-native-svg';
import Icon from './Icon';
import { ViewStyle } from 'react-native';

interface ZetLogoProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: 'filled' | 'stroke' | 'duotone';
  style?: ViewStyle;
}

function ZetLogo({
  color = 'primary.500',
  secondaryColor = 'primary.100',
  size = 120,
  width,
  height,
  strokeWidth = 1.5,
  variant = 'filled',
  style,
  ...props
}: ZetLogoProps) {
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
        // Calculate aspect ratio - original SVG is 510×203
        const aspectRatio = 510 / 203;
        const finalHeight = height || (width ? width / aspectRatio : size / aspectRatio);
        
        switch (variant) {
          case 'filled':
            return (
              <Svg 
                width={width || size} 
                height={finalHeight} 
                viewBox="0 0 510 203" 
                fill="none"
              >
                <Path d="M510.001 0.5H290.104L318.358 62.7345H383.409V202.654H445.504V62.7345H510.001V0.5Z" fill={primaryColor} />
                <Path d="M177.556 0.5H0V62.7345H85.6263L0 140.42V202.654H177.556V140.42H91.9302L177.556 62.7345V0.5Z" fill={primaryColor} />
                <Path d="M339.137 140.42H248.624V129.701H334.106L317.967 94.6849L308.131 73.4532H248.624V62.7345H302.628L274.353 0.5H248.624H191.766V62.7345V73.4532V129.701V140.42V202.654H248.624H367.946L339.137 140.42Z" fill={primaryColor} />
              </Svg>
            );
            
          case 'duotone':
            return (
              <Svg 
                width={width || size} 
                height={finalHeight} 
                viewBox="0 0 510 203" 
                fill="none"
              >
                <Path d="M510.001 0.5H290.104L318.358 62.7345H383.409V202.654H445.504V62.7345H510.001V0.5Z" fill={duotoneColor} />
                <Path d="M177.556 0.5H0V62.7345H85.6263L0 140.42V202.654H177.556V140.42H91.9302L177.556 62.7345V0.5Z" fill={duotoneColor} />
                <Path d="M339.137 140.42H248.624V129.701H334.106L317.967 94.6849L308.131 73.4532H248.624V62.7345H302.628L274.353 0.5H248.624H191.766V62.7345V73.4532V129.701V140.42V202.654H248.624H367.946L339.137 140.42Z" fill={primaryColor} />
              </Svg>
            );
            
          case 'stroke':
            return (
              <Svg 
                width={width || size} 
                height={finalHeight} 
                viewBox="0 0 510 203" 
                fill="none"
              >
                <Path d="M510.001 0.5H290.104L318.358 62.7345H383.409V202.654H445.504V62.7345H510.001V0.5Z" 
                  stroke={primaryColor} 
                  strokeWidth={strokeWidth} 
                  strokeLinejoin="round" 
                />
                <Path d="M177.556 0.5H0V62.7345H85.6263L0 140.42V202.654H177.556V140.42H91.9302L177.556 62.7345V0.5Z" 
                  stroke={primaryColor} 
                  strokeWidth={strokeWidth} 
                  strokeLinejoin="round" 
                />
                <Path d="M339.137 140.42H248.624V129.701H334.106L317.967 94.6849L308.131 73.4532H248.624V62.7345H302.628L274.353 0.5H248.624H191.766V62.7345V73.4532V129.701V140.42V202.654H248.624H367.946L339.137 140.42Z" 
                  stroke={primaryColor} 
                  strokeWidth={strokeWidth} 
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

export default ZetLogo; 