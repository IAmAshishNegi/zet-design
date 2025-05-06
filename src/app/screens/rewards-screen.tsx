import React, { useContext, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { colors } from "../../styles/theme";
import { RewardIcon } from "../../components/ui/icons";
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
} from "../../components/ui/typography/typography";
import { TabBarVisibilityContext } from "../index";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { Image } from "react-native";
import { VoucherCarousel } from "../../components/rewards/voucher-carousel";
import {
  RewardCategoriesSection,
  OttSection,
  ZCoinsSection,
  ZetPlusCard,
} from "../../components/rewards";
import { DiscountSection } from "../../components/discounts/discount_section";

// Define reward item interface
export default function RewardsScreen() {
  const { hideTabBar, showTabBar } = useContext(TabBarVisibilityContext);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll events to show/hide tab bar
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    // Determine scroll direction
    if (currentScrollY > lastScrollY.current + 10) {
      // Scrolling down - hide tab bar
      hideTabBar();
    } else if (currentScrollY < lastScrollY.current - 10) {
      // Scrolling up - show tab bar
      showTabBar();
    }

    lastScrollY.current = currentScrollY;

    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set a timeout to show the tab bar when scrolling stops
    scrollTimeout.current = setTimeout(() => {
      showTabBar();
    }, 1000);
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

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

  // Render each reward card

  return (
    <ScrollView
      className="bg-neutral-0 flex-1"
      contentContainerStyle={styles.scrollContent}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={["#cc98f9", "#ffffff", "#ffffff"] as const}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.25 }}
        locations={[0, 0.5, 1] as const}
        className="rounded-md overflow-hidden"
      >
        <View className="pt-14">
          <View className="px-3">
            <H3>Rewards & Cashback</H3>
          </View>
          {/* <View
            className="border rounded-2xl border-neutral-900/10 bg-neutral-0 overflow-hidden mt-5 mx-3"
            style={cardShadowStyle}
          >
            <LinearGradient
              colors={["#ffffff", "#ffffff", "#ffde7c"] as const}
              start={{ x: 0, y: 0.1 }}
              end={{ x: 1.5, y: 0.5 }}
              locations={[0, 0.5, 1] as const}
              className="rounded-md overflow-hidden"
            >
              <View className="border rounded-2xl border-neutral-0/50 overflow-hidden py-5 px-5">
                <View className="flex-col items-start align-middle justify-start">
                  <View className="flex-1">
                    <View className="flex-row items-end gap-1">
                      <H2 style={{ fontSize: 20, lineHeight: 22 }}>1000</H2>
                      <View className="flex-row items-center bg-[#16a40933] rounded-full px-1.5 py-0.5 ml-1.5 mb-1">
                        <OverlineSm className="text-[#16a409]">
                          ₹100
                        </OverlineSm>
                      </View>
                    </View>
                    <SH3 className="text-neutral-900/40 mt-1">
                      Your ZCoins Balance
                    </SH3>
                  </View>
                </View>
                <View className="opacity-90">
                  <LottieView
                    source={require("../../assets/lottie/CoinFlipDark.json")}
                    autoPlay
                    loop
                    style={{
                      flex: 1,
                      height: 54,
                      width: 54,
                      position: "absolute",
                      bottom: -25,
                      right: -25,
                    }}
                    renderMode={
                      Platform.OS === "android" ? "SOFTWARE" : "AUTOMATIC"
                    }
                  />
                </View>
              </View>
            </LinearGradient>
          </View> */}
          <View className="mt-5 flex-col justify-between mb-8 px-3">
            <View
              className=" flex-col items-start border-[1.3px] border-neutral-900/5 rounded-2xl pt-3 pb-4 px-4 bg-neutral-0 overflow-hidden"
              style={cardShadowStyle}
            >
              <View className="flex-row items-end gap-1">
              <H7 className="text-neutral-900/80">1000</H7>
             
                <View className="flex-row items-center bg-[#16a40916] rounded-md px-1.5 py-0.5 mb-1 ml-1">
                  <OverlineSm className="text-[#16a409]">WORTH ₹100</OverlineSm>
                </View>
              </View>
              <SH7 className="text-neutral-900/40 uppercase mt-1.5">COIN BALANCE</SH7>

            
              
                <LottieView
                  source={require("../../assets/lottie/CoinFlipDark.json")}
                  autoPlay
                  loop
                  style={{
                    position: "absolute",
                    height: 50,
                    width: 50,

                    bottom: -2,
                    right: -2,
                  }}
                  renderMode={
                    Platform.OS === "android" ? "SOFTWARE" : "AUTOMATIC"
                  }
                />
             
            </View>
            <View className=" flex-row justify-between gap-2 mt-2">
              <View
                className="border w-[49%] rounded-xl border-neutral-900/5 bg-neutral-0 overflow-hidden pt-3 pb-4 px-3"
                style={cardShadowStyle}
              >
                <SH7 className="text-neutral-900/90 uppercase">CASHBACK</SH7>
                <B5 className="text-neutral-500">₹0</B5>
                {/* <Image
                source={require("../../assets/images/vouchersNew.webp")}
                className="w-[46px] h-[46px] absolute -bottom-1 -right-2 opacity-90"
              /> */}
              </View>
              <View
                className="border w-[49%] rounded-xl border-neutral-900/5 bg-neutral-0 overflow-hidden pt-3 pb-4 px-3"
                style={cardShadowStyle}
              >
                <SH7 className="text-neutral-900/90 uppercase">VOUCHERS</SH7>
                <B5 className="text-neutral-500">0 Vouchers</B5>
                {/* <Image
                source={require("../../assets/images/vouchersNew.webp")}
                className="w-[46px] h-[46px] absolute -bottom-1 -right-2 opacity-90"
              /> */}
              </View>
            </View>
          </View>
          <View className="mb-2">
            <SH6 className="mb-5 px-3">Top Selling Vouchers</SH6>
            <VoucherCarousel />
          </View>
          <View>
            <RewardCategoriesSection />
          </View>
          <View>
            <DiscountSection />
          </View>
          <View>
            <OttSection />
          </View>
          <View>
            <ZCoinsSection />
          </View>
          <View className="px-3">
            <ZetPlusCard />
          </View>
          {/* Add some bottom padding to ensure content doesn't get hidden behind the tab bar */}
          <View className="h-5" />
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120, // Ensures content isn't hidden behind the tab bar
  },

  listContainer: {
    paddingBottom: 90,
  },
});
