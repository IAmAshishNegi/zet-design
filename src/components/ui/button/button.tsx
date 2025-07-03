import React, { memo, useMemo, useCallback } from 'react';
import { 
  TouchableOpacity, 
  TouchableOpacityProps, 
  StyleSheet, 
  ActivityIndicator,
  View,
  Pressable,
  Text
} from 'react-native';
import { ButtonLg, ButtonMd, ButtonSm } from '../typography/typography';
import { colors } from '../../../styles/theme';
import { responsive } from '../../../utils/responsive';

// Types for the button props
type ButtonVariant = 'filled' | 'outlined' | 'text';
type ButtonColor = string; // Allow any color string from theme
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

// ** Performance Optimization: Memoized size configuration **
const getButtonSizes = (isResponsive = true) => ({
  sm: isResponsive ? responsive.height(36) : 36,
  md: isResponsive ? responsive.height(40) : 40,
  lg: isResponsive ? responsive.height(48) : 48,
  xl: isResponsive ? responsive.height(56) : 56
});

// ** Performance Optimization: Memoized padding configuration **
const getButtonPaddings = (isResponsive = true) => ({
  sm: isResponsive ? responsive.width(12) : 12,
  md: isResponsive ? responsive.width(16) : 16,
  lg: isResponsive ? responsive.width(20) : 20,
  xl: isResponsive ? responsive.width(24) : 24
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
  onPress?: () => void;
  responsive?: boolean;
}

// ** Performance Optimization: Memoized Button component **
const Button = memo<ButtonProps>(({
  variant = 'filled',
  color = 'primary-100',
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
  onPress,
  responsive: isResponsive = true,
  ...rest
}) => {
  // ** Performance Optimization: Memoize color parsing **
  const colorParts = useMemo(() => {
    const parts = color.split('-');
    const colorBase = parts[0] || 'primary';
    const colorShade = parts.length > 1 ? parts[1] : '100';
    // For filled buttons, use a darker shade (600) if not specified for better contrast
    const filledShade = variant === 'filled' && parts.length === 1 ? '600' : colorShade;
    return { colorBase, colorShade, filledShade };
  }, [color, variant]);

  // ** Performance Optimization: Memoize theme color getter **
  const getThemeColor = useCallback((base: string, shade: string) => {
    try {
      // @ts-ignore - accessing colors dynamically
      return colors[base]?.[shade] || '#000';
    } catch (e) {
      console.warn(`Color ${base}-${shade} not found in theme`);
      return '#000';
    }
  }, []);

  // ** Performance Optimization: Memoize color calculations **
  const colorScheme = useMemo(() => {
    const { colorBase, filledShade } = colorParts;
    
    // Default styles
    let backgroundColor = 'transparent';
    let textColor = getThemeColor(colorBase, filledShade);
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
        backgroundColor = getThemeColor(colorBase, filledShade);
        // Use white text for dark backgrounds, dark text for light backgrounds
        const shadeNum = parseInt(colorParts.colorShade);
        textColor = shadeNum <= 300 ? getThemeColor(colorBase, '800') : '#ffffff';
      } else if (variant === 'outlined') {
        borderColor = getThemeColor(colorBase, filledShade);
      }
    }
    
    return { backgroundColor, textColor, borderColor };
  }, [colorParts, variant, disabled, getThemeColor]);

  // ** Performance Optimization: Memoize class names **
  const buttonClasses = useMemo(() => [
    // Base button styles
    'flex flex-row items-center justify-center',
    'rounded-md',
    // Width class
    fullWidth ? 'w-full' : '',
    // Additional classes provided by user
    className
  ].filter(Boolean).join(' '), [fullWidth, className]);

  // ** Performance Optimization: Memoize text component selection **
  const TextComponent = useMemo(() => {
    return size === 'sm' 
      ? ButtonSm 
      : size === 'lg' || size === 'xl' 
        ? ButtonLg 
        : ButtonMd;
  }, [size]);

  // ** Performance Optimization: Memoize button styles **
  const buttonStyles = useMemo(() => {
    const BUTTON_SIZES = getButtonSizes(isResponsive);
    const BUTTON_PADDINGS = getButtonPaddings(isResponsive);
    
    return {
      height: BUTTON_SIZES[size],
      paddingHorizontal: BUTTON_PADDINGS[size],
      backgroundColor: colorScheme.backgroundColor,
      borderWidth: variant === 'outlined' ? 1 : 0,
      borderColor: colorScheme.borderColor,
      ...(typeof style === 'object' ? style : {}),
    };
  }, [size, isResponsive, colorScheme, variant, style]);

  // ** Performance Optimization: Memoize children rendering function **
  const renderChildren = useCallback(() => {
    // If children is a string, wrap it in the appropriate text component
    if (typeof children === 'string') {
      return (
        <TextComponent style={{ color: colorScheme.textColor }} responsive={isResponsive}>
          {children}
        </TextComponent>
      );
    }
    // Otherwise return the children as is
    return children;
  }, [children, TextComponent, colorScheme.textColor, isResponsive]);

  // ** Performance Optimization: Memoize icon styles **
  const iconMarginStyle = useMemo(() => 
    isResponsive ? { marginRight: responsive.spacing(8) } : undefined
  , [isResponsive]);

  const endIconMarginStyle = useMemo(() => 
    isResponsive ? { marginLeft: responsive.spacing(8) } : undefined
  , [isResponsive]);

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
          color={colorScheme.textColor} 
        />
      ) : (
        <>
          {startIcon && (
            <View className="mr-2" style={iconMarginStyle}>
              {startIcon}
            </View>
          )}
          
          {label && (
            <TextComponent style={{ color: colorScheme.textColor }} responsive={isResponsive}>
              {label}
            </TextComponent>
          )}
          
          {renderChildren()}
          
          {endIcon && (
            <View className="ml-2" style={endIconMarginStyle}>
              {endIcon}
            </View>
          )}
        </>
      )}
    </Pressable>
  );
});

// Set display name for debugging
Button.displayName = 'Button';

export { Button, type ButtonProps, type ButtonVariant, type ButtonColor, type ButtonSize }; 