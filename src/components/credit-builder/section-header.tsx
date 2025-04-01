import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { H6, B4 } from '../ui';
import { colors } from '../../styles/theme';

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SectionHeader({ title, actionLabel, onActionPress }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <H6 style={styles.title}>{title}</H6>
      {actionLabel && onActionPress && (
        <Pressable onPress={onActionPress} hitSlop={8}>
          <B4 style={styles.action}>{actionLabel}</B4>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: colors.neutral[900],
  },
  action: {
    color: colors.primary[600],
  },
}); 