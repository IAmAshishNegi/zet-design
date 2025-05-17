import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { H4, B3, SH3, Button } from '../ui';
import { colors } from '../../styles/theme';

export const DisputeCheckBottomSheet = ({ onSubscribe }: { onSubscribe: () => void }) => {
  return (
    <View className="p-5">
      <View className="items-center mb-5">
        <Image
          source={require('../../assets/images/dispute3dNew.webp')}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>
      
      <H4 className="text-neutral-900 text-center mb-2">Dispute Check</H4>
      
      <B3 className="text-neutral-600 text-center mb-5">
        With Zet Plus membership, you get priority access to our dispute resolution service. 
        Identify and fix errors on your credit report that could be affecting your score.
      </B3>
      
      <View className="mb-5">
        <SH3 className="text-neutral-900 mb-2">Benefits:</SH3>
        <B3 className="text-neutral-600">• Dedicated dispute resolution team</B3>
        <B3 className="text-neutral-600">• Priority case handling</B3>
        <B3 className="text-neutral-600">• Full credit report analysis</B3>
        <B3 className="text-neutral-600">• Regular progress updates</B3>
      </View>
      
      <Button 
        size="lg"
        color="primary-500"
        className="w-full mt-4"
        label="Get Zet Plus at ₹1"
        onPress={onSubscribe}
      />
    </View>
  );
};

export const DoubleRewardsBottomSheet = ({ onSubscribe }: { onSubscribe: () => void }) => {
  return (
    <View className="p-5">
      <View className="items-center mb-5">
        <Image
          source={require('../../assets/images/zCoin3d.webp')}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>
      
      <H4 className="text-neutral-900 text-center mb-2">2x Rewards</H4>
      
      <B3 className="text-neutral-600 text-center mb-5">
        Earn double the Zcoins on every transaction when you're a Zet Plus member. 
        That means twice the rewards and twice the value on all your spending.
      </B3>
      
      <View className="mb-5">
        <SH3 className="text-neutral-900 mb-2">What you get:</SH3>
        <B3 className="text-neutral-600 mb-2">• Double Zcoins on all transactions</B3>
        <B3 className="text-neutral-600 mb-2">• Exclusive rewards catalog</B3>
        <B3 className="text-neutral-600 mb-2">• Bonus Zcoins on special occasions</B3>
        <B3 className="text-neutral-600 mb-2">• Higher redemption values</B3>
      </View>
      
      <Button 
        size="lg"
        color="primary-500"
        className="w-full mt-4"
        label="Get Zet Plus at ₹1"
        onPress={onSubscribe}
      />
    </View>
  );
};

export const PrioritySupportBottomSheet = ({ onSubscribe }: { onSubscribe: () => void }) => {
  return (
    <View className="p-5">
      <View className="items-center mb-5">
        <Image
          source={require('../../assets/images/chat3d.webp')}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>
      
      <H4 className="text-neutral-900 text-center mb-2">24x7 Priority Support</H4>
      
      <B3 className="text-neutral-600 text-center mb-5">
        As a Zet Plus member, you get round-the-clock access to our dedicated support team.
        We guarantee resolution for all your issues within 24 hours.
      </B3>
      
      <View className="mb-5">
        <SH3 className="text-neutral-900 mb-2">Features:</SH3>
        <B3 className="text-neutral-600">• Dedicated support line</B3>
        <B3 className="text-neutral-600">• 24-hour resolution guarantee</B3>
        <B3 className="text-neutral-600">• Chat, call, and email support</B3>
        <B3 className="text-neutral-600">• Personal account manager</B3>
      </View>
      
      <Button 
        size="lg"
        color="primary-500"
        className="w-full mt-4"
        label="Get Zet Plus at ₹1"
        onPress={onSubscribe}
      />
    </View>
  );
};

export const AIScoreVideoBottomSheet = ({ onSubscribe }: { onSubscribe: () => void }) => {
  return (
    <View className="p-5">
      <View className="items-center mb-5">
        <Image
          source={require('../../assets/images/video3d.webp')}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>
      
      <H4 className="text-neutral-900 text-center mb-2">AI Score Video</H4>
      
      <B3 className="text-neutral-600 text-center mb-5">
        Get personalized AI-generated videos explaining your credit score, factors affecting it, 
        and actionable recommendations to improve it over time.
      </B3>
      
      <View className="mb-5">
        <SH3 className="text-neutral-900 mb-2">What you'll see:</SH3>
        <B3 className="text-neutral-600">• Credit score analysis</B3>
        <B3 className="text-neutral-600">• Personalized improvement tips</B3>
        <B3 className="text-neutral-600">• Score trend predictions</B3>
        <B3 className="text-neutral-600">• Monthly update videos</B3>
      </View>
      
      <Button 
        size="lg"
        color="primary-500"
        className="w-full mt-4"
        label="Get Zet Plus at ₹1"
        onPress={onSubscribe}
      />
    </View>
  );
};

