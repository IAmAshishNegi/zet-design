import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing, 
  runOnJS,
  interpolateColor,
  withDelay
} from 'react-native-reanimated';
import { RiveRef } from 'rive-react-native';
import { RiveAnimation } from '../ui/rive-animation';

type SplashScreenProps = {
  onAnimationComplete: () => void;
};

const { width, height } = Dimensions.get('window');
const RIVE_SIZE = 200; // Size for the Rive animation container
const CIRCLE_INITIAL_SIZE = 1;
// Calculate diagonal of screen to ensure circle covers entire screen
const FINAL_SCALE = Math.sqrt(width * width + height * height) / CIRCLE_INITIAL_SIZE;

// Animation timing constants
const RIVE_ANIMATION_DELAY = 1000; // 1 second delay before showing Rive
const RIVE_DISPLAY_DURATION = 4000; // 4 seconds minimum display time for Rive animation
const CIRCLE_ANIMATION_DELAY = 800; // Delay before starting the circle animation
const CIRCLE_ANIMATION_DURATION = 1000; // Duration of circle expansion
const BG_COLOR_ANIMATION_DURATION = 300; // Duration of background color change

const SplashScreen = ({ onAnimationComplete }: SplashScreenProps) => {
  const [isRiveReady, setIsRiveReady] = useState(false);
  const [showRive, setShowRive] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [minDisplayTimeElapsed, setMinDisplayTimeElapsed] = useState(false);
  const circleScale = useSharedValue(0);
  const bgColorProgress = useSharedValue(0);
  const riveOpacity = useSharedValue(0);
  const riveRef = useRef<RiveRef>(null);
  
  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      bgColorProgress.value,
      [0, 1],
      ['white', '#7F29BD']
    )
  }));

  const riveAnimatedStyle = useAnimatedStyle(() => ({
    opacity: riveOpacity.value
  }));

  // Function to safely call the completion callback
  const handleAnimationComplete = () => {
    if (typeof onAnimationComplete === 'function') {
      onAnimationComplete();
    } else {
      console.warn('onAnimationComplete is not a function:', onAnimationComplete);
    }
  };
  
  // Check if we can proceed to the next screen
  useEffect(() => {
    if (animationComplete && minDisplayTimeElapsed) {
      console.log('All conditions met, proceeding to next screen');
      handleAnimationComplete();
    }
  }, [animationComplete, minDisplayTimeElapsed]);

  // Set minimum display time for the Rive animation
  useEffect(() => {
    const minDisplayTimer = setTimeout(() => {
      console.log('Minimum display time elapsed');
      setMinDisplayTimeElapsed(true);
      // Check if animation is already complete to proceed
      if (animationComplete) {
        handleAnimationComplete();
      }
    }, RIVE_DISPLAY_DURATION);

    return () => clearTimeout(minDisplayTimer);
  }, [animationComplete]);
  
  // Delay Rive animation start
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      console.log('Starting Rive animation after delay');
      setShowRive(true);
      riveOpacity.value = withTiming(1, { 
        duration: 500,
        easing: Easing.inOut(Easing.ease)
      });
    }, RIVE_ANIMATION_DELAY);

    return () => clearTimeout(delayTimer);
  }, []);
  
  useEffect(() => {
    let isMounted = true;

    // Start the visual animation after a short delay
    const animationTimer = setTimeout(() => {
      if (!isMounted) return; // Don't start animation if unmounted
      circleScale.value = withTiming(FINAL_SCALE, { 
        duration: CIRCLE_ANIMATION_DURATION,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }, (finished) => {
        if (finished && isMounted) {
          bgColorProgress.value = withTiming(1, {
            duration: BG_COLOR_ANIMATION_DURATION,
            easing: Easing.inOut(Easing.ease),
          }, (colorFinished) => {
            if (colorFinished && isMounted && isRiveReady) {
                console.log('Visual animation finished and Rive ready');
                runOnJS(setAnimationComplete)(true);
                // Note: we don't directly call handleAnimationComplete here anymore
                // It will be called when both conditions are met
            }
          });
        }
      });
    }, CIRCLE_ANIMATION_DELAY);
    
    return () => {
      isMounted = false;
      clearTimeout(animationTimer);
    };
  }, [isRiveReady]); 

  // Effect specifically to handle calling completion if animation finishes *before* Rive loads
  useEffect(() => {
    if (isRiveReady && bgColorProgress.value === 1) {
        console.log('Rive ready after visual animation finished');
        setAnimationComplete(true);
        // Again, don't call handleAnimationComplete directly
    }
  }, [isRiveReady, bgColorProgress.value]);

  // Handle Rive loading state with a fallback
  useEffect(() => {
    // Set a timeout to consider Rive ready even if it doesn't load properly
    const fallbackTimer = setTimeout(() => {
      if (!isRiveReady) {
        console.log('Rive fallback timer triggered');
        setIsRiveReady(true);
      }
    }, 3000); // 3 seconds timeout
    
    return () => clearTimeout(fallbackTimer);
  }, [isRiveReady]);
  
  // Handle Rive animation events
  const handleRivePlay = (animationName: string, isStateMachine: boolean) => {
    console.log('Rive animation started playing:', animationName, isStateMachine);
    setIsRiveReady(true);
  };
  
  const handleRiveError = (error: any) => {
    console.error('Rive animation error:', error);
    // Despite the error, mark as ready to continue with the flow
    setIsRiveReady(true); 
  };
  
  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      {/* Rive animation in center */}
      <Animated.View style={[styles.riveContainer, riveAnimatedStyle]}>
        {showRive && (
          <RiveAnimation
            ref={riveRef}
            source={require('../../assets/rive/slash_screen.riv')}
            autoplay={true}
            style={styles.riveAnimation}
            onPlay={handleRivePlay}
            onError={handleRiveError}
          />
        )}
      </Animated.View>
      
      {/* Expanding circle overlay */}
      <Animated.View style={[styles.circle, animatedCircleStyle]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'hidden', // Hide the parts of the circle outside the screen bounds
  },
  riveContainer: {
    width: RIVE_SIZE,
    height: RIVE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensure Rive is above the circle initially
  },
  riveAnimation: {
    width: RIVE_SIZE,
    height: RIVE_SIZE,
  },
  circle: {
    position: 'absolute',
    width: CIRCLE_INITIAL_SIZE,
    height: CIRCLE_INITIAL_SIZE,
    borderRadius: CIRCLE_INITIAL_SIZE / 2,
    backgroundColor: '#7F29BD',
    zIndex: 5, // Place circle behind the Rive animation
  }
});

export default SplashScreen; 