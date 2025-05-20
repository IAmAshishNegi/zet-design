import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  Image,
  Platform,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import {
  H3,
  H5,
  B2,
  B3,
  SH4,
  SH2,
  H7,
  B7,
  SH6,
  Button,
  SH1,
  B5,
  B1,
  H6,
  SH3,
} from "../components/ui";
import { CopyIcon } from "../components/ui/icons";
import { LinearGradient } from "expo-linear-gradient";

const generateVoucherCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) result += "-";
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [copied, setCopied] = useState(false);
  const [voucherCode] = useState(generateVoucherCode());

  // Get parameters
  const {
    amount,
    selectedAmount,
    voucherTitle,
    coinsEarned,
    zCoinsRupeeValue,
    isZetPlusAdded,
    backgroundColorOne,
    backgroundColorTwo,
    textColor,
    buttonColor,
    zCoinsBack,
  } = params;

  // Copy to clipboard function without using Expo's clipboard
  const handleCopy = () => {
    // Since we can't use Expo's clipboard, we'll simulate the copy effect
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Navigate to home
  const handleContinue = () => {
    router.push("/");
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={[
          (backgroundColorOne as string) || "#ffffff",
          (backgroundColorTwo as string) || "#f5f5f5",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 90 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="items-center pt-15 pb-6">
              <LottieView
                source={require("../assets/lottie/paymentDone.json")}
                autoPlay
                loop={false}
                style={{
                  width: 100,
                  height: 100,
                }}
              />

              <View className="w-full items-center mt-3">
                <Image source={require("../assets/images/Congratualtions.webp")} className="w-50 h-9" resizeMode="contain" />
              </View>
              <B1 className="text-center text-neutral-0/50 mt-1">
                Payment Successful
              </B1>
              <View className="w-full px-3 mt-2">
                <View className="flex-row w-full items-center mt-4 bg-[#282009]/20 px-2 py-2 rounded-lg">
                  <View className="">
                    <LottieView
                      source={require("../assets/lottie/CoinMainNew.json")}
                      autoPlay
                      loop
                      style={{
                        width: 24,
                        height: 24,
                      }}
                    />
                  </View>
                  <B2 className="text-white/70 ml-2">
                    {coinsEarned} coins worth ₹{zCoinsRupeeValue} added to your
                    account
                    {isZetPlusAdded === "true" ? " (2x with Zet Plus)" : ""}
                  </B2>
                </View>
              </View>
            </View>

            {/* Voucher detail card */}
            <View className="mb-6 mx-3">
              <View className="rounded-xl bg-white/90 overflow-hidden">
                <View className="p-4">
                  {/* Top section with logo and voucher info */}
                  <View className="flex-row gap-2 items-center justify-start">
                    <View className="rounded-md overflow-hidden border border-white/30">
                      {/* Use the same voucher image that was passed through params */}
                    </View>
                    <View className="flex-1 flex-col justify-between items-start">
                      <H5 className="text-neutral-900" numberOfLines={1}>
                        {voucherTitle as string}
                      </H5>
                      <B2 className="text-neutral-900/50" numberOfLines={1}>
                        ₹{selectedAmount} Voucher
                      </B2>
                    </View>
                  </View>

                  {/* Dashed line separator with circular cutouts */}
                  <View className="mt-2 flex-row items-center">
                    <View
                      className="absolute -left-6 h-4 w-4 rounded-full"
                      style={{
                        backgroundColor:
                          (backgroundColorOne as string) || "#ffffff",
                      }}
                    />
                    <View
                      className="border-t border-dashed w-full my-2 opacity-20"
                      style={{
                        borderColor:
                          (backgroundColorOne as string) || "#ffffff",
                      }}
                    />
                    <View
                      className="absolute -right-6 h-4 w-4 rounded-full"
                      style={{
                        backgroundColor:
                          (backgroundColorOne as string) || "#f5f5f5",
                      }}
                    />
                  </View>

                  {/* Bottom section with voucher code and copy icon */}
                  <View className="flex-row justify-between items-center">
                  <SH3 className="text-neutral-900 mr-2">{voucherCode}</SH3>
                    <View className="flex-row items-center">
                     
                      <Pressable
                        onPress={handleCopy}
                        className="p-2"
                        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                      >
                        <View className="flex-row items-center">
                          <CopyIcon
                            variant="stroke"
                            size={16}
                            color={copied ? "#006417" : "#000000"}
                            strokeWidth={1.5}
                            secondaryColor="#000000"
                          />
                          {copied && (
                            <B7 className="text-[#006417] ml-1">Copied!</B7>
                          )}
                        </View>
                      </Pressable>
                    </View>
                  </View>

                  {/* Redemption info */}
                  <View>
                    <B5 className="text-neutral-900/50">
                      Expiry Date:{" "}
                      {new Date(
                        Date.now() + 90 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()}
                    </B5>
                  </View>
                </View>
              </View>
            </View>

            <View className="px-3">
              {/* Transaction Details */}
              <View className="bg-neutral-100 rounded-xl p-4 mb-8">
                <SH6 className="text-neutral-800 mb-2">Transaction Details</SH6>


                <View className="flex-row justify-between py-2">
                  <B3 className="text-neutral-600">Order ID</B3>
                  <B3 className="text-neutral-900">
                    ORD-{Math.floor(Math.random() * 10000000)}
                  </B3>
                </View>

                <View className="flex-row justify-between py-2">
                  <B3 className="text-neutral-600">Date</B3>
                  <B3 className="text-neutral-900">
                    {new Date().toLocaleDateString()}
                  </B3>
                </View>

                <View className="flex-row justify-between py-2">
                  <B3 className="text-neutral-600">Amount Paid</B3>
                  <B3 className="text-neutral-900">₹{amount}</B3>
                </View>

                <View className="flex-row justify-between py-2">
                  <B3 className="text-neutral-600">Payment Method</B3>
                  <B3 className="text-neutral-900">Credit Card</B3>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Sticky Continue to Home button */}
          <View className="absolute bottom-0 left-0 right-0 border-t border-neutral-200/10 px-4 py-4 pb-6" style={{ backgroundColor: (backgroundColorOne as string) || "#ffffff" }}>
            <Button
              variant="filled"
              size="lg"
              fullWidth
              color="neutral-0"
              label="Continue to Home"
              onPress={handleContinue}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
