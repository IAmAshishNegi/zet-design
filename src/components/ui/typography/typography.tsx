import React, { memo, useMemo } from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { fontFamily, lineHeight as themeLineHeight } from '../../../styles/theme';
import { responsive } from '../../../utils/responsive';

// Define simplified types
type FontSizeVariant = 
  | '10' | '11' | '12' | '13' | '14' | '16' | '18' | '20' | '24' | '32' | '40'
  | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

type FontFamilyVariant = 'regular' | 'medium' | 'semibold' | 'bold';

type LetterSpacingVariant = 'tight' | 'normal' | 'wide';

interface TypographyProps extends TextProps {
  variant?: FontSizeVariant;
  weight?: FontFamilyVariant;
  tracking?: LetterSpacingVariant;
  className?: string;
  // Add responsive options
  responsive?: boolean;
  minScale?: number;
  maxScale?: number;
}

// ** Performance Optimization: Memoized font family map **
const fontFamilyMap = {
  'regular': 'THICCCBOI-Regular',
  'medium': 'THICCCBOI-Medium',
  'semibold': 'THICCCBOI-SemiBold',
  'bold': 'THICCCBOI-Bold'
} as const;

// ** Performance Optimization: Memoized font size map **
const fontSizeMap = {
  // Named sizes
  'xs': 12,
  'sm': 14,
  'base': 16,
  'lg': 18,
  'xl': 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  
  // Numeric sizes
  '10': 10,
  '11': 11,
  '12': 12,
  '13': 13,
  '14': 14,
  '16': 16,
  '18': 18,
  '20': 20,
  '24': 24,
  '32': 32,
  '40': 40,
} as const;

// Map component types to their specific line heights
const lineHeightMap = {
  'h1': themeLineHeight.h1,
  'h2': themeLineHeight.h2,
  'h3': themeLineHeight.h3,
  'h4': themeLineHeight.h4,
  'h5': themeLineHeight.h5,
  'h6': themeLineHeight.h6,
  'b1': themeLineHeight.b1,
  'b2': themeLineHeight.b2,
  'b4': themeLineHeight.b4,
  'b9': themeLineHeight.b9,
};

// ** Performance Optimization: Memoized Typography component **
const Typography = memo<TypographyProps>(({ 
  variant = 'base', 
  weight = 'regular',
  tracking = 'normal',
  className = '', 
  style = {},
  // Responsive options with defaults
  responsive: isResponsive = true,
  minScale = 0.85,
  maxScale = 1.2,
  children, 
  ...rest 
}) => {
  
  // ** Performance Optimization: Memoize class names **
  const classes = useMemo(() => [
    // Letter spacing class
    `tracking-${tracking}`,
    
    // User's additional classes
    className
  ].filter(Boolean).join(' '), [tracking, className]);

  // ** Performance Optimization: Memoize font calculations **
  const computedStyle = useMemo(() => {
    // Get the numeric font size from our map
    const baseFontSize = fontSizeMap[variant] || 16; // Default to 16 if not found
    
    // Apply responsive scaling if enabled
    const fontSize = isResponsive 
      ? responsive.fontSize(baseFontSize, minScale, maxScale)
      : baseFontSize;
    
    // Apply styles directly including both fontFamily and fontSize
    // This ensures both are applied correctly regardless of Tailwind/NativeWind behavior
    return {
      fontFamily: fontFamilyMap[weight],
      fontSize: fontSize,
      ...(typeof style === 'object' ? style : {}),
    };
  }, [variant, weight, isResponsive, minScale, maxScale, style]);

  return (
    <Text 
      className={classes} 
      style={computedStyle}
      {...rest}
    >
      {children}
    </Text>
  );
});

// Set display name for debugging
Typography.displayName = 'Typography';

// ----- Heading Components (Memoized) -----

const H1 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="40" weight="bold" tracking="tight" {...props} />
));
H1.displayName = 'H1';

const H2 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="32" weight="bold" tracking="tight" {...props} />
));
H2.displayName = 'H2';

const H3 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="24" weight="bold" tracking="tight" {...props} />
));
H3.displayName = 'H3';

const H4 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="20" weight="bold" tracking="tight" {...props} />
));
H4.displayName = 'H4';

const H5 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="18" weight="bold" tracking="tight" {...props} />
));
H5.displayName = 'H5';

const H6 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="16" weight="bold" tracking="tight" {...props} />
));
H6.displayName = 'H6';

const H7 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="18" weight="semibold" tracking="tight" {...props} />
));
H7.displayName = 'H7';

