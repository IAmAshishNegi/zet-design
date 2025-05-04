const { colors, spacing, borderRadius, fontSize, lineHeight, letterSpacing, letterSpacingValues } = require('./src/styles/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Update this path to include all files where you'll use Tailwind classes
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // Add the NativeWind preset
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      spacing: {
        ...spacing,
       
        '24': '96px',
        '28': '112px',
        '26': '104px',
        '30': '120px',
        '32': '128px',
        '36': '144px',
        '40': '160px',
        '44': '176px',
        '48': '192px',
        '52': '208px',
        '56': '224px',
        '60': '240px',
      },
      borderRadius,
      // Remove fontFamily extension - we're handling this directly in component styles
      // Define fontSize with direct numeric values for React Native
      fontSize: {
        // Numeric sizes - using direct numbers without px for React Native
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
      },
      width: {
        '18': '72px',
      },
      height: {
        '18': '72px',
      },
      lineHeight,
      letterSpacing,
      // Add specific letter spacing values
      letterSpacingSpecific: letterSpacingValues,
      // Explicit font weights
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
  },
  plugins: [],
}

