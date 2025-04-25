import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  SectionHeader, 
  CreditBuilderMemberCards 
} from '../../components/credit-builder';
import { JoiningBenefits, JoiningBenefitsSection } from '../../components/rewards';
import { PromoBanner } from '../../components/carousel';
import { 
  SpotlightSection, 
  SpotlightItem 
} from '../../components/carousel';
import { 
  H3, 
  ButtonSm, 
  SH5, 
  Button,
  Divider
} from '../ui';
import { CreditScoreScale } from '../../components/credit-score';
import { colors } from '../../styles/theme';
import { Link } from 'expo-router';

interface HomeContentProps {
  isPostActivation: boolean;
  spotlightData: SpotlightItem[];
  creditScoreData: {
    score: number;
    status: 'good' | 'fair' | 'poor';
    lastUpdated: string;
    change: number;
  };
  resetOnboarding: () => void;
}

const HomeContent: React.FC<HomeContentProps> = ({
  isPostActivation,
  spotlightData,
  creditScoreData,
  resetOnboarding
}) => {
  return (
    <View className='bg-neutral-0 pt-3'>
      {/* Only show in post-activation homepage */}
      {/* {isPostActivation && (
        <View className='px-3 mb-8'>
          <CreditScoreScale 
            score={creditScoreData.score}
            status={creditScoreData.status}
            lastUpdated={creditScoreData.lastUpdated}
            change={creditScoreData.change}
          />
        </View>
      )} */}
      
      {/* <View className='px-4'>
        <SectionHeader 
          title="Enjoy your ZET Card Rewards" 
        />
      </View> */}
      {/* <View className='mt-1 mb-1 px-3'>
        <CreditBuilderMemberCards />
        <JoiningBenefits />
      </View> */}
      {/* <Divider variant='line' thickness={4} color={colors.neutral[100]} />
      <View className='px-3 mb-8'>
        <JoiningBenefitsSection />
      </View> */}
      <View>
        <PromoBanner
         
          bannerData={[
            {
              id: '1',
              imageUrl: require('../../assets/images/Amazon.webp'),
              onPress: () => console.log('Amazon banner pressed')
            },
            {
              id: '2',
              imageUrl: require('../../assets/images/joining_benefit.webp'),
              onPress: () => console.log('Joining benefit banner pressed')
            }
          ]}
          autoPlay={true}
          duration={4000}
        />
      </View>
      <View>
        <SpotlightSection
        title="BENEFITS & REWARDS ON ZET CARD"
          spotlightData={spotlightData}
          autoPlay={false}
          duration={5000}
          itemHeight={320}
          containerStyle={{
            marginTop: 20
          }}
        />
      </View>
      
      <View className='flex flex-row my-6 overflow-hidden py-8'>
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
      
      <View className='flex flex-row px-4 gap-4 w-full'>
        <Link href="/design-system" asChild>
          <Pressable className='w-1/2'>
            <ButtonSm className='bg-primary-100 text-white p-3 w-full'>Design System</ButtonSm>
          </Pressable>
        </Link>
        
        <Pressable 
          className='w-1/2'
          onPress={resetOnboarding}
        >
          <ButtonSm className='bg-error-100 text-white p-3 w-full'>Reset Onboarding</ButtonSm>
        </Pressable>
      </View>
      <View>
        <Image source={require('../../assets/images/footer.webp')} className='w-full h-[220px]' />
      </View>
    </View>
  );
};

export default HomeContent; 