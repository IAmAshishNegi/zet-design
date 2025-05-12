import React, { useContext, useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Platform,
  Dimensions,
  Pressable,
} from "react-native";
import { colors } from "../styles/theme";
import { RewardIcon, ChevronLeftIcon, RupeeCoinIcon, LockIcon, InfoIcon } from "../components/ui/icons";
import {
  H2,
  H3,
  B1,
  B2,
  SH1,
  H1,
  H5,
  B3,
  B4,
  B5,
  SH7,
  SH2,
  SH6,
  SH5,
  SH4,
  SH3,
  B7,
  B8,
  OverlineSm,
  H8,
  H7,
  H4,
  H6,
  SH8,
  B9,
} from "../components/ui/typography/typography";
import { Button } from "../components/ui/button";
import { TabBarVisibilityContext } from "./index";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { Image } from "react-native";
import { VoucherCarousel } from "../components/rewards/voucher-carousel";
import {
  RewardCategoriesSection,
  OttSection,
  ZCoinsSection,
  ZetPlusCard,
} from "../components/rewards";
import { DiscountSection } from "../components/discounts/discount_section";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import Svg, { Path } from "react-native-svg";
import Reanimated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Easing,
  withSpring,
  withSequence,
  withDelay,
  runOnJS,
} from "react-native-reanimated";
import { RedeemVoucherSection, RedemptionOptionsCarousel, RedemptionSectionMain } from "../components/zcoins";
import { RedemptionOptionsStack, RedemptionOption } from "../components/zcoins/redemption-options-stack";
import { useUser } from "../context/user-context";
import { BottomSheetProvider } from "../context/bottom-sheet-context";

const redemptionOptionData: RedemptionOption[] = [
  {
    id: '1',
    backgroundImage: require('../assets/images/zCoinVoucherBg.webp'),
    title: 'ZCOINS TO VOUCHERS',
    subtitle: '1000+ brands vouchers, including Amazon, Flipkart, Zomato, and more.',
    showSubtitle: true,
    conversionRate: '1000 Zcoins = Upto ₹400 Voucher',
    showConversionRate: true,
    ctaLabel: 'Convert Coins to Vouchers',
    showCta: true,
    gradientColors: ['rgba(40, 11, 74, 0.7)', 'rgba(19, 2, 29, 0.637)'],
    onPress: () => console.log('Visa spotlight pressed'),
    heroImage: require('../assets/images/brands/swiggy_3p.webp'),
    showHeroImage: false
  },
  {
    id: '2',
    backgroundImage: require('../assets/images/cashbackBg.webp'),
    title: 'CONVERT ZCOINS TO CASH',
    subtitle: 'Convert your Zcoins to cash and use it to pay for your purchases.',
    showSubtitle: true,
    conversionRate: '1000 Zcoins = ₹100',
    showConversionRate: true,
    ctaLabel: 'Convert Coins to Cash',
    showCta: true,
    gradientColors: ['rgba(43, 6, 36, 0.472)', 'rgba(20, 1, 12, 0.9)'],
    onPress: () => console.log('UPI spotlight pressed'),
      heroImage: require('../assets/images/cashbackBg.webp'),
    showHeroImage: false
  }
];

// Define minimum coins required for redemption
const MIN_COINS_REQUIRED = 500;

// Define constants for card width calculation
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH_PERCENTAGE = 280; // 40% width

// Tab component with animations


