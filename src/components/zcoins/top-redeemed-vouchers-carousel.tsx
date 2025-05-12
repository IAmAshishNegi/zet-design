import React from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { RedeemVoucherCard } from './redeem-voucher-card';
import { useUser } from '../../context/user-context';
import { useBottomSheet } from '../../context/bottom-sheet-context';
import { VoucherRedeemBottomSheet } from './voucher-redeem-bottom-sheet';

// Sample top redeemed voucher data
const TOP_REDEEMED_VOUCHERS = [
  {
    id: '1',
    title: 'Amazon',
    zCoinsRequired: '2500',
    voucherValue: '₹1000',
    backgroundColorOne: '#181626',
    backgroundColorTwo: '#262335',
    voucherImage: require('../../assets/images/brands/amazonLogoW.webp'),
    textColor: 'text-white',
  },
  {
    id: '2',
    title: 'Flipkart',
    zCoinsRequired: '2000',
    voucherValue: '₹1000',
    backgroundColorOne: '#1c6ac8',
    backgroundColorTwo: '#1c64b7',
    voucherImage: require('../../assets/images/brands/flipkartLogo.webp'),
    textColor: 'text-white',
  },
  {
    id: '3',
    title: 'Swiggy',
    zCoinsRequired: '1500',
    voucherValue: '₹500',
    backgroundColorOne: '#68104E',
    backgroundColorTwo: '#5A0441',
    voucherImage: require('../../assets/images/brands/swiggy_3p.webp'),
    textColor: 'text-white',
  },
  {
    id: '4',
    title: 'Amazon Pay',
    zCoinsRequired: '2250',
    voucherValue: '₹900',
    backgroundColorOne: '#353E49',
    backgroundColorTwo: '#181E25',
    voucherImage: require('../../assets/images/brands/amazonPay.webp'),
    textColor: 'text-white',
  },
];

interface TopRedeemedVouchersCarouselProps {
  containerStyle?: any;
  minCoinsRequired?: number;
}

export const TopRedeemedVouchersCarousel: React.FC<TopRedeemedVouchersCarouselProps> = ({ 
  containerStyle,
  minCoinsRequired = 500
}) => {
  const { userInfo } = useUser();
  const hasEnoughCoins = userInfo.zcoins.balance >= minCoinsRequired;
  
  // Safely access the bottom sheet context
  let bottomSheetContext;
  try {
    bottomSheetContext = useBottomSheet();
  } catch (error) {
    console.warn("BottomSheet context not available in TopRedeemedVouchersCarousel");
    bottomSheetContext = {
      showBottomSheet: () => {},
      hideBottomSheet: () => {}
    };
  }
  
  const { showBottomSheet } = bottomSheetContext;

  // Handle redeem action for the voucher
  const handleRedeemPress = (voucher: any) => {
    if (!hasEnoughCoins) {
      console.log("Not enough coins to redeem");
      return;
    }
    
    // Show the bottom sheet with voucher redemption details
    showBottomSheet(
      <VoucherRedeemBottomSheet 
        voucherTitle={voucher.title}
        voucherValue={voucher.voucherValue}
        zCoinsRequired={voucher.zCoinsRequired}
        voucherImage={voucher.voucherImage}
        backgroundColorOne={voucher.backgroundColorOne}
        backgroundColorTwo={voucher.backgroundColorTwo}
        id={voucher.id}
      />,
      ['60%']
    );
    
    console.log(`Redeeming voucher ${voucher.id} - ${voucher.title}`);
  };

  return (
    <View style={containerStyle} className="mb-1">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16, paddingLeft: 12 }}
      >
        {TOP_REDEEMED_VOUCHERS.map((voucher) => (
          <View key={voucher.id} style={{ width: 240, marginRight: 12, opacity: hasEnoughCoins ? 1 : 1 }}>
            <RedeemVoucherCard
              id={voucher.id}
              title={voucher.title}
              zCoinsRequired={voucher.zCoinsRequired}
              voucherValue={voucher.voucherValue}
              voucherImage={voucher.voucherImage}
              backgroundColorOne={voucher.backgroundColorOne}
              backgroundColorTwo={voucher.backgroundColorTwo}
              textColor={voucher.textColor}
              onRedeem={() => handleRedeemPress(voucher)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}; 