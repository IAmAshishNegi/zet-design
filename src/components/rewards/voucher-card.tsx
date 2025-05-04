import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  SH3,
  SH7,
  B3,
  H3,
  H5,
  H6,
  SH1,
  SH2,
  B1,
  B2,
  SH6,
  OverlineSm,
  B4,
  B5,
} from "../ui/typography/typography";
import { Button } from "../ui";
import LottieView from "lottie-react-native";

interface VoucherCardProps {
  title: string;
  zCoinsBack: string;
  voucherValue?: string;
  backgroundColorOne?: string;
  backgroundColorTwo?: string;
  onPress?: () => void;
  voucherImage?: ImageSourcePropType;
  textColor?: string;
}

export const VoucherCard: React.FC<VoucherCardProps> = ({
  title,
  zCoinsBack,
  voucherValue,
  backgroundColorOne = "#f4b069",
  backgroundColorTwo = "#e78925",
  onPress,
  voucherImage,
  textColor = "text-white",
}) => {
  return (
    <Pressable onPress={onPress} className="mr-4">
      <LinearGradient
        colors={[backgroundColorOne, backgroundColorTwo]}
        start={{ x: 0.45, y: 0.45 }}
        end={{ x: 0.8, y: 0.8 }}
        className="rounded-xl overflow-hidden w-[220px]"
      >
        <View className="flex-col justify-between p-4">
          <View className="flex-row gap-3 items-center justify-start">
            <View className="rounded-md overflow-hidden border border-white/30">
              <Image
                source={
                  voucherImage ||
                  require("../../assets/images/vouchersNew.webp")
                }
                className="w-12 h-12"
                resizeMode="contain"
              />
            </View>
            <View className="flex-col justify-between items-start">
              <SH1 className={`${textColor}`} numberOfLines={1}>
                {title}
              </SH1>
              <View className="flex-row justify-between items-start">
                {voucherValue && (
                  <B2 className="text-white/80" numberOfLines={1}>
                    {voucherValue} Voucher
                  </B2>
                )}
              </View>
            </View>
          </View>

          <View className="mt-3 flex-row items-center">
            <View className="absolute -left-6 h-4 w-4 rounded-full bg-white" />
            <View className="border-t border-dashed border-white/20 w-full my-2" />
            <View className="absolute -right-6 h-4 w-4 rounded-full bg-white" />
          </View>

          <View className="flex-row justify-start items-center mt-2">
            <B5 className="text-white/80">Get upto {zCoinsBack}</B5>
            <View className="mx-[2.5px]">
              <LottieView
                source={require("../../assets/lottie/ZetCoins.json")}
                autoPlay
                loop
                style={{
                  width: 16,
                  height: 16,
                }}
              />
            </View>
            <B5 className="text-white/80">ZCoins</B5>
          </View>
          {/* <View className="mt-4 rounded-full overflow-hidden bg-[#ffff0f32] px-2 py-1">
            <OverlineSm className="text-white/80">
              2x COIN WITH ZET PLUS
            </OverlineSm>
          </View> */}
          <View className="mt-4">
            <Button variant="filled" size="sm" fullWidth color="neutral-0">
              Buy Now
            </Button>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};
