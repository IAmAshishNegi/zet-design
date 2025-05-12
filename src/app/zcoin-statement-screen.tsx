import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList
} from "react-native";
import { colors } from "../styles/theme";
import { CrossIcon, ZcoinInIcon, ZcoinOutIcon, ZcoinIcon } from "../components/ui/icons";
import {
  H3,
  SH8,
  B4,
  H5,
  H4,
  SH2,
  SH7,
  SH6,
  SH3,
  H6,
  SH5,
  SH4,
  H7,
  H8,
  B3,
  B2,
  B8,
} from "../components/ui/typography/typography";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";

// Define transaction type
interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
}

// Sample transaction data
const transactionData: Transaction[] = [
  {
    id: "1",
    date: "12 Sep 2023",
    description: "Signup Bonus",
    amount: 500,
    type: "credit",
  },
  {
    id: "2",
    date: "15 Sep 2023",
    description: "Referral Reward",
    amount: 200,
    type: "credit",
  },
  {
    id: "3",
    date: "18 Sep 2023",
    description: "Amazon Voucher Redemption",
    amount: 400,
    type: "debit",
  },
  {
    id: "4",
    date: "20 Sep 2023",
    description: "Weekly Challenge Completed",
    amount: 100,
    type: "credit",
  },
  {
    id: "5",
    date: "25 Sep 2023",
    description: "Swiggy Voucher Redemption",
    amount: 300,
    type: "debit",
  },
  {
    id: "6",
    date: "01 Oct 2023",
    description: "Monthly Reward",
    amount: 300,
    type: "credit",
  },
  {
    id: "7",
    date: "05 Oct 2023",
    description: "Successful Transaction",
    amount: 50,
    type: "credit",
  },
  {
    id: "8",
    date: "10 Oct 2023",
    description: "Netflix Voucher Redemption",
    amount: 450,
    type: "debit",
  },
];

// Transaction item component
const TransactionItem = ({ item }: { item: Transaction }) => (
  <View className="flex-row justify-between items-center pt-3 pb-4 border-b border-neutral-200/50">
    <View className="flex-1">
      <B2 className="text-neutral-900">{item.description}</B2>
      <B8 className="text-neutral-400 mt-1">{item.date}</B8>
    </View>
    <SH2 className={item.type === "credit" ? "text-[#17a40d]" : "text-[#f7442c]"}>
      {item.type === "credit" ? "+" : "-"}{item.amount}
    </SH2>
  </View>
);

export default function ZCoinStatementScreen() {
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
        <View className="flex-row items-center justify-start pt-12 px-4 pb-4 bg-neutral-0 border-b border-neutral-200/50 ">
        <Pressable
            onPress={() => router.back()}
            className="p-2 bg-neutral-100 mr-3 rounded-md"
          >
            <CrossIcon size={20} color={colors.neutral[900]} />
          </Pressable>
          <H4>ZCoin Statement</H4>
         
        </View>
        <View className="py-1 border-b border-neutral-200/50">
        {/* Transaction summary */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.summaryContainer}
          className="px-3 py-2"
        >
          <View className="flex-row items-center gap-3 p-2 w-[30%] bg-neutral-0 rounded-xl mr-3">
            <View className="p-2 bg-[#e3ac05]/15 rounded-lg">
              <ZcoinIcon variant="filled" size={24} color={"#e2ac0b"} />
            </View>
            <View className="flex-col">
              <SH8 className="text-neutral-500 uppercase">BALANCE</SH8>
              <H8 className="text-neutral-900 mt-0.5">1000</H8>
            </View>
          </View>
          <View className="flex-row items-center gap-3 p-2 w-[30%] bg-neutral-0 rounded-xl mr-3">
            <View className="p-2 bg-[#17a40d]/10 rounded-lg">
              <ZcoinInIcon variant="duotone" size={24} color={"#17a40d"} secondaryColor={colors.neutral[0]} />
            </View>
            <View className="flex-col">
              <SH8 className="text-neutral-500 uppercase">EARNED</SH8>
              <H8 className="text-neutral-900 mt-0.5">2500</H8>
            </View>
          </View>
          <View className="flex-row items-center gap-3 p-2 w-[30%] bg-neutral-0 rounded-xl mr-20">
            <View className="p-2 bg-[#f7442c]/10 rounded-lg">
              <ZcoinOutIcon variant="duotone" size={24} color={"#f7442c"} secondaryColor={colors.neutral[0]} />
            </View>
            <View className="flex-col">
              <SH8 className="text-neutral-500 uppercase">SPENT</SH8>
              <H8 className="text-neutral-900 mt-0.5">1000</H8>
            </View>
          </View>
        </ScrollView>
        </View>
        {/* Transactions list */}
        <SH6 className="text-neutral-900/70 px-3 pt-4">Coins earned and spent</SH6>
        <FlatList
          data={transactionData}
          renderItem={({ item }) => <TransactionItem item={item} />}
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
  summaryContainer: {
    paddingVertical: 5,
  },
}); 