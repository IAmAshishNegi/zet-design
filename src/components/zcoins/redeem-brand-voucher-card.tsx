import React from "react";
import {
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { 
  SH7, 
  SH3,
  B5,
  Button,
  B3,
  SH2,
  SH1,
  B4
} from "../ui";
import { colors } from "../../styles/theme";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing 
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { useBottomSheet } from "../../context/bottom-sheet-context";
import { VoucherRedeemBottomSheet } from "./voucher-redeem-bottom-sheet";

interface RedeemBrandVoucherCardProps {
  id: string;
  brandName: string;
  discount?: string;
  zCoinsRequired: string;
  voucherValue: string;
  imageSource: ImageSourcePropType;
  onPress?: () => void;
  onRedeem?: () => void;
  // Add optional brand props for the bottom sheet
  brandProps?: {
    backgroundColorOne: string;
    backgroundColorTwo: string;
    voucherImage: ImageSourcePropType;
    title: string;
    backgroundVoucherColor?: string;
  };
  backgroundColor?: string;
}

// Create animated touchable component
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const RedeemBrandVoucherCard: React.FC<RedeemBrandVoucherCardProps> = ({
  id,
  brandName,
  discount,
  zCoinsRequired,
  voucherValue,
  imageSource,
  onPress,
  onRedeem,
  brandProps,
  backgroundColor,
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

  const handleCardPress = () => {
    // Check if we have specific brand props to use
    let brandBackgroundOne = colors.primary[900];
    let brandBackgroundTwo = colors.primary[800];
    let voucherImg = imageSource;
    let title = brandName;
    
    // If brandProps is passed, use those values
    if (brandProps) {
      brandBackgroundOne = brandProps.backgroundColorOne;
      brandBackgroundTwo = brandProps.backgroundColorTwo;
      voucherImg = brandProps.voucherImage || imageSource;
      title = brandProps.title || brandName;
    }
    
    // Show bottom sheet with voucher details
    showBottomSheet(
      <VoucherRedeemBottomSheet 
        voucherTitle={title}
        voucherValue={voucherValue}
        zCoinsRequired={zCoinsRequired}
        voucherImage={voucherImg}
        backgroundColorOne={brandBackgroundOne}
        backgroundColorTwo={brandBackgroundTwo}
        id={id}
      />,
      ['60%']
    );
    
    // Also call the original onPress handler if provided
    if (onPress) {
      onPress();
    }
    
    // Also call the original onRedeem handler if provided
    if (onRedeem) {
      onRedeem();
    }
  };

  // Define the background color style
  const cardBackgroundStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <AnimatedTouchable 
      onPress={handleCardPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="mb-4 w-[48.5%]"
      style={[animatedStyle]}
    >
      <View 
        className={`rounded-xl border-[1.3px] border-neutral-0 overflow-hidden ${brandProps?.backgroundVoucherColor || 'bg-white'}`}
        style={cardBackgroundStyle}
      >
        {/* Top part with image and brand info */}
        <View className="flex-col items-center justify-center pt-3 pb-1 px-2">
          <View className="mb-1">
            <Image
              source={imageSource}
              className="w-12 h-12"
              resizeMode="cover"
            />
          </View>
          
          <View className="flex-col items-center justify-center">
            <SH1 className="text-neutral-900 w-full text-center opacity-80 mb-1 mt-1">
              {brandName}
            </SH1>
        
              <SH3 className="text-neutral-900/60 w-full text-center">
                {voucherValue} Voucher
              </SH3>
        
          </View>
        </View>
        
        {/* Divider */}
        <View className="flex-row items-center pr-1 pl-2">
          <View className="absolute -left-2 h-4 w-4 rounded-full bg-neutral-0" />
          <View className="border-t border-dashed border-neutral-200 w-full my-1" />
          <View className="absolute -right-2 h-4 w-4 rounded-full bg-neutral-0" />
        </View>
        
        {/* Bottom part with redemption info */}
        <View className="px-2 pb-3 pt-1">
          <View className="flex-row justify-center items-center">
            
            <B4 className="text-neutral-900/40 text-center"> Get for {zCoinsRequired}</B4>
            <View className="mx-[2px]">
              <LottieView
                source={require("../../assets/lottie/ZetCoins.json")}
                autoPlay
                loop
                style={{
                  width: 14,
                  height: 14,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </AnimatedTouchable>
  );
}; 