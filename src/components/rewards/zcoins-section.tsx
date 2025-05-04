import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  SH6,
  B4,
  B5,
  B2,
  SH3,
  H7,
  SH2,
  H6,
  B3,
  H8,
} from "../ui/typography/typography";
import { Button, YtIcon } from "../ui";

interface StepProps {
  icon: any;
  text: string;
  headline: string;
  stepNumber: number;
  stepBgColor: string;
}

const Step = ({ icon, text, headline, stepNumber, stepBgColor }: StepProps) => {
  return (
    <View className="flex-row items-center mb-6">
      {/* <View className="h-10 w-10 rounded-full bg-primary-500/10 items-center justify-center mr-4">
        <Text className="text-primary-500 font-semibold">{stepNumber}</Text>
      </View> */}
      <View className="flex-1 flex-row items-center">
        <View
          className={`px-2 py-2 items-center justify-center mr-3 rounded-full ${stepBgColor}`}
        >
          <Image source={icon} className="w-10 h-10" resizeMode="contain" />
        </View>
        <View className="flex-1">
          <H8 className="text-neutral-900 mb-0.5">{headline}</H8>
          <B4 className=" text-neutral-800/40 pr-3">{text}</B4>
        </View>
      </View>
    </View>
  );
};

export function ZCoinsSection() {
  const steps = [
    {
      id: 1,
      icon: require("../../assets/images/reward/zCoinStack.webp"),
      headline: "Collect ZCoins",
      text: "You get ZCoin on Every purchase & Bill payment done on ZET",
      stepBgColor: "bg-[#f9f2d8]",
    },
    {
      id: 2,
      icon: require("../../assets/images/vouchersNew.webp"),
      headline: "Buy Vouchers with ZCoins",
      text: "You Can Use ZCoins to Buy Vouchers on ZET. 1 ZCoin is ₹0.4 on voucher purchase",
      stepBgColor: "bg-primary-500/10",
    },
    {
      id: 3,
      icon: require("../../assets/images/Cashback.webp"),
      headline: "Convert ZCoins to Cash",
      text: "You can Convert ZCoins to Cash. 1 ZCoin is ₹0.20 on cash conversion.",
      stepBgColor: "bg-primary-500/10",
    },
  ];

  return (
    <View>
      <LinearGradient
        colors={["#ffeec8", "#ffffff", "#ffffff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.2, y: 0.4 }}
        locations={[0, 0.5, 1]}
        className="py-8 rounded-lg px-3"
      >
        <View className="mb-4">
          <SH6 className="text-neutral-900 mb-1">
            How to Earn & Redeem ZCoins{" "}
          </SH6>
        </View>

        <View className="mt-4">
          {steps.map((step) => (
            <Step
              key={step.id}
              icon={step.icon}
              text={step.text}
              headline={step.headline}
              stepNumber={step.id}
              stepBgColor={step.stepBgColor}
            />
          ))}
        </View>
        <View className=" w-full items-center">
          <Button
            variant="filled"
            size="md"
            color="primary-100"
            className="mt-4 p-0 w-[40%]"
            onPress={() => console.log("Interest feature pressed")}
            textStyle={{ fontWeight: "600", color: "primary.500" }}
           
            startIcon={<YtIcon size={20} color="primary.500" />}
          >
            Learn More
          </Button>
        </View>
      </LinearGradient>
    </View>
  );
}
