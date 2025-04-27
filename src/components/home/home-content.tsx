import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  SectionHeader, 
  CreditBuilderMemberCards 
} from '../../components/credit-builder';
import { JoiningBenefits, JoiningBenefitsSection } from '../../components/rewards';
import { UpiSection } from '../../components/payments';
import { PromoBanner } from '../../components/carousel';
import { RechargeBanner, RechargeSection, RechargeSectionScroll } from '../../components/recharges';
import { DiscountBanner, DiscountSection } from '../../components/discounts';
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
    <View className='bg-neutral-0 pt-1'>
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
      <View className='px-3 mb-9'>
        <UpiSection />
      </View>
      <View>
        {/* <RechargeSection /> */}
        <RechargeSectionScroll />
      </View>
      <View>
        <DiscountSection />
      </View>
      <View className=' mb-2'>
        <DiscountBanner />
      </View>
      {/* <View>
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
      </View> */}
      <View className='mt-8'>
        <SpotlightSection
           title="SBM Zet Card Offers on other Apps"
          spotlightData={spotlightData}
          autoPlay={false}
          duration={5000}
          itemHeight={240}
          itemWidth={200}
          headerIconStyle={{ 
            marginBottom: 12, 
             
           
          }}
        />
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