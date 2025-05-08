import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList
} from "react-native";
import { colors } from "../styles/theme";
import { CrossIcon } from "../components/ui/icons";
import {
  H3,
  SH8,
  B4,
  H5,
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
  <View className="flex-row justify-between items-center py-3 border-b border-neutral-200/50">
    <View className="flex-1">
      <B4 className="text-neutral-900">{item.description}</B4>
      <SH8 className="text-neutral-500 mt-1">{item.date}</SH8>
    </View>
    <H5 className={item.type === "credit" ? "text-[#2fa11e]" : "text-[#d13636]"}>
      {item.type === "credit" ? "+" : "-"}{item.amount}
    </H5>
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
          <H3>ZCoin Statement</H3>
         
        </View>
        
        {/* Transaction summary */}
        <View className="flex-row justify-between gap-2 px-3 py-5 bg-neutral-100">
          <View className="p-3 w-[32%] bg-neutral-0 rounded-xl">
            <SH8 className="text-neutral-500 uppercase"> EARNED</SH8>
            <H5 className="text-[#2fa11e] mt-1">+1150</H5>
          </View>
          <View className="p-3 w-[32%] bg-neutral-0 rounded-xl">
            <SH8 className="text-neutral-500 uppercase"> SPENT</SH8>
            <H5 className="text-[#d13636] mt-1">-1150</H5>
          </View>
          <View className="p-3 w-[32%] bg-neutral-0 rounded-xl">
            <SH8 className="text-neutral-500 uppercase">BALANCE</SH8>
            <H5 className="text-neutral-900 mt-1">1000</H5>
          </View>
        </View>
        
        {/* Transactions list */}
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
}); 