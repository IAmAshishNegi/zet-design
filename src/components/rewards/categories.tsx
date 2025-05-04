import React from "react";
import { View, StyleSheet, Dimensions, ScrollView, ImageSourcePropType, Platform } from "react-native";
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH_PERCENTAGE = 0.28; // 20% width

// Reusable component for recharge cards
function RewardCategories({ 
  imageSource, 
  title,
  isLast
}: { 
  imageSource: ImageSourcePropType; 
  title: string;
  isLast?: boolean;
}) {
  return (
    <View 
      className="border border-neutral-900/5 py-4 rounded-xl bg-white"
      style={[
        styles.categoryCard,
        isLast ? { marginRight: 16 } : { marginRight: 10 }
      ]}
    >
      <View className="flex-col items-center justify-center gap-1 w-full overflow-hidden rounded-xl">
        <View className="mb-1">
          <Image
            source={imageSource}
            className="w-[52px] h-[52px]"
            resizeMode="cover"
          />
        </View>

        <SH4 className="text-neutral-900 w-full text-center px-2 opacity-80">
          {title}
        </SH4>
      </View>
    </View>
  );
}

export function RewardCategoriesSection() {
  // Card data array
  const rechargeCards = [
    {
      imageSource: require("../../assets/images/reward/travelNewColor.webp"),
      title: "Travel"
    },
    {
      imageSource: require("../../assets/images/reward/shoppingNewColor.webp"),
      title: "Shopping"
    },
    {
      imageSource: require("../../assets/images/reward/dineNewColor.webp"),
      title: "Dine Out"
    },
    {
      imageSource: require("../../assets/images/reward/fashionNewColor.webp"),
      title: "Fashion"
    },
    {
      imageSource: require("../../assets/images/reward/groceryNewColor.webp"),
      title: "Groceries"
    },
  
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

      <View className="pb-5">
        <View className="mb-5 pt-6 px-3">
          <View>
            <SH6 className="text-neutral-900">Rewards Categories</SH6>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          className="pl-3"
          decelerationRate="fast"
          snapToInterval={SCREEN_WIDTH * CARD_WIDTH_PERCENTAGE + 10} // Card width + margin
          snapToAlignment="start"
          scrollEventThrottle={16}
        >
          {rechargeCards.map((card, index) => (
            <RewardCategories 
              key={index}
              imageSource={card.imageSource}
              title={card.title}
              isLast={index === rechargeCards.length - 1}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingRight: 16,
    paddingBottom: 5,
    alignItems: 'center',
  },
  categoryCard: {
    width: SCREEN_WIDTH * CARD_WIDTH_PERCENTAGE,
 
 
  }
});
