import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { TopRedeemedVouchersCarousel } from './top-redeemed-vouchers-carousel';
import { Button, B3, B4, H6, SH6, SH7, OverlineSm, H7, SH8 } from '../ui';
import { LockIcon } from '../ui/icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../styles/theme';
import { useRouter } from 'expo-router';
import { useUser } from '../../context/user-context';
import { useBottomSheet } from '../../context/bottom-sheet-context';
import LottieView from 'lottie-react-native';
import { Image } from 'react-native';

const MIN_COINS_REQUIRED = 500;

const RedemptionSectionMain = () => {
  const router = useRouter();
  const { userInfo } = useUser();
  const { zcoins } = userInfo;
  
  const hasEnoughCoins = zcoins.balance >= MIN_COINS_REQUIRED;
  const cashValue = (zcoins.balance * 0.2).toFixed(2); // 1 Zcoin = ₹0.2
  
  const handleShowAllVouchers = () => {
    if (hasEnoughCoins) {
      router.push('/redeem-voucher-screen');
    }
  };
  
  const handleConvertToClick = () => {
    if (hasEnoughCoins) {
      router.push('/convert-to-cash-screen');
    }
  };

  // Enhanced shadow style for cards
  const cardShadowStyle = {
    shadowColor: "#2d063c62",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  };

  return (
    <View className="mb-4">
      {/* Top Section Title */}
      <View className="flex-row justify-between items-center mb-2">
        <SH6 className="text-neutral-900/70 px-3 mb-2">Convert Zcoins to Vouchers</SH6>
        {/* {!hasEnoughCoins && (
          <View className="flex-row items-center">
            <LockIcon color={colors.neutral[700]} size={14} variant="stroke" strokeWidth={2} style={{ marginRight: 4 }} />
            <B4 className="text-neutral-700">Locked</B4>
          </View>
        )} */}
      </View>
      
      {/* Top Redeemed Vouchers Carousel */}
      <TopRedeemedVouchersCarousel minCoinsRequired={MIN_COINS_REQUIRED} />
      
      {/* Show All Vouchers Button */}
      <View className="mt-1 mb-6 px-3">
        {hasEnoughCoins ? (
          <Button
            variant="filled"
            size="md"
            color="primary-100"
            onPress={handleShowAllVouchers}
          >
            Show All Vouchers
          </Button>
        ) : (
          <Button
            variant="filled"
            size="md"
            color="primary"
            onPress={handleShowAllVouchers}
            disabled={true}
            style={{ borderColor: colors.neutral[300] }}
            textStyle={{ color: colors.neutral[400] }}
            startIcon={<LockIcon color={colors.neutral[400]} size={14} variant="stroke" strokeWidth={2} />}
          >
            Locked - Need 500 Zcoins
          </Button>
        )}
      </View>
      
      {/* Convert to Cash Card */}
      <View className="mb-4">
        <SH6 className="text-neutral-900/80 mb-4 px-3 mt-3">Convert Zcoins to Cash</SH6>
        <Pressable onPress={handleConvertToClick}>
          <View 
            className={`flex-row items-start border-[1.3px] border-neutral-900/5 rounded-xl overflow-hidden mx-3 bg-neutral-0 ${!hasEnoughCoins ? "" : ""}`}
           
          >
            <LinearGradient
              colors={["#eaffc8", "#ffffff"] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-full p-4"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <LottieView
                      source={require("../../assets/lottie/CoinFlipDark.json")}
                      autoPlay
                      loop
                      style={{
                        height: 26,
                        width: 26,
                      }}
                    />
                    <H7 className="text-neutral-900 ml-2">Coin Conversion</H7>
                  </View>
                  
                  <View className="flex-row items-center mb-3 py-1 rounded-full w-auto self-start">
                    <SH7 className="text-neutral-900/70">
                     {zcoins.balance} Zcoins = ₹{cashValue}
                    </SH7>
                    {/* <B3 className="text-neutral-900 ml-2">
                      (1 Zcoin = ₹0.2)
                    </B3> */}
                  </View>
                  
                  {hasEnoughCoins ? (
                    <View className="w-auto self-start">
                    <Button variant="filled" size="sm" color="neutral-900" onPress={handleConvertToClick}>
                      Convert to Cash
                    </Button>
                    </View>
                  ) : (
                    <View className="flex-row items-center bg-[#292929] rounded-sm px-3 py-1.5 self-start">
                      <LockIcon color="#ffffff" size={12} variant="stroke" strokeWidth={2} />
                      <B4 className="text-white ml-1">
                        Locked
                      </B4>
                    </View>
                  )}
                </View>
                
                <Image
                  source={require("../../assets/images/coinConvert.webp")}
                  className="w-32 h-32 opacity-80 absolute -right-10 -bottom-6"
                />
              </View>
            </LinearGradient>
          </View>
        </Pressable>
      </View>
      
      {/* Only show the info message at the bottom if we haven't already shown a similar one at the top of the screen */}
      {/* {!hasEnoughCoins && (
        <View className="mb-2 bg-[#f9f1ff] rounded-lg p-3">
          <SH7 className="text-neutral-900/70">
            Convert your Zcoins to vouchers or cash once you have at least {MIN_COINS_REQUIRED} coins.
          </SH7>
        </View>
      )} */}
    </View>
  );
};

export { RedemptionSectionMain };