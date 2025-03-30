const { colors, spacing, borderRadius, fontFamily, fontWeight, fontSize, lineHeight, letterSpacing, letterSpacingValues } = require('./src/styles/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Update this path to include all files where you'll use Tailwind classes
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // Add the NativeWind preset
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      spacing,
      borderRadius,
      fontFamily,
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

