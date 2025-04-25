import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card } from '../ui/card';
import { Button, ButtonProps } from '../ui/button/button';
import { colors } from '../../styles/theme';
import { H3 } from '../ui';
import { Image } from 'react-native';

// Get screen width for responsive sizing

export function JoiningBenefitsSection() {
  // For demo purposes, use placeholder images


  return (
    <View>
      <View>
       <H3>Redeem Your ZET SBM Joining Benefits worth ₹21000</H3>
      </View>
      <View>
        <Image source={require('../../assets/images/joining_benefit.webp')} className='w-full h-[100px]' />
      </View>
    </View>
  );
}

