import React, { useRef } from "react";
import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import {
  H4,
  H5,
  H6,
  SH1,
  SH3,
  SH5,
  B2,
  B3,
  B4,
  SH7,
  H7,
  SH2,
} from "../ui/typography/typography";
import { Button } from "../ui/button/button";
import { CreditCardIcon, ChevronRightIcon, RupeeCoinIcon } from "../ui/icons";
import { RiveAnimation } from "../ui";
import { RiveRef } from "rive-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../styles/theme";
import { Image } from "react-native";
// Use React.memo for frequently reused components
const MemoizedButton = React.memo(Button);

// Sample transaction data
const recentTransactions = [
  {
    id: "1",
    merchant: "Swiggy",
    date: "22 May",
    amount: "₹450",
    category: "Food",
  },
  {
    id: "2",
    merchant: "Amazon",
    date: "20 May",
    amount: "₹1,200",
    category: "Shopping",
  },
  {
    id: "3",
    merchant: "Uber",
    date: "19 May",
    amount: "₹180",
    category: "Travel",
  },
  {
    id: "4",
    merchant: "Zomato",
    date: "15 May",
    amount: "₹530",
    category: "Food",
  },
  {
    id: "5",
    merchant: "Netflix",
    date: "10 May",
    amount: "₹199",
    category: "Entertainment",
  },
];

interface TransactionItemProps {
  merchant: string;
  date: string;
  amount: string;
  category: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  merchant,
  date,
  amount,
  category,
}) => (
  <View className="flex-row justify-between items-center py-3 border-b border-neutral-100">
    <View className="flex-row items-center space-x-3">
      <View className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
        <View className="w-4 h-4 bg-neutral-700 rounded-full" />
      </View>
      <View>
        <B3 className="text-black opacity-90">{merchant}</B3>
        <B4 className="text-black opacity-50">
          {date} • {category}
        </B4>
      </View>
    </View>
    <B3 className="text-black opacity-90">{amount}</B3>
  </View>
);

interface PostActivationCardsProps {
  onManageCard?: () => void;
  onViewAllTransactions?: () => void;
  onViewPaymentSummary?: () => void;
}

