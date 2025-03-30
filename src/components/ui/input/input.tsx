import React, { forwardRef, useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Pressable,
  ViewStyle,
} from 'react-native';
import { 
  B3, B4, B5, B6, 
  SH3, SH4, SH5 
} from '../typography/typography';
import { responsive } from '../../../utils/responsive';

// Types for the input component
type InputSize = 'sm' | 'md' | 'lg' | 'xl';
type InputVariant = 'outlined' | 'filled' | 'underlined';
type InputState = 'default' | 'disabled' | 'error' | 'success' | 'focused';

// Size configuration for the input with responsive scaling
const getInputSizes = (isResponsive = true) => ({
  sm: isResponsive ? responsive.height(36) : 36,
  md: isResponsive ? responsive.height(40) : 40,
  lg: isResponsive ? responsive.height(48) : 48,
  xl: isResponsive ? responsive.height(56) : 56
});

// Padding configuration for the input with responsive scaling
const getInputPaddings = (isResponsive = true) => ({
  sm: isResponsive ? responsive.width(12) : 12,
  md: isResponsive ? responsive.width(16) : 16,
  lg: isResponsive ? responsive.width(20) : 20,
  xl: isResponsive ? responsive.width(24) : 24
});

// Interface for the input component props
interface InputProps extends Omit<TextInputProps, 'style'> {
  size?: InputSize;
  variant?: InputVariant;
  label?: string;
  error?: string;
  hint?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  style?: ViewStyle | ViewStyle[];
  responsive?: boolean;
}

const Input = forwardRef<TextInput, InputProps>(({
  size = 'md',
  variant = 'outlined',
  label,
  error,
  hint,
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
  placeholder,
  value,
  className = '',
  containerClassName = '',
  style,
  responsive: isResponsive = true,
  onFocus,
  onBlur,
  ...rest
}, ref) => {
  // Get responsive input sizes
  const INPUT_SIZES = getInputSizes(isResponsive);
  const INPUT_PADDINGS = getInputPaddings(isResponsive);
  
  const [isFocused, setIsFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState(INPUT_SIZES[size]);

  // Determine container class name based on variant and state
  const getContainerClass = () => {
    let classes = [
      'rounded-md overflow-hidden',
      fullWidth ? 'w-full' : '',
      containerClassName
    ];

    // Add variant-specific classes
    if (variant === 'outlined') {
      classes.push('border');
      if (error) {
        classes.push('border-error-500');
      } else if (isFocused) {
        classes.push('border-primary-500');
      } else if (disabled) {
        classes.push('border-neutral-200');
      } else {
        classes.push('border-neutral-300');
      }
    } else if (variant === 'filled') {
      if (error) {
        classes.push('bg-error-50');
      } else if (disabled) {
        classes.push('bg-neutral-100');
      } else {
        classes.push('bg-neutral-50');
      }
    } else if (variant === 'underlined') {
      classes.push('border-b');
      if (error) {
        classes.push('border-error-500');
      } else if (isFocused) {
        classes.push('border-primary-500');
      } else if (disabled) {
        classes.push('border-neutral-200');
      } else {
        classes.push('border-neutral-300');
      }
    }

    return classes.filter(Boolean).join(' ');
  };

  // Get the appropriate text component for the label
  const LabelComponent = size === 'sm' ? SH5 : size === 'md' ? SH4 : SH3;
  
  // Get the appropriate text component for the input text
  // For multiline inputs, B6 is more appropriate
  const TextComponent = size === 'sm' ? B5 : size === 'md' ? B3 : B6;
  
  // Get the appropriate text component for hints and errors
  const HintComponent = B4;

  // Apply size-specific styles directly
  const sizeStyles = {
    minHeight: INPUT_SIZES[size],
    paddingHorizontal: INPUT_PADDINGS[size],
  };

  // Get responsive font size
  const getFontSize = () => {
    const baseFontSize = size === 'sm' ? 12 : size === 'md' ? 14 : 16;
    return isResponsive ? responsive.fontSize(baseFontSize) : baseFontSize;
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <View className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <LabelComponent className="mb-1" responsive={isResponsive}>
          {label}
        </LabelComponent>
      )}

      <View className={getContainerClass()}>
        <View className="flex-row items-center">
          {startIcon && (
            <View className="ml-3" style={isResponsive ? { marginLeft: responsive.spacing(12) } : undefined}>
              {startIcon}
            </View>
          )}

          <TextInput
            ref={ref}
            value={value}
            placeholder={placeholder}
            className={`flex-1 px-3 py-2 ${className}`}
            style={[
              sizeStyles,
              {
                fontFamily: 'THICCCBOI-Regular',
                fontSize: getFontSize(),
                color: disabled ? '#a1a1aa' : '#27272a',
              },
              style
            ]}
            placeholderTextColor="#a1a1aa"
            editable={!disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onContentSizeChange={(e) => {
              if (rest.multiline) {
                setInputHeight(Math.max(INPUT_SIZES[size], e.nativeEvent.contentSize.height + 16));
              }
            }}
            {...rest}
          />

          {endIcon && (
            <View className="mr-3" style={isResponsive ? { marginRight: responsive.spacing(12) } : undefined}>
              {endIcon}
            </View>
          )}
        </View>
      </View>

      {(error || hint) && (
        <HintComponent 
          className={`mt-1 ${error ? 'text-error-500' : 'text-neutral-500'}`}
          responsive={isResponsive}
        >
          {error || hint}
        </HintComponent>
      )}
    </View>
  );
});

Input.displayName = 'Input';

export { Input, type InputProps, type InputSize, type InputVariant }; 