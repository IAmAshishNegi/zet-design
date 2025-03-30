import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../styles/theme';
import { CreditCardIcon } from '../../components/ui/icons';
import { H3, B1, B2, SH1 } from '../../components/ui/typography/typography';

interface CardItem {
  id: string;
  name: string;
  balance: string;
  limit: string;
}

const cards: CardItem[] = [
  { id: '1', name: 'Platinum Credit Card', balance: '$2,450.00', limit: '$5,000.00' },
  { id: '2', name: 'Gold Rewards Card', balance: '$1,285.75', limit: '$3,000.00' },
  { id: '3', name: 'Travel Miles Card', balance: '$780.50', limit: '$2,500.00' },
];

export default function CardsScreen() {
  const renderCard = ({ item }: { item: CardItem }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <CreditCardIcon size={32} color="primary.500" variant="duotone" />
        <SH1 style={styles.cardName}>{item.name}</SH1>
      </View>
      <View style={styles.cardDetails}>
        <View>
          <B2 style={styles.cardLabel}>Current Balance</B2>
          <B1 style={styles.cardValue}>{item.balance}</B1>
        </View>
        <View>
          <B2 style={styles.cardLabel}>Credit Limit</B2>
          <B1 style={styles.cardValue}>{item.limit}</B1>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <H3 style={styles.title}>My Cards</H3>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
  title: {
    color: colors.primary[500],
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 90,
  },
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardName: {
    color: colors.neutral[800],
    marginLeft: 12,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: colors.neutral[500],
    marginBottom: 4,
  },
  cardValue: {
    color: colors.neutral[900],
  },
}); 