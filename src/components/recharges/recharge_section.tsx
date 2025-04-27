import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
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

// Get screen width for responsive sizing

export function RechargeSection() {
  // For demo purposes, use placeholder images

  return (
    <View className="relative overflow-hidden">
      <LinearGradient
        colors={["rgb(248, 246, 242)", "#f9fbfa", "#f7f7fa"] as const}
        start={{ x: -0.01, y: 0.5 }}
        end={{ x: 0.7, y: 1 }}
        locations={[0, 0.6, 1] as const}
        className="absolute left-0 right-0 top-0 bottom-0 h-full w-full"
      />

      <View className="px-3">
        <View className="mb-3 pt-4 pb-3">
          <SH6 className="text-neutral-900">Recharge & Bill Payments </SH6>
        </View>

        <View className="flex-row pb-3 justify-between">
          <View className="w-[31.5%] border border-neutral-900/5 py-4 rounded-xl bg-white">
            <View className="flex-col items-center justify-center gap-2 w-full overflow-hidden rounded-xl">
              <View>
                <Image
                  source={require("../../assets/images/bills/electricity.webp")}
                  className="w-14 h-14"
                  resizeMode="cover"
                />
              </View>

              <SH4 className="text-neutral-900 w-full text-center px-6 opacity-80">
                Electricity Bill
              </SH4>
            </View>
          </View>

           <View className="w-[31.5%] border border-neutral-900/5 py-4 rounded-xl bg-white">
            <View className="flex-col items-center justify-center gap-2 w-full overflow-hidden rounded-xl">
              <View>
                <Image
                  source={require("../../assets/images/bills/mobile_recharge.webp")}
                  className="w-14 h-14"
                  resizeMode="cover"
                />
              </View>

              <SH4 className="text-neutral-900 w-full text-center px-6 opacity-80">
               Prepaid Recharge
              </SH4>
            </View>
          </View>

          <View className="w-[31.5%] border border-neutral-900/5 py-4 rounded-xl bg-white">
            <View className="flex-col items-center justify-center gap-2 w-full overflow-hidden rounded-xl">
              <View>
                <Image
                  source={require("../../assets/images/bills/postpaid.webp")}
                  className="w-14 h-14"
                  resizeMode="cover"
                />
              </View>

              <SH4 className="text-neutral-900 w-full text-center px-6 opacity-80">
                Postpaid Payment
              </SH4>
            </View>
          </View>
        </View>
        <View className="flex-row gap-2 pb-7 justify-between">
          <View className="w-[31.5%] border border-neutral-900/5 py-4 rounded-xl bg-white">
            <View className="flex-col items-center justify-center gap-2 w-full overflow-hidden rounded-xl">
              <View>
                <Image
                  source={require("../../assets/images/bills/loan_pay.webp")}
                  className="w-14 h-14"
                  resizeMode="cover"
                />
              </View>

              <SH4 className="text-neutral-900 w-full text-center px-6 opacity-80">
                Loan EMI Payment
              </SH4>
            </View>
          </View>

          <View className="w-[31.5%] border border-neutral-900/5 py-4 rounded-xl bg-white">
            <View className="flex-col items-center justify-center gap-2 w-full overflow-hidden rounded-xl">
              <View>
                <Image
                  source={require("../../assets/images/bills/fastag.webp")}
                  className="w-14 h-14"
                  resizeMode="cover"
                />
              </View>

              <SH4 className="text-neutral-900 w-full text-center px-6 opacity-80">
                NHAI Fastag
              </SH4>
            </View>
          </View>

          <View className="w-[31.5%] border border-neutral-900/5 py-4 rounded-xl bg-white">
            <View className="flex-col items-center justify-center gap-2 w-full overflow-hidden rounded-xl">
              <View>
                <Image
                  source={require("../../assets/images/bills/more.webp")}
                  className="w-14 h-14"
                  resizeMode="cover"
                />
              </View>

              <SH4 className="text-neutral-900 w-full text-center px-6 opacity-80">
                More options
              </SH4>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
