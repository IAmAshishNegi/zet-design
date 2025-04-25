import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Card } from "../ui/card";
import { Button, ButtonProps } from "../ui/button/button";
import { colors } from "../../styles/theme";
import { H3, H5, H6, H7, InfoIcon, SH1, SH2, SH4, SH5, SH6, SH7 } from "../ui";
import { Image } from "react-native";

// Get screen width for responsive sizing

export function UpiSection() {
  // For demo purposes, use placeholder images

  return (
    <View className="rounded-xl border-[1.3px] border-neutral-900/10 pb-3">
      <View className="px-4 mb-3 pt-3 pb-2">
        <SH1 className="text-neutral-900">UPI on ZET</SH1>
      </View>

      <View className='flex-row'>
        <View className="w-[25%] bg-neutral-100">
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
  );
}
