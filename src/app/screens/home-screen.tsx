import React, { useState, useEffect, useRef, useContext } from 'react';
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
  Button
} from '../../components/ui';
import { CreditScoreIcon } from '../../components/ui/icons';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RiveRef, Fit, Alignment } from 'rive-react-native';
import { CreditBuilderMemberCards, SectionHeader } from '../../components/credit-builder';
import { PromoBanner, BannerItem } from '../../components/carousel';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabBarVisibilityContext } from '../index';

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

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation<BottomTabNavigationProp<any>>();
  const [greeting, setGreeting] = useState('');
  const [avatarImageUrl, setAvatarImageUrl] = useState<string | null>('https://placekitten.com/100/100');
  const riveScoreRef = useRef<RiveRef>(null);
  const [avatarVariant, setAvatarVariant] = useState<'default' | 'outline' | 'small'>('default');
  const { hideTabBar, showTabBar } = useContext(TabBarVisibilityContext);
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
          <View className='bg-background-200 px-3'>
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
           {/* Rive know more button comes here */}
           <View className='flex justify-center items-center w-full mb-4 gap-4'>
           <Button 
             variant='filled' 
             size='lg' 
             className='w-full px-9'
             onPress={navigateToCards}
           >
             Know More
           </Button>
           <Button 
             variant='filled' 
             size='lg' 
             className='w-full px-9'
             onPress={navigateToCards}
           >
             Start Application
           </Button>
           </View>
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
            
            <Divider variant="section" className="my-4" />

            <PromoBanner
              bannerData={bannerData}
              autoPlay={true}
              duration={5000}
              showIndicators={true}
              bannerHeight={200}
              indicatorPosition="bottom"
              onActionPress={() => {
                console.log('View all offers pressed');
              }}
            />

            <Divider variant="section" className="my-4" />
            
            <SectionHeader 
              title="Your Financial Tips" 
              actionLabel="More"
              onActionPress={() => {
                console.log('More tips pressed');
              }}
            />
            
            {/* Sample content */}
            {[...Array(5)].map((_, index) => (
              <View key={index}>
                <B3 style={styles.cardTitle}>Financial Tip {index + 1}</B3>
                <B2 style={styles.cardDescription}>This is a sample financial tip with placeholder content.</B2>
                
                <Divider variant="line" color={colors.neutral[200]} className="my-3" />
                
                <View style={styles.cardFooter}>
                  <B4 style={styles.cardDate}>Updated 2 days ago</B4>
                  
                  <View style={styles.footerDivider}>
                    <Divider variant="vertical" height={16} thickness={1} color={colors.neutral[300]} />
                  </View>
                  
                  <B4 style={styles.cardCategory}>Finance</B4>
                </View>
              </View>
            ))}
            
            <View style={styles.buttonsContainer}>
              <Link href="/design-system" asChild>
                <Pressable style={styles.button}>
                  <ButtonLg style={styles.buttonText}>Design System</ButtonLg>
                </Pressable>
              </Link>
              
              <Pressable 
                style={[styles.button, { backgroundColor: colors.error[500], marginTop: 16, marginBottom: 100 }]}
                onPress={resetOnboarding}
              >
                <ButtonLg style={styles.buttonText}>Reset Onboarding</ButtonLg>
              </Pressable>
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
}); 