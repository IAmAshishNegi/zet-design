import React from "react";
import { View, Image } from "react-native";
import {
  B3,
  B4,
  H5,
  H6,
  SH3,
  SH6,
  SH7,
  SH8,
  Button,
  B1,
  B2,
  H4,
  OverlineMd,
  ChevronRightIcon,
  LockIcon,
  SH4,
  SH2,
  OverlineSm,
  SH5,
} from "../ui";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../styles/theme";
import {
  CheckBadgeIcon,
  CheckCircleIcon,
  ShieldIconLogo,
  ZetCoinLogoIcon,
} from "../ui/icons";
import { useRouter } from "expo-router";
import { useUser } from "../../context/user-context";

const SingleProductBanner: React.FC = () => {
  const router = useRouter();
  const { userInfo } = useUser();
  const isZetPlusActive = userInfo.zetPlus.isActive;

  const handleKnowMorePress = () => {
    router.push("/zplus-landing");
  };

  const cardShadowStyle = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  };

  if (isZetPlusActive) {
    // Display active membership banner
    return (
      <View className="mx-3 overflow-hidden bg-[#ffd632]/20 rounded-xl">
        <View className="overflow-hidden pl-2 pr-2 pt-5 pb-4 rounded-xl">
          <Image
            source={require("../../assets/images/bg_main.webp")}
            className="w-[180px] h-[180px] flex-1 absolute right-0 bottom-0"
            resizeMode="contain"
          />
          <View className="flex-row items-center justify-start px-3">
            <View className="items-center bg-[#fbe47e]/60 rounded-full">
              <Image
                source={require("../../assets/images/ZetPlusPageFront.webp")}
                className="w-12 h-12"
                resizeMode="contain"
              />
            </View>
            <View className="ml-3">
              <H6 className=" text-neutral-900">Your Zet Plus Membership</H6>
              <OverlineSm className="bg-success-500 mt-1 text-neutral-0 px-2 py-1 rounded-sm w-auto self-start">
                Active
              </OverlineSm>
            </View>
          </View>
          {/* <B4 className="text-neutral-600">Fraud Check | & More</B4> */}
          <View className="px-3 mt-2">
            <OverlineMd className="text-neutral-900/60 mt-2">
              DISPUTE CHECK | 2X REWARDS | & MORE
            </OverlineMd>
          </View>
          <View className="px-3 mt-4">
            <Button
              size="md"
              color="primary-600"
              className="px-5 self-start"
              label="View All Benefits"
              onPress={handleKnowMorePress}
            />
          </View>
        </View>
      
      </View>
    );
  }

  // Display inactive membership banner (default)
  return (
    <View className="mx-3 overflow-hidden bg-[#ffd632]/20 rounded-xl">
      <View className="overflow-hidden pl-2 pr-2 pt-5 pb-4 rounded-xl">
        <Image
          source={require("../../assets/images/bg_main.webp")}
          className="w-[180px] h-[180px] flex-1 absolute right-0 bottom-0"
          resizeMode="contain"
        />
        <View className="flex-row items-center justify-between px-3">
          <View className="items-center bg-[#fbe47e]/60 rounded-full">
            <Image
              source={require("../../assets/images/ZetPlusPageFront.webp")}
              className="w-14 h-14"
              resizeMode="contain"
            />
          </View>

          <H6 className="flex-1 pr-3 ml-3 text-neutral-900">
            Plus Rewards, Plus Benefits @ ₹1 with Zet Plus
          </H6>
        </View>
        {/* <B4 className="text-neutral-600">Fraud Check | & More</B4> */}
        <View className="px-3">
          <OverlineMd className="text-neutral-900/60 mt-2">
            DISPUTE CHECK | 2X REWARDS | & MORE
          </OverlineMd>
        </View>
        <View className="px-3 mt-4">
          <Button
            size="md"
            color="primary-600"
            className="px-5 self-start"
            label="Know more"
            onPress={handleKnowMorePress}
          />
        </View>
      </View>
     
    </View>
  );
};

export default SingleProductBanner;
