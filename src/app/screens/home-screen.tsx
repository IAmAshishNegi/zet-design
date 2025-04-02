import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, Pressable, ScrollView, Platform, Dimensions } from 'react-native';
import { colors } from '../../styles/theme';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsive } from '../../utils/responsive';
import { 
  H3, H4, B2, B3, ButtonLg, SH2, ScoreDigit, 
  SH3, B4, SH5, SH1, Avatar, RiveAnimation, 
  H6, Divider
} from '../../components/ui';
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
  cancelAnimation,
  withSequence
} from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView, ScrollView as GHScrollView } from 'react-native-gesture-handler';
import { RiveRef } from 'rive-react-native';
import { CreditBuilderMemberCards, SectionHeader } from '../../components/credit-builder';
import { PromoBanner, BannerItem } from '../../components/carousel';
import { Audio } from 'expo-av';

// Use GestureHandler's ScrollView to prevent gesture conflicts
const ReanimatedScrollView = Reanimated.createAnimatedComponent(GHScrollView);

const HAS_SEEN_ONBOARDING = 'has_seen_onboarding';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const HEADER_HEIGHT = responsive.height(SCREEN_HEIGHT * 0.115);
const DRAWER_SNAP_TOP = 0;
const DRAWER_SNAP_MIDDLE = responsive.height(SCREEN_HEIGHT * 0.34);
const DRAWER_SNAP_BOTTOM = responsive.height(SCREEN_HEIGHT * 0.73);

// Spring animation config for smooth transitions
const SPRING_CONFIG = {
  damping: 55,
  stiffness: 320,
  mass: 0.7,
  overshootClamping: false,
  restDisplacementThreshold: 0.05,
  restSpeedThreshold: 0.05
};

// Define credit score data type
type CreditScoreData = {
  score: number;
  name: string;
  lastUpdated: string;
  change: number;
  status: 'good' | 'fair' | 'poor';
};

// Sample credit score data
const creditScoreData: CreditScoreData = {
  score: 350,
  name: 'Ashish',
  lastUpdated: '2023-06-15',
  change: 25,
  status: 'good'
};

// Banner data for carousel
const bannerData: BannerItem[] = [
  {
    id: '1',
    imageUrl: require('../../assets/images/upi.webp'),
    onPress: () => console.log('UPI banner pressed')
  },
  {
    id: '2',
    imageUrl: require('../../assets/images/abhibus.webp'),
    onPress: () => console.log('Abhibus banner pressed')
  }
];

// SlotMachineDigit Component for displaying individual digits
const SlotMachineDigit = ({ digit, animationDelay = 0 }: { digit: number, animationDelay?: number }) => {
  // Instead of a full reel, we'll create just enough digits for a convincing animation
  // The last digit will always be our target digit
  const slotDigits = useMemo(() => {
    const digits = [];
    
    // Add 10 random digits
    for (let i = 0; i < 10; i++) {
      digits.push(Math.floor(Math.random() * 10));
    }
    
    // Add our target digit at the end
    digits.push(digit);
    
    return digits;
  }, [digit]);
  
  // Track current displayed digit index
  const currentIndex = useSharedValue(0);
  const opacity = useSharedValue(0);
  // Shared value for bounce effect - moved to component top level
  const translateY = useSharedValue(0);
  
  // Track if animation is complete
  const [isComplete, setIsComplete] = useState(false);
  const [displayDigit, setDisplayDigit] = useState(slotDigits[0]);
  
  useEffect(() => {
    // Start animation after delay
    const startTimer = setTimeout(() => {
      // Fade in
      opacity.value = 1;
      
      // Setup timing for rapid digit changes (simulating slot machine)
      let currentStep = 0;
      const totalSteps = slotDigits.length;
      
      // Start with faster changes, then slow down
      const updateInterval = (step: number) => {
        // Start with 40ms between changes, gradually slow down
        const baseInterval = 40;
        const slowdownFactor = Math.pow(step / totalSteps, 2) * 300; // Exponential slowdown
        return baseInterval + slowdownFactor;
      };
      
      // Recursive function to update digits with variable timing
      const updateDigit = () => {
        if (currentStep < totalSteps) {
          // Update the displayed digit
          setDisplayDigit(slotDigits[currentStep]);
          currentIndex.value = currentStep;
          
          // Calculate next update time (slowing down gradually)
          const nextUpdateTime = updateInterval(currentStep);
          currentStep++;
          
          // Schedule next update with variable timing
          setTimeout(updateDigit, nextUpdateTime);
        } else {
          // Animation complete, ensure we display the final digit
          setDisplayDigit(digit);
          setIsComplete(true);
          
          // Add a final bounce effect - apply directly to the translateY value
          translateY.value = withSequence(
            withTiming(responsive.height(-10), { duration: 100, easing: Easing.out(Easing.cubic) }),
            withTiming(0, { duration: 300, easing: Easing.elastic(2) })
          );
        }
      };
      
      // Start the update sequence
      updateDigit();
    }, animationDelay);
    
    return () => clearTimeout(startTimer);
  }, [digit, animationDelay, slotDigits]);
  
  // Style for the digit
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }]
    };
  });
  
  return (
    <View style={styles.digitContainer}>
      <Reanimated.View style={[styles.digitDisplay, animatedStyle]}>
        <ScoreDigit 
          style={styles.digitText}
          scoreWeight="scoreSemibold"
          variant="5xl"
        >
          {displayDigit}
        </ScoreDigit>
      </Reanimated.View>
    </View>
  );
};

