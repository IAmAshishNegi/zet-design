import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { Image } from 'react-native';
import { View, StyleSheet, Pressable, ScrollView, Platform, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { colors } from '../../styles/theme';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  H4, B2, B3, ButtonLg, 
  SH3, B4, SH1, SH2, Avatar, RiveAnimation,
  Divider,
  H1,
  B1,
  Button,
  H3,
  ButtonSm,
  SH5
} from '../../components/ui';
import { CreditScoreIcon } from '../../components/ui/icons';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RiveRef, Fit, Alignment } from 'rive-react-native';
import { CreditBuilderMemberCards, SectionHeader } from '../../components/credit-builder';
import { PromoBanner, BannerItem, SpotlightSection, SpotlightItem } from '../../components/carousel';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabBarVisibilityContext } from '../index';
import { LinearGradient } from 'expo-linear-gradient';
import { useBottomSheet } from '../../context/bottom-sheet-context';
import { useApplicationState, APPLICATION_STATUS } from '../../context/application-state-context';
import { ApplicationStatusCard } from '../../components/ui/application';
import { CreditScoreScale } from '../../components/credit-score';
import { AppBar, PreActivationHome, InProcessHome, PostActivationHome, HomeContent } from '../../components/home';

// Constants
const HAS_SEEN_ONBOARDING = 'has_seen_onboarding';
const SCREEN_HEIGHT = Dimensions.get('window').height;

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
  score: 342,
  name: 'Ashish',
  lastUpdated: '15/Mar',
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

