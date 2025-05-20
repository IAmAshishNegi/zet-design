import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { H3, H5, B1, B2, B3, Button, SH6 } from "../components/ui";
import { LinearGradient } from "expo-linear-gradient";

export default function PaymentFailureScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get parameters
  const {
    amount,
    selectedAmount,
    voucherTitle,
    backgroundColorOne,
    backgroundColorTwo,
  } = params;

  const defaultBackgroundColorOne = "#440a0a"; // Light red
  const defaultBackgroundColorTwo = "#1f0101"; // Slightly darker red

  // Navigate back to payment
  const handleRetry = () => {
    // Go back to the voucher selection screen
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <LinearGradient
        colors={[
          (defaultBackgroundColorOne as string) || defaultBackgroundColorOne,
          (defaultBackgroundColorTwo as string) || defaultBackgroundColorTwo,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView 
            className="flex-1" 
            contentContainerStyle={{ paddingBottom: 160 }} // Extra padding for two sticky buttons
            showsVerticalScrollIndicator={false}
          >
            <View className="items-center pt-15 pb-6 px-3">
              <LottieView
                source={require("../assets/lottie/error.json")}
                autoPlay
                loop
                style={{
                  width: 100,
                  height: 100,
                }}
              />
              
              <H3 className="text-center text-neutral-0 mt-4">
                Payment Failed
              </H3>
              <B1 className="text-center text-neutral-0/70 mt-1">
                Unfortunately, the transaction was not completed.
              </B1>
              
              <View className="w-full mt-4 bg-white/20 px-3 py-3 rounded-lg">
                <B2 className="text-white text-center">
                  We couldn't process your payment of <Text className="font-semibold">₹{amount || 'N/A'}</Text> 
                  {voucherTitle && <Text>for the {voucherTitle} voucher.</Text>}
                </B2>
              </View>
              
              <View className="w-full bg-white/80 p-4 rounded-lg mt-6">
                <SH6 className="text-neutral-700 mb-2">Common Reasons for Failure:</SH6>
                <View className="ml-1">
                  <B3 className="text-neutral-600 mb-1">• Insufficient funds in your account.</B3>
                  <B3 className="text-neutral-600 mb-1">• Incorrect card details entered.</B3>
                  <B3 className="text-neutral-600 mb-1">• Transaction timed out or was declined by bank.</B3>
                  <B3 className="text-neutral-600 mb-1">• Temporary bank server issues.</B3>
                </View>
              </View>
            </View>
          </ScrollView>
          
          {/* Sticky Buttons */}
          <View className="absolute bottom-0 left-0 right-0 border-t border-neutral-0/10 px-4 py-3 pb-6"
            style={{ backgroundColor: (defaultBackgroundColorTwo as string) || defaultBackdefaultBackgroundColorTwogroundColorOne }} 
          >
            <Button
              variant="filled"
              size="lg"
              fullWidth
              color="neutral-0"
              textStyle={{ color: (backgroundColorTwo as string) || defaultBackgroundColorTwo }}
              label="Retry Payment"
              onPress={handleRetry}
              className="mb-3"
            />
            <Button
              variant="outlined"
              size="lg"
              fullWidth
              color="neutral-0"
              label="Cancel & Go Home"
              onPress={() => router.push("/")}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
} 