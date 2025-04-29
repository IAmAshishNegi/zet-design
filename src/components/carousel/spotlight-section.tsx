import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../../styles/theme';
import { SH3, B4, H6, H7, SH2, SH6 } from '../ui';
import SpotlightCarousel, { SpotlightItem } from './spotlight-carousel';
import { PromoBanner } from '.';

interface SpotlightSectionProps {
  title?: string;
  actionLabel?: string;
  spotlightData: SpotlightItem[];
  autoPlay?: boolean;
  duration?: number;
  showIndicators?: boolean;
  onActionPress?: () => void;
  containerStyle?: ViewStyle;
  itemHeight?: number;
  itemWidth?: number;
  headerIconStyle?: ViewStyle;
}

function SpotlightSection({
  title,
  actionLabel,
  spotlightData,
  autoPlay = true,
  duration = 5000,
  showIndicators = false,
  onActionPress,
  containerStyle,
  itemHeight = 280,
  itemWidth,
  headerIconStyle
}: SpotlightSectionProps) {
  
  if (!spotlightData || spotlightData.length === 0) {
    return null;
  }
  
  return (
    <View style={[styles.container, containerStyle]}>
      {title && (
        <View style={styles.header}>
          <H6 className='text-neutral-800 mb-2'>{title}</H6>
          {actionLabel && (
            <TouchableOpacity onPress={onActionPress}>
              <B4 className="text-primary-700">{actionLabel}</B4>
            </TouchableOpacity>
          )}
        </View>
      )}
      
      <View style={styles.spotlightContainer}>
        <SpotlightCarousel
          data={spotlightData}
          autoPlay={autoPlay}
          duration={duration}
          showIndicators={showIndicators}
          indicatorPosition="bottom"
          itemHeight={itemHeight}
          itemWidth={itemWidth}
          titleStyle={{color: colors.neutral[0]}}
          headerIconStyle={headerIconStyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  spotlightContainer: {
    width: '100%',
    overflow: 'visible',
  }
});

export default SpotlightSection; 