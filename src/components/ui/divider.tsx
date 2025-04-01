import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../styles/theme';

export type DividerProps = {
  /**
   * The variant of the divider
   * @default "line"
   */
  variant?: 'line' | 'section' | 'vertical';
  
  /**
   * The color of the divider
   * @default "neutral.200"
   */
  color?: string;
  
  /**
   * The height/thickness of the divider
   * @default 1
   */
  thickness?: number;
  
  /**
   * Additional styles for the divider
   */
  style?: ViewStyle;
  
  /**
   * Height for the vertical divider
   * @default 24
   */
  height?: number;
  
  /**
   * Additional className for the component (for TailwindCSS)
   */
  className?: string;
};

/**
 * Divider component with multiple variants
 */
export const Divider = ({
  variant = 'line',
  color = colors.neutral[200],
  thickness = 1,
  height = 24,
  style,
  className,
}: DividerProps) => {
  
  if (variant === 'line') {
    return (
      <View
        style={[
          styles.line,
          { 
            backgroundColor: color,
            height: thickness,
          },
          style,
        ]}
        className={className}
      />
    );
  }
  
  if (variant === 'vertical') {
    return (
      <View
        style={[
          styles.vertical,
          { 
            backgroundColor: color,
            width: thickness,
            height,
          },
          style,
        ]}
        className={className}
      />
    );
  }
  
  // Section divider consists of 3 stacked dividers with different colors
  return (
    <View className={`${className} bg-neutral-100`}>
      <View 
      className='bg-neutral-0 h-4 w-full rounded-b-full'/>
      <View className='bg-neutral-100 h-2 w-full'/>
      <View 
      className='bg-neutral-0 h-4 w-full rounded-t-full'/>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    width: '100%',
  },
  vertical: {
    alignSelf: 'stretch',
  },
  sectionContainer: {
    width: '100%',
    paddingVertical: 2,
  },
});

export default Divider; 