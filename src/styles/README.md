# Typography System

This document explains the typography system used in our application.

## Overview

Our typography system consists of:

1. **Theme Configuration** (`src/styles/theme.ts`) - Central source of truth for all design tokens
2. **Tailwind Configuration** (`tailwind.config.js`) - Makes design tokens available to Tailwind classes
3. **Typography Components** (`src/components/ui/typography/typography.tsx`) - React components for using typography

## Using the Typography System

### Predefined Components

We provide several predefined typography components for common use cases:

- **Headings**: `H1`, `H2`, `H3`, `H4`, `H5`, `H6`, `H7`
- **Subheadings**: `SH1`, `SH2`, `SH3`, `SH4`, `SH5`  
- **Body Text**: `B1`, `B2`, `B3`, `B4`, `B5`, `B6`, `B7`, `B8`, `B9`
- **Links**: `LinkText`, `LinkTextSm`, `LinkTextXs`
- **Button Text**: `ButtonLg`, `ButtonMd`, `ButtonSm`
- **Overlines**: `OverlineMd`, `OverlineSm`

Example:
```jsx
import { H1, B1 } from '../components/ui/typography/typography';

function MyComponent() {
  return (
    <>
      <H1>Main Heading</H1>
      <B1>Body text</B1>
    </>
  );
}
```

### Custom Typography

For custom typography needs, use the base `Typography` component:

```jsx
import { Typography } from '../components/ui/typography/typography';

function CustomText() {
  return (
    <Typography 
      variant="16" 
      weight="medium" 
      tracking="tight"
      className="text-primary-600 leading-lg"
    >
      Custom text
    </Typography>
  );
}
```

## Modifying Typography

### To change line heights:

1. Update the `lineHeight` object in `src/styles/theme.ts`
2. Apply line heights using Tailwind classes (e.g., `leading-md`, `leading-lg`)

### To change font sizes:

1. Update the `fontSize` object in `src/styles/theme.ts`
2. Apply font sizes using Tailwind classes (e.g., `text-base`, `text-lg`)

### To change letter spacing:

1. Update the `letterSpacing` object in `src/styles/theme.ts`
2. Apply letter spacing using Tailwind classes (e.g., `tracking-tight`, `tracking-wide`)

## Responsive Typography

All typography components automatically scale with screen size, limited by minimum and maximum scale factors.

You can control responsiveness with:

```jsx
<Typography responsive={true} minScale={0.8} maxScale={1.2}>
  This text will scale with the screen size
</Typography>
```

To adjust the global font scale:

```jsx
import { setAppFontScale } from '../components/ui/typography/typography';

// Increase all font sizes by 10%
setAppFontScale(1.1);
``` 