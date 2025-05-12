import React, { useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput,
  Platform,
} from "react-native";
import { colors } from "../styles/theme";
import { Stack, useRouter } from "expo-router";
import { B3, H3, SH6, Button, H6, B4, OverlineSm, H7, B1 } from "../components/ui";
import { ChevronLeftIcon, LockIcon } from "../components/ui/icons";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../context/user-context";
import LottieView from "lottie-react-native";

const MIN_COINS_REQUIRED = 500;
const CONVERSION_RATE = 0.2; // 1 Zcoin = ₹0.2

export default function ConvertToCashScreen() {
  const router = useRouter();
  const { userInfo, updateZcoins } = useUser();
  const { zcoins } = userInfo;
  
  const hasEnoughCoins = zcoins.balance >= MIN_COINS_REQUIRED;
  const maxCashValue = (zcoins.balance * CONVERSION_RATE).toFixed(2);
  
  const [coinsToConvert, setCoinsToConvert] = useState(hasEnoughCoins ? "500" : "0");
  const cashValue = (parseFloat(coinsToConvert || "0") * CONVERSION_RATE).toFixed(2);
  
  // Enhanced shadow style for cards
  const cardShadowStyle = {
    shadowColor: "#2d063c62",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  };

  const handleConvert = () => {
    if (!hasEnoughCoins) return;
    
    const coinsNum = parseInt(coinsToConvert);
    if (isNaN(coinsNum) || coinsNum <= 0 || coinsNum > zcoins.balance) return;
    
    // Update user's coin balance
    updateZcoins({
      balance: zcoins.balance - coinsNum,
      cashValue: (zcoins.balance - coinsNum) * CONVERSION_RATE
    });
    
    // Navigate back to zcoins screen
    router.replace('/zcoins-screen');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        className="bg-neutral-0 flex-1"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-10">
          {/* Header with back button */}
          <View className="px-3 pb-3 flex-row items-center border-b-[1.3px] border-neutral-900/10">
            <Pressable
              onPress={() => router.back()}
              className="mr-3 p-2 bg-neutral-900/10 rounded-md"
            >
              <ChevronLeftIcon
                size={20}
                color={colors.neutral[900]}
                strokeWidth={2.5}
              />
            </Pressable>
            <H3>Convert to Cash</H3>
          </View>
          
          {/* Conversion Card */}
          <View className="px-3 pt-4">
            <View 
              className="border-[1.3px] border-neutral-900/5 rounded-xl overflow-hidden bg-neutral-0 mb-4"
              style={cardShadowStyle}
            >
              <LinearGradient
                colors={["#5a1a7d", "#421a5e"] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="w-full p-4"
              >
                <View className="flex-row items-center mb-2">
                  <LottieView
                    source={require("../assets/lottie/CoinFlipDark.json")}
                    autoPlay
                    loop
                    style={{
                      height: 30,
                      width: 30,
                    }}
                  />
                  <H7 className="text-neutral-0 ml-2">Your Balance: {zcoins.balance} Zcoins</H7>
                </View>
                
                <View className="h-[1px] bg-white/10 my-2" />
                
                <View>
                  <B3 className="text-neutral-0/80 mb-2">
                    Enter amount of Zcoins to convert
                  </B3>
                  <View className="bg-white/20 rounded-lg p-3 mb-3">
                    <TextInput
                      value={coinsToConvert}
                      onChangeText={setCoinsToConvert}
                      keyboardType="number-pad"
                      placeholder="Enter Zcoins amount"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      editable={hasEnoughCoins}
                      style={{
                        color: "#fff",
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    />
                  </View>
                  
                  <View className="bg-white/10 rounded-lg p-3 mb-3">
                    <View className="flex-row justify-between">
                      <B3 className="text-neutral-0/80">Cash Value:</B3>
                      <H7 className="text-neutral-0">₹{cashValue}</H7>
                    </View>
                    <View className="flex-row justify-between mt-1">
                      <B3 className="text-neutral-0/50">Conversion Rate:</B3>
                      <B3 className="text-neutral-0/50">1 Zcoin = ₹{CONVERSION_RATE}</B3>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </View>
            
            {/* Convert Button */}
            <View className="mt-4">
              {hasEnoughCoins ? (
                <Button
                  variant="filled"
                  size="lg"
                  color="primary"
                  onPress={handleConvert}
                  fullWidth
                >
                  Convert to Cash
                </Button>
              ) : (
                <View className="flex-row items-center justify-center bg-neutral-200 py-3 px-4 rounded-lg">
                  <LockIcon color={colors.neutral[700]} size={16} variant="stroke" strokeWidth={2} />
                  <B3 className="text-neutral-700 ml-2 font-semibold">LOCKED</B3>
                </View>
              )}
            </View>
            
            {/* Instructions */}
            <View className="mt-6 bg-neutral-100/80 rounded-lg p-4">
              <H6 className="mb-2">How it works</H6>
              <B4 className="text-neutral-900/70 mb-2">
                1. Enter the amount of Zcoins you want to convert to cash
              </B4>
              <B4 className="text-neutral-900/70 mb-2">
                2. Confirm the conversion
              </B4>
              <B4 className="text-neutral-900/70 mb-2">
                3. The cash will be credited to your linked bank account within 24-48 hours
              </B4>
              <View className="h-[1px] bg-neutral-300 my-3" />
              <B4 className="text-neutral-900/70">
                Minimum conversion: {MIN_COINS_REQUIRED} Zcoins
              </B4>
            </View>
            
            {/* Show message if not enough coins */}
            {!hasEnoughCoins && (
              <View className="mt-4 mb-3 bg-[#f9f1ff] rounded-lg p-3 flex-row items-center">
                <B3 className="text-neutral-900/70 flex-1">
                  You need at least {MIN_COINS_REQUIRED} Zcoins to convert to cash. Keep earning more Zcoins through your card spends!
                </B3>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    marginBottom: 32,
  },
}); 