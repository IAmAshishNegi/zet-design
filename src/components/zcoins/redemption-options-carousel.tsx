import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Pressable, ImageBackground, Image, ImageSourcePropType, Platform, ScrollView } from 'react-native';
import { colors } from '../../styles/theme';
import Reanimated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { SH1, B3, B5, Button, H5, SH8, SH7, B7 } from '../ui';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

// Use Reanimated's ScrollView for smooth animations
const AnimatedScrollView = Reanimated.createAnimatedComponent(ScrollView);

const { width: WINDOW_WIDTH } = Dimensions.get('window');

// Calculate card dimensions with spacing
const ITEM_SPACING = 2;
const ITEM_OFFSET = 10;

export interface RedemptionOption {
  id: string;
  backgroundImage: ImageSourcePropType;
  title: string;
  subtitle: string;
  showSubtitle?: boolean;
  conversionRate?: string;
  showConversionRate?: boolean;
  ctaLabel: string;
  showCta?: boolean;
  gradientColors?: [string, string] | [string, string, ...string[]];
  onPress?: () => void;
  heroImage?: ImageSourcePropType;
  showHeroImage?: boolean;
}

interface RedemptionOptionsCarouselProps {
  data: RedemptionOption[];
  containerStyle?: any;
  itemHeight?: number;
  itemWidth?: number;
  onOptionSelect?: (option: RedemptionOption) => void;
}

function RedemptionOptionsCarousel({
  data,
  containerStyle,
  itemHeight = 180, // Default card height
  itemWidth, // Custom width
  onOptionSelect
}: RedemptionOptionsCarouselProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);

  // Calculate item width - use custom or default
  const CUSTOM_ITEM_WIDTH = itemWidth || WINDOW_WIDTH * 0.75;

  // Updated scroll handler for regular ScrollView
  const handleScroll = (event: any) => {
    // Update the animated value
    scrollX.value = event.nativeEvent.contentOffset.x;
    
    // Calculate current index based on scroll position
    const slideSize = CUSTOM_ITEM_WIDTH + ITEM_SPACING * 2;
    const offset = Platform.OS === 'android' ? ITEM_OFFSET : 0;
    const newIndex = Math.round((event.nativeEvent.contentOffset.x - offset) / slideSize);
    
    // Update current index if needed
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < data.length) {
      setCurrentIndex(newIndex);
    }
  };

  const handleCardPress = (option: RedemptionOption) => {
    if (onOptionSelect) {
      onOptionSelect(option);
    } else if (option.onPress) {
      option.onPress();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.carouselContainer, { height: itemHeight }]}>
        <AnimatedScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={CUSTOM_ITEM_WIDTH + ITEM_SPACING * 2}
          snapToAlignment="start"
          contentContainerStyle={[
            styles.scrollViewContent,
            { 
              paddingLeft: Platform.OS === 'android' ? ITEM_OFFSET : 0,
              paddingRight: WINDOW_WIDTH * 0.2
            }
          ]}
        >
          {data.map((item, index) => {
            // Create animated style for each slide
            const slideAnimatedStyle = useAnimatedStyle(() => {
              const inputRange = [
                (index - 1) * (CUSTOM_ITEM_WIDTH + ITEM_SPACING * 2),
                index * (CUSTOM_ITEM_WIDTH + ITEM_SPACING * 2),
                (index + 1) * (CUSTOM_ITEM_WIDTH + ITEM_SPACING * 2)
              ];
              
              // Scale effect - slightly larger when active
              const scale = interpolate(
                scrollX.value,
                inputRange,
                [0.92, 1, 0.92],
                { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
              );
              
              // Opacity effect - more visible when active
              const opacity = interpolate(
                scrollX.value,
                inputRange,
                [0.85, 1, 0.85],
                { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
              );
              
              return {
                transform: [{ scale }],
                opacity
              };
            });

            const defaultGradientColors: [string, string] = ['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)'];
            const gradientColors = item.gradientColors || defaultGradientColors;

            return (
              <Reanimated.View
                key={item.id}
                style={[
                  styles.slideContainer,
                  { width: CUSTOM_ITEM_WIDTH },
                  slideAnimatedStyle,
                ]}
              >
                <Pressable
                  style={styles.cardPressable}
                  onPress={() => handleCardPress(item)}
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
                        <View style={styles.textContent}>
                          <H5 style={styles.title}>{item.title}</H5>

                          {item.showSubtitle !== false && item.subtitle && (
                            <B3 style={styles.subtitle}>{item.subtitle}</B3>
                          )}

                          {item.showConversionRate !== false &&
                            item.conversionRate && (
                              <View className="flex-row items-center pl-2 pr-3 py-1 bg-neutral-0/10 rounded-full self-start w-auto">
                                 <LottieView
                                  source={require("../../assets/lottie/ZetCoins.json")}
                                  autoPlay
                                  loop
                                  style={{
                                    width: 16,
                                    height: 16,
                                   
                                    marginRight: 4,
                                  }}
                                />
                                <B7 className='mr-1 text-neutral-0'>1 ZCoins</B7>
                               
                                <B7 style={styles.conversionRate}>
                                   = {item.conversionRate}
                                </B7>
                              </View>
                            )}

                          {item.showHeroImage !== false && item.heroImage && (
                            <View style={styles.heroImageContainer}>
                              <Image
                                source={item.heroImage}
                                style={styles.heroImage}
                                resizeMode="contain"
                              />
                            </View>
                          )}
                        </View>

                        {item.showCta !== false && item.ctaLabel && (
                          <View style={styles.buttonContainer}>
                            <Button
                              variant="filled"
                              size="md"
                              color="neutral-0"
                              onPress={() => handleCardPress(item)}
                              textStyle={{
                                color: colors.primary[900],
                                fontWeight: "600",
                              }}
                            >
                              {item.ctaLabel}
                            </Button>
                          </View>
                        )}
                      </View>
                    </LinearGradient>
                  </ImageBackground>
                </Pressable>
              </Reanimated.View>
            );
          })}
        </AnimatedScrollView>
      </View>
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
    marginHorizontal: ITEM_SPACING,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardPressable: {
    flex: 1,
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
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    position: 'relative',
    paddingHorizontal: 6,
    paddingTop: 10,
  },
  textContent: {
    paddingRight: 18,
    flex: 1,
  },
  title: {
    color: colors.neutral[0],
    marginBottom: 8,
  },
  subtitle: {
    color: colors.neutral[0],
    opacity: 0.4,
    marginBottom: 20,
  },
  conversionRateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  conversionRate: {
    color: colors.neutral[0],
    fontWeight: '600',
  },
  heroImageContainer: {
    position: 'absolute',
    right: 0,
    bottom: 40, // Adjust to avoid overlapping with button
    width: 70,
    height: 70,
    zIndex: 1,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: 8,
    width: '100%',
  },
});

export { RedemptionOptionsCarousel }; 