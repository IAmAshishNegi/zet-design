import React from "react";
import { View, StyleSheet, Dimensions, ScrollView, ImageSourcePropType } from "react-native";
import { Card } from "../ui/card";
import { Button, ButtonProps } from "../ui/button/button";
import { colors } from "../../styles/theme";
import {
  B3,
  B4,
  B5,
  B7,
  H3,
  H5,
  H6,
  H7,
  InfoIcon,
  OverlineSm,
  SH1,
  SH2,
  SH4,
  SH5,
  SH6,
  SH7,
  SH8,
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
  CalendarRupeeIcon,
} from "../ui/icons";
import { LinearGradient } from "expo-linear-gradient";

// Reusable component for recharge cards
function RechargeCard({ 
  imageSource, 
  title,
  isLast = false
}: { 
  imageSource: ImageSourcePropType; 
  title: string;
  isLast?: boolean;
}) {
  return (
    <View className={`mr-2.5 w-[17%] py-3 rounded-xl bg-neutral-100/80 ${isLast ? 'mr-[100px]' : ''}`}>
      <View className="flex-col items-center justify-center gap-2 w-full overflow-hidden rounded-xl">
        <View>
          <Image
            source={imageSource}
            className="w-11 h-11"
            resizeMode="cover"
          />
        </View>

        <SH4 className="text-neutral-900 w-full text-center px-5 opacity-80">
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
      imageSource: require("../../assets/images/bills/bulb3dNew2.webp"),
      title: "Electricity"
    },
    {
      imageSource: require("../../assets/images/bills/prepaid3DNew2.webp"),
      title: "Prepaid"
    },
    {
      imageSource: require("../../assets/images/bills/postpaid3d.webp"),
      title: "Postpaid"
    },
    {
      imageSource: require("../../assets/images/bills/loan3d.webp"),
      title: "Loan EMI"
    },
    {
      imageSource: require("../../assets/images/bills/fastag3d.webp"),
      title: "Fastag"
    },
    // {
    //   imageSource: require("../../assets/images/bills/more.webp"),
    //   title: "More options"
    // }
  ];

  return (
    <View className="relative overflow-hidden">
      <LinearGradient
        colors={["#ffffff", "#ffffff", "#ffffff"] as const}
        start={{ x: -0.01, y: 0.5 }}
        end={{ x: 0.7, y: 1 }}
        locations={[0, 0.6, 1] as const}
        className="absolute left-0 right-0 top-0 bottom-0 h-full w-full"
      />

      <View className="pb-3">
        <View className="mb-4 pt-3 px-3">
      
          <View className="flex-row items-center justify-between">
            <SH6 className="text-neutral-900">Recharges & Bill Payments </SH6>
            {/* <View className="flex-row items-center">
              <SH4 className="text-primary-500">View all</SH4>
              <ChevronRightIcon variant="stroke" height={16} width={16}  color={colors.primary[500]} />
            </View> */}
          </View>

         
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="pl-3"
          contentContainerStyle={{ paddingRight: 6 }}
        >
          {rechargeCards.map((card, index) => (
            <RechargeCard 
              key={index}
              imageSource={card.imageSource}
              title={card.title}
              isLast={index === rechargeCards.length - 1}
            />
          ))}
        </ScrollView>

        <View className="pl-2 mx-3 py-2 mt-5 border border-neutral-900/10 rounded-xl  ">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <View className="p-2 rounded-lg bg-neutral-900/5">
              <CalendarRupeeIcon variant="filled" strokeWidth={1.6} height={20} width={20}  color={colors.neutral[900]} />
              </View>
              <View className="flex-col">
                <OverlineSm className="text-[#eb7f04]">IMPORTANT</OverlineSm>
              <B7 className="text-neutral-900/80">4 upcoming bills & recharges</B7>
            </View>
            </View>
            <View className="p-1.5 rounded-lg bg-neutral-0 mr-2">
              <ChevronRightIcon variant="stroke" strokeWidth={2} height={20} width={20}  color={colors.neutral[900]} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
