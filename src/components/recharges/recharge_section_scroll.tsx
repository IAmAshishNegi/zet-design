import React from "react";
import { View, StyleSheet, Dimensions, ScrollView, ImageSourcePropType } from "react-native";
import { Card } from "../ui/card";
import { Button, ButtonProps } from "../ui/button/button";
import { colors } from "../../styles/theme";
import {
  B3,
  B4,
  H3,
  H5,
  H6,
  H7,
  InfoIcon,
  SH1,
  SH2,
  SH4,
  SH5,
  SH6,
  SH7,
} from "../ui";
import { Image } from "react-native";
import {
  QRCodeIcon,
  SendMoneyIcon,
  BankIcon,
  RupeeBillIcon,
  UpiLogoIcon,
  UpiIcon,
  ChevronRightIcon,
} from "../ui/icons";
import { LinearGradient } from "expo-linear-gradient";

// Reusable component for recharge cards
function RechargeCard({ 
  imageSource, 
  title 
}: { 
  imageSource: ImageSourcePropType; 
  title: string;
}) {
  return (
    <View className="mr-3 w-[13%] border border-neutral-900/5 py-4 rounded-xl bg-white">
      <View className="flex-col items-center justify-center gap-2 w-full overflow-hidden rounded-xl">
        <View className="mb-2">
          <Image
            source={imageSource}
            className="w-[52px] h-[52px]"
            resizeMode="cover"
          />
        </View>

        <SH4 className="text-neutral-900 w-full text-center px-6 opacity-80">
          {title}
        </SH4>
      </View>
    </View>
  );
}

export function RechargeSectionScroll() {
  // Card data array
  const rechargeCards = [
    {
      imageSource: require("../../assets/images/bills/electricity.webp"),
      title: "Electricity Bill"
    },
    {
      imageSource: require("../../assets/images/bills/mobile_recharge.webp"),
      title: "Prepaid Recharge"
    },
    {
      imageSource: require("../../assets/images/bills/postpaid.webp"),
      title: "Postpaid Payment"
    },
    {
      imageSource: require("../../assets/images/bills/loan_pay.webp"),
      title: "Loan EMI Payment"
    },
    {
      imageSource: require("../../assets/images/bills/fastag.webp"),
      title: "NHAI Fastag"
    },
    {
      imageSource: require("../../assets/images/bills/more.webp"),
      title: "More options"
    }
  ];

  return (
    <View className="relative overflow-hidden">
      <LinearGradient
        colors={["#f3ecf6", "#efece5", "#f3ecf6"] as const}
        start={{ x: -0.01, y: 0.5 }}
        end={{ x: 0.7, y: 1 }}
        locations={[0, 0.6, 1] as const}
        className="absolute left-0 right-0 top-0 bottom-0 h-full w-full"
      />

      <View className="pb-3">
        <View className="mb-3 pt-6 pb-3 px-3">
      
          <View className="flex-row items-center justify-between">
            <H6 className="text-neutral-900">Recharges & Bill Payments </H6>
            <View className="flex-row items-center">
              <SH4 className="text-primary-500">View all</SH4>
              <ChevronRightIcon variant="stroke" height={16} width={16}  color={colors.primary[500]} />
            </View>
          </View>

         
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="pb-5 pl-3"
          contentContainerStyle={{ paddingRight: 6 }}
        >
          {rechargeCards.map((card, index) => (
            <RechargeCard 
              key={index}
              imageSource={card.imageSource}
              title={card.title}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
