import React from "react";
import { View, StyleSheet, Dimensions, Image, ImageSourcePropType } from "react-native";
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

interface RechargeCardProps {
  image: ImageSourcePropType;
  label: string;
}

function RechargeCard({ image, label }: RechargeCardProps) {
  return (
    <View className="w-[31.7%] border border-neutral-900/5 py-4 rounded-xl bg-white">
      <View className="flex-col items-center justify-center gap-2 w-full overflow-hidden rounded-xl">
        <View>
          <Image
            source={image}
            className="w-14 h-14"
            resizeMode="cover"
          />
        </View>
        <SH4 className="text-neutral-900 w-full text-center px-6 opacity-80">
          {label}
        </SH4>
      </View>
    </View>
  );
}

const topRowCards = [
  {
    image: require("../../assets/images/bills/electricity.webp"),
    label: "Electricity Bill",
  },
  {
    image: require("../../assets/images/bills/mobile_recharge.webp"),
    label: "Prepaid Recharge",
  },
  {
    image: require("../../assets/images/bills/postpaid.webp"),
    label: "Postpaid Payment",
  },
];

const bottomRowCards = [
  {
    image: require("../../assets/images/bills/loan_pay.webp"),
    label: "Loan EMI Payment",
  },
  {
    image: require("../../assets/images/bills/fastag.webp"),
    label: "NHAI Fastag",
  },
  {
    image: require("../../assets/images/bills/more.webp"),
    label: "More options",
  },
];

export function RechargeSection() {
  return (
    <View className="relative overflow-hidden">
      <LinearGradient
        colors={["#f4f0ea", "#f9fbfa", "#f4f0ea"] as const}
        start={{ x: -0.01, y: 0.5 }}
        end={{ x: 0.7, y: 1 }}
        locations={[0, 0.6, 1] as const}
        className="absolute left-0 right-0 top-0 bottom-0 h-full w-full"
      />

      <View className="px-3">
        <View className="mb-3 pt-4 pb-3">
          <SH6 className="text-neutral-900">Recharge & Bill Payments </SH6>
        </View>

        <View className="flex-row pb-2 justify-between">
          {topRowCards.map(card => (
            <RechargeCard key={card.label} image={card.image} label={card.label} />
          ))}
        </View>
        <View className="flex-row gap-2 pb-7 justify-between">
          {bottomRowCards.map(card => (
            <RechargeCard key={card.label} image={card.image} label={card.label} />
          ))}
        </View>
      </View>
    </View>
  );
}
