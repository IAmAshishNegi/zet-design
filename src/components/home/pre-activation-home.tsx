import React from 'react';
import { View, Image, Platform } from 'react-native';
import { B1, B3, Button } from '../ui';
import { colors } from '../../styles/theme';
import { RiveAnimation } from '../ui';
import { RiveRef } from 'rive-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppBar from './app-bar';

interface PreActivationHomeProps {
  riveScoreRef: React.RefObject<RiveRef>;
  openApplicationStartSheet: () => void;
  navigateToCards: () => void;
  greeting: string;
  name: string;
  avatarImageUrl: string | null;
  onAvatarPress: () => void;
  avatarVariant: 'default' | 'outline' | 'small';
  positiveChange?: boolean;
}

const PreActivationHome: React.FC<PreActivationHomeProps> = ({
  riveScoreRef,
  openApplicationStartSheet,
  navigateToCards,
  greeting,
  name,
  avatarImageUrl,
  onAvatarPress,
  avatarVariant,
  positiveChange = true
}) => {
  return (
    <>
      {/* App Bar - Pre Activation Styling */}
      <AppBar
        greeting={greeting}
        name={name}
        avatarImageUrl={avatarImageUrl}
        onAvatarPress={onAvatarPress}
        avatarVariant={avatarVariant}
        positiveChange={positiveChange}
        backgroundColor="transparent"
        paddingTop={Platform.OS === 'android' ? 28 : 58}
        paddingBottom={10}
        greetingOpacity={0.45}
        nameOpacity={0.75}
        nameStyle={{ 
          fontWeight: '500',
          letterSpacing: 0.2
        }}
        greetingStyle={{ 
          fontSize: 12, 
          textTransform: 'uppercase',
          letterSpacing: 0.5
        }}
        containerStyle={{ 
          zIndex: 10
        }}
      />
      
      {/* Hero Animation */}
      <View style={{ 
        width: '100%', 
        backgroundColor: colors.background[400],
      }}>
        <RiveAnimation
          ref={riveScoreRef}
          source={require('../../assets/rive/homepage_hero_new.riv')}
          autoplay={true}
          style={{
            width: '100%',
            height: 358,
          }}
          artboardName='main_home_hero_new'
        />
      </View>

      {/* Background gradient section */}
      <View style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}>
        <LinearGradient
          colors={['#190125', '#190125', '#b351fd79'] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1.5 }}
          locations={[0, 0.5, 1] as const}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            height: '100%',
            width: '100%',
          }}
        />
        <View className='px-3'>
          <>
            <View className='px-3 pt-6'>
              <B3 className='text-white opacity-50'>CARD BENEFITS</B3>
            </View>
            <View className='py-5 flex-row items-center mt-1 border-b border-white/5'>
              <View className="mr-2">
               <Image source={require('../../assets/images/score_new.webp')} className='w-16 h-16' />
              </View>
              <View className='flex-1'>
                <B1 className='text-white opacity-75'>Improve Credit Score</B1>
                <B3 className='text-white opacity-30 w-full'>Spend though the card, improve credit score</B3>
              </View>
            </View>
            <View className='py-5 flex-row items-center border-b border-white/5'>
              <View className="mr-2">
               <Image source={require('../../assets/images/docs_gn.webp')} className='w-16 h-16' />
              </View>
              <View className='flex-1'>
                <B1 className='text-white opacity-75'>Easy Application Process</B1>
                <B3 className='text-white opacity-30 w-full'>Apply for the card in just 2 minutes, no documentation required</B3>
              </View>
            </View>
            <View className='py-5 flex-row items-center border-b border-white/5'>
              <View className="mr-2">
               <Image source={require('../../assets/images/upi_gn.webp')} className='w-16 h-16' />
              </View>
              <View className='flex-1'>
                <B1 className='text-white opacity-75'>Rupay UPI Credit Card</B1>
                <B3 className='text-white opacity-30 w-full'>Pay through UPI ID, no need to add bank account</B3>
              </View>
            </View>
            <View className='py-5 flex-row items-center'>
              <View className="mr-2">
               <Image source={require('../../assets/images/rewards_gn.webp')} className='w-16 h-16' />
              </View>
              <View className='flex-1'>
                <B1 className='text-white opacity-75'>Get Exlusive Rewards & Offers</B1>
                <B3 className='text-white opacity-30 w-full'>Spend though the card, improve credit score</B3>
              </View>
            </View>
            <View className='py-5 flex-row items-center border-b border-white/5'>
              <View className='flex flex-co justify-center items-center w-full mb-4 mt-2 gap-5'>
                <Button 
                  variant='filled' 
                  size='lg' 
                  color='neutral-0'
                  className='px-9'
                  textStyle={{ color: colors.primary[500], fontWeight: '600' }}
                  style={{
                    borderLeftWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderBottomWidth: 3,
                    borderTopWidth: 0,
                    borderColor: '#be9ed4',
                    width: '60%'
                  }}
                  onPress={openApplicationStartSheet}
                >
                  Start Application
                </Button>
                <Button 
                  variant='filled' 
                  size='lg' 
                  className='px-9'
                  style={{
                    borderLeftWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderBottomWidth: 3,
                    borderTopWidth: 0,
                    borderColor: '#a26cc9',
                    width: '60%'
                  }}
                  onPress={navigateToCards}
                >
                  Know More
                </Button>
              </View>
            </View>
          </>
        </View>
      </View>
    </>
  );
};

export default PreActivationHome; 