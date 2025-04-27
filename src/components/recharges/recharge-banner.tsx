import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card } from '../ui/card';
import { Button, ButtonProps } from '../ui/button/button';
import { colors } from '../../styles/theme';
import { H3 } from '../ui';
import { LinearGradient } from 'expo-linear-gradient';
import { SH5 } from '../ui';
import { Image } from 'react-native';
// Get screen width for responsive sizing
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function RechargeBanner() {
  // For demo purposes, use placeholder images
 

  return (
    <View className='flex flex-row overflow-hidden pt-6 pb-4'>
    <LinearGradient
      colors={['#edd7ff', '#ffffff', '#e2b9ff']}
      start={{ x: 0.1, y: 0.025 }}
      end={{ x: 1, y: 1.5 }}  
      locations={[0, 0.5, 1]}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    />
    <View className='w-2/3 p-4 justify-center'>
      <SH5 className='text-[#e84589] mb-2'>GET SBM ZET CREDIT CARD</SH5>
      <H3 className='text-primary-900'>Build Credit Score with Interest</H3>
    
      <Button 
        variant='text'
        size='md'
        color='primary-900'
        className='mt-4 p-0 w-[50%]'
        onPress={() => console.log('Interest feature pressed')}
        textStyle={{fontWeight: '600'}}
        style={{padding: 0}}
      >
        Learn More
      </Button>
    </View>
    <View className='w-1/3'>
      <Image 
        source={require('../../assets/images/interest_fd.webp')} 
        className='w-full h-[140px]' 
        resizeMode="cover"
      />
    </View>
  </View>
  );
}