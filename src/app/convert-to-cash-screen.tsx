import React from "react";
import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { colors } from "../styles/theme";
import { Stack, useRouter } from "expo-router";
import { H3, SH6, B3, SH7, Button } from "../components/ui";
import { ChevronLeftIcon } from "../components/ui/icons";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { BottomSheetProvider } from "../context/bottom-sheet-context";

export default function ConvertToCashScreen() {
  const router = useRouter();
  const coinBalance = 1000; // This would come from a global state or API
  const conversionRate = 0.2; // From the redemption options
  const cashValue = (coinBalance * conversionRate).toFixed(2);

  return (
    <BottomSheetProvider>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView
        className="bg-neutral-0 flex-1"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-10 px-3">
          {/* Header with close button */}
          <View className="flex-row items-center">
            <Pressable
              onPress={() => router.back()}
              className="mr-3 p-2 bg-neutral-0/20 rounded-md"
            >
              <ChevronLeftIcon
                size={20}
                color={colors.neutral[900]}
                strokeWidth={2.5}
              />
            </Pressable>
            <H3>Convert Points to Cash</H3>
          </View>

          {/* Conversion display */}
          <View className="mt-8 items-center">
            <View className="flex-row items-center justify-center bg-neutral-50/50 px-6 py-4 rounded-xl">
              <View className="items-center mr-6">
                <LottieView
                  source={require("../assets/lottie/ZetCoins.json")}
                  autoPlay
                  loop
                  style={{
                    height: 50,
                    width: 50,
                  }}
                />
                <SH7 className="text-neutral-900 mt-1">{coinBalance} ZCoins</SH7>
              </View>
              
              <View className="items-center justify-center h-10 w-10">
                <SH6>=</SH6>
              </View>
              
              <View className="items-center ml-6">
                <SH6 className="text-neutral-900 text-2xl">₹{cashValue}</SH6>
                <SH7 className="text-neutral-900/50 mt-1">Cash Value</SH7>
              </View>
            </View>
          </View>

          {/* Steps to Convert */}
          <View className="mt-12">
            <SH6 className="text-neutral-900 mb-6">How to Convert</SH6>
            
            <View className="bg-neutral-50/50 rounded-xl p-4 mb-4">
              <View className="flex-row">
                <View className="w-8 h-8 bg-primary-100 rounded-full items-center justify-center mr-3">
                  <SH7 className="text-primary-900">1</SH7>
                </View>
                <View className="flex-1">
                  <B3 className="text-neutral-900">Review your conversion</B3>
                  <B3 className="text-neutral-900/50 mt-1">
                    Make sure you understand the conversion rate
                  </B3>
                </View>
              </View>
            </View>
            
            <View className="bg-neutral-50/50 rounded-xl p-4 mb-4">
              <View className="flex-row">
                <View className="w-8 h-8 bg-primary-100 rounded-full items-center justify-center mr-3">
                  <SH7 className="text-primary-900">2</SH7>
                </View>
                <View className="flex-1">
                  <B3 className="text-neutral-900">Confirm your details</B3>
                  <B3 className="text-neutral-900/50 mt-1">
                    Ensure your payment details are correct
                  </B3>
                </View>
              </View>
            </View>
            
            <View className="bg-neutral-50/50 rounded-xl p-4 mb-8">
              <View className="flex-row">
                <View className="w-8 h-8 bg-primary-100 rounded-full items-center justify-center mr-3">
                  <SH7 className="text-primary-900">3</SH7>
                </View>
                <View className="flex-1">
                  <B3 className="text-neutral-900">Receive your cash</B3>
                  <B3 className="text-neutral-900/50 mt-1">
                    Cash will be credited to your account within 24-48 hours
                  </B3>
                </View>
              </View>
            </View>
          </View>

          {/* CTA Button */}
          <Button 
            variant="filled" 
            size="lg" 
            className="mt-8 mb-8"
            onPress={() => console.log("Converting to cash...")}
          >
            Convert to Cash
          </Button>
        </View>
      </ScrollView>
    </BottomSheetProvider>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    marginBottom: 32,
  },
}); 