// ----- SubHeading Components (Memoized) -----

const SH1 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="16" weight="semibold" tracking="tight" {...props} />
));
SH1.displayName = 'SH1';

const SH2 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="14" weight="bold" tracking="tight" {...props} />
));
SH2.displayName = 'SH2';

const SH3 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="14" weight="semibold" tracking="tight" {...props} />
));
SH3.displayName = 'SH3';

const SH4 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="12" weight="semibold" tracking="tight" {...props} />
));
SH4.displayName = 'SH4';

const SH5 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="12" weight="bold" tracking="tight" {...props} />
));
SH5.displayName = 'SH5';

// ----- Body Components (Memoized) -----

const B1 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="16" weight="medium" tracking="tight" {...props} />
));
B1.displayName = 'B1';

const B2 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="14" weight="medium" tracking="tight" {...props} />
));
B2.displayName = 'B2';

const B3 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="14" weight="regular" tracking="tight" {...props} />
));
B3.displayName = 'B3';

const B4 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="12" weight="medium" tracking="tight" {...props} />
));
B4.displayName = 'B4';

const B5 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="12" weight="regular" tracking="tight" {...props} />
));
B5.displayName = 'B5';

const B6 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="16" weight="regular" tracking="tight" {...props} />
));
B6.displayName = 'B6';

const B7 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="13" weight="medium" tracking="normal" {...props} />
));
B7.displayName = 'B7';

const B8 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="13" weight="regular" tracking="normal" {...props} />
));
B8.displayName = 'B8';

const B9 = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="11" weight="medium" tracking="normal" {...props} />
));
B9.displayName = 'B9';

// ----- Link Components (Memoized) -----

const LinkText = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>(({ className = '', ...props }) => (
  <Typography 
    variant="16" 
    weight="medium" 
    tracking="tight" 
    className={`text-primary-600 underline ${className}`} 
    {...props} 
  />
));
LinkText.displayName = 'LinkText';

const LinkTextSm = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>(({ className = '', ...props }) => (
  <Typography 
    variant="14" 
    weight="medium" 
    tracking="tight" 
    className={`text-primary-600 underline ${className}`} 
    {...props} 
  />
));
LinkTextSm.displayName = 'LinkTextSm';

const LinkTextXs = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>(({ className = '', ...props }) => (
  <Typography 
    variant="12" 
    weight="medium" 
    tracking="tight" 
    className={`text-primary-600 underline ${className}`} 
    {...props} 
  />
));
LinkTextXs.displayName = 'LinkTextXs';

// ----- Button Components (Memoized) -----

const ButtonLg = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="16" weight="semibold" tracking="tight" {...props} />
));
ButtonLg.displayName = 'ButtonLg';

const ButtonMd = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="14" weight="semibold" tracking="tight" {...props} />
));
ButtonMd.displayName = 'ButtonMd';

const ButtonSm = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>((props) => (
  <Typography variant="12" weight="semibold" tracking="tight" {...props} />
));
ButtonSm.displayName = 'ButtonSm';

// ----- Overline Components (Memoized) -----

const OverlineMd = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>(({ className = '', ...props }) => (
  <Typography 
    variant="12" 
    weight="medium" 
    tracking="wide" 
    className={`uppercase ${className}`} 
    {...props} 
  />
));
OverlineMd.displayName = 'OverlineMd';

const OverlineSm = memo<Omit<TypographyProps, 'variant' | 'weight' | 'tracking'>>(({ className = '', ...props }) => (
  <Typography 
    variant="10" 
    weight="semibold" 
    tracking="normal" 
    className={`uppercase ${className}`} 
    {...props} 
  />
));
OverlineSm.displayName = 'OverlineSm';

// Utility function to set the app-wide font scale
// This can be called from settings or elsewhere to adjust all text sizes
export const setAppFontScale = (scale: number) => {
  responsive.fontScale.set(scale);
};

// Utility function to get the current app-wide font scale
export const getAppFontScale = () => responsive.fontScale.get();

export { 
  Typography,
  
  // Headings
  H1, H2, H3, H4, H5, H6, H7,
  
  // SubHeadings
  SH1, SH2, SH3, SH4, SH5,
  
  // Body Text
  B1, B2, B3, B4, B5, B6, B7, B8, B9,
  
  // Links
  LinkText, LinkTextSm, LinkTextXs,
  
  // Button Text
  ButtonLg, ButtonMd, ButtonSm,
  
  // Overlines
  OverlineMd, OverlineSm
};