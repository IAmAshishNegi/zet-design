import '../../global.css'; // Import global CSS **first**
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { fontFamily } from '../styles/theme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
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
    return null;
  }

  // Render the layout
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="design-system" options={{ title: 'Design System' }} />
        <Stack.Screen name="components" options={{ title: 'Components' }} />
      </Stack>
    </SafeAreaProvider>
  );
}

export default RootLayout; 