import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/theme';
import { RewardIcon } from '../../components/ui/icons';
import { H3, H4, B2, B3, ButtonMd } from '../../components/ui/typography/typography';

interface RewardItem {
  id: string;
  title: string;
  points: number;
  description: string;
}

const rewards: RewardItem[] = [
  { 
    id: '1', 
    title: 'Cashback Reward', 
    points: 5000, 
    description: 'Redeem for $50 cash deposited to your account'
  },
  { 
    id: '2', 
    title: 'Travel Credit', 
    points: 15000, 
    description: 'Redeem for $150 in travel credit on any airline'
  },
  { 
    id: '3', 
    title: 'Gift Card Bundle', 
    points: 10000, 
    description: 'Redeem for $100 in gift cards at select retailers'
  },
  { 
    id: '4', 
    title: 'Premium Subscription', 
    points: 8000, 
    description: 'Redeem for 12 months of premium streaming service'
  },
];

export default function RewardsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <H3 style={styles.title}>Rewards</H3>
        <View style={styles.pointsContainer}>
          <RewardIcon size={24} color="primary.500" variant="duotone" />
          <H4 style={styles.pointsValue}>24,500</H4>
          <B3 style={styles.pointsLabel}>available points</B3>
        </View>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {rewards.map((reward) => (
          <TouchableOpacity key={reward.id} style={styles.rewardCard}>
            <View style={styles.rewardHeader}>
              <B2 style={styles.rewardTitle}>{reward.title}</B2>
              <View style={styles.pointsBadge}>
                <B3 style={styles.badgeText}>{reward.points} pts</B3>
              </View>
            </View>
            <B3 style={styles.rewardDescription}>{reward.description}</B3>
            <TouchableOpacity style={styles.redeemButton}>
              <ButtonMd style={styles.redeemButtonText}>Redeem</ButtonMd>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  pointsBadge: {
    backgroundColor: colors.primary[100],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  badgeText: {
    color: colors.primary[700],
  },
  rewardDescription: {
    color: colors.neutral[600],
    marginBottom: 16,
    lineHeight: 20,
  },
  redeemButton: {
    backgroundColor: colors.primary[500],
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  redeemButtonText: {
    color: '#FFFFFF',
  },
}); 