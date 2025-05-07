import React from "react";
import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { colors } from "../styles/theme";
import { Stack, useRouter } from "expo-router";
import { H3, SH7, B3, SH6, SH1, B2, B5 } from "../components/ui";
import { ChevronLeftIcon } from "../components/ui/icons";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";

// Sample data for redeemed vouchers - in a real app, this would come from an API or storage
const redeemedVouchers = [
  {
    id: "1",
    title: "Amazon",
    voucherValue: "₹100",
    voucherCode: "AMZN-123456",
    redemptionDate: "12 Jun 2023",
    expiryDate: "12 Sep 2023",
    status: "Active",
    backgroundColorOne: "#232F3E",
    backgroundColorTwo: "#131A22",
    voucherImage: require("../assets/images/brands/amazonLogoW.webp"),
  },
  {
    id: "2",
    title: "Swiggy",
    voucherValue: "₹150",
    voucherCode: "SWGY-789012",
    redemptionDate: "05 May 2023",
    expiryDate: "05 Aug 2023",
    status: "Active",
    backgroundColorOne: "#9c1c4b",
    backgroundColorTwo: "#9c1c4b",
    voucherImage: require("../assets/images/brands/swiggyLogo.webp"),
  },
];

// Define the Voucher type
interface Voucher {
  id: string;
  title: string;
  voucherValue: string;
  voucherCode: string;
  redemptionDate: string;
  expiryDate: string;
  status: string;
  backgroundColorOne: string;
  backgroundColorTwo: string;
  voucherImage: any;
}

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

// Voucher Card component with typed parameter
const VoucherCard = ({ voucher }: { voucher: Voucher }) => (
  <View className="mb-4 mx-3">
    <LinearGradient
      colors={[voucher.backgroundColorOne, voucher.backgroundColorTwo]}
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
          <View className="bg-green-500/20 px-2 py-1 rounded-md">
            <SH7 className="text-green-500">{voucher.status}</SH7>
          </View>
        </View>

        <View className="mt-3 flex-row items-center">
          <View className="absolute -left-6 h-4 w-4 rounded-full bg-white" />
          <View className="border-t border-dashed border-white/20 w-full my-2" />
          <View className="absolute -right-6 h-4 w-4 rounded-full bg-white" />
        </View>

        <View className="mt-3">
          <View className="flex-row justify-between mb-1">
            <B5 className="text-white/60">Voucher Code</B5>
            <SH7 className="text-white">{voucher.voucherCode}</SH7>
          </View>
          <View className="flex-row justify-between mb-1">
            <B5 className="text-white/60">Redeemed On</B5>
            <SH7 className="text-white">{voucher.redemptionDate}</SH7>
          </View>
          <View className="flex-row justify-between">
            <B5 className="text-white/60">Valid Till</B5>
            <SH7 className="text-white">{voucher.expiryDate}</SH7>
          </View>
        </View>
      </View>
    </LinearGradient>
  </View>
);

export default function MyVouchersScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
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
            renderItem={({ item }) => <VoucherCard voucher={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyState />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 16,
    paddingBottom: 32,
  },
}); 