import React, { useContext, useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { colors } from '../../styles/theme';
import { RewardIcon } from '../../components/ui/icons';
import { H2, H3, B1, B2, SH1, H1 } from '../../components/ui/typography/typography';
import { TabBarVisibilityContext } from '../index';

// Define reward item interface
interface RewardItem {
  id: string;
  title: string;
  description: string;
  points: number;
}

// Sample rewards data
const rewards: RewardItem[] = [
  { id: '1', title: 'Cashback Reward', description: '5% cashback on all purchases', points: 1500 },
  { id: '2', title: 'Travel Miles', description: '2X miles on travel bookings', points: 2000 },
  { id: '3', title: 'Shopping Discount', description: '10% off at partner stores', points: 800 },
  { id: '4', title: 'Restaurant Offer', description: 'Free dessert with dinner', points: 500 },
  { id: '5', title: 'Entertainment', description: 'Buy 1 get 1 on movie tickets', points: 1200 },
];

export default function RewardsScreen() {
  const { hideTabBar, showTabBar } = useContext(TabBarVisibilityContext);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

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

  // Render each reward card


  return (
    <View className="py-10 px-3">
      <H3>Rewards & Cashback</H3>
    
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 90,
  },
}); 