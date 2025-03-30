import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../styles/theme';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Typography, H3, B2, ButtonLg } from '../../components/ui/typography/typography';

const HAS_SEEN_ONBOARDING = 'has_seen_onboarding';

export default function HomeScreen() {
  const router = useRouter();

  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem(HAS_SEEN_ONBOARDING);
      router.push('/onboarding');
    } catch (error) {
      console.log('Error resetting onboarding status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <H3 style={styles.title}>Home</H3>
      <B2 style={styles.subtitle}>Welcome to your financial overview</B2>
      
      <View style={styles.buttonsContainer}>
        <Link href="/design-system" asChild>
          <Pressable style={styles.button}>
            <ButtonLg style={styles.buttonText}>Go to Design System</ButtonLg>
          </Pressable>
        </Link>
        
        <Link href="/components" asChild>
          <Pressable style={[styles.button, { marginTop: 16, backgroundColor: colors.info[500] }]}>
            <ButtonLg style={styles.buttonText}>Go to Components</ButtonLg>
          </Pressable>
        </Link>
        
        <Link href="/rive-test" asChild>
          <Pressable style={[styles.button, { marginTop: 16, backgroundColor: colors.primary[700] }]}>
            <ButtonLg style={styles.buttonText}>Test Rive Animations</ButtonLg>
          </Pressable>
        </Link>
        
        <Pressable 
          style={[styles.button, { backgroundColor: colors.error[500], marginTop: 16 }]}
          onPress={resetOnboarding}
        >
          <ButtonLg style={styles.buttonText}>Reset Onboarding</ButtonLg>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  title: {
    color: colors.primary[500],
    marginBottom: 8,
  },
  subtitle: {
    color: colors.neutral[500],
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 300,
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
  }
}); 