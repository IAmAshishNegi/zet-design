import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, ScrollView, Image, Platform, Dimensions, Text } from 'react-native';
import { colors } from '../../styles/theme';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Typography, H3, H4, B2, B3, ButtonLg, SH2 } from '../../components/ui/typography/typography';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Reanimated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  useAnimatedGestureHandler,
  runOnJS,
  withTiming,
  Easing,
  useDerivedValue,
  cancelAnimation
} from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView, ScrollView as GHScrollView } from 'react-native-gesture-handler';
import { RiveRef } from 'rive-react-native';
import { RiveAnimation } from '../../components/ui/rive-animation';

// Use GestureHandler's ScrollView to prevent gesture conflicts
const ReanimatedScrollView = Reanimated.createAnimatedComponent(GHScrollView);

const HAS_SEEN_ONBOARDING = 'has_seen_onboarding';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const HEADER_HEIGHT = SCREEN_HEIGHT * 0.14;
const DRAWER_SNAP_TOP = 0;
const DRAWER_SNAP_MIDDLE = SCREEN_HEIGHT * 0.35;
const DRAWER_SNAP_BOTTOM = SCREEN_HEIGHT * 0.65;

// Spring animation config for smooth transitions
const SPRING_CONFIG = {
  damping: 55,
  stiffness: 320,
  mass: 0.7,
  overshootClamping: false,
  restDisplacementThreshold: 0.05,
  restSpeedThreshold: 0.05
};

