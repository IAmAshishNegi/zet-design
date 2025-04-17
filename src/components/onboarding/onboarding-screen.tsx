import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RiveRef } from 'rive-react-native';
import { RiveAnimation } from '../ui/rive-animation';
import { H1, H2, H3, H4, H5, H6,
  SH1, SH2, SH3, SH4, SH5,
  B1, B2, B3, B4, B5, B6, B7, B8, B9,
 
 
  OverlineMd, OverlineSm,
  setAppFontScale, getAppFontScale,
  OBHeading
} from '../ui/typography/typography';
import { Button } from '../ui/button';
import { ZetLogo } from '../ui/icons';

type OnboardingScreenProps = {
  onGetStarted: () => void;
};

const OnboardingScreen = ({ onGetStarted }: OnboardingScreenProps) => {
  const riveRef = useRef<RiveRef>(null);

  return (
    <SafeAreaView className="flex-1 bg-white">
      
      <View className="flex-1 flex-col gap-2 px-4 pt-2 pb-14">
        <View className="flex justify-center items-center">
          <ZetLogo width={86} color="primary.500" variant="filled" />
        </View>
        <View className="flex-1 justify-center items-center -mb-1">
          <RiveAnimation
            ref={riveRef}
            source={require('../../assets/rive/onboarding_main.riv')}
            autoplay={true}
            style={styles.riveAnimation}
          />
        </View>
        
        {/* <View className="flex justify-center items-center pb-10">
          
        
          <OBHeading className="text-center px-4">
            The Fastest way to Improve Credit Score
          </OBHeading>
          
        </View> */}
        
        <Button 
              size="xl" 
              variant="filled" 
              onPress={onGetStarted} 
              color="primary-500"
              label="Get Started"
            />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  riveAnimation: {
    width: '92%',
   
  },
 
 
});

export default OnboardingScreen; 