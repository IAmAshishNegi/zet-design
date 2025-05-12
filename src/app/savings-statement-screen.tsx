import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList
} from "react-native";
import { colors } from "../styles/theme";
import { CrossIcon, RupeeCoinIcon, ZcoinIcon } from "../components/ui/icons";
import {
  H3,
  SH8,
  B4,
  H5,
  H4,
  B2,
  SH2,
  SH6,
  B8,
  H8,
} from "../components/ui/typography/typography";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";

// Define savings transaction type
interface SavingsTransaction {
  id: string;
  date: string;
  description: string;
  coinsUsed: number;
  savingsAmount: number;
  type: "voucher" | "cash";
}

// Sample savings transaction data
const savingsData: SavingsTransaction[] = [
  {
    id: "1",
    date: "12 Sep 2023",
    description: "Amazon Voucher Redemption",
    coinsUsed: 1000,
    savingsAmount: 400,
    type: "voucher",
  },
  {
    id: "2",
    date: "15 Sep 2023",
    description: "Swiggy Voucher Redemption",
    coinsUsed: 750,
    savingsAmount: 300,
    type: "voucher",
  },
  {
    id: "3",
    date: "18 Sep 2023",
    description: "Cash Conversion",
    coinsUsed: 2000,
    savingsAmount: 200,
    type: "cash",
  },
  {
    id: "4",
    date: "20 Sep 2023",
    description: "Flipkart Voucher Redemption",
    coinsUsed: 1500,
    savingsAmount: 600,
    type: "voucher",
  },
  {
    id: "5",
    date: "25 Sep 2023",
    description: "Cash Conversion",
    coinsUsed: 1000,
    savingsAmount: 100,
    type: "cash",
  },
];

// Calculate total savings
const totalSavings = savingsData.reduce((sum, transaction) => sum + transaction.savingsAmount, 0);
const totalCoinsUsed = savingsData.reduce((sum, transaction) => sum + transaction.coinsUsed, 0);

// Transaction item component
const SavingsTransactionItem = ({ item }: { item: SavingsTransaction }) => (
  <View className="flex-row justify-between items-center pt-4 pb-5 border-b border-neutral-200/50">
    <View className="flex-1">
      <B2 className="text-neutral-900">{item.description}</B2>
      <B8 className="text-neutral-400 mt-1">{item.date}</B8>
    </View>
    <View className="flex-col items-end">
      <SH2 className="text-neutral-900">₹{item.savingsAmount}</SH2>
      <B4 className="text-neutral-500">{item.coinsUsed} Zcoins used</B4>
    </View>
  </View>
);

export default function SavingsStatementScreen() {
  const router = useRouter();
  
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="flex-1 bg-neutral-0">
        {/* Header with title and close button */}
        <View className="flex-row items-center justify-start pt-12 px-4 pb-4 bg-neutral-0 border-b border-neutral-200/50">
          <Pressable
            onPress={() => router.back()}
            className="p-2 bg-neutral-100 mr-3 rounded-md"
          >
            <CrossIcon size={20} color={colors.neutral[900]} />
          </Pressable>
          <H4>Your Savings</H4>
        </View>
        
        {/* Savings summary */}
        <View className="flex-row justify-between gap-2 px-3 py-2 bg-neutral-0 border-b border-neutral-200/50">
        <View className="flex-row items-center gap-3 p-2 w-[43%] bg-neutral-0 rounded-xl mr-3">
            <View className="p-2 bg-[#17a40d]/15 rounded-lg">
              <RupeeCoinIcon variant="filled" size={24} color={"#17a40d"} />
            </View>
            <View className="flex-col">
              <SH8 className="text-neutral-500 uppercase">SAVINGS</SH8>
              <H8 className="text-neutral-900 mt-0.5">₹100</H8>
            </View>
          </View>
          <View className="flex-row items-center gap-3 p-2 w-[49%] bg-neutral-0 rounded-xl mr-3">
            <View className="p-2 bg-[#e3ac05]/15 rounded-lg">
              <ZcoinIcon variant="filled" size={24} color={"#e2ac0b"} />
            </View>
            <View className="flex-col">
              <SH8 className="text-neutral-500 uppercase">COINS USED</SH8>
              <H8 className="text-neutral-900 mt-0.5">1000</H8>
            </View>
          </View>
        </View>
        
        <SH6 className="text-neutral-900/70 px-3 pt-4">Coins earned and spent</SH6>
        {/* Transactions list */}
        <FlatList
          data={savingsData}
          renderItem={({ item }) => <SavingsTransactionItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
}); 