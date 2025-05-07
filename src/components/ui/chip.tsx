import React from 'react';
import { Pressable, View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../styles/theme';
import { H7, SH3 } from './typography/typography';

interface ChipProps {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
  activeColor?: string;
  inactiveColor?: string;
  textColor?: string;
  activeTextColor?: string;
}

/**
 * Chip component for filtering or selection in a horizontal list
 */
export function Chip({
  label,
  isActive = false,
  onPress,
  icon,
  style,
  activeColor = colors.primary[50],
  inactiveColor = colors.neutral[50],
  textColor = colors.neutral[500],
  activeTextColor = colors.primary[700],
}: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center py-1.5 px-3 rounded-full mr-2 border-[1.3px] ${isActive ? 'bg-primary-100 border-primary-200' : 'bg-neutral-50 border-neutral-100'}`}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      {icon && (
        <View className="mr-1">
          {icon}
        </View>
      )}
      <SH3
        className={isActive ? 'text-primary-700' : 'text-neutral-500'}
        style={{
          marginLeft: icon ? 1 : 0,
        }}
      >
        {label}
      </SH3>
    </Pressable>
  );
}

export default Chip; 