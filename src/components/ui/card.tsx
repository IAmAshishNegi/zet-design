import React from 'react';
import { View, Image, StyleSheet, Pressable, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { H4, H5, H6, H7, SH1, SH2, SH3, B1, B3, B4, OverlineSm } from './typography/typography';
import { colors } from '../../styles/theme';
import Reanimated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Button, ButtonProps } from './button/button';

// Create Animated Pressable for card touch effects
const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);

type BadgeVariant = 'new' | 'alert' | 'success' | 'info';

type BadgeProps = {
  text: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
};

// Heading variants for the card title
type TitleVariant = 'H6' | 'SH1' | 'B1' | 'SH2' | 'H7' | 'SH3';

// Type for theme color keys
type ColorKey = keyof typeof colors;

function Badge({ text, variant = 'info', style }: BadgeProps) {
  const badgeStyles = [
    styles.badge,
    variant === 'new' && styles.newBadge,
    variant === 'alert' && styles.alertBadge,
    variant === 'success' && styles.successBadge,
    variant === 'info' && styles.infoBadge,
    style,
  ];

  const textStyles = [
    styles.badgeText,
    variant === 'new' && styles.newBadgeText,
    variant === 'alert' && styles.alertBadgeText,
    variant === 'success' && styles.successBadgeText,
    variant === 'info' && styles.infoBadgeText,
  ];

  return (
    <View style={badgeStyles} className='px-3 py-0.5'>
      <OverlineSm>{text}</OverlineSm>
    </View>
  );
}

// Parse className string to extract background color
const extractBackgroundColor = (className?: string): string | undefined => {
  if (!className) return undefined;
  
  // Match bg-{color}-{shade} pattern
  const bgMatch = className.match(/bg-([a-z]+)-(\d+)/);
  if (bgMatch && bgMatch.length === 3) {
    const [_, colorName, shade] = bgMatch;
    try {
      // @ts-ignore - accessing colors dynamically
      return colors[colorName]?.[shade];
    } catch (e) {
      console.warn(`Color ${colorName}-${shade} not found in theme`);
    }
  }
  
  // Match simple bg-{color} pattern (without shade)
  const simpleBgMatch = className.match(/bg-([a-z]+)\b/);
  if (simpleBgMatch && simpleBgMatch.length === 2) {
    const colorName = simpleBgMatch[1];
    try {
      // @ts-ignore - accessing colors dynamically
      return colors[colorName]?.[500]; // Default to 500 shade
    } catch (e) {
      console.warn(`Color ${colorName} not found in theme`);
    }
  }
  
  return undefined;
};

export type CardProps = {
  title: string;
  description?: string;
  showDescription?: boolean;
  subheading?: string;
  showSubheading?: boolean;
  imageSource?: any;
  variant?: 'primary' | 'secondary' | 'highlight';
  titleVariant?: TitleVariant;
  titleColor?: string | { colorKey: ColorKey; shade: string | number };
  badge?: {
    text: string;
    variant?: BadgeVariant;
  };
  backgroundColor?: string;
  style?: ViewStyle;
  className?: string;
  imageStyle?: ImageStyle;
  imageSize?: {
    width: number;
    height: number;
  };
  height?: number;
  showButton?: boolean;
  buttonProps?: ButtonProps;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  subheadingStyle?: TextStyle;
  onPress?: () => void;
};

