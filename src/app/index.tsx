import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { Typography } from '../components/ui/typography/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HAS_SEEN_ONBOARDING = 'has_seen_onboarding';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkOnboardingStatus() {
      try {
        const value = await AsyncStorage.getItem(HAS_SEEN_ONBOARDING);
        
        if (value !== 'true') {
          // User hasn't completed onboarding, redirect them
          router.replace('/onboarding');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setIsLoading(false);
      }
    }

    checkOnboardingStatus();
  }, [router]);

  const resetOnboarding = async () => {
    try {
      // Remove the onboarding status
      await AsyncStorage.removeItem(HAS_SEEN_ONBOARDING);
      Alert.alert(
        "Onboarding Reset", 
        "Onboarding status has been reset. Restart the app to see the splash screen again.",
        [
          { 
            text: "Restart Now", 
            onPress: () => router.replace('/onboarding') 
          },
          { 
            text: "Later", 
            style: "cancel" 
          }
        ]
      );
    } catch (error) {
      console.error('Error resetting onboarding status:', error);
      Alert.alert("Error", "Failed to reset onboarding status.");
    }
  };

  if (isLoading) {
    return null; // Don't render anything while checking onboarding status
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <Typography variant="3xl" weight="semibold" className="mb-8">
          Hello from Expo!
        </Typography>
        
        <Link href="/design-system" asChild>
          <Pressable style={styles.button}>
            <Typography variant="lg" weight="medium" className="text-neutral-50">
              Go to Design System
            </Typography>
          </Pressable>
        </Link>
        
        <Link href="/components" asChild>
          <Pressable style={[styles.button, { marginTop: 16, backgroundColor: '#3b82f6' }]}>
            <Typography variant="lg" weight="medium" className="text-neutral-50">
              Go to Components
            </Typography>
          </Pressable>
        </Link>

        <Link href="/rive-test" asChild>
          <Pressable style={[styles.button, { marginTop: 16, backgroundColor: '#7F29BD' }]}>
            <Typography variant="lg" weight="medium" className="text-neutral-50">
              Test Rive Animations
            </Typography>
          </Pressable>
        </Link>
        
        <Pressable 
          style={[styles.button, { marginTop: 24, backgroundColor: '#ef4444' }]}
          onPress={resetOnboarding}
        >
          <Typography variant="lg" weight="medium" className="text-neutral-50">
            Reset Onboarding
          </Typography>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
}); 