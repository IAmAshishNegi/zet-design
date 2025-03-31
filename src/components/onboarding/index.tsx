import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './splash-screen';
import OnboardingScreen from './onboarding-screen';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HAS_SEEN_ONBOARDING = 'has_seen_onboarding';

const OnboardingFlow = () => {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Use useCallback to ensure function identity is stable
  const handleSplashComplete = useCallback(() => {
    // console.log('Splash animation complete');
    setShowSplash(false);
    setShowOnboarding(true);
  }, []);

  const handleGetStarted = async () => {
    // Mark onboarding as complete
    await AsyncStorage.setItem(HAS_SEEN_ONBOARDING, 'true');
    // Navigate to the home screen
    router.replace('/');
  };

  // Auto hide splash after 5 seconds as a fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showSplash) {
        handleSplashComplete();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [showSplash, handleSplashComplete]);

  return (
    <View style={styles.container}>
      {showSplash && (
        <SplashScreen onAnimationComplete={handleSplashComplete} />
      )}
      
      {showOnboarding && (
        <OnboardingScreen onGetStarted={handleGetStarted} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OnboardingFlow;
export { SplashScreen, OnboardingScreen }; 