export default function ZCoinsScreen() {
  const router = useRouter();
  const { userInfo } = useUser();
  const { zcoins } = userInfo;
  
  // Check if user has enough coins to redeem
  const hasEnoughCoins = zcoins.balance >= MIN_COINS_REQUIRED;
  
  // Handle redemption option selection
  const handleRedemptionOptionSelect = (option: RedemptionOption) => {
    // Only process if user has enough coins
    if (!hasEnoughCoins) {
      return;
    }
    
    console.log(`Selected option: ${option.id}`);
    
    if (option.id === '1') {
      // Navigate to voucher redemption screen
      router.push('/redeem-voucher-screen');
    } else if (option.id === '2') {
      // Navigate to cash conversion screen
      router.push('/convert-to-cash-screen');
    }
  };

  // Updated redemption options with navigation
  const redemptionOptions = [
    {
      ...redemptionOptionData[0],
      onPress: () => router.push('/redeem-voucher-screen')
    },
    {
      ...redemptionOptionData[1],
      onPress: () => router.push('/convert-to-cash-screen')
    }
  ];

  // Enhanced shadow style for cards - with greater spread for Android
  const cardShadowStyle = {
    shadowColor: "#2d063c62",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6, // Android elevation
    // Additional style for Android to create a more spread-out shadow effect
    ...(Platform.OS === "android" && {
      backgroundColor: "#FFF", // Ensure background is opaque for Android shadow
    }),
  };

  return (
    <BottomSheetProvider>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView
        className="bg-neutral-0 flex-1"
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#cc98f9", "#ffffff", "#ffffff"] as const}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1.8 }}
          locations={[0, 0.5, 1] as const}
          className="rounded-md overflow-hidden"
        >
          <View className="pt-10">
            {/* Header with back button */}
            <View className="px-3 flex-row items-center">
              <Pressable
                onPress={() => router.back()}
                className="mr-3 p-2 bg-neutral-0/20 rounded-md"
              >
                <ChevronLeftIcon
                  size={20}
                  color={colors.neutral[900]}
                  strokeWidth={2.5}
                />
              </Pressable>
              <H3>Your Zcoins</H3>
            </View>

            <Pressable onPress={() => router.push("/zcoin-statement-screen")}>
              <View
                className="flex-row items-start border-[1.3px] border-neutral-900/5 rounded-2xl py-5 px-4 bg-neutral-0 overflow-hidden mx-3 mb-2.5 mt-4"
                style={cardShadowStyle}
              >
                <LottieView
                  source={require("../assets/lottie/CoinFlipDark.json")}
                  autoPlay
                  loop
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    height: 40,
                    width: 40,

                    opacity: 0.9,
                  }}
                />
                <View className="flex-1">
                  <View className="flex-row items-center justify-start">
                    <H7 className="text-neutral-900/80">{zcoins.balance}</H7>
                    <OverlineSm className="ml-2 mt-0.5 px-1.5 py-0.5 bg-[#2fa11e]/10 rounded-md text-[#2fa11e] mb-1">
                      Worth ₹{zcoins.cashValue}
                    </OverlineSm>
                  </View>
                  <SH8 className="text-neutral-900/40 uppercase mt-1">
                    COIN BALANCE
                  </SH8>
                  {/* <B9 className="text-neutral-900/30 capitalize mt-2">
                    Total {zcoins.totalEarned} Zcoins Earned
                  </B9> */}
                </View>
              </View>
            </Pressable>

            <View className="flex-row justify-between px-3">
              <Pressable
                onPress={() => router.push("/savings-statement-screen")}
                className="w-[48.5%]"
              >
                <View
                  className="flex-row w-full items-center border-[1.3px] border-neutral-900/5 rounded-xl  px-4 pt-3 pb-5 bg-neutral-0 overflow-hidden justify-start align-middle"
                  style={cardShadowStyle}
                >
                  <Image
                    source={require("../assets/images/reward/savings3dY.webp")}
                    className="w-12 h-12 opacity-90 absolute -right-2 -bottom-1"
                  />

                  <View className="flex-col">
                    <SH8 className="text-neutral-900/40 uppercase mt-1.5">
                      MY SAVINGS
                    </SH8>
                    <SH7 className="text-neutral-900/80">
                      ₹{zcoins.savingsAmount}
                    </SH7>
                  </View>
                </View>
              </Pressable>

              {/* <View
                className="flex-row items-start border-[1.3px] border-neutral-900/5 rounded-2xl py-4  px-3 bg-neutral-0 overflow-hidden"
                style={[cardShadowStyle, styles.categoryCard]}
              >
                <View>
                  <View>
                    <Image
                      source={require("../assets/images/reward/coinHistoryNew.webp")}
                      className="w-10 h-10"
                    />
                  </View>
                  <View>
                    <SH8 className="text-neutral-900/40 uppercase mt-1.5">
                      TRANSACTIONS
                    </SH8>
                    <SH7 className="text-neutral-900/80">1000</SH7>
                  </View>
                </View>
              </View> */}

              <Pressable
                onPress={() => router.push("/my-vouchers-screen")}
                className="w-[48.5%]"
              >
                <View
                  className="flex-row items-center border-[1.3px] border-neutral-900/5 rounded-xl pt-3 pb-5 px-4 bg-neutral-0 overflow-hidden justify-start align-middle"
                  style={cardShadowStyle}
                >
                  {/* <View className=" bg-[#f5c30d29] rounded-full absolute w-13 h-12 -right-3 -bottom-3"> */}
                  <Image
                    source={require("../assets/images/reward/voucher3d.webp")}
                    className="w-11 h-11 opacity-90 -mt-1 absolute -right-2 -bottom-1"
                  />
                  {/* </View> */}
                  <View className="flex-col">
                    <SH8 className="text-neutral-900/40 uppercase mt-2">
                      MY VOUCHERS
                    </SH8>
                    <SH7 className="text-neutral-900/80">
                      {zcoins.vouchersCount} Vouchers
                    </SH7>
                  </View>
                </View>
              </Pressable>
            </View>
            {/* </ScrollView> */}
          </View>
        </LinearGradient>
        {/* Redeem Section Title */}
        <View className="px-3 mt-4">
          <H5 className="text-neutral-900">Redeem your Zcoins</H5>
        </View>

        {/* Show insufficient coins message if needed */}
        {!hasEnoughCoins && (
         
            <View className="bg-[#fff3df] rounded-lg mx-3 px-3 pt-4 pb-8 mb-5">
              <View className="flex-row gap-2">
                {/* <LockIcon
                  color={colors.error[500]}
                  size={20}
                  variant="filled"
                  
                /> */}
                <SH3>
                  Minimum {MIN_COINS_REQUIRED} Zcoins required to redeem vouchers or cash
                </SH3>
              </View>
              <View className="mt-5">
                <OverlineSm className="text-neutral-900/70">How to earn Zcoins?</OverlineSm>
              </View>
              <View className="mt-5 flex-row gap-2 w-[80%]">
                <Image source={require('../assets/images/reward/payBill3d.webp')} className="w-10 h-10" />
                <B2>
                  Pay bill with your ZET card and earn Zcoins!
                </B2>
              </View>
              <View className="mt-7 flex-row gap-2 w-[80%]">
                <Image source={require('../assets/images/reward/buyVoucher3d.webp')} className="w-10 h-10" />
                <B2>
                Buy discounted vouchers from ZET app and earn Zcoins!
                </B2>
              </View>
            </View>
          
        )}

        {/* Redemption Options Carousel */}
        {/* <View className="mt-2 mb-4">
          <RedemptionOptionsStack 
            data={redemptionOptions}
            itemHeight={240}
            onOptionSelect={handleRedemptionOptionSelect}
            minCoinsRequired={500}
          />
        </View> */}
        <RedemptionSectionMain />

        {/* Display vouchers after options carousel */}

        {/* Add some bottom padding */}
        <View className="h-5" />
      </ScrollView>
    </BottomSheetProvider>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    marginBottom: 32,
    gap: 10, // Ensures content isn't hidden behind the tab bar
  },

  listContainer: {
    paddingBottom: 90,
  },

  categoryCard: {
    width: SCREEN_WIDTH * CARD_WIDTH_PERCENTAGE,
  },
});
