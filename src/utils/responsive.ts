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

// ** Performance Optimization: Memoization Cache **
const cache = new Map<string, number>();

/**
 * Memoized calculation helper
 * @param key - Cache key
 * @param calculator - Function to calculate the value if not cached
 * @returns Cached or calculated value
 */
function memoize<T>(key: string, calculator: () => T): T {
  if (cache.has(key)) {
    return cache.get(key) as T;
  }
  const result = calculator();
  cache.set(key, result as number);
  return result;
}

/**
 * Clear the cache (useful for screen orientation changes)
 */
export const clearCache = () => {
  cache.clear();
};

/**
 * Sets the app-wide font scale factor
 * @param scale - Scale factor to apply to all fonts (1 = 100%, 1.1 = 110%, etc.)
 */
export const setFontScaleFactor = (scale: number) => {
  fontScaleFactor = scale;
  // Clear cache when font scale changes
  cache.clear();
};

/**
 * Gets the current font scale factor
 * @returns The current font scale factor
 */
export const getFontScaleFactor = () => fontScaleFactor;

/**
 * Scales a size based on the width of the screen (memoized)
 * @param size - The size to scale
 * @returns The scaled size
 */
export const scaleWidth = (size: number): number => {
  const key = `width_${size}`;
  return memoize(key, () => {
    // Calculate scale based on screen width relative to base width
    const scale = SCREEN_WIDTH / baseWidth;
    const newSize = size * scale;
    return Math.round(newSize);
  });
};

/**
 * Scales a size based on the height of the screen (memoized)
 * @param size - The size to scale
 * @returns The scaled size
 */
export const scaleHeight = (size: number): number => {
  const key = `height_${size}`;
  return memoize(key, () => {
    // Calculate scale based on screen height relative to base height
    const scale = SCREEN_HEIGHT / baseHeight;
    const newSize = size * scale;
    return Math.round(newSize);
  });
};

/**
 * Scales a font size based on screen size with clamping and app-wide scaling (memoized)
 * @param size - The font size to scale
 * @param minScale - Minimum scale factor (defaults to 0.85)
 * @param maxScale - Maximum scale factor (defaults to 1.2)
 * @returns The responsive font size
 */
export const scaleFontSize = (size: number, minScale = 0.85, maxScale = 1.2): number => {
  const key = `font_${size}_${minScale}_${maxScale}_${fontScaleFactor}`;
  return memoize(key, () => {
    // Calculate scale based on screen size
    const widthScale = SCREEN_WIDTH / baseWidth;
    
    // Clamp the scale between min and max scale factors
    const clampedScale = Math.min(Math.max(widthScale, minScale), maxScale);
    
    // Apply both the clamped screen scale and the app-wide font scale factor
    const finalSize = size * clampedScale * fontScaleFactor;
    
    // Use PixelRatio to handle different pixel densities
    return Math.round(PixelRatio.roundToNearestPixel(finalSize));
  });
};

/**
 * Scales a spacing value (margins, paddings, etc.) based on screen width (memoized)
 * @param size - The spacing size to scale
 * @returns The responsive spacing size
 */
export const scaleSpacing = (size: number): number => {
  const key = `spacing_${size}`;
  return memoize(key, () => {
    // Calculate scale based on screen width
    const scale = SCREEN_WIDTH / baseWidth;
    
    // Apply scaling with some clamping to avoid too large or too small values
    const newSize = size * Math.min(Math.max(scale, 0.9), 1.15);
    
    return Math.round(newSize);
  });
};

// ** Performance Optimization: Pre-calculate common values **
const commonSizes = [8, 12, 16, 20, 24, 32, 40, 48, 56, 64];
const commonSpacing = [4, 8, 12, 16, 20, 24, 32, 40];

// Pre-populate cache with common values
commonSizes.forEach(size => {
  scaleWidth(size);
  scaleHeight(size);
  scaleFontSize(size);
});

commonSpacing.forEach(size => {
  scaleSpacing(size);
});

/**
 * Responsive sizing utility methods (with memoization)
 */
export const responsive = {
  width: scaleWidth,
  height: scaleHeight,
  fontSize: scaleFontSize,
  spacing: scaleSpacing,
  fontScale: {
    get: getFontScaleFactor,
    set: setFontScaleFactor
  },
  clearCache
};

// ** Performance Optimization: Listen for orientation changes **
let orientationListener: any = null;

// Clear cache on orientation change to recalculate for new dimensions
if (Platform.OS !== 'web') {
  orientationListener = Dimensions.addEventListener('change', () => {
    clearCache();
    // Re-populate cache with common values for new dimensions
    const { width, height } = Dimensions.get('window');
    if (width !== SCREEN_WIDTH || height !== SCREEN_HEIGHT) {
      commonSizes.forEach(size => {
        scaleWidth(size);
        scaleHeight(size);
        scaleFontSize(size);
      });
      commonSpacing.forEach(size => {
        scaleSpacing(size);
      });
    }
  });
}

// Cleanup function for orientation listener
export const cleanup = () => {
  if (orientationListener && Platform.OS !== 'web') {
    orientationListener?.remove();
  }
}; 