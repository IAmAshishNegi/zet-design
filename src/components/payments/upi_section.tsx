import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Card } from "../ui/card";
import { Button, ButtonProps } from "../ui/button/button";
import { colors } from "../../styles/theme";
import { H3, H5, H6, H7, InfoIcon, SH1, SH2, SH4, SH5, SH6, SH7 } from "../ui";
import { Image } from "react-native";
import { QRCodeIcon } from "../ui/icons";
import { LinearGradient } from "expo-linear-gradient";

// Get screen width for responsive sizing

export function UpiSection() {
  // For demo purposes, use placeholder images

  return (
    <View>
        <LinearGradient
          colors={["#bc37ff", "#ffeaf7", "#f49b5c"] as const}
          start={{ x: 0.3, y: -0.6 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.5, 1.2] as const}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            height: "100%",
            width: "100%",
          }}
        />
   
    <View className="rounded-xl border-[1.3px] border-neutral-900/5 pb-5">
      <View className="px-4 mb-3 pt-4 pb-3">
        <SH1 className="text-neutral-900">Pay Via UPI & Win Rewards </SH1>
      </View>

      <View className='flex-row'>
        <View className="w-[25%] ">
          <View className="flex-col items-center justify-center gap-2 w-full">
            <View className="bg-primary-500 rounded-xl p-3">
              <QRCodeIcon
                variant="duotone"
                width={30}
                height={30}
                color={'#ffffffd5'}
                secondaryColor={'#ffffff3e'}
              />
            </View>
            <SH4 className="text-neutral-900 w-full text-center">Scan & Pay</SH4>
          </View>
        </View>

        <View className="w-[25%] bg-neutral-200">
          <View className="flex-col items-center justify-center gap-2 w-full">
            <InfoIcon
              variant="stroke"
              width={24}
              height={24}
              color={colors.neutral[900]}
            />
            <SH4 className="text-neutral-900 w-full text-center">Scan & Pay</SH4>
          </View>
        </View>

        <View className="w-[25%] bg-neutral-0 rounded-xl">
          <View className="flex-col items-center justify-center gap-2 w-full">
            <InfoIcon
              variant="stroke"
              width={24}
              height={24}
              color={colors.neutral[900]}
            />
            <SH4 className="text-neutral-900 w-full text-center">Scan & Pay</SH4>
          </View>
        </View>

        <View className="w-[25%] bg-neutral-0 rounded-xl">
          <View className="flex-col items-center justify-center gap-2 w-full">
            <InfoIcon
              variant="stroke"
              width={24}
              height={24}
              color={colors.neutral[900]}
            />
            <SH4 className="text-neutral-900 w-full text-center">Scan & Pay</SH4>
          </View>
        </View>
      </View>
    </View>
    </View>
  );
}