const cardShadowStyle = {
  shadowColor: "#00000063",
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

const PostActivationCards: React.FC<PostActivationCardsProps> = ({
  onManageCard,
  onViewAllTransactions,
  onViewPaymentSummary,
}) => {
  const riveRef = useRef<RiveRef>(null);
  return (
    <View className="bg-neutral-0 -mt-2 pt-6">
      <View className="flex-row justify-between items-center">
        <LinearGradient
          colors={["#ffffff", "#ffffff", "#dfd0e4"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.5, 1]}
          className="absolute top-0 left-0 w-full h-full"
        />
        <View className="relative w-full h-[280px] pt-16 pb-4">
          <RiveAnimation
            ref={riveRef}
            source={require("../../assets/rive/card_tab.riv")}
            artboardName="card_wallet"
            autoplay={true}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </View>
      {/* Card Limit Section */}
      <View className="px-3 pt-8 rounded-t-xl b">
        {/* Payment Due Section */}

        <View className="bg-neutral-50 rounded-xl p-4 mb-6 border border-neutral-100">
          <View className="flex-row justify-between items-center">
            <View>
              <B3 className="text-black opacity-70">Due Date</B3>
              <SH1 className="text-black">15 June 2025</SH1>
            </View>
            <MemoizedButton
              variant="filled"
              size="sm"
              onPress={onViewPaymentSummary}
            >
              Pay Now
            </MemoizedButton>
          </View>
        </View>
        <View className="flex-row justify-between mb-3">
          <View className="w-[48.5%]">
            <View
              className="w-full h-[116px] relative overflow-hidden bg-neutral-0 rounded-xl py-4 px-3 border-[1.3px] border-neutral-900/5 mb-3"
              style={cardShadowStyle}
            >
              <SH7 className="text-black text-start text-sm uppercase opacity-80">
                Manage Card
              </SH7>

              <B4 className="text-black opacity-50 text-start pr-4">
                Pay, manage and more
              </B4>
              <View className="absolute -right-6 -bottom-6">
                <Image
                  source={require("../../assets/images/cardPodium.png")}
                  className="w-[74px] h-[74px]"
                />
              </View>
            </View>
          </View>

          <View className="w-[48.5%]">
            <View
              className="w-full h-[116px] relative overflow-hidden bg-neutral-0 rounded-xl py-4 px-3 border-[1.3px] border-neutral-900/5 mb-3"
              style={cardShadowStyle}
            >
              <SH7 className="text-black text-start text-sm uppercase opacity-80">
                Payment History
              </SH7>

              <B4 className="text-black opacity-50 text-start pr-4">
                View your payment history
              </B4>
              <View className="absolute -right-6 -bottom-6">
                <Image
                  source={require("../../assets/images/cardPodium.png")}
                  className="w-[74px] h-[74px]"
                />
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row justify-between mb-3">
          <View className="w-[48.5%]">
            <View
              className="w-full h-[116px] relative overflow-hidden bg-neutral-0 rounded-xl py-4 px-3 border-[1.3px] border-neutral-900/5 mb-3"
              style={cardShadowStyle}
            >
              <SH7 className="text-black text-start text-sm uppercase opacity-80">
                Manage Card
              </SH7>

              <B4 className="text-black opacity-50 text-start pr-4">
                Pay, manage and more
              </B4>
              <View className="absolute -right-6 -bottom-6">
                <Image
                  source={require("../../assets/images/cardPodium.png")}
                  className="w-[74px] h-[74px]"
                />
              </View>
            </View>
          </View>

          <View className="w-[48.5%]">
            <View
              className="w-full h-[116px] relative overflow-hidden bg-neutral-0 rounded-xl py-4 px-3 border-[1.3px] border-neutral-900/5 mb-3"
              style={cardShadowStyle}
            >
              <SH7 className="text-black text-start text-sm uppercase opacity-80">
                Payment History
              </SH7>

              <B4 className="text-black opacity-50 text-start pr-4">
                View your payment history
              </B4>
              <View className="absolute -right-6 -bottom-6">
                <Image
                  source={require("../../assets/images/cardPodium.png")}
                  className="w-[74px] h-[74px]"
                />
              </View>
            </View>
          </View>
        </View>
        <View
          className="bg-neutral-0 rounded-xl p-4 border-[1.3px] border-neutral-900/5 overflow-hidden mb-24"
          style={cardShadowStyle}
        >
          {/* <View className="flex-row justify-between items-center mb-2">
          <H6 className="text-black">SBM ZET Credit Card</H6>
          <CreditCardIcon size={24} color="black" variant="filled" />
        </View> */}

          <View className="mb-4">
            <SH7 className="text-black opacity-70 mb-1 uppercase">
              Your Card Limit
            </SH7>
            <H4 className="text-black">₹5,000</H4>
          </View>

          {/* <View className="bg-neutral-900/10 h-2 rounded-full mb-2">
          <View className="bg-success-500 h-2 rounded-full" style={{ width: '85%' }} />
        </View> */}

          {/* <View className="flex-row justify-between">
          <B4 className="text-black opacity-70">Total Limit: ₹5,000</B4>
          <B4 className="text-black opacity-70">Used: ₹750</B4>
        </View> */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Button
                variant="filled"
                size="sm"
                color="primary-100"
                textStyle={{ fontWeight: "600" }}
                startIcon={
                  <RupeeCoinIcon
                    size={16}
                    color={colors.primary[500]}
                    secondaryColor="#ffffff"
                    variant="duotone"
                  />
                }
              >
                Increase your Credit Limit
              </Button>
            </View>
          </View>
          <Image
            source={require("../../assets/images/credit_limit.webp")}
            className="absolute -bottom-1 -right-3 w-[70px] h-[70px]"
          />
        </View>
      </View>

      {/* Actions Section */}

      {/* Recent Transactions Section */}
      {/* <View className="mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <H6 className="text-black">Recent Transactions</H6>
          <Pressable onPress={onViewAllTransactions}>
            <View className="flex-row items-center">
              <B3 className="text-primary-500 mr-1">View All</B3>
              <ChevronRightIcon
                size={16}
                color="primary.500"
                variant="filled"
              />
            </View>
          </Pressable>
        </View>

      
        <View>
          {recentTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              merchant={transaction.merchant}
              date={transaction.date}
              amount={transaction.amount}
              category={transaction.category}
            />
          ))}
        </View>
      </View> */}

      {/* Monthly Spend Analysis */}
      {/* <View className="mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <H6 className="text-black">Monthly Spend Analysis</H6>
          <View className="h-10 w-10 rounded-full bg-primary-700 opacity-50" />
        </View>

        <View className="flex-row justify-between mb-2">
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-success-500 mr-2" />
            <B3 className="text-black opacity-70">Food & Dining</B3>
          </View>
          <B3 className="text-black">₹980 (45%)</B3>
        </View>

        <View className="flex-row justify-between mb-2">
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-primary-500 mr-2" />
            <B3 className="text-black opacity-70">Shopping</B3>
          </View>
          <B3 className="text-black">₹1,200 (30%)</B3>
        </View>

        <View className="flex-row justify-between mb-2">
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-warning-500 mr-2" />
            <B3 className="text-black opacity-70">Travel</B3>
          </View>
          <B3 className="text-black">₹180 (15%)</B3>
        </View>

        <View className="flex-row justify-between mb-2">
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-info-500 mr-2" />
            <B3 className="text-black opacity-70">Entertainment</B3>
          </View>
          <B3 className="text-black">₹199 (10%)</B3>
        </View>
      </View> */}
    </View>
  );
};

export default PostActivationCards;
