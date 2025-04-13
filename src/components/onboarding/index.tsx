import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './splash-screen';
import OnboardingScreen from './onboarding-screen';
import PhoneInputScreen from './phone-input-screen';
import OtpVerificationScreen from './otp-verification-screen';
import UserDataScreen from './user-data-screen';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HAS_SEEN_ONBOARDING = 'has_seen_onboarding';
const USER_PROFILE_KEY = 'user_profile';

// Onboarding flow stages
type OnboardingStage = 
  | 'splash' 
  | 'intro' 
  | 'phone' 
  | 'otp' 
  | 'userData' 
  | 'complete';

const OnboardingFlow = () => {
  const router = useRouter();
  const [stage, setStage] = useState<OnboardingStage>('splash');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

  // Use useCallback to ensure function identity is stable
  const handleSplashComplete = useCallback(() => {
    setStage('intro');
  }, []);

  // Auto hide splash after 5 seconds as a fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage === 'splash') {
        handleSplashComplete();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [stage, handleSplashComplete]);

  // Handle "Get Started" button press from intro screen
  const handleGetStarted = () => {
    setStage('phone');
  };

  // Handle phone number submission
  const handlePhoneContinue = (number: string) => {
    setPhoneNumber(number);
    setStage('otp');
  };

  // Handle OTP verification success
  const handleOtpVerificationComplete = () => {
    setStage('userData');
  };

  // Handle returning to phone input screen
  const handleGoBackToPhone = () => {
    setStage('phone');
  };

  // Handle user data completion and finalize onboarding
  const handleUserDataComplete = async (data: { name: string; email: string }) => {
    setUserData(data);
    
    try {
      // Save user data
      await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify({
        phone: phoneNumber,
        ...data
      }));
      
      // Mark onboarding as complete
      await AsyncStorage.setItem(HAS_SEEN_ONBOARDING, 'true');
      
      // Complete onboarding
      setStage('complete');
      
      // Navigate to home screen
      router.replace('/');
    } catch (error) {
      console.error('Error saving user data:', error);
      // In a real app, show an error message and retry option
    }
  };

  return (
    <View style={styles.container}>
      {stage === 'splash' && (
        <SplashScreen onAnimationComplete={handleSplashComplete} />
      )}
      
      {stage === 'intro' && (
        <OnboardingScreen onGetStarted={handleGetStarted} />
      )}
      
      {stage === 'phone' && (
        <PhoneInputScreen onContinue={handlePhoneContinue} />
      )}
      
      {stage === 'otp' && (
        <OtpVerificationScreen 
          phoneNumber={phoneNumber} 
          onVerificationComplete={handleOtpVerificationComplete}
          onGoBack={handleGoBackToPhone}
        />
      )}
      
      {stage === 'userData' && (
        <UserDataScreen onComplete={handleUserDataComplete} />
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
export { SplashScreen, OnboardingScreen, PhoneInputScreen, OtpVerificationScreen, UserDataScreen }; 