export function Card({ 
  title, 
  description,
  showDescription = false, 
  subheading,
  showSubheading = false,
  imageSource, 
  variant = 'primary',
  titleVariant = 'H6',
  titleColor,
  badge,
  backgroundColor,
  style,
  className,
  imageStyle,
  imageSize = { width: 68, height: 68 },
  height,
  showButton = false,
  buttonProps,
  titleStyle: customTitleStyle,
  descriptionStyle: customDescriptionStyle,
  subheadingStyle: customSubheadingStyle,
  onPress 
}: CardProps) {
  // Animation values
  const scale = useSharedValue(1);
  
  // Handle touch interactions
  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 150 });
  };
  
  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200 });
  };
  
  // Get variant base style
  let variantStyle = styles.card;
  if (variant === 'secondary') {
    variantStyle = styles.secondaryCard;
  } else if (variant === 'highlight') {
    variantStyle = styles.highlightCard;
  }
  
  // Extract background color from className if present
  const bgColor = extractBackgroundColor(className);
  
  // Animated styles
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  // Get appropriate heading component based on titleVariant
  const getTitleComponent = () => {
    switch(titleVariant) {
      case 'H6':
        return H6;
      case 'SH1':
        return SH1;
      case 'B1':
        return B1;
      case 'SH2':
        return SH2;
      case 'H7':
        return H7;
      case 'SH3':
        return SH3;
      default:
        return H6;
    }
  };

  const TitleComponent = getTitleComponent();

  // Process title color if provided
  let titleTextColor = colors.neutral[900]; // Default black
  if (titleColor) {
    if (typeof titleColor === 'string') {
      titleTextColor = titleColor;
    } else if (titleColor.colorKey && titleColor.shade) {
      // @ts-ignore - accessing colors dynamically
      titleTextColor = colors[titleColor.colorKey]?.[titleColor.shade] || colors.neutral[900];
    }
  }

  // Style configurations for text elements
  const titleStyles = [
    styles.cardTitle,
    { color: titleTextColor }, // Apply title color
    customTitleStyle,
  ];

  const descriptionStyles = [
    styles.cardDescription,
    customDescriptionStyle,
  ];

  const subheadingStyles = [
    styles.cardSubheading,
    customSubheadingStyle,
  ];

  // Apply custom height if provided
  const cardHeightStyle = height ? { height } : undefined;

  return (
    <AnimatedPressable 
      style={[
        styles.cardBase, 
        variantStyle,
        cardHeightStyle,
        backgroundColor && { backgroundColor },
        bgColor && { backgroundColor: bgColor },
        style,
        animatedCardStyle
      ]}
      className={className}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={styles.contentContainer}>
        {/* Badge and Title Section */}
        <View style={styles.headerSection}>
          {badge && (
            <Badge 
              text={badge.text} 
              variant={badge.variant} 
              style={styles.badgeInline}
            />
          )}
          <View style={styles.titleContainer}>
            <TitleComponent style={titleStyles}>{title}</TitleComponent>
          </View>
        </View>
        
        {/* Subheading and Description */}
        {showSubheading && subheading && (
          <B3 style={subheadingStyles}>{subheading}</B3>
        )}
        
        {showDescription && description && (
          <B4 style={descriptionStyles}>{description}</B4>
        )}
        
        {showButton && buttonProps && (
          <View style={styles.buttonContainer}>
            <Button 
              {...buttonProps} 
              fullWidth={false}
              style={[
                { marginTop: 8 },
                ...(Array.isArray(buttonProps.style) ? buttonProps.style : [buttonProps.style])
              ]}
            />
          </View>
        )}
      </View>
      
      {imageSource && (
        <View 
          style={[
            styles.imageContainer, 
            { width: imageSize.width, height: imageSize.height }
          ]}
        >
          <Image 
            source={imageSource} 
            style={[styles.image, imageStyle]} 
          />
        </View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  cardBase: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 16,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    // elevation: 1,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    minHeight: 120,
    overflow: 'hidden',
    position: 'relative',
  },
  card: {
    backgroundColor: 'white',
  },
  secondaryCard: {
    backgroundColor: colors.neutral[0],
  },
  highlightCard: {
    backgroundColor: colors.success[50],
    minHeight: 130, // Slightly taller
  },
  contentContainer: {
    flex: 1,
    paddingRight: 58, // Space for the image
    position: 'relative',
    justifyContent: 'flex-start',
  },
  headerSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: 4,
  },
  titleContainer: {
    width: '100%',
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    marginTop: 4,
    alignItems: 'flex-start',
  },
  imageContainer: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardTitle: {
    color: colors.neutral[900], // Default black
    marginBottom: 8,
  },
  cardSubheading: {
    color: colors.neutral[700],
    marginBottom: 6,
  },
  cardDescription: {
    color: colors.neutral[500], // Changed to neutral 500 as requested
    marginBottom: 12,
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  badgeInline: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeTop: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  cardBadge: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 1,
  },
  newBadge: {
    backgroundColor: colors.primary[100],
  },
  newBadgeText: {
    color: colors.primary[900],
  },
  alertBadge: {
    backgroundColor: colors.error[100],
  },
  alertBadgeText: {
    color: colors.error[900],
  },
  successBadge: {
    backgroundColor: colors.success[100],
  },
  successBadgeText: {
    color: colors.success[900],
  },
  infoBadge: {
    backgroundColor: colors.neutral[100],
  },
  infoBadgeText: {
    color: colors.neutral[900],
  },
}); 