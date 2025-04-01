import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../../styles/theme';
import { SH3, B4 } from '../ui';
import BannerCarousel, { BannerItem } from './banner-carousel';

type IndicatorPosition = 'top' | 'bottom';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

export interface PromoBannerProps {
  title?: string;
  actionLabel?: string;
  bannerData: BannerItem[];
  autoPlay?: boolean;
  duration?: number;
  showIndicators?: boolean;
  indicatorPosition?: IndicatorPosition;
  onActionPress?: () => void;
  containerStyle?: object;
  bannerHeight?: number;
}

function PromoBanner({
  title,
  actionLabel,
  bannerData,
  autoPlay = true,
  duration = 5000,
  showIndicators = true,
  indicatorPosition = 'bottom',
  onActionPress,
  containerStyle,
  bannerHeight = 180
}: PromoBannerProps) {
  
  if (!bannerData || bannerData.length === 0) {
    return null;
  }
  
  return (
    <View style={[styles.container, containerStyle]}>
      {title && (
        <View style={styles.header}>
          <SH3>{title}</SH3>
          {actionLabel && (
            <TouchableOpacity onPress={onActionPress}>
              <B4 className="text-primary-700">{actionLabel}</B4>
            </TouchableOpacity>
          )}
        </View>
      )}
      
      <View style={styles.bannerContainer}>
        <BannerCarousel
          data={bannerData}
          autoPlay={false}
          duration={duration}
          showIndicators={showIndicators}
          indicatorPosition="bottom"
          containerStyle={{
            height: bannerHeight,
          }}
          imageStyle={{
            backgroundColor: colors.neutral[100],
          }}
          activeIndicatorColor={colors.primary[700]}
          inactiveIndicatorColor={colors.neutral[300]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  bannerContainer: {
    width: '100%',
  }
});

export default PromoBanner; 