// Spotlight carousel data
const spotlightData: SpotlightItem[] = [
  {
    id: '1',
    backgroundImage: require('../../assets/images/fraud_check.webp'),
    title: 'Do you Check your Account Details Regularly?',
    subtitle: '1 in 8 users find account errors using ZET Fraud Checker',
    showSubtitle: true,
    statistic: 'Included with Builder Membership',
    showStatistic: false,
    description: 'Get expert assistance, pickup and drop of documents and doorstep visa delivery.',
    showDescription: false,
    ctaLabel: 'Check Now',
    showCta: true,
    gradientColors: ['rgba(11, 35, 74, 0.7)', 'rgba(3, 2, 29, 0.9)'],
    onPress: () => console.log('Visa spotlight pressed')
  },
  {
    id: '2',
    backgroundImage: require('../../assets/images/cibil_loan.webp'),
    title: 'Good CIBIL Score, Great Loan Offers',
    subtitle: 'Do you know that a good CIBIL score can help you get great loan offers?',
    showSubtitle: true,
    statistic: '100M+ users',
    showStatistic: false,
    description: 'Transfer money instantly to anyone, anywhere with zero fees.',
    showDescription: false,
    ctaLabel: 'Know More',
    showCta: true,
    gradientColors: ['rgba(7, 41, 31, 0.472)', 'rgba(2, 29, 20, 0.9)'],
    onPress: () => console.log('UPI spotlight pressed')
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation<BottomTabNavigationProp<any>>();
  const [greeting, setGreeting] = useState('');
  const [avatarImageUrl, setAvatarImageUrl] = useState<string | null>('https://placekitten.com/100/100');
  const riveScoreRef = useRef<RiveRef>(null);
  const [avatarVariant, setAvatarVariant] = useState<'default' | 'outline' | 'small'>('default');
  const { hideTabBar, showTabBar } = useContext(TabBarVisibilityContext);
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const { applicationStatus, setApplicationStatus, isApplicationStarted } = useApplicationState();
  const scrollRef = useRef<ScrollView>(null);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isPostActivation, setIsPostActivation] = useState(false);
  
  // Set time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Reset onboarding status
  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem(HAS_SEEN_ONBOARDING);
      // Also reset application state
      await setApplicationStatus(APPLICATION_STATUS.NOT_STARTED);
      router.push('/onboarding');
    } catch (error) {
      // Error handling silently fails
    }
  };

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

  // Navigate to Cards tab
  const navigateToCards = () => {
    navigation.jumpTo('Cards');
  };
  
  // Define the application start bottom sheet content
  const renderApplicationStartContent = useCallback(() => (
    <View style={{ flex: 1, paddingHorizontal: 5 }}>
      <SH1 className="text-black text-center mb-2">Start SBM ZET Credit Card Application</SH1>
      <B2 className="text-black opacity-70 text-center mb-6">
        You are starting your application for SBM ZET Credit Card. This process will take about 2 minutes to complete.
      </B2>
      <Button 
        variant="filled" 
        size="lg" 
        className="w-full"
        onPress={async () => {
          console.log("Continue Application pressed from bottom sheet");
          // Update application status to IN_PROGRESS
          await setApplicationStatus(APPLICATION_STATUS.IN_PROGRESS);
          // Close the bottom sheet
          hideBottomSheet();
        }}
      >
        Continue Application
      </Button>
    </View>
  ), [setApplicationStatus, hideBottomSheet]);

  // Handle application continue press from status card
  const handleApplicationContinue = useCallback(async () => {
    console.log("Continue Application from status card pressed");
    console.log("Current application status:", applicationStatus);
    
    if (applicationStatus === APPLICATION_STATUS.COMPLETED) {
      // If already completed, track application
      console.log("Track application status");
      // Add navigation to track application status
    } else {
      // If in progress, set to completed state and show post-activation home
      console.log("Setting application to COMPLETED and activating post-activation view");
      await setApplicationStatus(APPLICATION_STATUS.COMPLETED);
      setIsPostActivation(true);
      console.log("State updates applied, isPostActivation:", true);
    }
  }, [applicationStatus, setApplicationStatus]);

  // Open application start bottom sheet
  const openApplicationStartSheet = useCallback(() => {
    console.log('Opening application start bottom sheet from HomeScreen');
    showBottomSheet(renderApplicationStartContent(), ['45%']); // Pass content and snap points
  }, [showBottomSheet, renderApplicationStartContent]);

  // Handle scroll events to show/hide tab bar
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    
    // Determine scroll direction
    if (currentScrollY > lastScrollY.current + 10) {
      // Scrolling down - hide tab bar
      hideTabBar();
    } else if (currentScrollY < lastScrollY.current - 10) {
      // Scrolling up - show tab bar
      showTabBar();
    }
    
    lastScrollY.current = currentScrollY;
    
    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    // Set a timeout to show the tab bar when scrolling stops
    scrollTimeout.current = setTimeout(() => {
      showTabBar();
    }, 1000);
  };

  // Watch for application status changes to update post-activation state
  useEffect(() => {
    if (applicationStatus === APPLICATION_STATUS.COMPLETED) {
      console.log("ApplicationStatus is COMPLETED, setting isPostActivation to true");
      setIsPostActivation(true);
    } else {
      setIsPostActivation(false);
    }
  }, [applicationStatus]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <View style={styles.container}>
        <StatusBar style="light" />
        
        <ScrollView
          ref={scrollRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* Render the appropriate home section based on application status */}
          {isPostActivation ? (
            <PostActivationHome 
              creditScore={creditScoreData.score}
              creditScoreStatus={creditScoreData.status}
              lastUpdated={creditScoreData.lastUpdated}
              navigation={navigation}
              greeting={greeting}
              name={creditScoreData.name}
              avatarImageUrl={avatarImageUrl}
              onAvatarPress={toggleAvatarImage}
              avatarVariant={avatarVariant}
              positiveChange={creditScoreData.change >= 0}
            />
          ) : isApplicationStarted ? (
            <InProcessHome 
              status={applicationStatus}
              handleApplicationContinue={handleApplicationContinue}
              greeting={greeting}
              name={creditScoreData.name}
              avatarImageUrl={avatarImageUrl}
              onAvatarPress={toggleAvatarImage}
              avatarVariant={avatarVariant}
              positiveChange={creditScoreData.change >= 0}
            />
          ) : (
            <PreActivationHome 
              riveScoreRef={riveScoreRef}
              openApplicationStartSheet={openApplicationStartSheet}
              navigateToCards={navigateToCards}
              greeting={greeting}
              name={creditScoreData.name}
              avatarImageUrl={avatarImageUrl}
              onAvatarPress={toggleAvatarImage}
              avatarVariant={avatarVariant}
              positiveChange={creditScoreData.change >= 0}
            />
          )}
          
          {/* Shared Home Content Section */}
          <HomeContent 
            isPostActivation={isPostActivation}
            spotlightData={spotlightData}
            creditScoreData={creditScoreData}
            resetOnboarding={resetOnboarding}
          />
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  }
}); 