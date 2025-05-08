import React from "react";
import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors } from "../styles/theme";
import { Stack, useRouter } from "expo-router";
import { H3, SH7, B3, SH6, SH1, B2, B5 } from "../components/ui";
import { ChevronLeftIcon } from "../components/ui/icons";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { useBottomSheet } from "../context/bottom-sheet-context";
import { VoucherDetailBottomSheet, VoucherDetail } from "../components/zcoins/voucher-detail-bottom-sheet";
import { BottomSheetProvider } from "../context/bottom-sheet-context";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing 
} from "react-native-reanimated";

// Sample data for redeemed vouchers - in a real app, this would come from an API or storage
const redeemedVouchers: VoucherDetail[] = [
  {
    id: "1",
    title: "Amazon",
    voucherValue: "₹100",
    voucherCode: "AMZN-123456",
    redemptionDate: "12 Jun 2023",
    expiryDate: "12 Sep 2023",
    status: "active",
    backgroundColorOne: "#232F3E",
    backgroundColorTwo: "#131A22",
    voucherImage: require("../assets/images/brands/amazonLogoW.webp"),
    transactionId: "TXN123456789",
  },
  {
    id: "2",
    title: "Swiggy",
    voucherValue: "₹150",
    voucherCode: "SWGY-789012",
    redemptionDate: "05 May 2023",
    expiryDate: "05 Aug 2023",
    status: "in-progress",
    backgroundColorOne: "#9c1c4b",
    backgroundColorTwo: "#9c1c4b",
    voucherImage: require("../assets/images/brands/swiggyLogo.webp"),
    transactionId: "TXN987654321",
  },
  {
    id: "3",
    title: "Flipkart",
    voucherValue: "₹200",
    voucherCode: "FLIP-456789",
    redemptionDate: "15 Jan 2023",
    expiryDate: "15 Apr 2023",
    status: "expired",
    backgroundColorOne: "#047BD5",
    backgroundColorTwo: "#0565ae",
    voucherImage: require("../assets/images/brands/flipkartLogo.webp"),
    transactionId: "TXN456123789",
  },
  {
    id: "4",
    title: "Zomato",
    voucherValue: "₹120",
    voucherCode: "ZOMA-234567",
    redemptionDate: "20 Feb 2023",
    redemptionTime: "14:30",
    expiryDate: "20 May 2023",
    status: "redeemed",
    backgroundColorOne: "#CB202D",
    backgroundColorTwo: "#A61F2B",
    voucherImage: require("../assets/images/vouchersNew.webp"),
    transactionId: "TXN234567891",
  },
];

// If there are no redeemed vouchers yet
const EmptyState = () => (
  <View className="items-center justify-center py-10">
    <Image
      source={require("../assets/images/vouchersNew.webp")}
      className="w-20 h-20 opacity-50"
    />
    <SH6 className="text-center mt-4 text-neutral-500">No Vouchers Yet</SH6>
    <B3 className="text-center mt-2 text-neutral-500">
      Redeem your ZCoins to get vouchers from your favorite brands
    </B3>
  </View>
);

