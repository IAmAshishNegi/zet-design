export const colors = {
  primary: {
    "50": "#FBF3FF",
    "100": "#F7F1FB",
    "200": "#E3D0F2",
    "300": "#c4b5fd",
    "400": "#C094E0",
    "500": "#832DC2",
    "600": "#651F98",
    "700": "#50167B",
    "800": "#340953",
    "900": "#2F0A49",
    "950": "#1D042E",
    "1000": "#160323",
  },
  secondary: {
    "50": "#fdf2f8",
    "100": "#fce7f3",
    "200": "#fbcfe8",
    "300": "#f9a8d4",
    "400": "#f472b6",
    "500": "#ec4899",
    "600": "#db2777",
    "700": "#be185d",
    "800": "#9d174d",
    "900": "#831843",
  },
  accent: {
    "50": "#f0fdfa",
    "100": "#ccfbf1",
    "200": "#99f6e4",
    "300": "#5eead4",
    "400": "#2dd4bf",
    "500": "#14b8a6",
    "600": "#0d9488",
    "700": "#0f766e",
    "800": "#115e59",
    "900": "#134e4a",
  },
  neutral: {
    "0": "#ffffff",
    "50": "#fafafa",
    "100": "#f4f4f5",
    "200": "#e4e4e7",
    "300": "#d4d4d8",
    "400": "#a1a1aa",
    "500": "#71717a",
    "600": "#52525b",
    "700": "#3f3f46",
    "800": "#27272a",
    "900": "#18181b",
  },
  success: {
    "50": "#ecfdf5",
    "100": "#d1fae5",
    "200": "#a7f3d0",
    "300": "#6ee7b7",
    "400": "#34d399",
    "500": "#10b981",
    "600": "#059669",
    "700": "#047857",
    "800": "#065f46",
    "900": "#064e3b",
  },
  warning: {
    "50": "#fffbeb",
    "100": "#fef3c7",
    "200": "#fde68a",
    "300": "#fcd34d",
    "400": "#fbbf24",
    "500": "#f59e0b",
    "600": "#d97706",
    "700": "#b45309",
    "800": "#92400e",
    "900": "#78350f",
  },
  error: {
    "50": "#fef2f2",
    "100": "#fee2e2",
    "200": "#fecaca",
    "300": "#fca5a5",
    "400": "#f87171",
    "500": "#ef4444",
    "600": "#dc2626",
    "700": "#b91c1c",
    "800": "#991b1b",
    "900": "#7f1d1d",
  },
  info: {
    "50": "#eff6ff",
    "100": "#dbeafe",
    "200": "#bfdbfe",
    "300": "#93c5fd",
    "400": "#60a5fa",
    "500": "#3b82f6",
    "600": "#2563eb",
    "700": "#1d4ed8",
    "800": "#1e40af",
    "900": "#1e3a8a",
  },
};

export const spacing = {
  "0": "0px",
  "0.5": "2px",
  "1": "4px",
  "1.5": "6px",
  "2": "8px",
  "2.5": "10px",
  "3": "12px",
  "3.5": "14px",
  "4": "16px",
  "4.5": "18px",
  "5": "20px",
  "5.5": "22px",
  "6": "24px",
  "6.5": "26px",
  "7": "28px",
  "7.5": "30px",
  "8": "32px",
  "8.5": "34px",
  "9": "36px",
};

export const borderRadius = {
  none: "0px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  "3xl": "32px",
  "4xl": "40px",
  "5xl": "48px",
  "6xl": "64px",
};

// Define fonts directly for NativeWind - this will correctly map font weights
export const fontFamily = {
  // Standard font families
  sans: "THICCCBOI-Regular",
  serif: "THICCCBOI-Regular",
  mono: "THICCCBOI-Regular",
  
  // Font weight-specific font families - this is the NativeWind way
  regular: "THICCCBOI-Regular",
  medium: "THICCCBOI-Medium",
  semibold: "THICCCBOI-SemiBold",
  bold: "THICCCBOI-Bold",
  
  // Stratos font family for score counter
  scoreBlack: "Stratos-Black",
  scoreBold: "Stratos-Bold",
  scoreSemibold: "Stratos-SemiBold"
};

// Add debug log to check theme settings at initialization
console.log('Theme fontFamily configuration:', fontFamily);

// Font weights that match the fontFamily keys
export const fontWeight = {
  regular: "400",
  medium: "500", 
  semibold: "600",
  bold: "700",
  // Stratos font weights
  scoreBlack: "900",
  scoreBold: "700",
  scoreSemibold: "600"
};

export const fontSize = {
  '10': "10px",
  '11': "11px",
  '12': "12px",
  xs: "12px",
  '13': "13px",
  '14': "14px",
  sm: "14px",
  '16': "16px",
  base: "16px",
  '18': "18px",
  lg: "18px",
  '20': "20px",
  xl: "20px",
  '24': "24px",
  '2xl': "24px",
  '32': "32px",
  '3xl': "32px",
  '40': "40px",
  '4xl': "40px",
  '5xl': "50px",
  '6xl': "60px",
};

export const letterSpacing = {
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  extraWide: "0.05em",
  superWide: "0.1em",
  ultraTight: "-0.05em",
  superTight: "-0.075em"
};

export const lineHeight = {
  xxs: "16px",
  xs: "18px",
  sm: "20px",
  md: "24px",
  lg: "28px",
  xl: "30px",
  '2xl': "36px",
  '3xl': "40px",
  '4xl': "48px",
  
  h1: "52px",
  h2: "48px",
  h3: "30px",
  h4: "32px",
  h5: "24px",
  h6: "22px",
  h7: "24px",
  
  sh1: "20px",
  sh2: "18px",
  sh3: "19px",
  sh4: "16px",
  sh5: "16px",
  
  b1: "24px",
  b2: "22px",
  b3: "22px",
  b4: "20px",
  b5: "20px",
  b6: "24px",
  b7: "20px",
  b8: "20px",
  b9: "18px",
  
  buttonLg: "22px",
  buttonMd: "20px",
  buttonSm: "16px",
  
  linkText: "22px",
  linkTextSm: "20px",
  linkTextXs: "16px",
  
  overlineMd: "16px",
  overlineSm: "14px",
};

export const letterSpacingValues = {
  h1: -0.8,
  h2: -0.64,
  h3: -0.48,
  h4: -0.4,
  h5: -0.36,
  h6: -0.32,
  h7: -0.36,
  
  sh1: -0.32,
  sh2: -0.28,
  sh3: -0.28,
  sh4: -0.24,
  sh5: -0.24,
  
  b1: -0.32,
  b2: -0.28,
  b3: -0.28,
  b4: -0.24,
  b5: -0.24,
  b6: -0.32,
  b7: 0,
  b8: 0,
  b9: 0,
  
  buttonLg: -0.32,
  buttonMd: -0.28,
  buttonSm: -0.24,
  
  linkText: -0.32,
  linkTextSm: -0.28,
  linkTextXs: -0.24,
  
  overlineMd: 0.05,
  overlineSm: 0.025,
};
