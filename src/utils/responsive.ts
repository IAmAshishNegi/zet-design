import { Dimensions, PixelRatio, Platform } from 'react-native';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base screen dimensions (design reference)
// Typically based on your design mockups (e.g., iPhone 11 Pro)
const baseWidth = 375; // iPhone 11 Pro width
const baseHeight = 812; // iPhone 11 Pro height

// App-wide font scale factor (default: 1)
// This can be changed to scale all fonts up or down
let fontScaleFactor = 1.05;

/**
 * Sets the app-wide font scale factor
 * @param scale - Scale factor to apply to all fonts (1 = 100%, 1.1 = 110%, etc.)
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
 * Scales a size based on the width of the screen
 * @param size - The size to scale
 * @returns The scaled size
 */
export const scaleWidth = (size: number): number => {
  // Calculate scale based on screen width relative to base width
  const scale = SCREEN_WIDTH / baseWidth;
  const newSize = size * scale;
  return Math.round(newSize);
};

/**
 * Scales a size based on the height of the screen
 * @param size - The size to scale
 * @returns The scaled size
 */
export const scaleHeight = (size: number): number => {
  // Calculate scale based on screen height relative to base height
  const scale = SCREEN_HEIGHT / baseHeight;
  const newSize = size * scale;
  return Math.round(newSize);
};

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
 * Scales a spacing value (margins, paddings, etc.) based on screen width
 * @param size - The spacing size to scale
 * @returns The responsive spacing size
 */
export const scaleSpacing = (size: number): number => {
  // Calculate scale based on screen width
  const scale = SCREEN_WIDTH / baseWidth;
  
  // Apply scaling with some clamping to avoid too large or too small values
  const newSize = size * Math.min(Math.max(scale, 0.9), 1.15);
  
  return Math.round(newSize);
};

/**
 * Responsive sizing utility methods
 */
export const responsive = {
  width: scaleWidth,
  height: scaleHeight,
  fontSize: scaleFontSize,
  spacing: scaleSpacing,
  fontScale: {
    get: getFontScaleFactor,
    set: setFontScaleFactor
  }
}; 