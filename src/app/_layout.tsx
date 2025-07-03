import '../../global.css'; // Import global CSS **first**
import { Stack } from 'expo-router';
import React, { useEffect, Suspense, memo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator } from 'react-native';
import { fontFamily } from '../styles/theme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// ** Performance Optimization: Loading component **
const LoadingScreen = memo(() => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
    <ActivityIndicator size="large" color="#832DC2" />
  </View>
));
LoadingScreen.displayName = 'LoadingScreen';

// ** Performance Optimization: Memoized Stack.Screen components **
const StackScreens = memo(() => (
  <Stack>
    <Stack.Screen name="index" options={{ title: 'Home' }} />
    <Stack.Screen name="design-system" options={{ title: 'Design System' }} />
    <Stack.Screen name="components" options={{ title: 'Components' }} />
    <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    <Stack.Screen name="rive-test" options={{ title: 'Rive Animations' }} />
  </Stack>
));
StackScreens.displayName = 'StackScreens';

// ** Performance Optimization: Memoized RootLayout component **
const RootLayout = memo(() => {
  const [fontsLoaded, fontError] = useFonts({
    'THICCCBOI-Regular': require('../assets/fonts/THICCCBOI-Regular.ttf'),
    'THICCCBOI-Medium': require('../assets/fonts/THICCCBOI-Medium.ttf'),
    'THICCCBOI-SemiBold': require('../assets/fonts/THICCCBOI-SemiBold.ttf'),
    'THICCCBOI-Bold': require('../assets/fonts/THICCCBOI-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after fonts have loaded or an error occurred
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return <LoadingScreen />;
  }

  // Render the layout with Suspense for better loading experience
  return (
    <SafeAreaProvider>
      <Suspense fallback={<LoadingScreen />}>
        <StackScreens />
      </Suspense>
    </SafeAreaProvider>
  );
});

RootLayout.displayName = 'RootLayout';

export default RootLayout; 