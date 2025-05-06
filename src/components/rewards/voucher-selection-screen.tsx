import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  SH1,
  SH3,
  SH7,
  B2,
  B5,
  H7,
  OverlineSm,
  B3,
  B4,
  SH4,
  SH2,
  H2,
  SH6,
  SH8,
  H5,
  H4,
  H3,
  B1,
  H8,
  B7,
} from "../ui/typography/typography";
import { Button } from "../ui";
import LottieView from "lottie-react-native";
import { ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CheckboxEmptyIcon } from "../ui/icons";

interface DenominationOption {
  value: string;
  displayValue: string;
}

interface VoucherSelectionScreenProps {
  title: string;
  voucherImage: ImageSourcePropType;
  backgroundColorOne: string;
  backgroundColorTwo: string;
  textColor: string;
  buttonColor: string;
  zCoinsBack: string;
  monthlyLimit?: string;
  onClose: () => void;
  onProceed: (amount: string) => void;
  coinPercentage?: number;
}

// Voucher-shaped denomination component
const VoucherChip: React.FC<{
  value: string;
  displayValue: string;
  isSelected: boolean;
  onSelect: () => void;
  bgColor: string;
}> = ({ value, displayValue, isSelected, onSelect, bgColor }) => {
  return (
    <Pressable onPress={onSelect} style={{ marginRight: 12 }}>
      <View
        className={`flex-row items-center justify-center w-25 h-11 rounded-sm overflow-hidden ${
          isSelected ? "" : "bg-neutral-0/50"
        }`}
        style={isSelected ? { backgroundColor: bgColor } : {}}
      >
        {/* Perforation dots - vertical */}
        <View style={styles.perforationContainer}>
          {Array.from({ length: 18 }).map((_, i) => (
            <View
              key={i}
              className={`w-[1.2px] h-[1.2px] ml-1.5 mb-1 ${
                isSelected ? "bg-white/40" : "bg-neutral-900/20"
              }`}
            />
          ))}
        </View>

        {/* Content */}
        <View className="flex-1 items-center justify-center">
          <SH3
            className={`text-base font-medium ${
              isSelected ? "text-white" : "text-black"
            }`}
          >
            {displayValue}
          </SH3>
        </View>

        {/* Cutouts on sides */}
        <View
          style={[styles.cutout, { left: -6, top: "50%", marginTop: -6 }]}
        />
        <View
          style={[styles.cutout, { right: -6, top: "50%", marginTop: -6 }]}
        />
      </View>
    </Pressable>
  );
};

