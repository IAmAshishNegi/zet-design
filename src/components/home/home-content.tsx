import React, { useCallback } from 'react';
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
  Divider,
  SH6,
  B5
} from '../ui';
import { CreditScoreScale } from '../../components/credit-score';
import { colors } from '../../styles/theme';
import { Link } from 'expo-router';
import { useBottomSheet } from '../../context/bottom-sheet-context';

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

const swiggySteps = [
  'Open the Swiggy app and log in to your account.',
  'Add your favorite food items to the cart.',
  'Proceed to checkout and select your delivery address.',
  'On the payment page, choose your SBM ZET Credit Card as the payment method.',
  'Complete the payment. The offer will be applied automatically if eligible.'
];

const zomatoSteps = [
  'Open the Zomato app and log in to your account.',
  'Browse restaurants and add items to your cart.',
  'Go to your cart and tap on Proceed to Pay.',
  'Select your SBM ZET Credit Card as the payment option.',
  'Place your order. The discount will be applied if the offer is valid.'
];

const HomeContent: React.FC<HomeContentProps> = ({
  isPostActivation,
  spotlightData,
  creditScoreData,
  resetOnboarding
}) => {
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();

  // Handler for Know More CTA
  const handleKnowMore = useCallback((brand: string) => {
    let steps = swiggySteps;
    let title = 'How to Redeem on Swiggy';
    if (brand.toLowerCase().includes('zomato')) {
      steps = zomatoSteps;
      title = 'How to Redeem on Zomato';
    }
    showBottomSheet(
      <View >
        <H3 className="text-black mb-3">{title}</H3>
        {steps.map((step, idx) => (
          <View key={idx} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 }}>
            <B5 className="text-primary-500 mr-2">{idx + 1}.</B5>
            <SH5 className="text-black flex-1">{step}</SH5>
          </View>
        ))}
        <Button className="mt-4 w-full" variant="filled" size="lg" onPress={hideBottomSheet}>
          Got it
        </Button>
      </View>,
      ['45%']
    );
  }, [showBottomSheet, hideBottomSheet]);

  // Patch spotlightData to override onPress for Swiggy/Zomato
  const patchedSpotlightData = spotlightData.map(item => {
    if (
      (item.title && item.title.toLowerCase().includes('swiggy')) ||
      (item.title && item.title.toLowerCase().includes('zomato'))
    ) {
      return {
        ...item,
        onPress: () => handleKnowMore(item.title)
      };
    }
    return item;
  });

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
        <RechargeSection />
        {/* <RechargeSectionScroll /> */}
      </View>
      <View>
        <DiscountSection />
      </View>
      <View className=' mb-2'>
        <DiscountBanner />
      </View>
      {/* <View className='mt-8'>
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
          spotlightData={patchedSpotlightData}
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