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
    <View className="w-[31%]  py-2 rounded-xl bg-white">
      <View className="flex-col items-center justify-center gap-2 w-full rounded-full">
        <View className="bg-white rounded-full">
          <Image
            source={image}
            className="w-12 h-12"
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
    image: require("../../assets/images/bills/bulb3dNew2.webp"),
    label: "Electricity",
  },
  {
    image: require("../../assets/images/bills/prepaid3DNew2.webp"),
    label: "Prepaid",
  },
  {
    image: require("../../assets/images/bills/postpaid3d.webp"),
    label: "Postpaid",
  },
];

const bottomRowCards = [
  {
    image: require("../../assets/images/bills/loan3d.webp"),
    label: "Loan EMI",
  },
  {
    image: require("../../assets/images/bills/fastag3d.webp"),
    label: "Fastag",
  },
  {
    image: require("../../assets/images/bills/more3d.webp"),
    label: "More",
  },
];

export function RechargeSection() {
  return (
    <View className="relative overflow-hidden rounded-xl border border-neutral-900/10">
      <LinearGradient
        // colors={["#f4f0ea", "#f9fbfa", "#f4f0ea"] as const}
        colors={["#ffffff", "#ffffff", "#ffffff"]}
        start={{ x: -0.01, y: 0.5 }}
        end={{ x: 0.7, y: 1 }}
        locations={[0, 0.6, 1] as const}
        className="absolute left-0 right-0 top-0 bottom-0 h-full w-full"
      />

      <View>
        <View className="mb-2 mt-5">
          <SH6 className="text-neutral-900 px-5">Recharges & Bill Payments </SH6>
        </View>

        <View className="flex-row justify-between mb-2">
          {topRowCards.map(card => (
            <RechargeCard key={card.label} image={card.image} label={card.label} />
          ))}
        </View>
        <View className="flex-row gap-2 justify-between mb-4">
          {bottomRowCards.map(card => (
            <RechargeCard key={card.label} image={card.image} label={card.label} />
          ))}
        </View>
      </View>
    </View>
  );
}
