import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Pressable, ImageBackground, TextStyle, ViewStyle, Platform } from 'react-native';
import { colors } from '../../styles/theme';
import Reanimated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { H4, B2, B3, Button, H5, SH1, H6, H7 } from '../ui';
import { LinearGradient } from 'expo-linear-gradient';

// Use Reanimated's ScrollView for smooth animations
const AnimatedScrollView = Reanimated.createAnimatedComponent(ScrollView);

const { width: WINDOW_WIDTH } = Dimensions.get('window');

// Calculate card dimensions with spacing
const ITEM_SPACING = 6; // Reduced spacing between slides
const ITEM_WIDTH = WINDOW_WIDTH * 0.88; // Reduced width to allow next card to peek
const ITEM_OFFSET = 16; // Left margin for the first card

export interface SpotlightItem {
  id: string;
  backgroundImage: any; // Accept both require() and uri strings
  title: string;
  subtitle: string;
  showSubtitle?: boolean;
  statistic?: string;
  showStatistic?: boolean;
  description: string;
  showDescription?: boolean;
  ctaLabel: string;
  showCta?: boolean;
  gradientColors?: [string, string] | [string, string, ...string[]];
  onPress?: () => void;
}

type IndicatorPosition = 'top' | 'bottom';

interface SpotlightCarouselProps {
  data: SpotlightItem[];
  autoPlay?: boolean;
  duration?: number;
  showIndicators?: boolean;
  indicatorPosition?: IndicatorPosition;
  containerStyle?: ViewStyle;
  itemHeight?: number;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  statisticStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  indicatorContainerStyle?: ViewStyle;
  activeIndicatorColor?: string;
  inactiveIndicatorColor?: string;
  onIndexChange?: (index: number) => void;
}

