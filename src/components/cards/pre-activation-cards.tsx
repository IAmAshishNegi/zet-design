import React, { useCallback } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { H4, H6, SH1, SH6, B2, B4 } from '../ui/typography/typography';
import { InfoIcon } from '../ui/icons';
import { Button } from '../ui/button/button';

// Use React.memo for frequently reused components
const MemoizedButton = React.memo(Button);
const MemoizedImage = React.memo(Image);

interface PromoCardItem {
  id: string;
  title: string;
  subtitle: string;
  imageSource: any;
}

// PromoCard as a memoized component
const PromoCard = React.memo(({ card }: { card: PromoCardItem }) => (
  <View key={card.id} className="mt-2">
    <View className="w-full flex-row gap-2 items-start mb-1">
      <View>
        <MemoizedImage 
          source={card.imageSource} 
          className="w-10 h-10" 
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      </View>
      <View className="flex-col gap-0 items-start justify-center align-middle">
        <SH6 className="text-black opacity-90">{card.title}</SH6>
        <B4 className="text-black opacity-50">{card.subtitle}</B4>
      </View>
    </View>
  </View>
));

interface PreActivationCardsProps {
  promoCards: PromoCardItem[];
  openApplicationStartSheet: () => void;
  openRbiInfoSheet: () => void;
}

const PreActivationCards: React.FC<PreActivationCardsProps> = ({
  promoCards,
  openApplicationStartSheet,
  openRbiInfoSheet
}) => {
  return (
    <View className="bg-neutral-0 -mt-2 pt-10">
      <View>
        <View className="flex-col gap-0 w-full items-center justify-center align-middle">
          <SH1 className="text-black opacity-60">
            Build 750+ Credit Score with
          </SH1>
          <H4>SBM ZET Credit Card</H4>
        </View>
      </View>
      <View className="flex-col flex-wrap w-full pl-3 pr-1 gap-3 mt-5">
        {promoCards.map(card => (
          <PromoCard key={card.id} card={card} />
        ))}
      </View>
      <View className="mt-6 w-full items-center justify-center">
        <MemoizedButton 
          variant="filled" 
          size="lg" 
          className="w-[60%]"
          onPress={openApplicationStartSheet}
        >
          Start Application
        </MemoizedButton>
      </View>
      <View className="px-5">
        <View className="flex-row gap-2 items-center justify-center pt-3 pb-4 border-t mt-4 border-neutral-100">
          {/* <View className="flex-row gap-2 items-center justify-center">
            <MemoizedImage
              source={require("../../assets/images/rbi.png")}
              className="w-10 h-10"
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </View> */}
          <View className="flex-row gap-2 items-center justify-center">
            <B2 className="text-black opacity-60">
              SBM Bank FDs are secured by RBI
            </B2>
            <Pressable onPress={openRbiInfoSheet}>
              <InfoIcon
                size={20}
                color="neutral.700"
                secondaryColor="neutral.200"
                variant="duotone"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PreActivationCards; 