export default function HomeScreen() {
  const router = useRouter();
  const [greeting, setGreeting] = useState('');
  const [username, setUsername] = useState('Ashley');
  const scrollY = useSharedValue(0);
  const drawerY = useSharedValue(DRAWER_SNAP_MIDDLE);
  const scrollViewRef = useRef(null);
  const isDrawerAtTop = useSharedValue(false);
  const lastScrollY = useSharedValue(0);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [drawerPosition, setDrawerPosition] = useState('middle');
  const [drawerHeightLog, setDrawerHeightLog] = useState(0);
  const [contentHeight, setContentHeight] = useState(SCREEN_HEIGHT * 0.75);
  
  // Shared values for drawer state
  const scrollEnabledWorklet = useSharedValue(false);
  const drawerHeightWorklet = useSharedValue(SCREEN_HEIGHT * 0.75);
  
  const [userScore, setUserScore] = useState(750); // Example credit score
  const riveScoreRef = useRef<RiveRef>(null);
  
  // Dynamic height calculation based on drawer position
  const animatedHeight = useDerivedValue(() => {
    let progress;
    
    // Calculate progress based on position between snap points
    if (drawerY.value <= DRAWER_SNAP_MIDDLE) {
      progress = interpolate(
        drawerY.value,
        [DRAWER_SNAP_MIDDLE, DRAWER_SNAP_TOP],
        [0.5, 1],
        Extrapolate.CLAMP
      );
    } else {
      progress = interpolate(
        drawerY.value,
        [DRAWER_SNAP_BOTTOM, DRAWER_SNAP_MIDDLE],
        [0, 0.5],
        Extrapolate.CLAMP
      );
    }
    
    // Interpolate height based on position
    return interpolate(
      progress,
      [0, 0.5, 1],
      [SCREEN_HEIGHT * 0.35, SCREEN_HEIGHT * 0.75, SCREEN_HEIGHT - HEADER_HEIGHT],
      Extrapolate.CLAMP
    );
  }, []);
  
  // Update UI state when drawer position changes
  useEffect(() => {
    const currentHeight = isDrawerAtTop.value 
      ? SCREEN_HEIGHT - HEADER_HEIGHT 
      : SCREEN_HEIGHT * 0.75;
    
    setContentHeight(currentHeight);
    setDrawerHeightLog(currentHeight);
  }, [isDrawerAtTop.value]);
  
  // Set time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Sync React state with shared values
  useEffect(() => {
    setScrollEnabled(isDrawerAtTop.value);
    scrollEnabledWorklet.value = isDrawerAtTop.value;
    
    // Update drawer position state for UI
    if (isDrawerAtTop.value) {
      setDrawerPosition('top');
    } else if (drawerY.value >= DRAWER_SNAP_BOTTOM - 10) {
      setDrawerPosition('bottom');
    } else {
      setDrawerPosition('middle');
    }
  }, [isDrawerAtTop.value, drawerY.value]);

  // Update the score value in Rive animation when score changes
  useEffect(() => {
    if (riveScoreRef.current) {
      try {
        // Set the score input value in the Rive animation using the correct method
        riveScoreRef.current.setInputState('State Machine 1', 'score', userScore);
      } catch (error) {
        console.error('Failed to update Rive score:', error);
      }
    }
  }, [userScore]);

  // Reset onboarding status
  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem(HAS_SEEN_ONBOARDING);
      router.push('/onboarding');
    } catch (error) {
      // Error handling silently fails
    }
  };

  // Update scroll state
  const updateScrollEnabled = (enabled: boolean) => {
    setScrollEnabled(enabled);
    scrollEnabledWorklet.value = enabled;
  };

  // Scroll handler for drawer content
  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: (_, ctx) => {
      ctx.prevY = 0;
    },
    onScroll: (event, ctx) => {
      // Only process scroll if drawer is at top
      if (scrollEnabledWorklet.value) {
        const prevScrollY = scrollY.value;
        scrollY.value = event.contentOffset.y;
        lastScrollY.value = scrollY.value;
        ctx.prevY = prevScrollY;
      }
    },
    onEndDrag: (event) => {
      // If at the top of content and scrolling down, snap back to middle
      const velocityY = event.velocity?.y ?? 0;
      if (scrollEnabledWorklet.value && scrollY.value <= 0 && velocityY > 10) {
        drawerY.value = withSpring(DRAWER_SNAP_MIDDLE, {
          ...SPRING_CONFIG,
          velocity: velocityY
        });
        
        isDrawerAtTop.value = false;
        scrollEnabledWorklet.value = false;
        runOnJS(updateScrollEnabled)(false);
      }
    },
    onMomentumEnd: () => {
      // When momentum ends at the top, check if we should snap back
      if (scrollEnabledWorklet.value && scrollY.value <= 0 && scrollY.value > -5) {
        drawerY.value = withSpring(DRAWER_SNAP_MIDDLE, {
          ...SPRING_CONFIG,
        });
        
        isDrawerAtTop.value = false;
        scrollEnabledWorklet.value = false;
        runOnJS(updateScrollEnabled)(false);
      }
    },
  });

  // Gesture handler for drawer dragging
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number }) => {
      cancelAnimation(drawerY);
      ctx.startY = drawerY.value;
    },
    onActive: (event, ctx: { startY: number }) => {
      // Constrain drawer movement between snap points
      drawerY.value = Math.max(
        DRAWER_SNAP_TOP,
        Math.min(ctx.startY + event.translationY, DRAWER_SNAP_BOTTOM + 50)
      );
      
      // Update height during drag for smoother transitions
      if (Math.abs(event.translationY) > 5) {
        let progress;
        
        if (drawerY.value <= DRAWER_SNAP_MIDDLE) {
          progress = (DRAWER_SNAP_MIDDLE - drawerY.value) / (DRAWER_SNAP_MIDDLE - DRAWER_SNAP_TOP);
          progress = Math.max(0, Math.min(1, progress)) * 0.5 + 0.5;
        } else {
          progress = (DRAWER_SNAP_BOTTOM - drawerY.value) / (DRAWER_SNAP_BOTTOM - DRAWER_SNAP_MIDDLE);
          progress = Math.max(0, Math.min(1, progress)) * 0.5;
        }
        
        drawerHeightWorklet.value = interpolate(
          progress,
          [0, 0.5, 1],
          [SCREEN_HEIGHT * 0.35, SCREEN_HEIGHT * 0.75, SCREEN_HEIGHT - HEADER_HEIGHT]
        );
      }
    },
    onEnd: (event) => {
      const velocity = event.velocityY;
      
      // High upward velocity - snap to top
      if (velocity < -1000 && drawerY.value < DRAWER_SNAP_BOTTOM) {
        drawerY.value = withSpring(DRAWER_SNAP_TOP, {
          ...SPRING_CONFIG,
          velocity: Math.min(Math.abs(velocity), 1000) * Math.sign(velocity)
        });
        isDrawerAtTop.value = true;
        scrollEnabledWorklet.value = true;
        runOnJS(updateScrollEnabled)(true);
        return;
      }
      
      // High downward velocity - snap to bottom
      if (velocity > 1000 && drawerY.value > DRAWER_SNAP_TOP) {
        drawerY.value = withSpring(DRAWER_SNAP_BOTTOM, {
          ...SPRING_CONFIG,
          velocity: Math.min(Math.abs(velocity), 1000) * Math.sign(velocity)
        });
        isDrawerAtTop.value = false;
        scrollEnabledWorklet.value = false;
        runOnJS(updateScrollEnabled)(false);
        return;
      }
      
      // Position-based snapping for moderate velocities
      if (drawerY.value < DRAWER_SNAP_MIDDLE * 0.5) {
        // Snap to top
        drawerY.value = withSpring(DRAWER_SNAP_TOP, {
          ...SPRING_CONFIG,
          velocity: Math.min(Math.abs(velocity), 1000) * Math.sign(velocity)
        });
        isDrawerAtTop.value = true;
        scrollEnabledWorklet.value = true;
        runOnJS(updateScrollEnabled)(true);
      } else if (drawerY.value < (DRAWER_SNAP_MIDDLE + DRAWER_SNAP_BOTTOM) / 2) {
        // Snap to middle
        drawerY.value = withSpring(DRAWER_SNAP_MIDDLE, {
          ...SPRING_CONFIG,
          velocity: Math.min(Math.abs(velocity), 1000) * Math.sign(velocity)
        });
        isDrawerAtTop.value = false;
        scrollEnabledWorklet.value = false;
        runOnJS(updateScrollEnabled)(false);
        
        // Reset scroll position
        if (scrollViewRef.current) {
          scrollY.value = 0;
          lastScrollY.value = 0;
        }
      } else {
        // Snap to bottom
        drawerY.value = withSpring(DRAWER_SNAP_BOTTOM, {
          ...SPRING_CONFIG,
          velocity: Math.min(Math.abs(velocity), 1000) * Math.sign(velocity)
        });
        isDrawerAtTop.value = false;
        scrollEnabledWorklet.value = false;
        runOnJS(updateScrollEnabled)(false);
        
        // Reset scroll position
        if (scrollViewRef.current) {
          scrollY.value = 0;
          lastScrollY.value = 0;
        }
      }
    },
  });

  // Animated styles
  const drawerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: drawerY.value }],
    height: animatedHeight.value,
  }), []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: Math.max(0, Math.min(1, drawerY.value / (DRAWER_SNAP_MIDDLE * 0.6))),
  }), []);

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <View style={styles.container}>
        <StatusBar style="light" />
        
        {/* Debug info overlay */}
        {/* <View style={styles.debugInfo}>
          <Text style={styles.debugText}>Position: {drawerPosition}</Text>
          <Text style={styles.debugText}>Height: {Math.round(drawerHeightLog)}</Text>
          <Text style={styles.debugText}>Scroll Enabled: {scrollEnabled ? 'Yes' : 'No'}</Text>
          <Text style={styles.debugText}>Content Height: {Math.round(contentHeight)}</Text>
        </View> */}
        
        {/* App Bar */}
        <View style={styles.appBar}>
          <View style={styles.greetingContainer}>
            <H4 style={styles.greeting}>{greeting}</H4>
            <H3 style={styles.username}>{username}</H3>
          </View>
          <Pressable style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://placekitten.com/100/100' }}
              style={styles.avatar}
            />
          </Pressable>
        </View>
        
        {/* Header Content */}
        <Reanimated.View style={[styles.headerContent, headerAnimatedStyle]}>
          <B2 style={styles.headerText}>Your financial overview</B2>
          
          <View style={styles.scoreContainer}>
            <RiveAnimation
              ref={riveScoreRef}
              source={require('../../assets/rive/scorebubble.riv')}
              autoplay={true}
              style={styles.scoreAnimation}
              artboardName="creditBubble"
              stateMachineName="State Machine 1"
              onPlay={(animName, isStateMachine) => {
                console.log('Score animation playing:', animName, isStateMachine);
                // When animation starts playing, try to update the score
                setTimeout(() => {
                  try {
                    riveScoreRef.current?.setInputState('State Machine 1', 'score', userScore);
                    console.log('Set initial score value to:', userScore);
                  } catch (error) {
                    console.error('Failed to set initial score:', error);
                  }
                }, 500); // Small delay to ensure animation is fully loaded
              }}
              onStop={(animName, isStateMachine) => {
                console.log('Score animation stopped:', animName, isStateMachine);
              }} 
              onError={(error) => {
                console.error('Score animation error:', error);
              }}
            />
            
            <View style={styles.scoreControls}>
              <Pressable 
                style={styles.scoreButton}
                onPress={() => setUserScore(Math.max(0, userScore - 50))}
              >
                <B2 style={styles.scoreButtonText}>-</B2>
              </Pressable>
              
              <B2 style={styles.scoreText}>{userScore}</B2>
              
              <Pressable 
                style={styles.scoreButton}
                onPress={() => setUserScore(Math.min(900, userScore + 50))}
              >
                <B2 style={styles.scoreButtonText}>+</B2>
              </Pressable>
            </View>
          </View>
        </Reanimated.View>
        
        {/* Drawer Content */}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Reanimated.View style={[styles.drawerContainer, drawerAnimatedStyle]}>
            <View style={styles.drawerHandleContainer}>
              <View style={styles.drawerHandle} />
            </View>
            
            <ReanimatedScrollView
              ref={scrollViewRef}
              onScroll={scrollHandler}
              scrollEventThrottle={32}
              contentContainerStyle={[
                styles.scrollContent,
                isDrawerAtTop.value ? { paddingBottom: 160 } : { paddingBottom: 120 }
              ]}
              showsVerticalScrollIndicator={true}
              style={styles.scrollView}
              scrollEnabled={scrollEnabled}
              bounces={isDrawerAtTop.value}
              nestedScrollEnabled={true}
              removeClippedSubviews={true}
            >
              <View style={styles.drawerContent}>
                <SH2 style={styles.drawerTitle}>Your Financial Summary</SH2>
                
                {/* Placeholder content */}
                {[...Array(15)].map((_, index) => (
                  <View key={index} style={styles.card}>
                    <B3 style={styles.cardTitle}>Financial Item {index + 1}</B3>
                    <B2 style={styles.cardDescription}>This is a sample card with placeholder content.</B2>
                  </View>
                ))}
                <View>
                  <View style={styles.buttonsContainer}>
                    <Link href="/design-system" asChild>
                      <Pressable style={styles.button}>
                        <ButtonLg style={styles.buttonText}>Design System</ButtonLg>
                      </Pressable>
                    </Link>
                    
                    <Pressable 
                      style={[styles.button, { backgroundColor: colors.error[500], marginTop: 16, marginBottom: 30 }]}
                      onPress={resetOnboarding}
                    >
                      <ButtonLg style={styles.buttonText}>Reset Onboarding</ButtonLg>
                    </Pressable>
                  </View>
                </View>
              </View>
            </ReanimatedScrollView>
          </Reanimated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary[900],
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 60, // Add more padding at top
    paddingBottom: 12,
    backgroundColor: colors.primary[900],
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    color: colors.neutral[100],
    fontSize: 16,
  },
  username: {
    color: colors.neutral[50],
    marginTop: 2,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  headerContent: {
    height: SCREEN_HEIGHT * 0.35,
    backgroundColor: colors.primary[900],
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
    // Make sure it's visible by default
    opacity: 1,
  },
  headerText: {
    color: colors.neutral[100],
    marginBottom: 24,
    textAlign: 'center',
  },
  scoreContainer: {
    width: 200,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreAnimation: {
    width: '100%',
    height: '80%',
  },
  scoreControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 8,
  },
  scoreButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary[700],
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  scoreButtonText: {
    color: colors.neutral[50],
    fontSize: 20,
    fontWeight: 'bold',
  },
  scoreText: {
    color: colors.neutral[50],
    width: 60,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: colors.primary[500],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
  },
  drawerContainer: {
    
    position: 'absolute',
    top: HEADER_HEIGHT, // Exactly at the bottom of the header
    left: 0,
    right: 0,
    // Height is now dynamically set in the animation
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    // Add shadow to make it more prominent
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  drawerHandleContainer: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    // Make the handle container touch target bigger for easier dragging
    width: '100%',
  },
  drawerHandle: {
    width: 60,
    height: 5,
    backgroundColor: colors.neutral[300],
    borderRadius: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Extra padding for bottom tab bar
  },
  drawerContent: {
    padding: 16,
  },
  drawerTitle: {
    color: colors.primary[900],
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.neutral[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  cardTitle: {
    color: colors.primary[700],
    marginBottom: 8,
  },
  cardDescription: {
    color: colors.neutral[600],
  },
  debugInfo: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 5,
    borderRadius: 5,
    zIndex: 9999,
  },
  debugText: {
    color: 'white',
    fontSize: 10,
  },
}); 