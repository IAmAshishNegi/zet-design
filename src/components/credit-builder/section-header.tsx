import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { H6, B4, B3 } from '../ui';
import { colors } from '../../styles/theme';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;

  onActionPress?: () => void;
};

export function SectionHeader({ title, subtitle, actionLabel, onActionPress }: SectionHeaderProps) {
  return (
    <View className='mb-4 mt-2'>
      <H6 className='text-neutral-900'>{title}</H6>
      {subtitle && <B3 className='text-neutral-500'>{subtitle}</B3>}
      {actionLabel && onActionPress && (
        <Pressable onPress={onActionPress} hitSlop={8}>
          <B4 className='text-primary-600'>{actionLabel}</B4>
        </Pressable>
      )}
    </View>
  );
}

