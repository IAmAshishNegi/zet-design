import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingFlow from '../components/onboarding';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Ensure the Expo splash screen is hidden as soon as this component mounts
export default function OnboardingPage() {
  useEffect(() => {
    // Hide the Expo splash screen
    SplashScreen.hideAsync().catch(() => {
      // Ignore errors if splash screen is already hidden
    });
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
          animation: 'fade' 
        }} 
      />
      <OnboardingFlow />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 