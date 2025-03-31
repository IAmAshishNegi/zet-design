import React, { useState, useEffect, ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View, Pressable, GestureResponderEvent } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeIcon, ScoreIcon, CreditCardIcon, RewardIcon } from '../components/ui/icons';
import { colors } from '../styles/theme';
import { B4, B3, B2, B5, B6, B1 } from '../components/ui/typography/typography';

// Import screens
import HomeScreen from './screens/home-screen';
import ScoreScreen from './screens/score-screen';
import CardsScreen from './screens/cards-screen';
import RewardsScreen from './screens/rewards-screen';

const HAS_SEEN_ONBOARDING = 'has_seen_onboarding';
const Tab = createBottomTabNavigator();

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
        <View style={styles.tabButtonContent}>
          {children}
        </View>
      </View>
    </Pressable>
  );
}

export default function App() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary[700],
          tabBarInactiveTintColor: colors.neutral[500],
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: true,
          tabBarButton: props => <TabBarButton {...props} />,
          tabBarLabel: ({ focused, color }) => {
            // Only show label for active tab, and use B3 with larger font size
            if (focused) {
              return <B5 style={{ color, marginTop: 4 }}>{route.name}</B5>;
            } else {
              return <B5 style={{ color, marginTop: 4 }}>{route.name}</B5>;
            }
          },
          tabBarIcon: ({ focused, color, size }) => {
            const variant = focused ? 'filled' : 'stroke';
            
            // Use direct hex colors that match theme values
            const activeColor = colors.primary[700]; // Same as primary[500] from theme
            const inactiveColor = colors.neutral[500]; // Same as neutral[300] from theme
            
            const iconColor = focused ? activeColor : inactiveColor;
            const iconSize = focused ? 26 : 24;

            if (route.name === 'Home') {
              return <HomeIcon color={iconColor} variant={variant} size={iconSize} strokeWidth={1.8}/>;
            } else if (route.name === 'Score') {
              return <ScoreIcon color={iconColor} variant={variant} size={iconSize} strokeWidth={1.8}/>;
            } else if (route.name === 'Cards') {
              return <CreditCardIcon color={iconColor} variant={variant} size={iconSize} strokeWidth={1.8}/>;
            } else if (route.name === 'Rewards') {
              return <RewardIcon color={iconColor} variant={variant} size={iconSize} strokeWidth={1.8}/>;
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
            header: () => null
          }}
        />
        <Tab.Screen name="Score" component={ScoreScreen} />
        <Tab.Screen name="Cards" component={CardsScreen} />
        <Tab.Screen name="Rewards" component={RewardsScreen} />
      </Tab.Navigator>
    </SafeAreaView>
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
    paddingTop: 14,
    paddingBottom: 14,
    elevation: 0,
    borderTopWidth: 0,
    position: 'absolute',
    bottom: 0,
 
   
    borderRadius: 20,
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
    bottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.098)',
    backgroundColor: colors.neutral['0'],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
   
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
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
    top: -12,
    width: 56,
    height: 3,
    backgroundColor: '#832DC2',
    borderRadius: 1.5,
  },
  tabButtonContent: {
    padding: 4,
    paddingBottom: 8,
    alignItems: 'center',
  }
}); 