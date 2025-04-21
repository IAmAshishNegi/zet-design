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
  score: 350,
  name: 'Ashish',
  lastUpdated: '2023-06-15',
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
          {/* App Bar */}
          <View style={styles.appBar}>
            <Pressable 
              style={styles.avatarContainer}
              onPress={toggleAvatarImage}
            >
              <Avatar 
                source={avatarImageUrl} 
                name={creditScoreData.name}
                borderRadius={12}
                size={48}
                className={creditScoreData.change >= 0 ? "shadow-success" : "shadow-error"}
                variant={avatarVariant}
              />
            </Pressable>
            <View style={styles.greetingContainer}>
              <SH3 className="text-white opacity-50">{greeting}</SH3>
              <H4 className="text-white opacity-80">{creditScoreData.name}</H4>
            </View>
          </View>
          
          {/* Spotlight Section */}
         
        
          {/* Credit Score Section */}
          <View style={styles.heroSection}>
            <RiveAnimation
              ref={riveScoreRef}
              source={require('../../assets/rive/homepage_hero_new.riv')}
              autoplay={true}
              style={styles.riveAnimation}
              artboardName='main_home_hero_new'
            />
          </View>

          {/* Background gradient section */}
          <View style={styles.gradientContainer}>
            <LinearGradient
              colors={['#190125', '#190125', '#b351fd79'] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1.5 }}
              locations={[0, 0.5, 1] as const}
              style={styles.backgroundGradient}
            />
            <View className='px-3'>
              {isApplicationStarted ? (
                <View className='px-3 py-10'>
                  <View className='flex-col gap-0 w-full items-center justify-center align-middle'>
                    <SH1 className="text-white opacity-90 mb-3">
                      Application Status
                    </SH1>
                    {applicationStatus === APPLICATION_STATUS.COMPLETED ? (
                      <B2 className="text-white opacity-70 text-center mb-6">
                        Your application for SBM ZET Credit Card has been completed. Your card will be delivered shortly.
                      </B2>
                    ) : (
                      <B2 className="text-white opacity-70 text-center mb-6">
                        Your application for SBM ZET Credit Card has been initiated. Complete the process to get your card.
                      </B2>
                    )}
                    {applicationStatus === APPLICATION_STATUS.COMPLETED ? (
                      <Button 
                        variant='filled' 
                        size='lg' 
                        color='neutral-0'
                        className='px-9 mt-4'
                        textStyle={{ color: colors.primary[500], fontWeight: '600' }}
                        style={{
                          borderLeftWidth: 0.5,
                          borderRightWidth: 0.5,
                          borderBottomWidth: 3,
                          borderTopWidth: 0,
                          borderColor: '#be9ed4',
                          width: '80%'
                        }}
                        onPress={() => {
                          console.log("Track application status");
                          // Add navigation to track application status
                        }}
                        onLongPress={async () => {
                          // For testing: Toggle back to IN_PROGRESS
                          await setApplicationStatus(APPLICATION_STATUS.IN_PROGRESS);
                        }}
                      >
                        Track Application Status
                      </Button>
                    ) : (
                      <Button 
                        variant='filled' 
                        size='lg' 
                        color='neutral-0'
                        className='px-9 mt-4'
                        textStyle={{ color: colors.primary[500], fontWeight: '600' }}
                        style={{
                          borderLeftWidth: 0.5,
                          borderRightWidth: 0.5,
                          borderBottomWidth: 3,
                          borderTopWidth: 0,
                          borderColor: '#be9ed4',
                          width: '80%'
                        }}
                        onPress={() => {
                          console.log("Continue Application process");
                          // Add actual application form navigation here
                        }}
                        onLongPress={async () => {
                          // For testing: Toggle to COMPLETED
                          await setApplicationStatus(APPLICATION_STATUS.COMPLETED);
                        }}
                      >
                        Complete Your Application
                      </Button>
                    )}
                  </View>
                </View>
              ) : (
                <>
                  <View className='px-3 pt-6'>
                    <B3 className='text-white opacity-50'>CARD BENEFITS</B3>
                  </View>
                  <View className='py-5 flex-row items-center mt-1 border-b border-white/5'>
                    <View className="mr-2">
                     <Image source={require('../../assets/images/score_new.webp')} className='w-16 h-16' />
                    </View>
                    <View className='flex-1'>
                      <B1 className='text-white opacity-75'>Improve Credit Score</B1>
                      <B3 className='text-white opacity-30 w-full'>Spend though the card, improve credit score</B3>
                    </View>
                  </View>
                  <View className='py-5 flex-row items-center border-b border-white/5'>
                    <View className="mr-2">
                     <Image source={require('../../assets/images/docs_gn.webp')} className='w-16 h-16' />
                    </View>
                    <View className='flex-1'>
                      <B1 className='text-white opacity-75'>Easy Application Process</B1>
                      <B3 className='text-white opacity-30 w-full'>Apply for the card in just 2 minutes, no documentation required</B3>
                    </View>
                  </View>
                  <View className='py-5 flex-row items-center border-b border-white/5'>
                    <View className="mr-2">
                     <Image source={require('../../assets/images/upi_gn.webp')} className='w-16 h-16' />
                    </View>
                    <View className='flex-1'>
                      <B1 className='text-white opacity-75'>Rupay UPI Credit Card</B1>
                      <B3 className='text-white opacity-30 w-full'>Pay through UPI ID, no need to add bank account</B3>
                    </View>
                  </View>
                  <View className='py-5 flex-row items-center'>
                    <View className="mr-2">
                     <Image source={require('../../assets/images/rewards_gn.webp')} className='w-16 h-16' />
                    </View>
                    <View className='flex-1'>
                      <B1 className='text-white opacity-75'>Get Exlusive Rewards & Offers</B1>
                      <B3 className='text-white opacity-30 w-full'>Spend though the card, improve credit score</B3>
                    </View>
                  </View>
                  <View className='py-5 flex-row items-center border-b border-white/5'>
                    <View className='flex flex-co justify-center items-center w-full mb-4 mt-2 gap-5'>
                      <Button 
                        variant='filled' 
                        size='lg' 
                        color='neutral-0'
                        className='px-9'
                        textStyle={{ color: colors.primary[500], fontWeight: '600' }}
                        style={{
                          borderLeftWidth: 0.5,
                          borderRightWidth: 0.5,
                          borderBottomWidth: 3,
                          borderTopWidth: 0,
                          borderColor: '#be9ed4',
                          width: '60%'
                        }}
                        onPress={openApplicationStartSheet}
                      >
                        Start Application
                      </Button>
                      <Button 
                        variant='filled' 
                        size='lg' 
                        className='px-9'
                        style={{
                          borderLeftWidth: 0.5,
                          borderRightWidth: 0.5,
                          borderBottomWidth: 3,
                          borderTopWidth: 0,
                          borderColor: '#a26cc9',
                          width: '60%'
                        }}
                        onPress={navigateToCards}
                      >
                        Know More
                      </Button>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
          {/* Content Section (White Background) */}
          <View className='bg-neutral-0 py-8'>
         
            <View className='px-4'>
              <SectionHeader 
                title="Other Products to Improve Score" 
              />
            </View>
            <View className='mt-1 mb-1 px-4'>
              <CreditBuilderMemberCards />
            </View>
            <View className='mt-5'>
            <SpotlightSection
            title="Credit Score Improvement Tips"
            spotlightData={spotlightData}
            autoPlay={false}
            duration={5000}
            itemHeight={320}
            containerStyle={{
              marginTop: 20
            }}
          />
            </View>
            
          

            {/* <PromoBanner
              bannerData={bannerData}
              autoPlay={true}
              duration={5000}
              showIndicators={true}
              bannerHeight={200}
              indicatorPosition="bottom"
              onActionPress={() => {
                console.log('View all offers pressed');
              }}
            /> */}

            {/* <Divider variant="section" className="my-4" /> */}
            
          <View className='flex flex-row my-6 overflow-hidden py-8'>
            <LinearGradient
              colors={['#edd7ff', '#ffffff', '#e2b9ff']}
              start={{ x: 0.1, y: 0.025 }}
              end={{ x: 1, y: 1.5 }}
              locations={[0, 0.5, 1]}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            />
           <View className='w-2/3 p-4 justify-center'>
           <SH5 className='text-[#e84589] mb-2'>GET SBM ZET CREDIT CARD</SH5>
             <H3 className='text-primary-900'>Build Credit Score with Interest</H3>
            
             <Button 
               variant='text'
               size='md'
               color='primary-900'
               className='mt-4 p-0 w-[50%]'
               onPress={() => console.log('Interest feature pressed')}
               textStyle={{fontWeight: '600'}}
               style={{padding: 0}}
             >
               Learn More
             </Button>
           </View>
           <View className='w-1/3'>
             <Image 
               source={require('../../assets/images/interest_fd.webp')} 
               className='w-full h-[140px]' 
               resizeMode="cover"
             />
           </View>
          </View>
          
         
            
            <View className='flex flex-row px-4 gap-4 w-full'>
              <Link href="/design-system" asChild>
                <Pressable className='w-1/2'>
                  <ButtonSm className='bg-primary-100 text-white p-3 w-full'>Design System</ButtonSm>
                </Pressable>
              </Link>
              
              <Pressable 
                className='w-1/2'
                onPress={resetOnboarding}
              >
                <ButtonSm className='bg-error-100 text-white p-3 w-full'>Reset Onboarding</ButtonSm>
              </Pressable>
            </View>
            <View>
              <Image source={require('../../assets/images/footer.webp')} className='w-full h-[220px]' />
            </View>
          </View>
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
  appBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 30 : 60,
    paddingBottom: 12,
    backgroundColor: colors.background[400],
  },
  greetingContainer: {
    flex: 1,
  },
  avatarContainer: {
    marginRight: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    width: '100%',
    backgroundColor: colors.background[400],


  },
  riveAnimation: {
    width: '100%',
    height: 358,
  },

  
 
  cardTitle: {
    color: colors.primary[700],
    marginBottom: 8,
  },
  cardDescription: {
    color: colors.neutral[600],
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDate: {
    color: colors.neutral[500],
  },
  footerDivider: {
    marginHorizontal: 8,
  },
  cardCategory: {
    color: colors.primary[700],
  },
  buttonsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  button: {
    backgroundColor: colors.primary[700],
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.neutral[50],
  },
  gradientContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
  },

}); 