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
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '11': '44px',
        '12': '48px',
        '13': '52px',
        '14': '56px',
        '15': '60px',
        '16': '64px',
        '17': '68px',
        '18': '72px',
        '19': '76px',
        '20': '80px',
        '21': '84px',
        '22': '88px',
        '23': '92px',
        '24': '96px',
        '25': '100px',
        '26': '104px',
        '27': '108px',
        '28': '112px',
        '29': '116px',
        '30': '120px',
        '31': '124px',
        '32': '128px',
        
    
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

