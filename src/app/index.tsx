import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Pressable, GestureResponderEvent, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeIcon, ScoreIcon, CreditCardIcon, RewardIcon, UserIcon, QRCodeIcon } from '../components/ui/icons';
import { colors } from '../styles/theme';
import { B4, B3, B2, B5, B6, B1 } from '../components/ui/typography/typography';
import { BottomSheetProvider } from '../context/bottom-sheet-context';
import { ApplicationStateProvider } from '../context/application-state-context';
import { UserProvider } from '../context/user-context';

// Import screens
import HomeScreen from './screens/home-screen';
import ScoreScreen from './screens/score-screen';
import CardsScreen from './screens/cards-screen';
import ProfileScreen from './profile';

const HAS_SEEN_ONBOARDING = 'has_seen_onboarding';
const Tab = createBottomTabNavigator();

// Create context to manage tab bar visibility
export const TabBarVisibilityContext = React.createContext({
  hideTabBar: () => {},
  showTabBar: () => {},
  tabBarVisible: true
});

interface TabBarButtonProps {
  children: ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  accessibilityState?: { selected?: boolean };
  style?: any;
  [key: string]: any;
}

// Custom tab bar button component
function TabBarButton({ children, onPress, accessibilityState = { selected: false } }: TabBarButtonProps) {
  const focused = accessibilityState.selected;
  
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tabButton,
        focused && styles.tabButtonActive,
        pressed && { opacity: 0.8 }
      ]}
    >
      <View style={styles.tabButtonInner}>
        {focused && <View style={styles.activeIndicator} />}
        <View>
          {children}
        </View>
      </View>
    </Pressable>
  );
}

// Custom QR Scan button component
function QRScanButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        
        pressed && { opacity: 0.9 }
      ]}
      accessibilityRole="button"
      accessibilityLabel="Scan QR Code"
    >
      <View className='bg-primary-500 rounded-xl p-3 border-[2px] border-neutral-0'>
        <QRCodeIcon color="#ffffff" variant="stroke" size={28} />
      </View>
    </Pressable>
  );
}

export default function App() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [tabBarVisible, setTabBarVisible] = useState(true);
  const tabBarAnimation = useRef(new Animated.Value(1)).current;

  const hideTabBar = () => {
    Animated.timing(tabBarAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
    setTabBarVisible(false);
  };

  const showTabBar = () => {
    Animated.timing(tabBarAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
    setTabBarVisible(true);
  };

  const handleScanPress = () => {
    router.push('/scan');
  };

  // Check if user has seen onboarding
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem(HAS_SEEN_ONBOARDING);
        
        if (value === null) {
          router.push('/onboarding');
        }
        
        setIsLoading(false);
      } catch (error) {
        // console.log('Error checking onboarding status:', error);
        setIsLoading(false);
      }
    };
    
    checkOnboarding();
  }, [router]);

  if (isLoading) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApplicationStateProvider>
        <UserProvider>
          <BottomSheetProvider>
            <TabBarVisibilityContext.Provider value={{ hideTabBar, showTabBar, tabBarVisible }}>
              <SafeAreaView style={styles.container}>
                <StatusBar style="light" />
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: colors.primary[700],
                    tabBarInactiveTintColor: colors.neutral[500],
                    tabBarStyle: [
                      styles.tabBar,
                      { 
                        transform: [{ translateY: tabBarAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [100, 0]
                        })}] 
                      }
                    ],
                    tabBarShowLabel: true,
                    tabBarButton: props => <TabBarButton {...props} />,
                    tabBarLabel: ({ focused, color }) => {
                      // Only show label for active tab, and use B3 with larger font size
                      if (focused) {
                        return <B5 style={{ color }} className='text-center'>{route.name}</B5>;
                      } else {
                        return <B5 style={{ color}} className='text-center'>{route.name}</B5>;
                      }
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                      const variant = focused ? 'filled' : 'stroke';
                      
                      // Use direct hex colors that match theme values
                      const activeColor = colors.primary[700]; // Same as primary[500] from theme
                      const inactiveColor = colors.neutral[500]; // Same as neutral[300] from theme
                      
                      const iconColor = focused ? activeColor : inactiveColor;
                      const iconSize = focused ? 24 : 22;

                      if (route.name === 'Home') {
                        return <HomeIcon color={iconColor} variant={variant} size={iconSize} strokeWidth={1.8}/>;
                      } else if (route.name === 'Score') {
                        return <ScoreIcon color={iconColor} variant={variant} size={iconSize} strokeWidth={1.8}/>;
                      } else if (route.name === 'Cards') {
                        return <CreditCardIcon color={iconColor} variant={variant} size={iconSize} strokeWidth={1.8}/>;
                      } else if (route.name === 'You') {
                        return <UserIcon color={iconColor} variant={variant} size={iconSize} strokeWidth={1.8}/>;
                      }
                    },
                    tabBarBackground: () => (
                      <View style={styles.tabBarBackground} />
                    ),
                  })}
                >
                  <Tab.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{
                      headerShown: false,
                      header: () => null,
                      tabBarItemStyle: { marginRight: -6 }
                    }}
                  />
                  <Tab.Screen 
                    name="Score" 
                    component={ScoreScreen}
                    options={{
                      tabBarItemStyle: { marginRight: 24, marginLeft: -12 }
                    }} 
                  />
                  <Tab.Screen 
                    name="Cards" 
                    component={CardsScreen}
                    options={{
                      tabBarItemStyle: { marginLeft: 24, marginRight: -12 }
                    }}
                  />
                  <Tab.Screen 
                    name="You" 
                    component={ProfileScreen}
                    options={{
                      tabBarItemStyle: { marginLeft: -12 }
                    }}
                  />
                </Tab.Navigator>

                {/* Floating QR Scan Button - always visible */}
                <View className='absolute bottom-6 self-center items-center justify-center z-999'>
                  <QRScanButton onPress={handleScanPress} />
                </View>
              </SafeAreaView>
            </TabBarVisibilityContext.Provider>
          </BottomSheetProvider>
        </UserProvider>
      </ApplicationStateProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabBar: {
    height: "auto",
    width: '100%',
    paddingTop: 10,
    paddingBottom: 6,
    elevation: 0,
    borderTopWidth: 0,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  tabBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: -1,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.098)',
    backgroundColor: colors.neutral['0'],
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
   
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
  },
  tabButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -10,
    width: 24,
    height: 3,
    backgroundColor: colors.primary[400],
    borderRadius: 1.5,
  },
 
 
 
}); 