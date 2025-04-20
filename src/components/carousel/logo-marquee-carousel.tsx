import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, ImageSourcePropType, ViewStyle, Text } from 'react-native';
import Reanimated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  Easing,
  cancelAnimation,
  withDelay,
  withSequence
} from 'react-native-reanimated';
import { B4 } from '../ui/typography/typography';
import { colors } from '../../styles/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Animated View for smooth movement
const AnimatedView = Reanimated.createAnimatedComponent(View);

interface LogoItem {
  id: string;
  source: ImageSourcePropType;
  label?: string;
}

interface LogoMarqueeCarouselProps {
  topRowLogos: LogoItem[];
  bottomRowLogos: LogoItem[];
  speed?: number; // Lower is faster
  logoSize?: number;
  containerStyle?: ViewStyle;
  gapBetweenRows?: number;
  showLabels?: boolean;
}

function LogoMarqueeCarousel({
  topRowLogos,
  bottomRowLogos,
  speed = 20, // Animation speed factor
  logoSize = 50,
  containerStyle,
  gapBetweenRows = 16,
  showLabels = false
}: LogoMarqueeCarouselProps) {
  
  // Make sure we have sufficient logos by duplicating them
  const normalizedTopRowLogos = [...topRowLogos, ...topRowLogos, ...topRowLogos].slice(0, Math.max(15, topRowLogos.length * 3));
  const normalizedBottomRowLogos = [...bottomRowLogos, ...bottomRowLogos, ...bottomRowLogos].slice(0, Math.max(15, bottomRowLogos.length * 3));
  
  // Calculate total width of logos in each row (logo width + horizontal margin)
  const logoTotalWidth = logoSize + 30; // logoSize + left and right margins
  const totalTopWidth = normalizedTopRowLogos.length * logoTotalWidth;
  const totalBottomWidth = normalizedBottomRowLogos.length * logoTotalWidth;
  
  // Shared values for animation
  const topRowOffset = useSharedValue(0);
  const bottomRowOffset = useSharedValue(-totalBottomWidth / 2); // Start in the middle for smoother looping
  
  // Create animations when component mounts
  useEffect(() => {
    // Calculate duration based on total width and speed
    // Longer duration = slower animation
    const topDuration = totalTopWidth * speed;
    const bottomDuration = totalBottomWidth * speed;
    
    // Left to right animation for top row
    const animateTopRow = () => {
      topRowOffset.value = 0;
      topRowOffset.value = withRepeat(
        withTiming(-totalTopWidth / 2, {
          duration: topDuration,
          easing: Easing.linear
        }),
        -1, // Infinite repeat
        false // No need to reverse
      );
    };
    
    // Right to left animation for bottom row
    const animateBottomRow = () => {
      bottomRowOffset.value = -totalBottomWidth / 2;
      bottomRowOffset.value = withRepeat(
        withTiming(0, {
          duration: bottomDuration,
          easing: Easing.linear
        }),
        -1, // Infinite repeat
        false // No need to reverse
      );
    };
    
    // Start animations with a slight delay to ensure rendering
    setTimeout(() => {
      animateTopRow();
      animateBottomRow();
    }, 100);
    
    // Clean up animations on unmount
    return () => {
      cancelAnimation(topRowOffset);
      cancelAnimation(bottomRowOffset);
    };
  }, [totalTopWidth, totalBottomWidth, speed]);
  
  // Animated styles
  const topRowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: topRowOffset.value }]
    };
  });
  
  const bottomRowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: bottomRowOffset.value }]
    };
  });
  
  // Render a logo with optional label
  const renderLogo = (logo: LogoItem, index: number, direction: string) => (
    <View 
      key={`${direction}-${logo.id}-${index}`} 
      style={[styles.logoContainer, { width: logoSize, height: showLabels ? logoSize + 20 : logoSize }]}
    >
      <View style={{
        width: logoSize,
        height: logoSize,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: colors.neutral[200],
        backgroundColor: colors.neutral[0],
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <Image 
          source={logo.source} 
          style={{
            width: logoSize * 1,
            height: logoSize * 1
          }}
          resizeMode="contain"
        />
      </View>
      {showLabels && logo.label && (
        <B4 
          style={[styles.logoLabel, { width: logoSize + 20 }]}
          numberOfLines={1}
        >
          {logo.label}
        </B4>
      )}
    </View>
  );
  
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Top row - moving left to right */}
      <View style={styles.rowContainer}>
        <AnimatedView style={[styles.animatedRow, topRowAnimatedStyle]}>
          {normalizedTopRowLogos.map((logo, index) => renderLogo(logo, index, 'top'))}
          {normalizedTopRowLogos.map((logo, index) => renderLogo(logo, index, 'top-dup'))}
        </AnimatedView>
      </View>
      
      {/* Gap between rows */}
      <View style={{ height: gapBetweenRows }} />
      
      {/* Bottom row - moving right to left */}
      <View style={styles.rowContainer}>
        <AnimatedView style={[styles.animatedRow, bottomRowAnimatedStyle]}>
          {normalizedBottomRowLogos.map((logo, index) => renderLogo(logo, index, 'bottom'))}
          {normalizedBottomRowLogos.map((logo, index) => renderLogo(logo, index, 'bottom-dup'))}
        </AnimatedView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    paddingVertical: 16,
    
  },
  rowContainer: {
    width: SCREEN_WIDTH,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  animatedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: colors.neutral[0],
    borderWidth: 0.5,
    borderColor: colors.neutral[200],
    borderRadius: 8,
  },
  logoLabel: {
    marginTop: 4,
    textAlign: 'center',
    color: colors.neutral[700],
    fontSize: 10,
  },
  categoryLabel: {
    color: colors.neutral[700],
    fontWeight: '600',
  }
});

export default LogoMarqueeCarousel; 