import React, { useState, useRef } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { H1, Chip } from "../ui";
import { RedeemVoucherCard } from "./redeem-voucher-card";
import { RedeemBrandVoucherCard } from "./redeem-brand-voucher-card";
import {
  RewardIcon,
  FoodIcon,
  ShoppingIcon,
  TravelIcon,
  GroceriesIcon,
  BestValueIcon,
  HotSellingIcon
} from "../ui/icons";
import { colors } from "../../styles/theme";

// Sample data for redeem vouchers
const redeemVouchers = [
  {
    id: "1",
    title: "Amazon",
    zCoinsRequired: "500",
    voucherValue: "₹100",
    backgroundColor: "#f5f5f5", // Light gray background
    backgroundColorOne: "#232F3E",
    backgroundColorTwo: "#131A22",
    voucherImage: require("../../assets/images/brands/amazonLogoW.webp"),
    imageSource: require("../../assets/images/brands/amazon.webp"),
    category: "shopping",
    // discount: "₹100 off"
  },
  {
    id: "2",
    title: "Flipkart",
    zCoinsRequired: "1000",
    voucherValue: "₹200",
    backgroundColor: "#f0f8ff", // Light blue background
    backgroundColorOne: "#047BD5",
    backgroundColorTwo: "#0565ae",
    voucherImage: require("../../assets/images/brands/flipkartLogo.webp"),
    imageSource: require("../../assets/images/brands/flipkart.webp"),
    category: "shopping",
    // discount: "₹200 off"
  },
  {
    id: "3",
    title: "Swiggy",
    zCoinsRequired: "750",
    voucherValue: "₹150",
    backgroundColor: "#fff5eb", // Light orange background
    backgroundColorOne: "#9c1c4b",
    backgroundColorTwo: "#9c1c4b",
    voucherImage: require("../../assets/images/brands/swiggyLogo.webp"),
    imageSource: require("../../assets/images/brands/swiggy_3p.webp"),
    category: "food",
    isHotSelling: true,
    // discount: "₹150 off"
  },
  {
    id: "4",
    title: "Zomato",
    zCoinsRequired: "800",
    voucherValue: "₹150",
    backgroundColor: "#f5f5f5", // Light gray background
    backgroundColorOne: "#CB202D",
    backgroundColorTwo: "#A61F2B",
    voucherImage: require("../../assets/images/vouchersNew.webp"),
    imageSource: require("../../assets/images/brands/zomato.webp"),
    category: "food",
    isHotSelling: true,
    // discount: "₹150 off"
  },
  {
    id: "5",
    title: "Myntra",
    zCoinsRequired: "1200",
    voucherValue: "₹250",
    backgroundColor: "#f5f5f5", // Light gray background
    backgroundColorOne: "#FF3F6C",
    backgroundColorTwo: "#E62955",
    voucherImage: require("../../assets/images/vouchersNew.webp"),
    imageSource: require("../../assets/images/brands/myntra.webp"),
    category: "shopping",
    isBestValue: true,
    // discount: "₹250 off"
  },
  {
    id: "6",
    title: "BookMyShow",
    zCoinsRequired: "600",
    voucherValue: "₹100",
    backgroundColor: "#f5f5f5", // Light gray background
    backgroundColorOne: "#D60829",
    backgroundColorTwo: "#A10621",
    voucherImage: require("../../assets/images/vouchersNew.webp"),
    imageSource: require("../../assets/images/brands/bms.webp"),
    category: "travel",
    // discount: "₹100 off"
  },
  {
    id: "7",
    title: "BigBasket",
    zCoinsRequired: "450",
    voucherValue: "₹75",
    backgroundColor: "#f5f5f5", // Light gray background
    backgroundColorOne: "#84c225",
    backgroundColorTwo: "#70a31b",
    voucherImage: require("../../assets/images/vouchersNew.webp"),
    imageSource: require("../../assets/images/brands/bigbasket.webp"),
    category: "groceries",
    isBestValue: true,
    // discount: "₹75 off"
  },
  {
    id: "8",
    title: "Grofers",
    zCoinsRequired: "400",
    voucherValue: "₹75",
    backgroundColor: "#f5f5f5", // Light gray background
    backgroundColorOne: "#f37037",
    backgroundColorTwo: "#e15b29",
    voucherImage: require("../../assets/images/vouchersNew.webp"),
    imageSource: require("../../assets/images/brands/grofers.webp"),
    category: "groceries",
    // discount: "₹75 off"
  },
  {
    id: "9",
    title: "Puma",
    zCoinsRequired: "1500",
    voucherValue: "₹300",
    backgroundColor: "#f5f5f5", // Light gray background
    backgroundColorOne: "#000000",
    backgroundColorTwo: "#1D1D1D",
    voucherImage: require("../../assets/images/vouchersNew.webp"),
    imageSource: require("../../assets/images/brands/puma.webp"),
    category: "shopping",
    // discount: "₹300 off"
  },
];

// Define filter categories
const filterCategories = [
  { id: "all", label: "All", icon: null },
  { id: "hotSelling", label: "Hot Selling", icon: <RewardIcon variant="stroke" size={16} color={colors.primary[900]} /> },
  { id: "bestValue", label: "Best Value", icon: <BestValueIcon size={16} color={colors.primary[900]} /> },
  { id: "food", label: "Food", icon: <FoodIcon size={16} color={colors.primary[900]} /> },
  { id: "shopping", label: "Shopping", icon: <ShoppingIcon size={16} color={colors.primary[900]} /> },
  { id: "travel", label: "Travel", icon: <TravelIcon size={16} color={colors.primary[900]} /> },
  { id: "groceries", label: "Groceries", icon: <GroceriesIcon size={16} color={colors.primary[900]} /> },
];

export function RedeemVoucherSection() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const scrollViewRef = useRef<ScrollView>(null);

  const handleRedeemPress = (id: string) => {
    console.log(`Redeeming voucher with ID: ${id}`);
    // Add redemption logic here
  };

  const handleFilterPress = (filterId: string) => {
    setSelectedFilter(filterId);
  };

  // Filter vouchers based on selected filter
  const filteredVouchers = redeemVouchers.filter(voucher => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "hotSelling") return voucher.isHotSelling;
    if (selectedFilter === "bestValue") return voucher.isBestValue;
    return voucher.category === selectedFilter;
  });

  return (
    <View className="relative pb-6">
      {/* Filter Chips */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pb-4"
        contentContainerStyle={styles.filterContainer}
      >
        {filterCategories.map((filter) => (
          <Chip
            key={filter.id}
            label={filter.label}
            icon={filter.icon}
            isActive={selectedFilter === filter.id}
            onPress={() => handleFilterPress(filter.id)}
          />
        ))}
      </ScrollView>

      {/* Brand Voucher Cards */}
      <View className="flex-row flex-wrap justify-between">
        {filteredVouchers.map(item => (
          <RedeemBrandVoucherCard
            key={item.id}
            id={item.id}
            brandName={item.title}
            zCoinsRequired={item.zCoinsRequired}
            voucherValue={item.voucherValue}
            imageSource={item.imageSource}
            backgroundColor={item.backgroundColor}
            onRedeem={() => handleRedeemPress(item.id)}
            brandProps={{
              backgroundColorOne: item.backgroundColorOne,
              backgroundColorTwo: item.backgroundColorTwo,
              voucherImage: item.voucherImage,
              title: item.title
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
});


