import React from "react";
import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { colors } from "../styles/theme";
import { Stack, useRouter } from "expo-router";
import { H3 } from "../components/ui";
import { ChevronLeftIcon } from "../components/ui/icons";
import { LinearGradient } from "expo-linear-gradient";
import { RedeemVoucherSection } from "../components/zcoins";
import { BottomSheetProvider } from "../context/bottom-sheet-context";

export default function RedeemVoucherScreen() {
  const router = useRouter();

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
        <View className="pt-10">
          {/* Header with close button */}
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
            <H3>Redeem Voucher</H3>
          </View>

          {/* Voucher section */}
          <View className="px-3 mt-3">
            <RedeemVoucherSection />
          </View>
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