import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { fontFamily, lineHeight as themeLineHeight, letterSpacingValues } from '../../../styles/theme';
import { responsive } from '../../../utils/responsive';

// Define simplified types
type FontSizeVariant = 
  | '10' | '11' | '12' | '13' | '14' | '16' | '18' | '20' | '24' | '32' | '40'
  | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

type FontFamilyVariant = 'regular' | 'medium' | 'semibold' | 'bold';

type LetterSpacingVariant = 'tight' | 'normal' | 'wide' | 'extraWide' | 'superWide' | 'ultraTight' | 'superTight';

// Component variants for line height mapping
type ComponentVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7'
  | 'sh1' | 'sh2' | 'sh3' | 'sh4' | 'sh5'
  | 'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7' | 'b8' | 'b9'
  | 'buttonLg' | 'buttonMd' | 'buttonSm'
  | 'linkText' | 'linkTextSm' | 'linkTextXs'
  | 'overlineMd' | 'overlineSm';

interface TypographyProps extends TextProps {
  variant?: FontSizeVariant;
  weight?: FontFamilyVariant;
  tracking?: LetterSpacingVariant;
  className?: string;
  // Line height control
  componentVariant?: ComponentVariant;
  // Responsive options
  responsive?: boolean;
  minScale?: number;
  maxScale?: number;
}

// Map weights directly to font family names to ensure correct font selection
const fontFamilyMap = {
  'regular': 'THICCCBOI-Regular',
  'medium': 'THICCCBOI-Medium',
  'semibold': 'THICCCBOI-SemiBold',
  'bold': 'THICCCBOI-Bold'
};

// Map fontSize variants to actual numeric values
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
};

function Typography({ 
  variant = 'base', 
  weight = 'regular',
  tracking = 'normal',
  className = '', 
  style = {},
  componentVariant,
  // Responsive options with defaults
  responsive: isResponsive = true,
  minScale = 0.85,
  maxScale = 1.2,
  children, 
  ...rest 
}: TypographyProps) {
  
  // Construct class names using standard Tailwind patterns
  const classes = [
    // Letter spacing class
    `tracking-${tracking}`,
    
    // User's additional classes
    className
  ].filter(Boolean).join(' ');

  // Get the numeric font size from our map
  const baseFontSize = fontSizeMap[variant] || 16; // Default to 16 if not found
  
  // Apply responsive scaling if enabled
  const fontSize = isResponsive 
    ? responsive.fontSize(baseFontSize, minScale, maxScale)
    : baseFontSize;
    
  // Determine line height if componentVariant is provided
  let lineHeight;
  if (componentVariant && themeLineHeight[componentVariant]) {
    // Convert string like "32px" to number 32
    lineHeight = parseInt(themeLineHeight[componentVariant].replace('px', ''), 10);
  }
  
  // Determine letter spacing if componentVariant is provided
  let letterSpacing;
  if (componentVariant && letterSpacingValues[componentVariant] !== undefined) {
    letterSpacing = letterSpacingValues[componentVariant];
  }
  
  // Apply styles directly
  const combinedStyle = {
    fontFamily: fontFamilyMap[weight],
    fontSize: fontSize,
    ...(lineHeight ? { lineHeight } : {}),
    ...(letterSpacing !== undefined ? { letterSpacing } : {}),
    ...(typeof style === 'object' ? style : {}),
  };

  return (
    <Text 
      className={classes} 
      style={combinedStyle}
      {...rest}
    >
      {children}
    </Text>
  );
}

// ----- Heading Components -----

const H1: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="40" 
    weight="bold" 
    tracking="tight" 
    componentVariant="h1"
    {...props} 
  />
);

const H2: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="32" 
    weight="bold" 
    tracking="tight" 
    componentVariant="h2"
    {...props} 
  />
);

const H3: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="24" 
    weight="bold" 
    tracking="tight" 
    componentVariant="h3"
    {...props} 
  />
);

const H4: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="20" 
    weight="bold" 
    tracking="tight" 
    componentVariant="h4"
    {...props} 
  />
);

const H5: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="18" 
    weight="bold" 
    tracking="tight" 
    componentVariant="h5"
    {...props} 
  />
);

const H6: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="16" 
    weight="bold" 
    tracking="tight" 
    componentVariant="h6"
    {...props} 
  />
);

const H7: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="18" 
    weight="semibold" 
    tracking="tight" 
    componentVariant="h7"
    {...props} 
  />
);

// ----- SubHeading Components -----

const SH1: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="16" 
    weight="semibold" 
    tracking="tight" 
    componentVariant="sh1"
    {...props} 
  />
);

