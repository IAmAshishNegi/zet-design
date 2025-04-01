import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import { colors } from '../../styles/theme';
import Reanimated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

// Use Reanimated's ScrollView for smooth animations
const AnimatedScrollView = Reanimated.createAnimatedComponent(ScrollView);

const { width: WINDOW_WIDTH } = Dimensions.get('window');

// Calculate card dimensions with spacing
const ITEM_SPACING = 16; // Spacing between slides
const ITEM_WIDTH = WINDOW_WIDTH * 0.9; // Slide width is 90% of screen width
const ITEM_OFFSET = (WINDOW_WIDTH - ITEM_WIDTH) / 2; // Center horizontally

export interface BannerItem {
  id: string;
  imageUrl: any; // Accept both require() and uri strings
  onPress?: () => void;
}

type IndicatorPosition = 'top' | 'bottom';

interface BannerCarouselProps {
  data: BannerItem[];
  autoPlay?: boolean;
  duration?: number;
  showIndicators?: boolean;
  indicatorPosition?: IndicatorPosition;
  containerStyle?: object;
  imageStyle?: object;
  indicatorContainerStyle?: object;
  activeIndicatorColor?: string;
  inactiveIndicatorColor?: string;
  onIndexChange?: (index: number) => void;
}

function BannerCarousel({
  data,
  autoPlay = true,
  duration = 5000,
  showIndicators = true,
  indicatorPosition = 'bottom',
  containerStyle,
  imageStyle,
  indicatorContainerStyle,
  activeIndicatorColor = colors.primary[700],
  inactiveIndicatorColor = colors.neutral[300],
  onIndexChange
}: BannerCarouselProps) {
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
        x: index * (ITEM_WIDTH + ITEM_SPACING) + ITEM_OFFSET - ITEM_SPACING / 2,
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
      const newIndex = Math.round((event.contentOffset.x - ITEM_OFFSET + ITEM_SPACING / 2) / slideSize);
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
    if (!showIndicators) return null;

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
              (index - 1) * (ITEM_WIDTH + ITEM_SPACING) + ITEM_OFFSET - ITEM_SPACING / 2,
              index * (ITEM_WIDTH + ITEM_SPACING) + ITEM_OFFSET - ITEM_SPACING / 2,
              (index + 1) * (ITEM_WIDTH + ITEM_SPACING) + ITEM_OFFSET - ITEM_SPACING / 2
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
      <View style={styles.carouselContainer}>
        <AnimatedScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={ITEM_WIDTH + ITEM_SPACING}
          snapToAlignment="center"
          contentContainerStyle={styles.scrollViewContent}
          contentInset={{
            left: ITEM_OFFSET - ITEM_SPACING / 2,
            right: ITEM_OFFSET - ITEM_SPACING / 2
          }}
          contentOffset={{ x: -ITEM_OFFSET + ITEM_SPACING / 2, y: 0 }}
        >
          {data.map((item, index) => {
            // Create animated style for each slide
            const slideAnimatedStyle = useAnimatedStyle(() => {
              const inputRange = [
                (index - 1) * (ITEM_WIDTH + ITEM_SPACING) + ITEM_OFFSET - ITEM_SPACING / 2,
                index * (ITEM_WIDTH + ITEM_SPACING) + ITEM_OFFSET - ITEM_SPACING / 2,
                (index + 1) * (ITEM_WIDTH + ITEM_SPACING) + ITEM_OFFSET - ITEM_SPACING / 2
              ];
              
              // Scale effect - slightly larger when active
              const scale = interpolate(
                scrollX.value,
                inputRange,
                [0.95, 1, 0.95],
                { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
              );
              
              return {
                transform: [{ scale }]
              };
            });

            return (
              <Reanimated.View 
                key={item.id}
                style={[styles.slideContainer, slideAnimatedStyle]}
              >
                <Pressable
                  style={styles.slide}
                  onPress={item.onPress}
                >
                  <Image
                    source={item.imageUrl}
                    style={[styles.image, imageStyle]}
                    resizeMode="cover"
                  />
                </Pressable>
              </Reanimated.View>
            );
          })}
        </AnimatedScrollView>
      </View>
      
      {showIndicators && renderIndicators()}
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
    paddingHorizontal: ITEM_SPACING / 2,
  },
  slideContainer: {
    width: ITEM_WIDTH,
    marginHorizontal: ITEM_SPACING / 2,
  },
  slide: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
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
  }
});

export default BannerCarousel; 