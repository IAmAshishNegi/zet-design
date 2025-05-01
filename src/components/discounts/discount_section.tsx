import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from "react-native";
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
  OverlineSm,
  OverlineMd,
  SH1,
  SH2,
  SH4,
  SH5,
  SH6,
  SH7,
  SH3,
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

// Reusable component for brand cards
function BrandCard({
  imageSource,
  brandName,
  discount,
}: {
  imageSource: ImageSourcePropType;
  brandName: string;
  discount: string;
}) {
  return (
    <View className="w-[31.5%] bg-white rounded-xl border-[1.3px] border-neutral-900/5 py-3">
      <View className="flex-col items-center justify-center gap-2 w-full overflow-hidden rounded-xl">
        <View className="mb-1">
          <Image
            source={imageSource}
            className="w-12 h-12"
            resizeMode="cover"
          />
        </View>
        <View className="flex-col items-center justify-center">
          <SH7 className="text-neutral-900 w-full text-center opacity-80 mb-1">
            {brandName}
          </SH7>
          <SH3 className="text-neutral-900 w-full text-center opacity-40">
            {discount}
          </SH3>
        </View>
      </View>
    </View>
  );
}

export function DiscountSection() {
  // Brand data arrays for both rows
  const topRowBrands = [
    {
      imageSource: require("../../assets/images/brands/amazon.webp"),
      brandName: "Amazon",
      discount: "5% Off",
    },
    {
      imageSource: require("../../assets/images/brands/myntra.webp"),
      brandName: "Myntra",
      discount: "5% Off",
    },
    {
      imageSource: require("../../assets/images/brands/flipkart.webp"),
      brandName: "Flipkart",
      discount: "5% Off",
    },
    // {
    //   imageSource: require("../../assets/images/brands/nike.webp"),
    //   brandName: "Nike",
    //   discount: "5% Off",
    // },
  ];

  const bottomRowBrands = [
    // {
    //   imageSource: require("../../assets/images/brands/titan.webp"),
    //   brandName: "Titan",
    //   discount: "5% Off",
    // },
    {
      imageSource: require("../../assets/images/brands/puma.webp"),
      brandName: "Puma",
      discount: "5% Off",
    },
    {
      imageSource: require("../../assets/images/brands/dunzo.webp"),
      brandName: "Dunzo",
      discount: "5% Off",
    },
    {
      imageSource: require("../../assets/images/brands/zomato.webp"),
      brandName: "Zomato",
      discount: "5% Off",
    },
  ];

  return (
    <View className="relative overflow-hidden">
      <LinearGradient
        colors={["rgb(255, 255, 255)", "#ffffff", "#ffffff"] as const}
        start={{ x: -0.01, y: 0.5 }}
        end={{ x: 0.7, y: 1 }}
        locations={[0, 0.6, 1] as const}
        className="absolute left-0 right-0 top-0 bottom-0 h-full w-full"
      />

      <View className="px-3 pb-6">
        <View className="mb-5 pt-8">
          <View className="flex-row items-center gap-2">
            <SH7
              className="text-[#ff1e5d] mb-1"
              style={{ fontWeight: "semibold" }}
            >
              UPTO 20% OFF
            </SH7>
          </View>
          <View className="flex-row justify-between items-center">
            <SH6 className="text-neutral-900">Top Brands on ZET</SH6>
            <View className="flex-row items-center">
              <SH4 className="text-primary-500">View all brands</SH4>
              <ChevronRightIcon variant="stroke" height={16} width={16}  color={colors.primary[500]} />
            </View>
          </View>
        </View>

        <View className="flex-row justify-between">
          {topRowBrands.map((brand, index) => (
            <BrandCard
              key={`top-${index}`}
              imageSource={brand.imageSource}
              brandName={brand.brandName}
              discount={brand.discount}
            />
          ))}
        </View>

        <View className="flex-row pb-4 mt-4 justify-between">
          {bottomRowBrands.map((brand, index) => (
            <BrandCard
              key={`bottom-${index}`}
              imageSource={brand.imageSource}
              brandName={brand.brandName}
              discount={brand.discount}
            />
          ))}
        </View>
        {/* <View className="flex-row justify-center mt-6">
          <Button
            variant="outlined"
            size="sm"
            color="primary-500"
            className="rounded-full w-fit"
            endIcon={<ChevronRightIcon variant="stroke" height={16} width={16}  color={colors.primary[500]} />}
            style={{ borderRadius: 100, paddingLeft: 14, paddingRight: 10 }}
          >
            See all brands
          </Button>
        </View> */}
      </View>
    </View>
  );
}
