import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../../styles/theme';
import { SH3, B4, H6, H7, SH2, SH6, SH7 } from '../ui';
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
    <View className='w-full mb-5' style={[containerStyle]}>
      {title && (
        <View className='flex-row justify-between items-center px-3 mb-5'>
          <SH6 className='text-neutral-800'>{title}</SH6>
          {actionLabel && (
            <TouchableOpacity onPress={onActionPress}>
              <B4 className="text-primary-700">{actionLabel}</B4>
            </TouchableOpacity>
          )}
        </View>
      )}
      
      <View className='w-full overflow-visible'>
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



export default SpotlightSection; 