const SH2: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="14" 
    weight="bold" 
    tracking="tight" 
    componentVariant="sh2"
    {...props} 
  />
);

const SH3: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="14" 
    weight="semibold" 
    tracking="tight" 
    componentVariant="sh3"
    {...props} 
  />
);

const SH4: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="12" 
    weight="semibold" 
    tracking="tight" 
    componentVariant="sh4"
    {...props} 
  />
);

const SH5: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="12" 
    weight="bold" 
    tracking="tight" 
    componentVariant="sh5"
    {...props} 
  />
);

// ----- Body Components -----

const B1: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="16" 
    weight="medium" 
    tracking="tight" 
    componentVariant="b1"
    {...props} 
  />
);

const B2: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="14" 
    weight="medium" 
    tracking="tight" 
    componentVariant="b2"
    {...props} 
  />
);

const B3: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="14" 
    weight="regular" 
    tracking="tight" 
    componentVariant="b3"
    {...props} 
  />
);

const B4: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="12" 
    weight="medium" 
    tracking="tight" 
    componentVariant="b4"
    {...props} 
  />
);

const B5: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="12" 
    weight="regular" 
    tracking="tight" 
    componentVariant="b5"
    {...props} 
  />
);

const B6: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="16" 
    weight="regular" 
    tracking="tight" 
    componentVariant="b6"
    {...props} 
  />
);

const B7: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="13" 
    weight="medium" 
    tracking="normal" 
    componentVariant="b7"
    {...props} 
  />
);

const B8: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="13" 
    weight="regular" 
    tracking="normal" 
    componentVariant="b8"
    {...props} 
  />
);

const B9: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="11" 
    weight="medium" 
    tracking="normal" 
    componentVariant="b9"
    {...props} 
  />
);

// ----- Link Components -----

const LinkText: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = ({ className = '', ...props }) => (
  <Typography 
    variant="16" 
    weight="medium" 
    tracking="tight" 
    componentVariant="linkText"
    className={`text-primary-600 underline ${className}`} 
    {...props} 
  />
);

const LinkTextSm: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = ({ className = '', ...props }) => (
  <Typography 
    variant="14" 
    weight="medium" 
    tracking="tight" 
    componentVariant="linkTextSm"
    className={`text-primary-600 underline ${className}`} 
    {...props} 
  />
);

const LinkTextXs: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = ({ className = '', ...props }) => (
  <Typography 
    variant="12" 
    weight="medium" 
    tracking="tight" 
    componentVariant="linkTextXs"
    className={`text-primary-600 underline ${className}`} 
    {...props} 
  />
);

// ----- Button Components -----

const ButtonLg: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="16" 
    weight="semibold" 
    tracking="tight" 
    componentVariant="buttonLg"
    {...props} 
  />
);

const ButtonMd: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="14" 
    weight="semibold" 
    tracking="tight" 
    componentVariant="buttonMd"
    {...props} 
  />
);

const ButtonSm: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = (props) => (
  <Typography 
    variant="12" 
    weight="semibold" 
    tracking="tight" 
    componentVariant="buttonSm"
    {...props} 
  />
);

// ----- Overline Components -----

const OverlineMd: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = ({ className = '', ...props }) => (
  <Typography 
    variant="12" 
    weight="medium" 
    tracking="wide" 
    componentVariant="overlineMd"
    className={`uppercase ${className}`} 
    {...props} 
  />
);

const OverlineSm: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = ({ className = '', ...props }) => (
  <Typography 
    variant="10" 
    weight="semibold" 
    tracking="normal" 
    componentVariant="overlineSm"
    className={`uppercase ${className}`} 
    {...props} 
  />
);

// Utility function to set the app-wide font scale
// This can be called from settings or elsewhere to adjust all text sizes
export const setAppFontScale = (scale: number) => {
  responsive.fontScale.set(scale);
};

// Utility function to get the current app-wide font scale
export const getAppFontScale = () => responsive.fontScale.get();

// Example of how to create a custom typography component with specific letter spacing
const SpacedText: React.FC<Omit<TypographyProps, 'variant' | 'weight' | 'tracking' | 'componentVariant'>> = ({ className = '', style = {}, ...props }) => (
  <Typography 
    variant="16" 
    weight="bold" 
    tracking="superWide" // Using one of our new letter spacing values
    style={{
      letterSpacing: 2, // Direct numeric value in pixels
      ...(style as any) // Type assertion to avoid the spread error
    }}
    {...props} 
  />
);

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
  OverlineMd, OverlineSm,
  
  // Custom example
  SpacedText
};