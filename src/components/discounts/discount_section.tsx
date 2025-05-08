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
import { TopBrandVoucherCard } from "../zcoins/top-brand-voucher-card";

  // Brand data arrays for both rows
  const topRowBrands = [
    {
    id: "1",
      brandName: "Amazon",
      discount: "5% Off",
    imageSource: require("../../assets/images/brands/amazon.webp"),
    zCoinsBack: "500",
    voucherValue: "₹100",
    backgroundColor: "#f5f5f5",
    backgroundColorOne: "#232F3E",
    backgroundColorTwo: "#131A22",
    voucherImage: require("../../assets/images/brands/amazonLogoW.webp"),
    buttonColor: "#FF9900",
    textColor: "text-white",
    coinPercentage: 8,
    },
    {
    id: "2",
      brandName: "Myntra",
      discount: "5% Off",
    imageSource: require("../../assets/images/brands/myntra.webp"),
    zCoinsBack: "600",
    voucherValue: "₹120",
    backgroundColor: "#FFF0F5",
    backgroundColorOne: "#FF3F6C",
    backgroundColorTwo: "#E62955",
    voucherImage: require("../../assets/images/brands/myntra.webp"),
    buttonColor: "#FF3F6C",
    textColor: "text-white",
    coinPercentage: 9,
    },
    {
    id: "3",
      brandName: "Flipkart",
      discount: "5% Off",
    imageSource: require("../../assets/images/brands/flipkart.webp"),
    zCoinsBack: "550",
    voucherValue: "₹110",
    backgroundColor: "#e8f5ff",
    backgroundColorOne: "#047BD5",
    backgroundColorTwo: "#0565ae",
    voucherImage: require("../../assets/images/brands/flipkartLogo.webp"),
    buttonColor: "#FFE500",
    textColor: "text-white",
    coinPercentage: 10,
    },
  ];

  const bottomRowBrands = [
    {
    id: "4",
      brandName: "Puma",
      discount: "5% Off",
    imageSource: require("../../assets/images/brands/puma.webp"),
    zCoinsBack: "750",
    voucherValue: "₹150",
    backgroundColor: "#ededed",
    backgroundColorOne: "#047BD5",
    backgroundColorTwo: "#0565ae",
    voucherImage: require("../../assets/images/brands/puma.webp"),
    buttonColor: "#E50000",
    textColor: "text-white",
    coinPercentage: 7,
    },
    {
    id: "5",
      brandName: "Dunzo",
      discount: "5% Off",
    imageSource: require("../../assets/images/brands/dunzo.webp"),
    zCoinsBack: "400",
    voucherValue: "₹80",
    backgroundColor: "#f2fefb",
    backgroundColorOne: "#00D395",
    backgroundColorTwo: "#00B37D",
    voucherImage: require("../../assets/images/brands/dunzo.webp"),
    buttonColor: "#00D395",
    textColor: "text-white",
    coinPercentage: 6,
    },
    {
    id: "6",
      brandName: "Zomato",
      discount: "5% Off",
    imageSource: require("../../assets/images/brands/zomato.webp"),
    zCoinsBack: "500",
    voucherValue: "₹100",
    backgroundColor: "#ffeeee",
    backgroundColorOne: "#CB202D",
    backgroundColorTwo: "#A61F2B",
    voucherImage: require("../../assets/images/brands/zomato.webp"),
    buttonColor: "#CB202D",
    textColor: "text-white",
    coinPercentage: 8,
    },
  ];

export function DiscountSection() {
  const handleBrandPress = (id: string) => {
    console.log(`Brand with ID: ${id} pressed`);
  };

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
            <SH6 className="text-neutral-900">Top Brand Vouchers on ZET</SH6>
            <View className="flex-row items-center">
              <SH4 className="text-primary-500">View all brands</SH4>
              <ChevronRightIcon variant="stroke" height={16} width={16}  color={colors.primary[500]} />
            </View>
          </View>
        </View>

        <View className="flex-row justify-between">
          {topRowBrands.map((brand) => (
            <TopBrandVoucherCard
              key={brand.id}
              id={brand.id}
              brandName={brand.brandName}
              discount={brand.discount}
              zCoinsBack={brand.zCoinsBack}
              backgroundColor={brand.backgroundColor}
              imageSource={brand.imageSource}
              voucherImage={brand.voucherImage}
              onPress={() => handleBrandPress(brand.id)}
              backgroundColorOne={brand.backgroundColorOne}
              backgroundColorTwo={brand.backgroundColorTwo}
              buttonColor={brand.buttonColor}
              textColor={brand.textColor}
              coinPercentage={brand.coinPercentage}
            />
          ))}
        </View>

        <View className="flex-row pb-4 mt-4 justify-between">
          {bottomRowBrands.map((brand) => (
            <TopBrandVoucherCard
              key={brand.id}
              id={brand.id}
              brandName={brand.brandName}
              discount={brand.discount}
              zCoinsBack={brand.zCoinsBack}
              backgroundColor={brand.backgroundColor}
              imageSource={brand.imageSource}
              voucherImage={brand.voucherImage}
              onPress={() => handleBrandPress(brand.id)}
              backgroundColorOne={brand.backgroundColorOne}
              backgroundColorTwo={brand.backgroundColorTwo}
              buttonColor={brand.buttonColor}
              textColor={brand.textColor}
              coinPercentage={brand.coinPercentage}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
