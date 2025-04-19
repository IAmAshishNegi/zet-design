import React, { useContext, useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { colors } from '../../styles/theme';
import { RewardIcon } from '../../components/ui/icons';
import { H3, B1, B2, SH1 } from '../../components/ui/typography/typography';
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
  const renderReward = ({ item }: { item: RewardItem }) => (
    <View style={styles.rewardCard}>
      <View style={styles.rewardHeader}>
        <RewardIcon size={32} color="primary.500" variant="duotone" />
        <SH1 style={styles.rewardTitle}>{item.title}</SH1>
      </View>
      <B2 style={styles.rewardDescription}>{item.description}</B2>
      <View style={styles.pointsContainer}>
        <B1 style={styles.pointsValue}>{item.points}</B1>
        <B2 style={styles.pointsLabel}>points</B2>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <H3 style={styles.title}>My Rewards</H3>
      <FlatList
        data={rewards}
        renderItem={renderReward}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    color: colors.primary[500],
    marginBottom: 12,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsValue: {
    color: colors.primary[500],
    marginLeft: 8,
    marginRight: 4,
  },
  pointsLabel: {
    color: colors.neutral[500],
  },
  rewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  rewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rewardTitle: {
    color: colors.neutral[800],
  },
  rewardDescription: {
    color: colors.neutral[600],
    marginBottom: 16,
    lineHeight: 20,
  },
  listContainer: {
    paddingBottom: 90,
  },
}); 