export const VoucherSelectionScreen: React.FC<VoucherSelectionScreenProps> = ({
  title,
  voucherImage,
  backgroundColorOne,
  backgroundColorTwo,
  textColor,
  buttonColor,
  zCoinsBack,
  monthlyLimit = "₹10,000 per month",
  onClose,
  onProceed,
  coinPercentage = 5,
}) => {
  const [selectedAmount, setSelectedAmount] = useState("1000");
  const [quantity, setQuantity] = useState(1);
  const [isZetPlusAdded, setIsZetPlusAdded] = useState(false);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const chipRefs = React.useRef<{
    [key: string]: { x: number; width: number };
  }>({});

  // Pre-defined denomination options
  const denominationOptions: DenominationOption[] = [
    { value: "250", displayValue: "₹ 250" },
    { value: "500", displayValue: "₹ 500" },
    { value: "1000", displayValue: "₹ 1000" },
    { value: "2000", displayValue: "₹ 2000" },
    { value: "5000", displayValue: "₹ 5000" },
    { value: "10000", displayValue: "₹ 10000" },
  ];

  // Calculate the reward points based on brand-specific percentage
  const selectedAmountValue = parseInt(selectedAmount);
  // Calculate ZCoins based on coinPercentage (e.g., 8% for Amazon, 10% for Flipkart)
  const baseZCoinsEarned = Math.round(selectedAmountValue * (coinPercentage / 100));
  // Double rewards if Zet Plus is added
  const zCoinsEarned = isZetPlusAdded ? baseZCoinsEarned * 2 : baseZCoinsEarned;
  // Calculate rupee value (1 ZCoin = ₹0.1)
  const zCoinsRupeeValue = Math.round(zCoinsEarned * 0.1);
  
  // Constants
  const ZET_PLUS_PRICE = 49;

  // Other calculations 
  const processingFee = parseFloat(
    (selectedAmountValue * 0.035 + selectedAmountValue * 0.035 * 0.18).toFixed(
      1
    )
  ); // 3.5% + GST
  const totalCartValue = selectedAmountValue;
  const youSave = zCoinsRupeeValue;
  // Add Zet Plus fee to final amount if added
  const finalAmount = isZetPlusAdded 
    ? parseFloat((totalCartValue + ZET_PLUS_PRICE).toFixed(1)) 
    : parseFloat(totalCartValue.toFixed(1));

  // Toggle Zet Plus
  const toggleZetPlus = () => {
    setIsZetPlusAdded(!isZetPlusAdded);
  };

  // Handlers
  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Function to select denomination and center it in the scroll view
  const handleSelectDenomination = (value: string) => {
    setSelectedAmount(value);

    // Center the selected chip if reference exists
    if (scrollViewRef.current && chipRefs.current[value]) {
      const chipData = chipRefs.current[value];
      scrollViewRef.current.scrollTo({
        x: chipData.x - chipData.width / 2,
        animated: true,
      });
    }
  };

  // Track chip positions for centering
  const handleChipLayout = (value: string, x: number, width: number) => {
    chipRefs.current[value] = { x, width };
  };

  // Center the default selected chip on mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollViewRef.current && chipRefs.current[selectedAmount]) {
        const chipData = chipRefs.current[selectedAmount];
        scrollViewRef.current.scrollTo({
          x: chipData.x - 110, // Center adjustment
          animated: true,
        });
      }
    }, 500); // Delay to ensure layout measurements are complete

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="h-[100%]" style={{ flex: 1, backgroundColor: backgroundColorOne }}>
      <ScrollView className="flex-1 bg-neutral-0/0">
       <LinearGradient
          colors={[backgroundColorTwo, backgroundColorOne]}
          start={{ x: 0.45, y: 0.45 }}
          end={{ x: 0.8, y: 0.8 }}
          className="mb-6 overflow-hidden"
        >
          <View className="rounded-xl overflow-hidden">
            {/* Header with voucher info */}
            <View className="pt-2 px-3 flex-row items-center">
              <Pressable onPress={onClose} className="p-2">
                <Ionicons name="arrow-back" size={24} color="#ffffff" />
              </Pressable>
              {/*
               */}
              <View style={{ width: 32 }} />
            </View>

            <View className="flex-col items-center justify-start gap-3 mt-3">
              <View className="rounded-md overflow-hidden border border-white/30">
                <Image
                  source={voucherImage}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </View>
              <View className="flex-1 mb-5">
                <H7 className={`${textColor} text-center`} numberOfLines={1}>
                  {title}
                </H7>
                <B3 className="text-neutral-0/50">Voucher & Gift Card</B3>
                {/* <View className="mt-1">
                  <B2 className="text-white/80">Monthly Limit: {monthlyLimit}</B2>
                </View> */}
                {/* <View className="mt-1">
                  <B2 className="text-white/80">Redeemable Online</B2>
                </View> */}
              </View>
            </View>

            {/* Denomination selection */}
            <View className="mx-2 px-3 bg-neutral-0/90 rounded-2xl">
              <SH4 className="uppercase text-neutral-900/80 mt-5 mb-4">
                Choose Voucher Value
              </SH4>

              {/* Horizontal scrollable voucher chips */}
              <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.denominationScroll}
                className="mb-5"
              >
                {denominationOptions.map((option) => (
                  <View
                    key={option.value}
                    onLayout={(event) => {
                      const { x, width } = event.nativeEvent.layout;
                      handleChipLayout(option.value, x, width);
                    }}
                  >
                    <VoucherChip
                      value={option.value}
                      displayValue={option.displayValue}
                      isSelected={selectedAmount === option.value}
                      onSelect={() => handleSelectDenomination(option.value)}
                      bgColor={buttonColor}
                    />
                  </View>
                ))}
              </ScrollView>

              {/* Rewards info */}
             

              {/* Zet Plus Membership */}
              <View className="flex-col items-start w-full rounded-xl overflow-hidden mb-3">
                <LinearGradient
                  colors={["#ffffff", "#ffffff", "#ffffff"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="w-full rounded-lg py-3 px-4"
                >
                  <SH6 className=" text-black text-start">2x ZCoins with Zet Plus</SH6>
                  <B7 className=" text-black/60">@ ₹49/Month</B7>
                  <View className="mt-2">
                    <Button 
                      variant={isZetPlusAdded ? "outlined" : "filled"} 
                      size="xs" 
                      color={isZetPlusAdded ? "error-500" : "primary-900"}
                      label={isZetPlusAdded ? "Remove" : "Add"} 
                      className="px-4 self-start w-auto"
                      onPress={toggleZetPlus}
                    />
                  
                  </View>
                  <Image source={require("../../assets/images/zetPlusBg.webp")} className="w-28 h-28 absolute -bottom-[3%] -right-2" resizeMode="contain" />
                
                </LinearGradient>
                
              </View>
           
              {/* Amount and quantity selector */}
              {/* <View className="flex-row justify-between items-center mb-8">
              <H7 className="text-neutral-900">₹ {selectedAmount}</H7>
              <View className="flex-row items-center border border-[#E5E7EB] rounded-full">
                <Pressable
                  className="h-10 w-10 items-center justify-center"
                  onPress={handleDecrementQuantity}
                >
                  <Text className="text-2xl font-semibold text-[#2B7EFF]">
                    −
                  </Text>
                </Pressable>
                <View className="h-10 w-10 items-center justify-center">
                  <Text className="text-xl font-medium">{quantity}</Text>
                </View>
                <Pressable
                  className="h-10 w-10 items-center justify-center"
                  onPress={handleIncrementQuantity}
                >
                  <Text className="text-2xl font-semibold text-[#2B7EFF]">
                    +
                  </Text>
                </Pressable>
              </View>
            </View> */}

              {/* Reward points info */}
              {/* <View className="items-end mb-8">
                <View className="flex-row items-center gap-1">
                  <H3 className=" text-[#048928]">{zCoinsEarned}</H3>
                  <View className="flex-row items-center gap-1">
                    <LottieView
                      source={require("../../assets/lottie/ZetCoins.json")}
                      autoPlay
                      loop
                      style={{
                        width: 20,
                        height: 20,
                        marginBottom: 4,
                      }}
                    />
                  </View>
                </View>
              </View> */}

              {/* Order summary */}
              <View className=" border-b border-[#cdced2] py-4 mb-4">
                <View className="flex-row justify-between mb-3">
                  <B2 className="text-base font-medium text-neutral-900">
                    Voucher Value
                  </B2>
                  <SH3>
                    ₹ {totalCartValue}
                  </SH3>
                </View>
                
                {/* Show Zet Plus membership fee if added */}
                {isZetPlusAdded && (
                  <View className="flex-row justify-between mb-3">
                    <B2 className="text-base font-medium text-neutral-900">
                      Zet Plus Membership
                    </B2>
                    <SH3>
                      ₹ {ZET_PLUS_PRICE}
                    </SH3>
                  </View>
                )}
                
                <View className="flex-row justify-between">
                  <B2 className="text-base font-medium text-neutral-900">
                    You Save
                  </B2>
                  <SH3 className="text-[#048928]">
                    ₹{zCoinsRupeeValue}
                  </SH3>
                </View>
              </View>

              {/* Payment button and reward points info - in main content */}
              <View className="pb-6">
                <View className="flex-row justify-between items-center mb-1">
                  <H8>
                    You Pay
                  </H8>
                  <H8>
                    ₹{finalAmount}
                  </H8>
                </View>
                <View className="flex-row items-center">
                  <B2 className=" text-neutral-500">& Get</B2>
                  <B2 className=" text-[#048928] ml-1">
                    ₹{zCoinsRupeeValue}
                  </B2>
                  <B2 className=" text-neutral-500 ml-1">
                    as ZCoins
                  </B2>
                  {isZetPlusAdded && (
                    <B2 className="text-[#048928] ml-1">(2x with Zet Plus)</B2>
                  )}
                </View>
              </View>
            </View>
            <View className="mx-2 px-3 bg-neutral-0/90 rounded-2xl mt-4">
              <SH4 className="uppercase text-neutral-900/80 mt-5 mb-4">
                HOW TO REDEEM {title} VOUCHERS
              </SH4>

            
             

              <View className="flex-row items-center gap-2 py-3 px-3 bg-neutral-0 rounded-md">
                {/* <CheckboxEmptyIcon size={20} /> */}
                <SH2 className=" text-black">2x ZCoins with Zet Plus</SH2>
              </View>

            

              {/* Order summary */}
              <View className=" border-b border-[#cdced2] py-4 mb-4">
               
                <View className="flex-row justify-between">
                  <B2 className="text-base font-medium text-neutral-900">
                    You Save
                  </B2>
                  <SH3 className="text-[#048928]">
                    ₹{zCoinsRupeeValue}
                  </SH3>
                </View>
              </View>

              {/* Payment button and reward points info in second section */}
              <View className="pb-6">
                <View className="flex-row justify-between items-center mb-1">
                  <H7>
                    You Pay
                  </H7>
                  <H7>
                    ₹{finalAmount}
                  </H7>
                </View>
                <View className="flex-row items-center">
                  <B1 className=" text-neutral-500">& Get</B1>
                  <SH1 className=" text-[#048928] ml-1">
                    ₹{zCoinsRupeeValue}
                  </SH1>
                  <B1 className=" text-neutral-500 ml-1">
                    as ZCoins
                  </B1>
                  {isZetPlusAdded && (
                    <B1 className="text-[#048928] ml-1">(2x with Zet Plus)</B1>
                  )}
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
      
      {/* Fixed button at the bottom */}
      <View 
        className="absolute bottom-0 left-0 right-0 px-3 pb-4 pt-3" 
        style={{ backgroundColor: backgroundColorOne }} 
      >
        <View className="flex-row items-center justify-center -mb-7 px-2 pt-2 pb-9 bg-[#048928]/20 rounded-xl">
          <View className="flex-row items-center gap-1">
            <LottieView
              source={require("../../assets/lottie/ZetCoins.json")}
              autoPlay
              loop
              style={{
                width: 18,
                height: 18,
              }}
            />
            <B4 className="w-fit text-[#ffffff]">
              Get {zCoinsEarned} ZCoins worth ₹{zCoinsRupeeValue}
              {isZetPlusAdded && " (2x with Zet Plus)"}
            </B4>
          </View>
        </View>
        <View>
          <Button
            variant="filled"
            fullWidth
            size="xl"
            color="neutral-0"
            onPress={() => onProceed(selectedAmount)}
            label={`Continue to Pay ₹${finalAmount}`}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  denominationScroll: {
    paddingBottom: 12,
    paddingLeft: 8,
    paddingRight: 8,
  },
  voucherChip: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedVoucher: {
    backgroundColor: "#119108",
  },
  unselectedVoucher: {
    backgroundColor: "#F5FAFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  verticalLine: {
    width: 1.5,
    height: "70%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginRight: 8,
    marginLeft: 6,
  },
  voucherContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 8,
  },
  cutout: {
    width: 12,
    height: 12,
    borderRadius: 10,
    position: "absolute",
    backgroundColor: "#ebeaf0",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    zIndex: 10,
  },
  perforationContainer: {
    position: "absolute",
    left: 0,
    top: 4,
    bottom: 4,
    width: 1.4,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: 14,
  },
});
