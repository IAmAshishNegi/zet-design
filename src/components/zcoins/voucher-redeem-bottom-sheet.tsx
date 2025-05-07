import React, { useState, useEffect } from "react";
import { View, Image, ImageSourcePropType, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomSheet } from "../../context/bottom-sheet-context";
import { H3, SH1, B2, B3, SH6, Button } from "../ui";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

interface VoucherRedeemBottomSheetProps {
  voucherTitle: string;
  voucherValue: string;
  zCoinsRequired: string;
  voucherImage?: ImageSourcePropType;
  backgroundColorOne: string;
  backgroundColorTwo: string;
  id?: string;
}

export const VoucherRedeemBottomSheet: React.FC<VoucherRedeemBottomSheetProps> = ({
  voucherTitle,
  voucherValue,
  zCoinsRequired,
  voucherImage,
  backgroundColorOne,
  backgroundColorTwo,
  id,
}) => {
  const [isRedeemed, setIsRedeemed] = useState(false);
  const { hideBottomSheet, showBottomSheet } = useBottomSheet();
  const router = useRouter();

  // Update bottom sheet height when switching to success view
  useEffect(() => {
    if (isRedeemed) {
      // Close current bottom sheet and reopen with taller height for success view
      hideBottomSheet();
      
      // Small delay to ensure smooth transition
      setTimeout(() => {
        showBottomSheet(
          <SuccessView 
            onContinueShopping={handleContinueShopping} 
            onGoToMyVouchers={handleGoToMyVouchers} 
          />, 
          ['60%']
        );
      }, 100);
    }
  }, [isRedeemed]);

  const handleRedeemNow = () => {
    // Simulate voucher redemption
    setIsRedeemed(true);
  };

  const handleContinueShopping = () => {
    hideBottomSheet();
  };

  const handleGoToMyVouchers = () => {
    hideBottomSheet();
    // Navigate to "My Vouchers" screen
    router.push("/my-vouchers-screen");
  };

  // We'll only show the confirmation view now, success view is shown via useEffect
  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Voucher Card */}
        <View className="items-center mb-6">
          <LinearGradient
            colors={[backgroundColorOne, backgroundColorTwo]}
            start={{ x: 0.45, y: 0.45 }}
            end={{ x: 0.8, y: 0.8 }}
            className="rounded-xl overflow-hidden w-full"
          >
            <View className="flex-col justify-between p-4">
              <View className="flex-row gap-2 items-center justify-start">
                <View className="rounded-md overflow-hidden border border-white/30">
                  <Image
                    source={
                      voucherImage ||
                      require("../../assets/images/vouchersNew.webp")
                    }
                    className="w-10 h-10"
                    resizeMode="contain"
                  />
                </View>
                <View className="flex-1 flex-col justify-between items-start">
                  <SH1 className="text-white" numberOfLines={1}>
                    {voucherTitle}
                  </SH1>
                  {voucherValue && (
                    <B2 className="text-white/80" numberOfLines={1}>
                      {voucherValue} Voucher
                    </B2>
                  )}
                </View>
              </View>

              <View className="mt-3 flex-row items-center">
                <View className="absolute -left-6 h-4 w-4 rounded-full bg-white" />
                <View className="border-t border-dashed border-white/20 w-full my-2" />
                <View className="absolute -right-6 h-4 w-4 rounded-full bg-white" />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Details */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <B3 className="text-neutral-600">Voucher Value</B3>
            <SH6>{voucherValue}</SH6>
          </View>
          <View className="flex-row justify-between items-center">
            <B3 className="text-neutral-600">ZCoins Required</B3>
            <View className="flex-row items-center">
              <SH6>{zCoinsRequired}</SH6>
              <View className="ml-1">
                <LottieView
                  source={require("../../assets/lottie/ZetCoins.json")}
                  autoPlay
                  loop
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Button at bottom */}
      <View style={styles.buttonContainer}>
        <Button
          variant="filled"
          size="lg"
          fullWidth
          onPress={handleRedeemNow}
        >
          Redeem Voucher Now
        </Button>
      </View>
    </View>
  );
};

// Separate component for success view to avoid rendering issues
interface SuccessViewProps {
  onContinueShopping: () => void;
  onGoToMyVouchers: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ 
  onContinueShopping, 
  onGoToMyVouchers 
}) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, styles.successScrollContent]}
      >
        <View className="items-center justify-center">
          <LottieView
            source={require("../../assets/lottie/success.json")}
            autoPlay
            loop={false}
            style={{
              height: 120,
              width: 120,
            }}
          />
          <H3 className="text-center mt-2">Voucher Redeemed Successfully</H3>
          <B3 className="text-center text-neutral-600 mt-3 px-6">
            It will take 24-48 hrs to process your voucher request. Please check my voucher section in ZCoin to view your voucher details.
          </B3>
        </View>
      </ScrollView>

      {/* Fixed Buttons at bottom */}
      <View style={styles.buttonContainer}>
        <View className="flex-col gap-3">
          <Button
            variant="filled"
            size="lg"
            fullWidth
            onPress={onContinueShopping}
          >
            Continue Shopping
          </Button>
          <Button
            variant="outlined"
            size="lg"
            fullWidth
            onPress={onGoToMyVouchers}
          >
            Go to My Vouchers
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 80, // Add padding to ensure content isn't hidden behind fixed button
  },
  successScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    paddingTop: 12,
  },
}); 