import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { VoucherCard } from './voucher-card';
import { VoucherSelectionScreen } from './voucher-selection-screen';
import { useBottomSheet } from '../../context/bottom-sheet-context';

// Sample voucher data
const VOUCHERS = [
  {
    id: '1',
    title: 'Amazon Pay',
    zCoinsBack: '900',
    backgroundColorOne: '#353E49',
    backgroundColorTwo: '#181E25',
    buttonColor: '#FF6202',
    voucherValue: '₹1000',
    voucherImage: require('../../assets/images/brands/amazonPay.webp'),
    textColor: 'text-white',
    coinPercentage: 8, // 8% for Amazon
  },
  {
    id: '2',
    title: 'Flipkart',
    zCoinsBack: '1000',
    voucherValue: '1000',
    backgroundColorOne: '#1c6ac8',
    backgroundColorTwo: '#1c64b7',
    buttonColor: '#e6bc00',
    voucherImage: require('../../assets/images/brands/flipkartLogo.webp'),
    textColor: 'text-white',
    coinPercentage: 10, // 10% for Flipkart
  },
  {
    id: '3',
    title: 'Amazon Shopping',
    zCoinsBack: '5000',
    voucherValue: '1000',
    backgroundColorOne: '#181626',
    backgroundColorTwo: '#262335',
    buttonColor: '#181626',
    voucherImage: require('../../assets/images/brands/amazonLogoW.webp'),
    textColor: 'text-white',
    coinPercentage: 8, // 8% for Amazon Shopping
  },
  {
    id: '4',
    title: 'Swiggy',
    zCoinsBack: '5000',
    voucherValue: '1000',
    backgroundColorOne: '#68104E',
    backgroundColorTwo: '#5A0441',
    voucherImage: require('../../assets/images/brands/swiggyLogo.webp'),
    textColor: 'text-white',
    coinPercentage: 7, // 7% for Swiggy
  },
];

interface VoucherCarouselProps {
  title?: string;
}

export const VoucherCarousel: React.FC<VoucherCarouselProps> = ({ title }) => {
  const [selectedVoucher, setSelectedVoucher] = useState<null | typeof VOUCHERS[0]>(null);
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();

  const handleBuyNow = (voucher: typeof VOUCHERS[0]) => {
    setSelectedVoucher(voucher);
    
    // Use the bottom sheet instead of modal with handleComponent set to null
    showBottomSheet(
      <VoucherSelectionScreen
        title={voucher.title}
        voucherImage={voucher.voucherImage}
        backgroundColorOne={voucher.backgroundColorOne}
        backgroundColorTwo={voucher.backgroundColorTwo}
        textColor={voucher.textColor}
        zCoinsBack={voucher.zCoinsBack}
        coinPercentage={voucher.coinPercentage}
        onClose={hideBottomSheet}
        onProceed={handleProceedToPay}
        buttonColor={voucher.buttonColor || '#c81ca0'}
      />,
      ['100%'], // Use 100% height for the bottom sheet
      { hideHandle: true } // Remove the handle indicator
    );
  };

  const handleProceedToPay = (amount: string) => {
    // Here you would typically handle payment processing
    console.log(`Processing payment for ${selectedVoucher?.title} voucher of amount ${amount}`);
    hideBottomSheet();
  };

  return (
    <View className="mb-6">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingRight: 4, paddingLeft: 12 }}
      >
        {VOUCHERS.map((voucher) => (
          <VoucherCard
            key={voucher.id}
            title={voucher.title}
            zCoinsBack={voucher.zCoinsBack}
            voucherValue={voucher.voucherValue}
            voucherImage={voucher.voucherImage}
            backgroundColorOne={voucher.backgroundColorOne}
            backgroundColorTwo={voucher.backgroundColorTwo}
            textColor={voucher.textColor}
            onPress={() => console.log(`Voucher ${voucher.id} pressed`)}
            onBuyNow={() => handleBuyNow(voucher)}
          />
        ))}
      </ScrollView>
    </View>
  );
}; 