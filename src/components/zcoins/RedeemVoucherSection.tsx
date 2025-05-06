import React from "react";
import { View, ScrollView } from "react-native";
import { H1 } from "../ui";
import { RedeemVoucherCard } from "./redeem-voucher-card";

// Sample data for redeem vouchers
const redeemVouchers = [
  {
    id: "1",
    title: "Amazon",
    zCoinsRequired: "500",
    voucherValue: "₹100",
    backgroundColorOne: "#232F3E",
    backgroundColorTwo: "#131A22",
    voucherImage: require("../../assets/images/brands/amazonLogoW.webp"),
  },
  {
    id: "2",
    title: "Flipkart",
    zCoinsRequired: "1000",
    voucherValue: "₹200",
    backgroundColorOne: "#047BD5",
    backgroundColorTwo: "#0565ae",
    voucherImage: require("../../assets/images/brands/flipkartLogo.webp"),
  },
  {
    id: "3",
    title: "Swiggy",
    zCoinsRequired: "750",
    voucherValue: "₹150",
    backgroundColorOne: "#9c1c4b",
    backgroundColorTwo: "#9c1c4b",
    voucherImage: require("../../assets/images/brands/swiggyLogo.webp"),
  },
  {
    id: "4",
    title: "Zomato",
    zCoinsRequired: "800",
    voucherValue: "₹150",
    backgroundColorOne: "#CB202D",
    backgroundColorTwo: "#A61F2B",
    voucherImage: require("../../assets/images/vouchersNew.webp"),
  },
  {
    id: "5",
    title: "Myntra",
    zCoinsRequired: "1200",
    voucherValue: "₹250",
    backgroundColorOne: "#FF3F6C",
    backgroundColorTwo: "#E62955",
    voucherImage: require("../../assets/images/vouchersNew.webp"),
  },
  {
    id: "6",
    title: "BookMyShow",
    zCoinsRequired: "600",
    voucherValue: "₹100",
    backgroundColorOne: "#D60829",
    backgroundColorTwo: "#A10621",
    voucherImage: require("../../assets/images/vouchersNew.webp"),
  },
];

export function RedeemVoucherSection() {
  const handleRedeemPress = (id: string) => {
    console.log(`Redeeming voucher with ID: ${id}`);
    // Add redemption logic here
  };

  // Group vouchers into pairs for rendering in rows
  const chunkedVouchers = [];
  for (let i = 0; i < redeemVouchers.length; i += 2) {
    chunkedVouchers.push(redeemVouchers.slice(i, i + 2));
  }

  return (
    <View className="relative pb-6">
      <View className="flex-row flex-wrap justify-between">
        {redeemVouchers.map(item => (
          <RedeemVoucherCard
            key={item.id}
            title={item.title}
            zCoinsRequired={item.zCoinsRequired}
            voucherValue={item.voucherValue}
            backgroundColorOne={item.backgroundColorOne}
            backgroundColorTwo={item.backgroundColorTwo}
            voucherImage={item.voucherImage}
            onRedeem={() => handleRedeemPress(item.id)}
          />
        ))}
      </View>
    </View>
  );
}


