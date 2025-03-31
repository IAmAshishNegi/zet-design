import React, { useMemo, useState } from 'react';
import { View, Image } from 'react-native';
import { H3 } from './typography/typography';

// Color palette for background colors when no image is provided
const BACKGROUND_COLORS = [
  '#FF5733', // Red
  '#33FF57', // Green
  '#3357FF', // Blue
  '#821954', // Pink
  '#33A8FF', // Light Blue
  '#A833FF', // Purple
  '#FF9F33', // Orange
  '#075247', // Teal
  '#5a0c37', // Magenta
  '#7833FF'  // Violet
];

type AvatarProps = {
  source?: string | null;
  name?: string;
  size?: number;
  borderRadius?: number;
  textColor?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'small';
};

const getInitials = (name?: string): string => {
  if (!name) return '';
  
  // Split by spaces and get the first letter of each part
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2); // Limit to 2 characters
};

// Get a consistent color for a specific name
const getColorForName = (name?: string): string => {
  if (!name) return BACKGROUND_COLORS[0];
  
  // Generate a simple hash of the name
  const hash = name.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  // Use the hash to pick a color
  return BACKGROUND_COLORS[hash % BACKGROUND_COLORS.length];
};

export const Avatar = ({
  source,
  name = '',
  size = 48,
  borderRadius,
  textColor = '#FFFFFF',
  className = '',
  variant = 'default',
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Calculate effective size based on variant
  const effectiveSize = variant === 'small' ? size * 0.75 : size;
  
  // Calculate borderRadius based on size if not explicitly provided
  const effectiveBorderRadius = borderRadius ?? effectiveSize / 2;
  
  // Memoize initials to avoid recalculation
  const initials = useMemo(() => getInitials(name), [name]);
  
  // Memoize background color to keep it consistent
  const backgroundColor = useMemo(() => getColorForName(name), [name]);
  
  // Check if we should show the image
  const shouldShowImage = source && !imageError;
  
  // Build conditional className based on variant
  const containerClassName = `
    justify-center 
    items-center 
    overflow-hidden 
    ${variant === 'outline' ? 'border-2 border-white' : ''} 
    ${variant === 'small' ? 'border border-neutral-200' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <View
      className={containerClassName}
      style={{
        width: effectiveSize,
        height: effectiveSize,
        borderRadius: effectiveBorderRadius,
        backgroundColor: shouldShowImage ? 'transparent' : backgroundColor,
      }}
    >
      {shouldShowImage ? (
        <Image
          source={{ uri: source }}
          className="w-full h-full"
          style={{
            borderRadius: effectiveBorderRadius
          }}
          onError={() => setImageError(true)}
        />
      ) : (
        <H3 
          className={`
            text-center 
            ${variant === 'small' ? 'font-medium' : 'font-semibold'}
          `}
          style={{
            color: textColor
          }}
        >
          {initials}
        </H3>
      )}
    </View>
  );
}; 