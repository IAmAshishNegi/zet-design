import '../../global.css'; // Import global CSS **first**
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { fontFamily, colors } from '../styles/theme';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider } from '../context/bottom-sheet-context';
import { UserProvider } from '../context/user-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'THICCCBOI-Regular': require('../assets/fonts/THICCCBOI-Regular.ttf'),
    'THICCCBOI-Medium': require('../assets/fonts/THICCCBOI-Medium.ttf'),
    'THICCCBOI-SemiBold': require('../assets/fonts/THICCCBOI-SemiBold.ttf'),
    'THICCCBOI-Bold': require('../assets/fonts/THICCCBOI-Bold.ttf'),
    // Add Stratos fonts
    'Stratos-Black': require('../assets/fonts/stratos-black.ttf'),
    'Stratos-Bold': require('../assets/fonts/stratos-bold.ttf'),
    'Stratos-SemiBold': require('../assets/fonts/stratos-semibold.ttf'),

    'Glow-Regular': require('../assets/fonts/Glowworm.ttf'),
     
    'MonaSans-Black': require('../assets/fonts/Mona-Sans-Black.ttf'),
    'MonaSans-Bold': require('../assets/fonts/Mona-Sans-Bold.ttf'),
    'MonaSans-ExtraBold': require('../assets/fonts/Mona-Sans-ExtraBold.ttf'),

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <UserProvider>
          <BottomSheetProvider>
            <StatusBar style="light" backgroundColor={colors.primary[900]} />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="design-system" options={{ title: 'Design System' }} />
              <Stack.Screen name="components" options={{ title: 'Components' }} />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="typography-debug" options={{ title: 'Typography Debug' }} />
              <Stack.Screen name="zcoins-screen" options={{ title: 'ZCoins & Redemptions' }} />
              <Stack.Screen name="redeem-voucher-screen" options={{ title: 'Redeem Voucher' }} />
              <Stack.Screen name="convert-to-cash-screen" options={{ title: 'Convert to Cash' }} />
              <Stack.Screen name="my-vouchers-screen" options={{ title: 'My Vouchers' }} />
              <Stack.Screen name="zplus-landing" options={{ title: 'Zet Plus' }} />
            </Stack>
          </BottomSheetProvider>
        </UserProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default RootLayout; 