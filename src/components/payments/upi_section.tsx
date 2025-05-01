import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Card } from "../ui/card";
import { Button, ButtonProps } from "../ui/button/button";
import { colors } from "../../styles/theme";
import { B3, B4, H3, H5, H6, H7, InfoIcon, SH1, SH2, SH4, SH5, SH6, SH7 } from "../ui";
import { Image } from "react-native";
import { QRCodeIcon, SendMoneyIcon, BankIcon, RupeeBillIcon, UpiLogoIcon, UpiIcon, ChevronRightIcon } from "../ui/icons";
import { LinearGradient } from "expo-linear-gradient";


// Get screen width for responsive sizing

export function UpiSection() {
  // For demo purposes, use placeholder images

  return (
    <View className="relative rounded-xl overflow-hidden">
      <LinearGradient
        colors={["#ffffff", "#ffffff", "#ffffff"] as const}
        start={{ x: 0.5, y: -1 }}
        end={{ x: 0.8, y: 1 }}
        locations={[0, 0.5, 1.2] as const}
        className="absolute left-0 right-0 top-0 bottom-0 h-full w-full"
      />

      <View className="rounded-xl border-[1.3px] border-neutral-900/10 pb-3">
        <View className="px-4 mb-5 pt-5">
          <SH6 className="text-neutral-900">Pay Via UPI & Win Rewards </SH6>
        </View>

        <View className="flex-row pb-7">
          <View className="w-[25%]">
            <View className="flex-col items-center justify-center gap-2 w-full overflow-hidden rounded-xl">
            <LinearGradient
                  colors={["#ffffff", "#ffffff", "#f1dcff"] as const}
                  start={{ x: 0.4, y: 0.1 }}
                  end={{ x: 0.1, y: 1 }}
                  locations={[0, 0.5, 1.2] as const}
                  className="rounded-xl overflow-hidden"
                >
              <View className=" rounded-xl p-2.5 mb-1 border-[1.3px] bg-neutral-0/0 border-primary-500/10 overflow-hidden">
               
                <QRCodeIcon
                  variant="duotone"
                  width={30}
                  height={30}
                  color={colors.primary[500]}
                  secondaryColor={colors.primary[100]}
                />
             
              </View>
              </LinearGradient>
              <SH4 className="text-neutral-900 w-full text-center px-2 opacity-80">
                Scan any QR Code
              </SH4>
            </View>
          </View>

          <View className="w-[25%]">
          <View className="flex-col items-center justify-center gap-2 w-full overflow-hidden rounded-xl">
            <LinearGradient
                  colors={["#ffffff", "#ffffff", "#f1dcff"] as const}
                  start={{ x: 0.4, y: 0.1 }}
                  end={{ x: 0.1, y: 1 }}
                  locations={[0, 0.5, 1.2] as const}
                  className="rounded-xl overflow-hidden"
                >
              <View className=" rounded-xl p-3 mb-1 border-[1.3px] bg-neutral-0/0 border-primary-500/10 overflow-hidden">
               
                <SendMoneyIcon
                  variant="duotone"
                  width={26}
                  height={26}
                  color={colors.primary[500]}
                  secondaryColor={colors.primary[100]}
                />
             
              </View>
              </LinearGradient>
              <SH4 className="text-neutral-900 w-full text-center px-2 opacity-80">
                Money Transfer
              </SH4>
            </View>
          </View>

          <View className="w-[25%]">
          <View className="flex-col items-center justify-center gap-2 w-full overflow-hidden rounded-xl">
            <LinearGradient
                  colors={["#ffffff", "#ffffff", "#f1dcff"] as const}
                  start={{ x: 0.4, y: 0.1 }}
                  end={{ x: 0.1, y: 1 }}
                  locations={[0, 0.5, 1.2] as const}
                  className="rounded-xl overflow-hidden"
                >
              <View className=" rounded-xl p-3 mb-1 border-[1.3px] bg-neutral-0/0 border-primary-500/10 overflow-hidden">
               
                <RupeeBillIcon
                  variant="duotone"
                  width={26}
                  height={26}
                  color={colors.primary[500]}
                  secondaryColor={colors.primary[100]}
                />
             
              </View>
              </LinearGradient>
              <SH4 className="text-neutral-900 w-full text-center px-2 opacity-80">
                Balance & History
              </SH4>
            </View>
          </View>

          <View className="w-[25%]">
          <View className="flex-col items-center justify-center gap-2 w-full overflow-hidden rounded-xl">
            <LinearGradient
                  colors={["#ffffff", "#ffffff", "#f1dcff"] as const}
                  start={{ x: 0.4, y: 0.1 }}
                  end={{ x: 0.1, y: 1 }}
                  locations={[0, 0.5, 1.2] as const}
                  className="rounded-xl overflow-hidden"
                >
              <View className=" rounded-xl p-3 mb-1 border-[1.3px] bg-neutral-0/0 border-primary-500/10 overflow-hidden">
               
                <UpiLogoIcon
                  width={26}
                  height={26}
                />
             
              </View>
              </LinearGradient>
              <SH4 className="text-neutral-900 w-full text-center px-2 opacity-80">
                All UPI Services
              </SH4>
            </View>
          </View>
        </View>
        
        <View className="h-[1px] bg-neutral-900/10 mx-5 mb-3"/>
        <View className="flex-row items-start gap-1 py-1.5 px-5 rounded-full w-full mx-auto justify-between align-middle">
          <View className="w-fit flex-row items-center justify-center align-middle gap-2">
            <UpiIcon
              variant="stroke"
              width={18}
              height={18}
              color={colors.primary[900]}
             
            />
          
         
            <B3 className="text-neutral-900 text-start opacity-80">
              iduserupi.zet@oksbm
            </B3>
          </View>
          <View className="w-fit flex-row items-center justify-center align-middle">
            <ChevronRightIcon
              variant="stroke"
              width={18}
              height={18}
              color={colors.neutral[500]}
             
            />
          </View>
        </View>
      </View>
    </View>
  );
}
