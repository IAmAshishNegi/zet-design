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
  B4,
  SH1,
  OverlineSm,
  SH2
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
import { VoucherSelectionScreen } from "../rewards/voucher-selection-screen";
import { useUser } from "../../context/user-context";

interface TopBrandVoucherCardProps {
  id: string;
  brandName: string;
  discount?: string;
  zCoinsBack: string; // ZCoins earned back when purchasing from this brand
  backgroundColor?: string; // For card background color
  imageSource: ImageSourcePropType;
  voucherImage?: ImageSourcePropType;
  onPress?: () => void;
  // Brand properties for voucher selection screen
  backgroundColorOne?: string;
  backgroundColorTwo?: string;
  buttonColor?: string;
  textColor?: string;
  coinPercentage?: number;
}

// Create animated touchable component
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const TopBrandVoucherCard: React.FC<TopBrandVoucherCardProps> = ({
  id,
  brandName,
  discount,
  zCoinsBack,
  backgroundColor,
  imageSource,
  voucherImage,
  onPress,
  backgroundColorOne = colors.primary[900],
  backgroundColorTwo = colors.primary[800],
  buttonColor = colors.primary[500],
  textColor = "text-white",
  coinPercentage = 5
}) => {
  // Safely access bottom sheet context
  let bottomSheetContext;
  try {
    bottomSheetContext = useBottomSheet();
  } catch (error) {
    // If context is not available, provide fallback empty functions
    bottomSheetContext = {
      showBottomSheet: () => {},
      hideBottomSheet: () => {}
    };
  }
  
  const { showBottomSheet, hideBottomSheet } = bottomSheetContext;
  
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
    // Show bottom sheet with voucher selection screen
    showBottomSheet(
      <VoucherSelectionScreen 
        title={brandName}
        voucherImage={voucherImage || imageSource}
        backgroundColorOne={backgroundColorOne}
        backgroundColorTwo={backgroundColorTwo}
        buttonColor={buttonColor}
        textColor={textColor}
        zCoinsBack={zCoinsBack}
        coinPercentage={coinPercentage}
        onClose={() => {
          // Directly hide the bottom sheet
          hideBottomSheet();
        }}
        onProceed={(amount) => {
          console.log(`Proceeding with ${brandName} voucher for amount: ${amount}`);
          // Directly hide the bottom sheet
          hideBottomSheet();
        }}
      />,
      ['100%'],
      { hideHandle: true } // Remove the handle indicator
    );
    
    // Also call the original onPress handler if provided
    if (onPress) {
      onPress();
    }
  };

  // Define the background color style
  const cardBackgroundStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <AnimatedTouchable 
      onPress={handleCardPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="mb-4 w-[31.5%]"
      style={[animatedStyle]}
    >
      <View 
        className={`rounded-xl border-[1.3px] border-neutral-0 overflow-hidden ${backgroundColor ? '' : 'bg-white'}`}
        style={cardBackgroundStyle}
      >
        {/* Top part with image and brand info */}
        <View className="flex-col items-center justify-center pt-3 pb-1 px-2">
          <View className="mb-1">
            <Image
              source={imageSource}
              className="w-10 h-10"
              resizeMode="cover"
            />
          </View>
          
          <View className="flex-col items-center justify-center">
            <SH2 className="text-neutral-900 w-full text-center opacity-80 mt-1">
              {brandName}
            </SH2>
            
            {/* {discount && (
              <SH7 className="text-primary-500 px-2 rounded-sm">
                {discount}
              </SH7>
            )} */}
          </View>
        </View>
        
        {/* Divider */}
        <View className="flex-row items-center px-2">
          <View className="absolute -left-2 h-4 w-4 rounded-full bg-neutral-0" />
          <View className="border-t border-dashed border-neutral-200 w-full my-1" />
          <View className="absolute -right-2 h-4 w-4 rounded-full bg-neutral-0" />
        </View>
        
        {/* Bottom part with coin info */}
        <View className="p-2 flex-row justify-center items-center">
          <LottieView
            source={require("../../assets/lottie/ZetCoins.json")}
            autoPlay
            loop
            style={{
              width: 14,
              height: 14,
              marginRight: 2,
            }}
          />
          <OverlineSm className="text-neutral-900/60">
            {zCoinsBack} back
          </OverlineSm>
        </View>
      </View>
    </AnimatedTouchable>
  );
}; 