import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';
import { ScoreIcon } from '../../components/ui/icons';
import { H1, H5, B2 } from '../../components/ui/typography/typography';

export default function ScoreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <ScoreIcon size={48} color="primary.500" variant="duotone" />
        <H1 style={styles.scoreValue}>780</H1>
        <H5 style={styles.scoreLabel}>Excellent</H5>
      </View>
      <B2 style={styles.subtitle}>Your credit score has improved by 15 points this month</B2>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreValue: {
    color: colors.primary[500],
    marginTop: 16,
  },
  scoreLabel: {
    color: colors.success[500],
  },
  subtitle: {
    color: colors.neutral[500],
    textAlign: 'center',
  }
}); 