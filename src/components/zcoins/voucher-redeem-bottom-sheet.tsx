import React, { useState } from "react";
import { View, Image, ImageSourcePropType, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomSheet } from "../../context/bottom-sheet-context";
import { H3, SH1, B2, B3, SH6, B5, Button, H5 } from "../ui";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import { InfoIcon } from "../ui/icons";

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
  const { hideBottomSheet } = useBottomSheet();
  const router = useRouter();

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

  // Render confirmation view or success view based on isRedeemed state
  if (isRedeemed) {
    return (
      <SuccessView 
        onContinueShopping={handleContinueShopping} 
        onGoToMyVouchers={handleGoToMyVouchers} 
      />
    );
  }

  // Confirmation view
  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View className="flex-row justify-between items-center mb-4">
          <H5>Redeem Voucher</H5>
          {/* <TouchableOpacity 
            onPress={handleGoToMyVouchers}
            className="bg-neutral-100 px-3 py-1.5 rounded-full"
          >
            <B5 className="text-neutral-700">My Vouchers</B5>
          </TouchableOpacity> */}
        </View>
        
        {/* Voucher Card */}
        <View className="items-center mb-6">
          <LinearGradient
            colors={[backgroundColorOne, backgroundColorTwo] as const}
            start={{ x: 0.45, y: 0.45 }}
            end={{ x: 0.8, y: 0.8 }}
            className="rounded-xl overflow-hidden w-full shadow-md"
          >
            <View className="flex-col justify-between p-4">
              <View className="flex-row gap-3 items-center justify-start">
                <View className="rounded-md overflow-hidden border border-white/30 shadow-sm">
                  <Image
                    source={
                      voucherImage ||
                      require("../../assets/images/vouchersNew.webp")
                    }
                    className="w-12 h-12"
                    resizeMode="contain"
                  />
                </View>
                <View className="flex-1 flex-col justify-between items-start">
                  <SH1 className="text-white" numberOfLines={1}>
                    {voucherTitle}
                  </SH1>
                  {voucherValue && (
                    <B2 className="text-white/90" numberOfLines={1}>
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
        <View className="bg-neutral-50 rounded-xl p-4 mb-6 shadow-sm">
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
        
        {/* Information box */}
        {/* <View className="bg-blue-50 rounded-xl p-4 mb-6 flex-row">
          <View className="mr-3 mt-0.5">
            <InfoIcon size={16} color="#3b82f6" />
          </View>
          <B3 className="text-blue-700 flex-1">
            Your voucher will be processed within 24-48 hours. You can check your voucher status in "My Vouchers" section.
          </B3>
        </View> */}
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
            It will take 24-48 hrs to process your voucher request. Please check "My Vouchers" section to view your voucher details.
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