// Animated TouchableOpacity component
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// Voucher Card component to display individual vouchers
const VoucherCard = ({ 
  voucher, 
  onPress 
}: { 
  voucher: VoucherDetail; 
  onPress: (voucher: VoucherDetail) => void;
}) => {
  // Animation for press feedback
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });
  
  const handlePressIn = () => {
    scale.value = withTiming(0.95, {
      duration: 150,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    opacity.value = withTiming(0.8, {
      duration: 150,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };
  
  const handlePressOut = () => {
    scale.value = withTiming(1, {
      duration: 200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    opacity.value = withTiming(1, {
      duration: 200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  // Get status badge color based on status
  const getStatusBadge = () => {
    switch (voucher.status) {
      case 'active':
        return (
          <View className="bg-green-500/20 px-2 py-1 rounded-md">
            <SH7 className="text-green-500">Active</SH7>
          </View>
        );
      case 'in-progress':
        return (
          <View className="bg-yellow-500/20 px-2 py-1 rounded-md">
            <SH7 className="text-yellow-600">In Progress</SH7>
          </View>
        );
      case 'redeemed':
        return (
          <View className="bg-neutral-400/20 px-2 py-1 rounded-md">
            <SH7 className="text-neutral-600">Redeemed</SH7>
          </View>
        );
      case 'expired':
        return (
          <View className="bg-red-500/20 px-2 py-1 rounded-md">
            <SH7 className="text-red-500">Expired</SH7>
          </View>
        );
      default:
        return null;
    }
  };

  // Determine gradient colors based on voucher status
  const getGradientColors = () => {
    if (voucher.status === 'expired' || voucher.status === 'redeemed') {
      return ["#c8c8c8", "#bfbfbf"] as const;
    }
    return [voucher.backgroundColorOne, voucher.backgroundColorTwo] as const;
  };

  // Get text color class based on status
  const getTextColorClass = () => {
    return voucher.status === 'expired' || voucher.status === 'redeemed' 
      ? "text-neutral-500" 
      : "text-white/60";
  };

  return (
    <AnimatedTouchable 
      onPress={() => onPress(voucher)} 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
      className="mb-4 mx-3"
      style={[animatedStyle]}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0.45, y: 0.45 }}
        end={{ x: 0.8, y: 0.8 }}
        className="rounded-xl overflow-hidden"
      >
        <View className="flex-col justify-between p-4">
          <View className="flex-row gap-2 items-center justify-start">
            <View className="rounded-md overflow-hidden border border-white/30">
              <Image
                source={voucher.voucherImage}
                className="w-10 h-10"
                resizeMode="contain"
              />
            </View>
            <View className="flex-1 flex-col justify-between items-start">
              <SH1 className="text-white" numberOfLines={1}>
                {voucher.title}
              </SH1>
              <B2 className="text-white/80" numberOfLines={1}>
                {voucher.voucherValue} Voucher
              </B2>
            </View>
            {getStatusBadge()}
          </View>

          <View className="mt-3 flex-row items-center">
            <View className="absolute -left-6 h-4 w-4 rounded-full bg-white" />
            <View className="border-t border-dashed border-white/20 w-full my-2" />
            <View className="absolute -right-6 h-4 w-4 rounded-full bg-white" />
          </View>

          {/* Display voucher code and status-specific info */}
          <View className="flex-row justify-between items-center mt-3">
            <B5 className={voucher.status === 'active' ? "text-white/70" : getTextColorClass()}>
              {voucher.status === 'active' ? 'Voucher Code' : ''}
            </B5>
            
            {voucher.status === 'active' && (
              <SH7 className="text-white">{voucher.voucherCode}</SH7>
            )}
            
            {voucher.status === 'in-progress' && (
              <B5 className="text-white/80 text-left w-full">
                Transaction in progress. Will take 24-48 hrs.
              </B5>
            )}
            
            {voucher.status === 'redeemed' && (
              <B5 className="text-neutral-500 text-left w-full">
                Voucher redeemed successfully
              </B5>
            )}
            
            {voucher.status === 'expired' && (
              <B5 className="text-neutral-500 text-left w-full">
                This voucher has expired
              </B5>
            )}
          </View>
        </View>
      </LinearGradient>
    </AnimatedTouchable>
  );
};

// Main component
export default function MyVouchersScreen() {
  const router = useRouter();
  
  return (
    <BottomSheetProvider>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <MyVouchersContent router={router} />
    </BottomSheetProvider>
  );
}

// Content component that uses the bottom sheet hook
function MyVouchersContent({ router }: { router: any }) {
  const { showBottomSheet } = useBottomSheet();

  const handleVoucherPress = (voucher: VoucherDetail) => {
    showBottomSheet(
      <VoucherDetailBottomSheet voucher={voucher} />,
      ['70%']
    );
  };
  
  return (
    <View className="bg-neutral-0 flex-1">
      {/* Header with back button */}
      <View className="pt-10 px-3 pb-3 flex-row items-center border-b-[1.3px] border-neutral-900/10">
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
        <H3>Redeemed Vouchers</H3>
      </View>

      {/* Vouchers List */}
      {redeemedVouchers.length > 0 ? (
        <FlatList
          data={redeemedVouchers}
          renderItem={({ item }) => (
            <VoucherCard 
              voucher={item} 
              onPress={handleVoucherPress}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 16,
    paddingBottom: 32,
  },
}); 