import React from 'react';
import { 
  TouchableOpacity, 
  TouchableOpacityProps, 
  StyleSheet, 
  ActivityIndicator,
  View,
  Pressable,
  Text,
  TextStyle
} from 'react-native';
import { ButtonLg, ButtonMd, ButtonSm } from '../typography/typography';
import { colors } from '../../../styles/theme';
import { fontFamilyMap } from '../typography/typography';

// Types for the button props
type ButtonVariant = 'filled' | 'outlined' | 'text';
type ButtonColor = string; // Allow any color string from theme
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Size configuration for the button with fixed values
const getButtonSizes = (isResponsive = true) => ({
  xs: 30,
  sm: 36,
  md: 40,
  lg: 48,
  xl: 56
});

// Padding configuration for the button with fixed values
const getButtonPaddings = (isResponsive = true) => ({
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24
});

// Border radius configuration based on size
const getButtonBorderRadius = (isResponsive = true) => ({
  xs: 6,
  sm: 8,
  md: 12,
  lg: 12,
  xl: 16
});

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
  style?: TouchableOpacityProps['style'];
  textStyle?: TextStyle;
  onPress?: () => void;
  responsive?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  color = 'primary',
  size = 'md',
  fullWidth = false,
  startIcon,
  endIcon,
  loading = false,
  disabled = false,
  label,
  children,
  className = '',
  style,
  textStyle,
  onPress,
  responsive: isResponsive = true,
  ...rest
}) => {
  // Parse the color into base and shade (e.g., "primary-600" -> "primary" and "600")
  const colorParts = color.split('-');
  const colorBase = colorParts[0] || 'primary';
  const colorShade = colorParts.length > 1 ? colorParts[1] : '600';
  
  // Helper to get color from theme
  const getThemeColor = (base: string, shade: string) => {
    try {
      // @ts-ignore - accessing colors dynamically
      return colors[base]?.[shade] || '#000';
    } catch (e) {
      console.warn(`Color ${base}-${shade} not found in theme`);
      return '#000';
    }
  };

  // Get the appropriate colors based on variant and state
  const getColors = () => {
    // Default styles
    let backgroundColor = 'transparent';
    let textColor = getThemeColor(colorBase, colorShade);
    let borderColor = 'transparent';
    
    if (disabled) {
      // Disabled state styling
      if (variant === 'filled') {
        backgroundColor = '#e4e4e7'; // neutral-200
        textColor = '#71717a'; // neutral-500
      } else {
        textColor = '#a1a1aa'; // neutral-400
        if (variant === 'outlined') {
          borderColor = '#e4e4e7'; // neutral-200
        }
      }
    } else {
      // Enabled state styling
      if (variant === 'filled') {
        backgroundColor = getThemeColor(colorBase, colorShade);
        // Use white text for dark backgrounds, dark text for light backgrounds
        const shadeNum = parseInt(colorShade);
        textColor = shadeNum <= 300 ? getThemeColor(colorBase, '800') : '#ffffff';
      } else if (variant === 'outlined') {
        borderColor = getThemeColor(colorBase, colorShade);
      }
    }
    
    return { backgroundColor, textColor, borderColor };
  };

  // Get calculated colors
  const { backgroundColor, textColor, borderColor } = getColors();

  // Check for text color class in className
  const hasTextColorClass = className.includes('text-');
  
  // Check for font weight class in className
  const hasFontWeightClass = className.includes('font-');
  
  // Extract text color class from className
  const textColorClass = hasTextColorClass ? 
    className.match(/text-[a-z]+-\d+/)?.[0] : undefined;
    
  // Extract font weight class from className
  const fontWeightClass = hasFontWeightClass ?
    className.match(/font-[a-z]+/)?.[0] : undefined;

  // Check for width class in className
  const hasWidthClass = className.includes('w-');

  // Determine the width class based on fullWidth or className
  const getWidthClass = () => {
    if (hasWidthClass) return '';
    return fullWidth ? 'w-full' : '';
  };

  // Combine all Tailwind classes
  const buttonClasses = [
    // Base button styles
    'flex flex-row items-center justify-center',
    // Width class
    getWidthClass(),
    // Additional classes provided by user
    className
  ].filter(Boolean).join(' ');

  // Determine which typography component to use based on size
  const TextComponent = size === 'xs' 
    ? ButtonSm 
    : size === 'sm' 
    ? ButtonMd 
    : size === 'lg' || size === 'xl' 
      ? ButtonLg 
      : ButtonMd;

  // Get button sizes
  const BUTTON_SIZES = getButtonSizes(isResponsive);
  const BUTTON_PADDINGS = getButtonPaddings(isResponsive);
  const BUTTON_BORDER_RADIUS = getButtonBorderRadius(isResponsive);

  // Apply all styles directly
  const buttonStyles = {
    height: BUTTON_SIZES[size],
    paddingHorizontal: BUTTON_PADDINGS[size],
    backgroundColor,
    borderWidth: variant === 'outlined' ? 1 : 0,
    borderColor,
    borderRadius: BUTTON_BORDER_RADIUS[size],
    ...(typeof style === 'object' ? style : {}),
  };

  // Combine both the theme text color and any custom text style
  const combinedTextStyle = {
    color: hasTextColorClass ? undefined : textColor,
    ...(textStyle || {})
  };

  // Handle font weight in a way that preserves the font family
  if (textStyle?.fontWeight) {
    // Map numeric or string weight to font family
    let fontFamilyKey: 'regular' | 'medium' | 'semibold' | 'bold' = 'medium'; // Default for buttons
    
    if (textStyle.fontWeight === '600' || textStyle.fontWeight === 'semibold') {
      fontFamilyKey = 'semibold';
    } else if (textStyle.fontWeight === '700' || textStyle.fontWeight === 'bold') {
      fontFamilyKey = 'bold';
    } else if (textStyle.fontWeight === '400' || textStyle.fontWeight === 'normal') {
      fontFamilyKey = 'regular';
    }
    
    // Override the fontFamily to use the correct weight
    combinedTextStyle.fontFamily = fontFamilyMap[fontFamilyKey];
    
    // Remove the fontWeight to prevent React Native from trying to apply both
    delete combinedTextStyle.fontWeight;
  }

  // Function to render children properly
  const renderChildren = () => {
    // If children is a string, wrap it in the appropriate text component
    if (typeof children === 'string') {
      return (
        <TextComponent 
          style={combinedTextStyle} 
          responsive={isResponsive}
          className={`${textColorClass || ''} ${fontWeightClass || ''}`}
        >
          {children}
        </TextComponent>
      );
    }
    // Otherwise return the children as is
    return children;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={buttonClasses}
      style={buttonStyles}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={textColor} 
        />
      ) : (
        <>
          {startIcon && (
            <View className="mr-2">
              {startIcon}
            </View>
          )}
          
          {label && (
            <TextComponent 
              style={combinedTextStyle} 
              responsive={isResponsive}
              className={`${textColorClass || ''} ${fontWeightClass || ''}`}
            >
              {label}
            </TextComponent>
          )}
          
          {renderChildren()}
          
          {endIcon && (
            <View className="ml-2">
              {endIcon}
            </View>
          )}
        </>
      )}
    </Pressable>
  );
};

export { Button, type ButtonProps, type ButtonVariant, type ButtonColor, type ButtonSize };