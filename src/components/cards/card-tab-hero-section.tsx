import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { RiveRef } from 'rive-react-native';
import { RiveAnimation } from '../ui/rive-animation';
import { H2, B1, H3, SH1 } from '../ui/typography/typography';
import { colors } from '../../styles/theme';

interface CardTabHeroSectionProps {
  onAnimationComplete?: () => void;
}

export function CardTabHeroSection({ onAnimationComplete }: CardTabHeroSectionProps) {
  const riveRef = useRef<RiveRef>(null);

  const handleRivePlay = (animationName: string, isStateMachine: boolean) => {
    console.log('Card animation started playing:', animationName);
    onAnimationComplete?.();
  };
  
  const handleRiveError = (error: any) => {
    console.error('Card animation error:', error);
    onAnimationComplete?.();
  };

  return (
    <View>
      <View style={styles.riveContainer}>
        <RiveAnimation
          ref={riveRef}
          source={require('../../assets/rive/card_pitch.riv')}
          artboardName="card_tab"
          autoplay={true}
          style={styles.riveAnimation}
          onPlay={handleRivePlay}
          onError={handleRiveError}
        />
      </View>
      
    
    </View>
  );
}

const styles = StyleSheet.create({
  
  riveContainer: {
    height: 420,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  riveAnimation: {
    width: '100%',
    height: '150%',
  },

  subtitle: {
    color: colors.primary[500],
    marginBottom: 4,
    textAlign: 'center',
  },
  title: {
    color: colors.neutral[900],
    textAlign: 'center',
    fontWeight: '700',
  }
}); 