import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { H3, H5, B2, B3, Button } from "../ui";
import { useRouter } from "expo-router";

interface PaymentGatewayScreenProps {
  amount: string;
  selectedAmount: string;
  voucherTitle: string;
  voucherImage: any;
  backgroundColorOne: string;
  backgroundColorTwo: string;
  textColor: string;
  buttonColor: string;
  zCoinsBack: string;
  coinsEarned: number;
  zCoinsRupeeValue: number;
  isZetPlusAdded: boolean;
}

export const PaymentGatewayScreen: React.FC<PaymentGatewayScreenProps> = ({
  amount,
  selectedAmount,
  voucherTitle,
  voucherImage,
  backgroundColorOne,
  backgroundColorTwo,
  textColor,
  buttonColor,
  zCoinsBack,
  coinsEarned,
  zCoinsRupeeValue,
  isZetPlusAdded,
}) => {
  const router = useRouter();

  const handleSuccessFlow = () => {
    router.push({
      pathname: "/payment-success",
      params: {
        amount,
        selectedAmount,
        voucherTitle,
        coinsEarned: coinsEarned.toString(),
        zCoinsRupeeValue: zCoinsRupeeValue.toString(),
        isZetPlusAdded: isZetPlusAdded ? "true" : "false",
        backgroundColorOne,
        backgroundColorTwo,
        textColor,
        buttonColor,
        zCoinsBack,
      },
    });
  };

  const handleFailureFlow = () => {
    router.push({
      pathname: "/payment-failure",
      params: {
        amount,
        selectedAmount,
        voucherTitle,
        backgroundColorOne,
        backgroundColorTwo,
        textColor,
        buttonColor,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center p-6">
        <H3 className="text-center text-neutral-900 mb-10">Payment Gateway Screen</H3>
        
        <B3 className="text-center text-neutral-600 mb-6">
          This is a demonstration of the payment gateway flow. In a real application, 
          this would be replaced with an actual payment gateway integration.
        </B3>
        
        <View className="w-full mb-4">
          <Button
            variant="filled"
            size="lg"
            fullWidth
            color="primary"
            label="View Payment Success Flow"
            onPress={handleSuccessFlow}
          />
        </View>
        
        <View className="w-full">
          <Button
            variant="outlined"
            size="lg"
            fullWidth
            color="error-500"
            label="View Payment Failure Flow"
            onPress={handleFailureFlow}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}; 