function SpotlightCarousel({
  data,
  autoPlay = true,
  duration = 5000,
  showIndicators = true,
  indicatorPosition = 'bottom',
  containerStyle,
  itemHeight = 400,
  titleStyle,
  subtitleStyle,
  statisticStyle,
  descriptionStyle,
  indicatorContainerStyle,
  activeIndicatorColor = colors.primary[700],
  inactiveIndicatorColor = colors.neutral[300],
  onIndexChange
}: SpotlightCarouselProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  // Handle auto-play
  useEffect(() => {
    if (autoPlay && data.length > 1) {
      startAutoPlay();
    }
    return () => {
      if (autoPlayTimer.current) {
        clearTimeout(autoPlayTimer.current);
      }
    };
  }, [autoPlay, currentIndex, data.length]);

  const startAutoPlay = () => {
    autoPlayTimer.current = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      scrollToIndex(nextIndex);
    }, duration);
  };

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * (ITEM_WIDTH + ITEM_SPACING) + (Platform.OS === 'android' ? ITEM_OFFSET : 0),
        animated: true
      });
    }
  };

  const updateCurrentIndex = (index: number) => {
    setCurrentIndex(index);
    if (onIndexChange) {
      onIndexChange(index);
    }
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      const slideSize = ITEM_WIDTH + ITEM_SPACING;
      const offset = Platform.OS === 'android' ? ITEM_OFFSET : 0;
      const newIndex = Math.round((event.contentOffset.x - offset) / slideSize);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < data.length) {
        runOnJS(updateCurrentIndex)(newIndex);
      }
    },
    onMomentumEnd: () => {
      if (autoPlay) {
        // Clear existing timer when user manually scrolls
        if (autoPlayTimer.current) {
          clearTimeout(autoPlayTimer.current);
        }
        // Restart the timer
        runOnJS(startAutoPlay)();
      }
    }
  });

  const renderIndicators = () => {
    if (!showIndicators || data.length <= 1) return null;

    return (
      <View style={[
        styles.indicatorsContainer,
        indicatorPosition === 'top' ? styles.indicatorsTop : styles.indicatorsBottom,
        indicatorContainerStyle
      ]}>
        {data.map((_, index) => {
          // Create animated style for each indicator
          const indicatorAnimatedStyle = useAnimatedStyle(() => {
            const inputRange = [
              (index - 1) * (ITEM_WIDTH + ITEM_SPACING),
              index * (ITEM_WIDTH + ITEM_SPACING),
              (index + 1) * (ITEM_WIDTH + ITEM_SPACING)
            ];
            
            // Width changes for active indicator to create a pill shape when active
            const width = interpolate(
              scrollX.value,
              inputRange,
              [8, 24, 8],
              { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
            );
            
            // Opacity changes to make active indicator more prominent
            const opacity = interpolate(
              scrollX.value,
              inputRange,
              [0.6, 1, 0.6],
              { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
            );
            
            // Dynamic background color based on activity state
            const backgroundColor = index === currentIndex 
              ? activeIndicatorColor 
              : inactiveIndicatorColor;
            
            return {
              width,
              opacity,
              backgroundColor
            };
          });
          
          return (
            <Pressable 
              key={index} 
              onPress={() => scrollToIndex(index)}
            >
              <Reanimated.View
                style={[
                  styles.indicator,
                  indicatorAnimatedStyle
                ]}
              />
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.carouselContainer, { height: itemHeight }]}>
        <AnimatedScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={ITEM_WIDTH + ITEM_SPACING}
          snapToAlignment="start"
          contentContainerStyle={[
            styles.scrollViewContent,
            { 
              paddingLeft: Platform.OS === 'android' ? ITEM_OFFSET : 0,
              paddingRight: WINDOW_WIDTH * 0.3
            }
          ]}
          {...(Platform.OS === 'ios' ? {
            contentInset: {
              left: 0, // No left inset to align with margin
              right: ITEM_OFFSET
            },
            contentOffset: { x: 0, y: 0 }
          } : {})}
        >
          {data.map((item, index) => {
            // Create animated style for each slide
            const slideAnimatedStyle = useAnimatedStyle(() => {
              const inputRange = [
                (index - 1) * (ITEM_WIDTH + ITEM_SPACING),
                index * (ITEM_WIDTH + ITEM_SPACING),
                (index + 1) * (ITEM_WIDTH + ITEM_SPACING)
              ];
              
              // Scale effect - slightly larger when active
              const scale = interpolate(
                scrollX.value,
                inputRange,
                [0.95, 1, 0.95],
                { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
              );
              
              // Opacity effect - more visible when active
              const opacity = interpolate(
                scrollX.value,
                inputRange,
                [0.8, 1, 0.8],
                { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
              );
              
              return {
                transform: [{ scale }],
                opacity
              };
            });

            const defaultGradientColors: [string, string] = ['rgba(52, 236, 104, 0.25)', 'rgba(28, 73, 47, 0.6)'];
            const gradientColors = item.gradientColors || defaultGradientColors;

            return (
              <Reanimated.View 
                key={item.id}
                style={[styles.slideContainer, slideAnimatedStyle]}
              >
                <ImageBackground
                  source={item.backgroundImage}
                  style={styles.slide}
                  imageStyle={styles.backgroundImage}
                >
                  <LinearGradient
                    colors={gradientColors}
                    style={styles.gradientOverlay}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                  >
                    <View style={styles.contentContainer}>
                      <View style={styles.topContent}>
                        <SH1 style={{
                          color: colors.neutral[0],
                          marginBottom: 8,
                          ...(titleStyle || {})
                        }}>{item.title}</SH1>
                        
                        {item.showSubtitle !== false && item.subtitle && (
                          <B3 style={[styles.subtitle, subtitleStyle]}>{item.subtitle}</B3>
                        )}
                        
                        {item.showStatistic !== false && item.statistic && (
                          <View style={styles.statisticContainer}>
                            <B3 style={[styles.statistic, statisticStyle]}>{item.statistic}</B3>
                          </View>
                        )}
                      </View>
                      
                      <View style={styles.bottomContent}>
                        {item.showDescription !== false && item.description && (
                          <B2 style={[styles.description, descriptionStyle]}>{item.description}</B2>
                        )}
                        
                        {item.showCta !== false && item.ctaLabel && (
                          <Button
                            variant="filled"
                            size="md"
                            color="neutral-0"
                            onPress={item.onPress}
                            textStyle={{ color: colors.primary[900], fontWeight: '600' }}
                          >
                            {item.ctaLabel}
                          </Button>
                        )}
                      </View>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </Reanimated.View>
            );
          })}
        </AnimatedScrollView>
      </View>
      
      {renderIndicators()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  carouselContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  scrollViewContent: {
    // paddingHorizontal will be set conditionally
  },
  slideContainer: {
    width: ITEM_WIDTH,
    marginHorizontal: ITEM_SPACING / 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  slide: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  backgroundImage: {
    borderRadius: 16,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    justifyContent: 'space-between',
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topContent: {
    marginTop: 0,
  },
  bottomContent: {
    marginBottom: 0,
  },
  subtitle: {
    color: colors.neutral[0],
    opacity: 0.7,
    marginTop: 4,
    marginBottom: 12,
    lineHeight: 22,
  },
  statisticContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  statistic: {
    color: colors.neutral[0],
    fontWeight: '600',
  },
  description: {
    color: colors.neutral[0],
    marginBottom: 24,
  },
  ctaButton: {
    alignSelf: 'center',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 3,
    borderTopWidth: 0,
    borderColor: '#be9ed4',
    width: '80%',
  },
  indicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  indicatorsTop: {
    marginTop: 0,
    marginBottom: 8,
  },
  indicatorsBottom: {
    marginTop: 8,
    marginBottom: 0,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default SpotlightCarousel; 