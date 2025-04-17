import { Dimensions, PixelRatio, Platform } from 'react-native';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base screen dimensions (design reference)
const baseWidth = 375; // iPhone 11 Pro width
const baseHeight = 812; // iPhone 11 Pro height

// App-wide font scale factor (default: 1)
let fontScaleFactor = 1;

/**
 * Sets the app-wide font scale factor
 * @param scale - Scale factor to apply to all fonts
 */
export const setFontScaleFactor = (scale: number) => {
  fontScaleFactor = scale;
};

/**
 * Gets the current font scale factor
 * @returns The current font scale factor
 */
export const getFontScaleFactor = () => fontScaleFactor;

/**
 * Scales a font size based on screen size with clamping and app-wide scaling
 * @param size - The font size to scale
 * @param minScale - Minimum scale factor (defaults to 0.85)
 * @param maxScale - Maximum scale factor (defaults to 1.2)
 * @returns The responsive font size
 */
export const scaleFontSize = (size: number, minScale = 0.85, maxScale = 1.2): number => {
  // Calculate scale based on screen size
  const widthScale = SCREEN_WIDTH / baseWidth;
  
  // Clamp the scale between min and max scale factors
  const clampedScale = Math.min(Math.max(widthScale, minScale), maxScale);
  
  // Apply both the clamped screen scale and the app-wide font scale factor
  const finalSize = size * clampedScale * fontScaleFactor;
  
  // Use PixelRatio to handle different pixel densities
  return Math.round(PixelRatio.roundToNearestPixel(finalSize));
};

/**
 * Scales line height based on font size and a line height multiplier
 * @param fontSize - The font size (before scaling)
 * @param multiplier - Line height multiplier (1.2-1.5 typically)
 * @returns Scaled line height
 */
export const scaleLineHeight = (fontSize: number, multiplier = 1.3): number => {
  const scaledFontSize = scaleFontSize(fontSize);
  return Math.round(scaledFontSize * multiplier);
};

/**
 * Font utility functions
 */
export const fontUtils = {
  scaleFontSize,
  scaleLineHeight,
  fontScale: {
    get: getFontScaleFactor,
    set: setFontScaleFactor
  }
}; 