import React from "react";
import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { colors } from "../styles/theme";
import { Stack, useRouter } from "expo-router";
import { B3, H3, OverlineSm, SH6 } from "../components/ui";
import { ChevronLeftIcon } from "../components/ui/icons";
import { LinearGradient } from "expo-linear-gradient";
import { RedeemVoucherSection, TopRedeemedVouchersCarousel } from "../components/zcoins";
import { BottomSheetProvider } from "../context/bottom-sheet-context";
import { useUser } from "../context/user-context";

const MIN_COINS_REQUIRED = 500;

export default function RedeemVoucherScreen() {
  const router = useRouter();
  const { userInfo } = useUser();
  const hasEnoughCoins = userInfo.zcoins.balance >= MIN_COINS_REQUIRED;

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
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-10">
          {/* Header with close button */}
          <View className="px-3 pb-3 flex-row items-center border-b-[1.3px] border-neutral-900/10">
            <Pressable
              onPress={() => router.back()}
              className="mr-3 p-2 bg-neutral-900/10 rounded-md"
            >
              <ChevronLeftIcon
                size={20}
                color={colors.neutral[900]}
                strokeWidth={2.5}
              />
            </Pressable>
            <H3>Redeem Voucher</H3>
          </View>
          <View>
          <View className="px-3 mt-4 flex-row items-center justify-between">
            <SH6>Top Redeemed Vouchers</SH6>
            <OverlineSm className=" px-1.5 py-0.5 bg-[#a11e50]/10 rounded-md text-[#a11e50] mb-1">
              1000+ Redeemed
            </OverlineSm>
          </View>
          
          {/* Add the TopRedeemedVouchersCarousel component */}
          <View className="mt-4">
            <TopRedeemedVouchersCarousel minCoinsRequired={MIN_COINS_REQUIRED} />
          </View>
          
          </View>

          {/* Voucher section */}
          <View className="px-3 pt-3 bg-neutral-0">
            <SH6 className="mb-2">All Brand Vouchers</SH6>
            <RedeemVoucherSection />
          </View>
          
          {/* Show message if not enough coins */}
          {!hasEnoughCoins && (
            <View className="mx-3 mt-4 mb-3 bg-[#f9f1ff] rounded-lg p-3 flex-row items-center">
              <B3 className="text-neutral-900/70 flex-1">
                You need at least {MIN_COINS_REQUIRED} Zcoins to redeem vouchers. Keep earning more Zcoins through your card spends!
              </B3>
            </View>
          )}
        </View>
      </ScrollView>
    </BottomSheetProvider>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    marginBottom: 32,
  },
}); 