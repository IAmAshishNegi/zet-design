import React from 'react';
import { View, ScrollView } from 'react-native';
import { VoucherCard } from './voucher-card';

// Sample voucher data
const VOUCHERS = [
  {
    id: '1',
    title: 'Amazon Pay',
    zCoinsBack: '900',
    backgroundColorOne: '#353E49',
    backgroundColorTwo: '#181E25',
    voucherValue: '₹1000',
    voucherImage: require('../../assets/images/brands/amazonPay.webp'),
    textColor: 'text-white',
  },
  {
    id: '2',
    title: 'Flipkart',
    zCoinsBack: '1000',
    voucherValue: '1000',
    backgroundColorOne: '#1c6ac8',
    backgroundColorTwo: '#1c64b7',
    voucherImage: require('../../assets/images/brands/flipkartLogo.webp'),
    textColor: 'text-white',
  },
  {
    id: '3',
    title: 'Amazon Shopping',
    zCoinsBack: '5000',
    voucherValue: '1000',
    backgroundColorOne: '#181626',
    backgroundColorTwo: '#262335',
    voucherImage: require('../../assets/images/brands/amazonLogoW.webp'),
    textColor: 'text-white',
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
  },
];

interface VoucherCarouselProps {
  title?: string;
}

export const VoucherCarousel: React.FC<VoucherCarouselProps> = ({ title }) => {
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
          />
        ))}
      </ScrollView>
    </View>
  );
}; 