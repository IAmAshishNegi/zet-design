import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  SH1,
  B2,
  B5,
} from "../ui/typography/typography";
import { Button } from "../ui";
import LottieView from "lottie-react-native";
import { useBottomSheet } from "../../context/bottom-sheet-context";
import { VoucherRedeemBottomSheet } from "../zcoins/voucher-redeem-bottom-sheet";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing 
} from "react-native-reanimated";

interface RedeemVoucherCardProps {
  title: string;
  zCoinsRequired: string;
  voucherValue?: string;
  backgroundColorOne?: string;
  backgroundColorTwo?: string;
  onPress?: () => void;
  onRedeem?: () => void;
  voucherImage?: ImageSourcePropType;
  textColor?: string;
  id?: string;
}

// Create animated touchable component
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const RedeemVoucherCard: React.FC<RedeemVoucherCardProps> = ({
  title,
  zCoinsRequired,
  voucherValue,
  backgroundColorOne = "#8a56ac",
  backgroundColorTwo = "#6a3b9c",
  onPress,
  onRedeem,
  voucherImage,
  textColor = "text-white",
  id,
}) => {
  const { showBottomSheet } = useBottomSheet();
  
  // Animation values for press feedback
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });
  
  const handlePressIn = () => {
    scale.value = withTiming(0.95, {
      duration: 150,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    opacity.value = withTiming(0.8, {
      duration: 150,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };
  
  const handlePressOut = () => {
    scale.value = withTiming(1, {
      duration: 200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    opacity.value = withTiming(1, {
      duration: 200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const handleRedeemPress = () => {
    // Show bottom sheet with voucher details
    showBottomSheet(
      <VoucherRedeemBottomSheet 
        voucherTitle={title}
        voucherValue={voucherValue || ""}
        zCoinsRequired={zCoinsRequired}
        voucherImage={voucherImage}
        backgroundColorOne={backgroundColorOne}
        backgroundColorTwo={backgroundColorTwo}
        id={id}
      />,
      ['60%']
    );
    
    // Also call the original onRedeem handler if provided
    if (onRedeem) {
      onRedeem();
    }
  };

  return (
    <AnimatedTouchable 
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="mb-4"
      style={[animatedStyle]}
    >
      <LinearGradient
        colors={[backgroundColorOne, backgroundColorTwo] as const}
        start={{ x: 0.45, y: 0.45 }}
        end={{ x: 0.8, y: 0.8 }}
        className="rounded-sm overflow-hidden"
      >
        <View className="flex-col justify-between p-4">
          <View className="flex-row gap-2 items-center justify-start">
            <View className="rounded-md overflow-hidden border border-white/30">
              <Image
                source={
                  voucherImage ||
                  require("../../assets/images/vouchersNew.webp")
                }
                className="w-10 h-10"
                resizeMode="contain"
              />
            </View>
            <View className="flex-1 flex-col justify-between items-start">
              <SH1 className={`${textColor}`} numberOfLines={1}>
                {title}
              </SH1>
              {voucherValue && (
                <B2 className="text-white/80" numberOfLines={1}>
                  {voucherValue} Voucher
                </B2>
              )}
            </View>
          </View>

          <View className="mt-3 flex-row items-center">
            <View className="absolute -left-6 h-4 w-4 rounded-full bg-white" />
            <View className="border-t border-dashed border-white/20 w-full my-2" />
            <View className="absolute -right-6 h-4 w-4 rounded-full bg-white" />
          </View>

          {/* <View className="flex-row justify-start items-center mt-2">
            <B5 className="text-white/80">Redeem with {zCoinsRequired}</B5>
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
          </View> */}
          
          <View className="mt-3">
            <Button 
              variant="filled" 
              size="sm" 
              fullWidth 
              color="neutral-0"
              onPress={handleRedeemPress}
            >
              Redeem Voucher
            </Button>
          </View>
        </View>
      </LinearGradient>
    </AnimatedTouchable>
  );
}; 