// CreditScoreCounter component
const CreditScoreCounter = ({ score, onScoreAnimationComplete, isPageLoaded = false }: { 
  score: number, 
  onScoreAnimationComplete?: () => void,
  isPageLoaded?: boolean
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const previousScore = useRef(score);
  const [shouldAnimateDigits, setShouldAnimateDigits] = useState(false);
  
  // Wait for the page to be loaded before starting the animation
  useEffect(() => {
    if (isPageLoaded) {
      // Add a small delay to ensure everything is ready
      const animationStartTimer = setTimeout(() => {
        setShouldAnimateDigits(true);
      }, 300);
      
      return () => clearTimeout(animationStartTimer);
    }
  }, [isPageLoaded]);
  
  // Track when animation starts and completes
  useEffect(() => {
    if (shouldAnimateDigits && previousScore.current !== score) {
      setIsAnimating(true);
      previousScore.current = score;
      
      // Estimate when animation completes based on longest animation delay + duration
      const longestDelay = score.toString().length * 200; // Based on delay between digits
      const animationDuration = 600; // Based on final digit animation duration (updated to be slower)
      const buffer = 100; // Extra buffer increased
      
      const completionTimeout = setTimeout(() => {
        setIsAnimating(false);
        if (onScoreAnimationComplete) onScoreAnimationComplete();
      }, longestDelay + animationDuration + buffer);
      
      return () => clearTimeout(completionTimeout);
    }
  }, [score, onScoreAnimationComplete, shouldAnimateDigits]);
  
  // Convert score to array of digits
  const digits = score.toString().split('').map(Number);
  
  return (
    <View style={styles.scoreCounterContainer}>
      <View style={styles.digitsRow}>
        {shouldAnimateDigits && digits.map((digit, index) => (
          <SlotMachineDigit 
            key={index} 
            digit={digit} 
            animationDelay={index * 200} // Cascade animation from left to right
          />
        ))}
      </View>
      <View>
        <B3 className='text-neutral-0'>Your Score</B3>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const [greeting, setGreeting] = useState('');
  const [username, setUsername] = useState('');
  const [avatarImageUrl, setAvatarImageUrl] = useState<string | null>('https://placekitten.com/100/100');
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
  
  // Initialize userScore with creditScoreData.score
  const [userScore, setUserScore] = useState(creditScoreData.score);
  const riveScoreRef = useRef<RiveRef>(null);
  
  // Audio references and state
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [isBubblePressed, setIsBubblePressed] = useState(false);
  const audioDelayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Load audio file
  useEffect(() => {
    let isMounted = true;
    let soundInstance: Audio.Sound | null = null;
    
    async function loadAudio() {
      try {
        // Make sure audio is configured properly
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });
        
        // Check if the audio file exists before loading
        if (Platform.OS === 'android') {
          // On Android, we can use FileSystem to verify the asset exists
          const assetInfo = await require('../../assets/audio/ashish_Score.mp3');
          if (!assetInfo) {
            console.error('Audio file not found');
            return;
          }
        }
        
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/audio/ashish_Score.mp3'),
          { shouldPlay: false },
          (status) => {
            // Handle playback status updates if needed
            if ('didJustFinish' in status && status.didJustFinish && isBubblePressed) {
              // If audio finished while still pressed, restart it
              sound.replayAsync();
            }
          }
        );
        
        // Set initial volume and rate
        await sound.setVolumeAsync(1.0);
        await sound.setRateAsync(1.0, true);
        
        soundInstance = sound;
        
        // Only update state if component is still mounted
        if (isMounted) {
          setSound(sound);
          setIsAudioLoaded(true);
        }
      } catch (error) {
        console.error('Failed to load audio:', error);
        if (isMounted) {
          setIsAudioLoaded(false);
        }
      }
    }
    
    loadAudio();
    
    // Cleanup function for unmounting
    return () => {
      isMounted = false;
      if (soundInstance) {
        try {
          soundInstance.stopAsync().then(() => soundInstance?.unloadAsync());
        } catch (error) {
          console.error('Error unloading sound:', error);
        }
      }
    };
  }, []);
  
  // Play or stop audio based on press state
  useEffect(() => {
    async function handleAudio() {
      if (!sound || !isAudioLoaded) return;
      
      try {
        if (isBubblePressed) {
          // Don't immediately play - the timer is handled in handleScorePress
          // The audio will start playing after 1 second if the user keeps holding
        } else {
          // Stop playing immediately when released
          const status = await sound.getStatusAsync();
          if ('isLoaded' in status && status.isLoaded && status.isPlaying) {
            await sound.stopAsync();
          }
        }
      } catch (error) {
        console.error('Audio playback error:', error);
        // Try to recover from error
        setIsAudioLoaded(false);
      }
    }
    
    handleAudio();
  }, [isBubblePressed, sound, isAudioLoaded]);
  
  // Handle press events for the score container
  const handleScorePress = () => {
    setIsBubblePressed(true);
    
    // Update Rive animation bubblePressed input immediately
    if (riveScoreRef.current) {
      try {
        riveScoreRef.current.setInputState('State Machine 1', 'bubblePressed', true);
      } catch (error) {
        console.error('Failed to update Rive bubblePressed state:', error);
      }
    }
    
    // Clear any existing timer
    if (audioDelayTimerRef.current) {
      clearTimeout(audioDelayTimerRef.current);
      audioDelayTimerRef.current = null;
    }
    
    // Set a 1-second delay before playing audio
    audioDelayTimerRef.current = setTimeout(async () => {
      if (!sound || !isAudioLoaded) {
        // Try reloading sound if not available
        try {
          const { sound: newSound } = await Audio.Sound.createAsync(
            require('../../assets/audio/ashish_Score.mp3'),
            { shouldPlay: true }
          );
          setSound(newSound);
          setIsAudioLoaded(true);
        } catch (e) {
          console.error('Error loading sound on press:', e);
        }
      } else {
        // Play sound after 1 second delay if still pressed
        try {
          await sound.stopAsync();
          await sound.setPositionAsync(0);
          await sound.playAsync();
        } catch (error) {
          console.error('Error playing sound after delay:', error);
        }
      }
      
      audioDelayTimerRef.current = null;
    }, 1000); // 1000ms = 1 second delay
  };
  
  const handleScoreRelease = () => {
    setIsBubblePressed(false);
    
    // Update Rive animation bubblePressed input
    if (riveScoreRef.current) {
      try {
        riveScoreRef.current.setInputState('State Machine 1', 'bubblePressed', false);
      } catch (error) {
        console.error('Failed to update Rive bubblePressed state:', error);
      }
    }
    
    // Clear the timer if user releases before the delay completes
    if (audioDelayTimerRef.current) {
      clearTimeout(audioDelayTimerRef.current);
      audioDelayTimerRef.current = null;
    }
    
    // Stop audio immediately on release (redundant with the useEffect, but added for safety)
    if (sound && isAudioLoaded) {
      sound.stopAsync().catch(error => {
        console.error('Error stopping sound on release:', error);
      });
    }
  };
  
  // Ensure userScore always reflects creditScoreData.score (add this effect)
  useEffect(() => {
    // Force synchronize the state with the latest data
    setUserScore(creditScoreData.score);
  }, [creditScoreData.score]);
  
  // Dynamic height calculation based on drawer position
  const animatedHeight = useDerivedValue(() => {
    // Use the constant drawer snap positions but apply the content height calculations
    // These should be updated to use the current user-preferred snap points
    
    // Calculate progress based on position between snap points
    if (drawerY.value <= DRAWER_SNAP_MIDDLE) {
      // Use original calculation but with current snap values
      return interpolate(
        drawerY.value,
        [DRAWER_SNAP_MIDDLE, DRAWER_SNAP_TOP],
        [SCREEN_HEIGHT * 0.75, SCREEN_HEIGHT - HEADER_HEIGHT],
        Extrapolate.CLAMP
      );
    } else {
      // Use original calculation but with current snap values
      return interpolate(
        drawerY.value,
        [DRAWER_SNAP_BOTTOM, DRAWER_SNAP_MIDDLE],
        [SCREEN_HEIGHT * 0.35, SCREEN_HEIGHT * 0.75],
        Extrapolate.CLAMP
      );
    }
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

  // Update Rive animation when userScore changes
  useEffect(() => {
    // Update Rive animation with new score
    const updateRiveScore = () => {
      if (riveScoreRef.current) {
        try {
          // Set the score input value in the Rive animation using the correct method
          riveScoreRef.current.setInputState('State Machine 1', 'score', creditScoreData.score);
          // console.log('Updated Rive score to:', creditScoreData.score);
        } catch (error) {
          // console.error('Failed to update Rive score:', error);
        }
      }
    };
    
    // Immediate update attempt
    updateRiveScore();
    
    // Also attempt update after a short delay to ensure Rive is ready
    const delayedUpdate = setTimeout(updateRiveScore, 300);
    
    return () => clearTimeout(delayedUpdate);
  }, [userScore, creditScoreData.score]);

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

  const headerAnimatedStyle = useAnimatedStyle(() => {
    // Use fixed value for the denominator instead of DRAWER_SNAP_MIDDLE
    const fixedMiddleY = SCREEN_HEIGHT * 0.45; // Original fixed position
    return {
      opacity: Math.max(0, Math.min(1, drawerY.value / (fixedMiddleY * 0.6))),
    };
  }, []);

  // Add animation for drawer handle visibility
  const drawerHandleAnimatedStyle = useAnimatedStyle(() => {
    // Use fixed values instead of DRAWER_SNAP_BOTTOM
    const fixedBottomY = SCREEN_HEIGHT * 0.73; // Original fixed position
    
    // Calculate opacity based on drawer position - visible only near bottom position
    const opacity = interpolate(
      drawerY.value,
      [fixedBottomY - 50, fixedBottomY],
      [0, 1],
      Extrapolate.CLAMP
    );
    
    return { opacity };
  }, []);

  // Add this animation calculation to control score container scale and position
  const scoreContainerAnimatedStyle = useAnimatedStyle(() => {
    // Use fixed positions for progress calculation - independent of drawer snap points
    const fixedMiddleY = SCREEN_HEIGHT * 0.45; // Original fixed position
    const fixedBottomY = SCREEN_HEIGHT * 0.73; // Original fixed position
    
    // Calculate progress from middle to bottom (0 at middle, 1 at bottom)
    const progressToBottom = interpolate(
      drawerY.value,
      [fixedMiddleY, fixedBottomY],
      [0, 1],
      Extrapolate.CLAMP
    );
    
    // Scale factor increases as drawer moves down (1.0 to 1.18)
    const scale = interpolate(
      progressToBottom,
      [0, 1],
      [1, 1.18],
      Extrapolate.CLAMP
    );
    
    // Move down as drawer moves down (0 to 20)
    const translateY = interpolate(
      progressToBottom,
      [0, 1],
      [0, 20],
      Extrapolate.CLAMP
    );
    
    return {
      transform: [
        { scale },
        { translateY },
      ]
    };
  }, []);

  const [pageLoaded, setPageLoaded] = useState(false);
  
  // Add this before other useEffects
  useEffect(() => {
    // Mark the page as loaded after its initial render
    const loadTimer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(loadTimer);
  }, []);

  const [avatarVariant, setAvatarVariant] = useState<'default' | 'outline' | 'small'>('default');
  
  // Function to toggle avatar image for testing
  const toggleAvatarImage = () => {
    setAvatarImageUrl(prev => prev ? null : 'https://placekitten.com/100/100');
    // Also toggle through the variants
    setAvatarVariant(current => {
      if (current === 'default') return 'outline';
      if (current === 'outline') return 'small';
      return 'default';
    });
  };

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <View style={styles.container}>
        <StatusBar style="light" />
        
        {/* App Bar */}
        <View style={styles.appBar}>
          
          <Pressable 
            style={styles.avatarContainer}
            onPress={toggleAvatarImage}
          >
            <Avatar 
              source={avatarImageUrl} 
              name={creditScoreData.name}
              borderRadius={12}
              size={48}
              className={creditScoreData.change >= 0 ? "shadow-success" : "shadow-error"}
              variant={avatarVariant}
            />
          </Pressable>
          <View style={styles.greetingContainer}>
            <SH3 className="text-white opacity-50">{greeting}</SH3>
            <H4 className="text-white opacity-80">{creditScoreData.name}</H4>
          </View>
        </View>
        
        {/* Header Content */}
        <Reanimated.View style={[styles.headerContent, headerAnimatedStyle]}>
          {/* <B2 style={styles.headerText}>Your financial overview</B2> */}
          
          <Pressable 
            style={[styles.scoreContainerPressable, isBubblePressed && styles.scoreContainerPressed]}
            onPressIn={handleScorePress}
            onPressOut={handleScoreRelease}
          >
            <Reanimated.View style={[styles.scoreContainer, scoreContainerAnimatedStyle]}>
              <View style={styles.riveAnimationContainer}>
                <RiveAnimation
                  ref={riveScoreRef}
                  source={require('../../assets/rive/scorebubble_int.riv')}
                  autoplay={true}
                  style={styles.scoreAnimation}
                  artboardName="creditBubble"
                  stateMachineName="State Machine 1"
                  onPlay={(animName, isStateMachine) => {
                    // console.log('Score animation playing:', animName, isStateMachine);
                    
                    // When animation starts playing, set the score on both the Rive animation and update our state
                    const syncScoreWithRive = () => {
                      try {
                        // First make sure our React state matches the creditScoreData
                        if (userScore !== creditScoreData.score) {
                          setUserScore(creditScoreData.score);
                        }
                        
                        // Then update Rive with this value
                        riveScoreRef.current?.setInputState('State Machine 1', 'score', creditScoreData.score);
                        // console.log('Set initial Rive score value to:', creditScoreData.score);
                      } catch (error) {
                        // console.error('Failed to set initial score:', error);
                      }
                    };
                    
                    // Try immediately and with a delay to ensure it works
                    syncScoreWithRive();
                    setTimeout(syncScoreWithRive, 500);
                  }}
                  onStop={(animName, isStateMachine) => {
                    // console.log('Score animation stopped:', animName, isStateMachine);
                  }} 
                  onError={(error) => {
                    // console.error('Score animation error:', error);
                  }}
                />
                
                {/* Overlay the counter in the center of Rive animation */}
                <View style={styles.overlayCounterContainer}>
                  <CreditScoreCounter 
                    score={creditScoreData.score} 
                    isPageLoaded={pageLoaded} 
                    onScoreAnimationComplete={() => {
                      // Ensure Rive animation is in sync after digits finish animating
                      if (riveScoreRef.current) {
                        try {
                          riveScoreRef.current.setInputState('State Machine 1', 'score', creditScoreData.score);
                        } catch (error) {
                          console.error('Failed to sync Rive after counter animation:', error);
                        }
                      }
                    }}
                  />
                </View>
              </View>
              <View className='items-center'>
                <SH1 className='text-white'>
                  Your Credit Score is {
                    creditScoreData.score <= 350 ? 'Poor' :
                    creditScoreData.score <= 600 ? 'Average' :
                    creditScoreData.score <= 750 ? 'Good' : 'Excellent'
                  }
                </SH1>
                <B4 className='text-white opacity-50 mt-1'>Last updated on: {creditScoreData.lastUpdated}</B4>
                <View className='flex-row items-center'>
                  <View className={`px-2 py-1 mt-2 rounded-full ${creditScoreData.change >= 0 ? 'bg-success-100' : 'bg-error-100'}`}>
                    <B4 className={creditScoreData.change >= 0 ? 'text-success-900' : 'text-error-500'}>
                      {creditScoreData.change >= 0 ? '+' : ''}{creditScoreData.change} pts since last update
                    </B4>
                  </View>
                </View>
              </View>
            </Reanimated.View>
          </Pressable>
        </Reanimated.View>
        
        {/* Drawer Content */}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Reanimated.View style={[styles.drawerContainer, drawerAnimatedStyle]}>
            <View style={styles.drawerHandleContainer}>
              <Reanimated.View style={[styles.drawerHandle, drawerHandleAnimatedStyle]} />
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
              <View>
                <View className='px-4'>
                <SectionHeader 
                  title="Credit Builder Membership" 
                  actionLabel="View All Benefits"
                  onActionPress={() => {
                    // Handle view all press
                    console.log('View all pressed');
                  }}
                />
                </View>
                <View className='mt-1 mb-2 px-4'>
                  <CreditBuilderMemberCards />
                </View>
                
                <Divider variant="section" className="my-4" />

                <PromoBanner
                  bannerData={bannerData}
                  autoPlay={true}
                  duration={5000}
                  showIndicators={true}
                  bannerHeight={200}
                  indicatorPosition="bottom"
                  onActionPress={() => {
                    console.log('View all offers pressed');
                  }}
                />

                <Divider variant="section" className="my-4" />
                
                  <SectionHeader 
                  title="Your Financial Tips" 
                  actionLabel="More"
                  onActionPress={() => {
                    // Handle more press
                    console.log('More tips pressed');
                  }}
                />
                
                {/* Sample content after the credit builder cards */}
                {[...Array(5)].map((_, index) => (
                  <View key={index} style={styles.card}>
                    <B3 style={styles.cardTitle}>Financial Tip {index + 1}</B3>
                    <B2 style={styles.cardDescription}>This is a sample financial tip with placeholder content.</B2>
                    
                    {/* Add line divider within each card */}
                    <Divider variant="line" color={colors.neutral[200]} className="my-3" />
                    
                    <View style={styles.cardFooter}>
                      <B4 style={styles.cardDate}>Updated 2 days ago</B4>
                      
                      {/* Add vertical divider in card footer */}
                      <View style={styles.footerDivider}>
                        <Divider variant="vertical" height={16} thickness={1} color={colors.neutral[300]} />
                      </View>
                      
                      <B4 style={styles.cardCategory}>Finance</B4>
                    </View>
                  </View>
                ))}
                
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
    backgroundColor: colors.primary[1000],
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 60, // Add more padding at top
    paddingBottom: 12,
    backgroundColor: colors.primary[1000],
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
    marginRight: 16,
  },
  headerContent: {
    height: responsive.height(276), // Fixed height equivalent to 0.34 of base height (812 * 0.34)
    backgroundColor: colors.primary[1000],
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
  scoreContainerPressable: {
    width: '100%',
    height: responsive.height(350),
  },
  scoreContainerPressed: {
    opacity: 0.9,
  },
  scoreContainer: {
    width: '100%',
    height: responsive.height(340),
    paddingTop: responsive.height(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  riveAnimationContainer: {
    width: '100%',
    height: responsive.height(210),
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreAnimation: {
    width: '85%',
    height: '85%',
  },
  overlayCounterContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: responsive.width(-45) }, // Responsive horizontal offset
      { translateY: responsive.height(-45) } // Responsive vertical offset
    ],
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 8,
    padding: responsive.spacing(8),
  },
  scoreCounterContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  digitsRow: {
    flexDirection: 'row',
    height: responsive.height(55),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  digitContainer: {
    width: responsive.width(22),
    height: responsive.height(60),
    overflow: 'hidden',
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitDisplay: {
    height: responsive.height(60),
    width: responsive.width(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitText: {
    color: colors.neutral[50],
    textShadowColor: 'rgba(0, 0, 0, 0.168)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  scoreLabel: {
    fontSize: 14,
    color: colors.neutral[200],
    marginBottom: 2,
  },
  scoreDate: {
    fontSize: 12,
    color: colors.neutral[300],
    marginBottom: 2,
  },
  
  scoreChangeIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  scoreChange: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  positiveChange: {
    color: colors.success[700],
  },
  negativeChange: {
    color: colors.error[700],
  },
  positiveChangeContainer: {
    backgroundColor: colors.success[100],
  },
  negativeChangeContainer: {
    backgroundColor: colors.error[100],
  },
  scoreControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 5,
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
   
    textAlign: 'center',
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
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDate: {
    color: colors.neutral[500],
  },
  footerDivider: {
    marginHorizontal: 8,
  },
  cardCategory: {
    color: colors.primary[700],
  },
  buttonsContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: colors.primary[700],
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.neutral[50],
  },
}); 