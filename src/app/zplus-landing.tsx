import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  H4,
  H5,
  SH3,
  B1,
  B3,
  B4,
  Button,
  SH2,
  SH6,
  B7,
  B8,
  OverlineSm,
  SH7,
  SH8,
  B2,
  H6,
} from "../components/ui";
import {
  CheckCircleIcon,
  CrossIcon,
  LockIcon,
  ShieldIconLogo,
  ZetCoinLogoIcon,
} from "../components/ui/icons";
import { colors } from "../styles/theme";
import { Image } from "react-native";
import { useUser } from "../context/user-context";
import { useBottomSheet } from "../context/bottom-sheet-context";
import {
  DisputeCheckBottomSheet,
  DoubleRewardsBottomSheet,
  PrioritySupportBottomSheet,
  AIScoreVideoBottomSheet
} from "../components/zplus/feature-bottom-sheets";
import { Accordion } from "../components/ui";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ZPlusLandingScreen() {
  const router = useRouter();
  const { userInfo, activateZetPlus } = useUser();
  const { showBottomSheet } = useBottomSheet();
  const isZetPlusActive = userInfo.zetPlus.isActive;

  const zPlusFaqs = [
    {
      question: "What is Zet Plus?",
      answer: "Zet Plus is a premium membership program that offers exclusive benefits like 2x rewards, dispute check, priority support, and AI-powered score insights for your ZET Card."
    },
    {
      question: "How do I activate Zet Plus?",
      answer: "You can become a Zet Plus member by paying a nominal fee of ₹1 for the first month. After that, the membership renews at ₹79/month."
    },
    {
      question: "What are the benefits of 2x Rewards?",
      answer: "With 2x Rewards, you earn double the Zcoins on all your eligible spends using the ZET Card, helping you accumulate rewards faster."
    },
    {
      question: "What is Dispute Check?",
      answer: "Dispute Check allows you to quickly raise and track any disputes related to your account or transactions directly through the app, ensuring faster resolution."
    },
    {
      question: "How does Priority Support work?",
      answer: "As a Zet Plus member, your queries and support requests are prioritized, and we aim to resolve them within 24 hours."
    }
  ];

  const handleClose = () => {
    console.log("Close button pressed");
    try {
      router.back();
    } catch (error) {
      console.error("Navigation error:", error);
      // As a fallback, try another navigation method
      router.push("/"); // Navigate to home screen as fallback
    }
  };

  const handleBecomeMember = () => {
    console.log("Become member pressed");
    // Navigate to payment success screen (membership will be activated there)
    router.push("/zplus-payment-success");
  };

  // Feature click handlers
  const handleDisputeCheckClick = () => {
    if (!isZetPlusActive) {
      showBottomSheet(
        <DisputeCheckBottomSheet onSubscribe={handleBecomeMember} />,
        undefined,
        { height: '60%' }
      );
    }
  };

  const handleDoubleRewardsClick = () => {
    if (!isZetPlusActive) {
      showBottomSheet(
        <DoubleRewardsBottomSheet onSubscribe={handleBecomeMember} />,
        undefined,
        { height: '60%' }
      );
    }
  };

  const handleSupportClick = () => {
    if (!isZetPlusActive) {
      showBottomSheet(
        <PrioritySupportBottomSheet onSubscribe={handleBecomeMember} />,
        undefined,
        { height: '60%' }
      );
    }
  };

  const handleAIVideoClick = () => {
    if (!isZetPlusActive) {
      showBottomSheet(
        <AIScoreVideoBottomSheet onSubscribe={handleBecomeMember} />,
        undefined,
        { height: '60%' }
      );
    }
  };

  const cardShadowStyle = {
    shadowColor: "#00000063",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6, // Android elevation
    // Additional style for Android to create a more spread-out shadow effect
    ...(Platform.OS === "android" && {
      backgroundColor: "#FFF", // Ensure background is opaque for Android shadow
    }),
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fbe47e]" edges={["top", "left", "right"]}>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <ScrollView>
        {/* Header with gradient background */}
        <LinearGradient
          colors={["#ffeb77", "#ffeb77"]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.8, y: 1.5 }}
          
        >
        <View className="relative">
          <Pressable 
            onPress={handleClose} 
            className="absolute top-3 left-3 bg-neutral-0/50 rounded-md p-2 z-10"
            accessible={true}
            accessibilityLabel="Close"
            accessibilityRole="button"
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            android_ripple={{ color: 'rgba(0, 0, 0, 0)' }}
          >
            <CrossIcon strokeWidth={2} size={24} color="#000000" />
          </Pressable>

          <View className="flex-col items-center justify-center pt-15 pb-12">
            <Image
              source={require("../assets/images/sunburst.webp")}
              className="absolute -top-5 left-0 opacity-15"
              style={{ width: SCREEN_WIDTH, height: '170%' }}
              resizeMode="cover"
            />
            <View>
              <Image
                source={require("../assets/images/ZetPlusPageFront.webp")}
                className="w-19 h-19"
                resizeMode="contain"
              />
            </View>


            <H4 className="text-neutral-900 mt-3">Superpowers for your ZET Card</H4>
            <B2 className="text-neutral-500">Power up your Credit with Zet Plus</B2>
            {isZetPlusActive && (
              <View className="bg-success-500 px-3 py-1 rounded-full mt-2">
                <SH7 className="text-neutral-0">Membership Active</SH7>
              </View>
            )}
          </View>
       </View>
        </LinearGradient>
        {/* Content */}
        <View className="bg-white px-3 rounded-t-2xl -mt-4">
          <SH6 className="mt-5">Benefits</SH6>

          <View className="flex-row justify-between">
            <Pressable
              onPress={handleDisputeCheckClick}
              className="flex-col w-[48.5%] h-32 items-start gap-1 mt-4 border p-3 relative border-neutral-900/5 rounded-xl overflow-hidden"
              style={cardShadowStyle}
            >
              <LinearGradient
                colors={["#ffffff", "#ffffff", "#a5ff84"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1.4, y: 1.5 }}
                locations={[0, 0.5, 1]} 
                className="p-3 absolute top-0 left-0 right-0 bottom-0"
              />
              <View className="absolute -bottom-1 -right-1">
                <Image
                  source={require("../assets/images/dispute3dNew.webp")}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
              <View className="flex-1">
                <SH8 className="text-left uppercase">Dispute Check</SH8>
                <B4 className="text-neutral-400 text-left">
                  Resolve account issues quickly
                </B4>
                {isZetPlusActive ? (
                  <View className="flex-row items-center gap-1 px-2 py-1 bg-success-50 rounded-sm mt-6 w-auto self-start">
                   
                    <OverlineSm className="text-success-500">START CHECK</OverlineSm>
                  </View>
                ) : (
                  <View className="flex-row items-center gap-1 px-2 py-1 bg-neutral-900/5 rounded-sm mt-6 w-auto self-start">
                    <LockIcon size={14} color={colors.neutral[900]} />
                    <OverlineSm className="text-neutral-800">LOCKED</OverlineSm>
                  </View>
                )}
              </View>
            </Pressable>

            <Pressable
              onPress={handleDoubleRewardsClick}
              className="flex-col w-[48.5%] h-32 items-start gap-1 mt-4 p-3 border border-neutral-900/5 rounded-xl overflow-hidden"
              style={cardShadowStyle}
            >
              <LinearGradient
                colors={["#ffffff", "#ffffff", "#fff204"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1.4, y: 1.5 }}
                locations={[0, 0.5, 1]}
                className="p-3 absolute top-0 left-0 right-0 bottom-0"
              />
              <View className="absolute -bottom-1 -right-1">
                <Image
                  source={require("../assets/images/zCoin3d.webp")}
                  className="w-10 h-10 opacity-80"
                  resizeMode="contain"
                />
              </View>
              <View className="flex-1">
                <SH8 className="text-left uppercase">2x Rewards</SH8>
                <B4 className="text-neutral-400 text-left">
                  Double Zcoins on every spend
                </B4>
                {isZetPlusActive ? (
                  <View className="flex-row items-center gap-1 px-2 py-1 bg-success-50 rounded-sm mt-6 w-auto self-start">
                   
                    <OverlineSm className="text-success-500">ACTIVE</OverlineSm>
                  </View>
                ) : (
                  <View className="flex-row items-center gap-1 px-2 py-1 bg-neutral-900/5 rounded-sm mt-6 w-auto self-start">
                    <LockIcon size={14} color={colors.neutral[900]} />
                    <OverlineSm className="text-neutral-800">LOCKED</OverlineSm>
                  </View>
                )}
              </View>
            </Pressable>
          </View>

          <View className="flex-row justify-between">
            <Pressable
              onPress={handleSupportClick}
              className="flex-col w-[48.5%] h-32 items-start gap-2 mt-3 p-3 border border-neutral-900/5 rounded-xl overflow-hidden"
              style={cardShadowStyle}
            >
               <LinearGradient
                colors={["#ffffff", "#ffffff", "#6dd6ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1.4, y: 1.5 }}
                locations={[0, 0.5, 1]}
                className="p-3 absolute top-0 left-0 right-0 bottom-0"
              />
              <View className="absolute bottom-0 right-0">
                <Image
                  source={require("../assets/images/chat3d.webp")}
                  className="w-11 h-11"
                  resizeMode="contain"
                />
              </View>
              <View className="flex-1">
                <SH8 className="text-left uppercase">24x7 Support</SH8>
                <B4 className="text-neutral-400 text-left">
                  Issue resolution in 24 hours
                </B4>
                {isZetPlusActive ? (
                  <View className="flex-row items-center gap-1 px-2 py-1 bg-success-50 rounded-sm mt-6 w-auto self-start">
                   
                    <OverlineSm className="text-success-500">ACTIVE</OverlineSm>
                  </View>
                ) : (
                  <View className="flex-row items-center gap-1 px-2 py-1 bg-neutral-900/5 rounded-sm mt-6 w-auto self-start">
                    <LockIcon size={14} color={colors.neutral[900]} />
                    <OverlineSm className="text-neutral-800">LOCKED</OverlineSm>
                  </View>
                )}
              </View>
            </Pressable>

            <Pressable
              onPress={handleAIVideoClick}
              className="flex-col w-[48.5%] h-32 items-start gap-2 mt-3 p-3 border border-neutral-900/5 rounded-xl overflow-hidden"
              style={cardShadowStyle}
            >
               <LinearGradient
                colors={["#ffffff", "#ffffff", "#ff7f7f"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1.4, y: 1.5 }}
                locations={[0, 0.5, 1]}
                className="p-3 absolute top-0 left-0 right-0 bottom-0"
              />
              <View className="absolute bottom-0 right-0">
                <Image
                  source={require("../assets/images/video3d.webp")}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
              <View className="flex-1">
                <SH8 className="text-left uppercase">AI Score Video</SH8>
                <B4 className="text-neutral-400 text-left">
                 Personalised AI-powered score video
                </B4>
                {isZetPlusActive ? (
                  <View className="flex-row items-center gap-1 px-2 py-1 bg-success-50 rounded-sm mt-6 w-auto self-start">
                   
                    <OverlineSm className="text-success-500">WATCH NOW</OverlineSm>
                  </View>
                ) : (
                  <View className="flex-row items-center gap-1 px-2 py-1 bg-neutral-900/5 rounded-sm mt-6 w-auto self-start">
                    <LockIcon size={14} color={colors.neutral[900]} />
                    <OverlineSm className="text-neutral-800">LOCKED</OverlineSm>
                  </View>
                )}
              </View>
            </Pressable>
          </View>

          {isZetPlusActive && (
            <>
              <SH6 className="mt-7 mb-3">Your Zet Plus Stats</SH6>
              <View className="flex-row justify-between mb-4">
                <View className="bg-neutral-100 w-[48.5%] py-3 px-4 rounded-lg">
                  <SH7 className="text-neutral-500">Disputes Raised</SH7>
                  <H5 className="text-neutral-900">{userInfo.zetPlus.stats.disputesRaised}</H5>
                </View>
                <View className="bg-neutral-100 w-[48.5%] py-3 px-4 rounded-lg">
                  <SH7 className="text-neutral-500">Videos Watched</SH7>
                  <H5 className="text-neutral-900">{userInfo.zetPlus.stats.videosWatched}</H5>
                </View>
              </View>
              <View className="flex-row justify-between mb-4">
                <View className="bg-neutral-100 w-full py-3 px-4 rounded-lg">
                  <SH7 className="text-neutral-500">Extra Zcoins Earned</SH7>
                  <View className="flex-row items-center">
                    <H5 className="text-neutral-900">{userInfo.zetPlus.stats.coinsEarned}</H5>
                    <SH7 className="text-neutral-500 ml-2">worth ₹{userInfo.zetPlus.stats.coinsValue}</SH7>
                  </View>
                </View>
              </View>
            </>
          )}

          <SH6 className="mt-7">How it works</SH6>
          <B3 className="mt-2 text-neutral-900/50">
            Simply become a Zet Plus member for just ₹1, and instantly unlock
            all premium benefits. 
          </B3>

          <SH6 className="mt-7">Frequently Asked Questions</SH6>
          <View className="mt-3 mb-3">
            <Accordion items={zPlusFaqs} />
          </View>

          {/* Add padding at bottom to ensure content doesn't get hidden behind the sticky button */}
          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>

      {/* Sticky button at bottom */}
      <View className="bg-white px-3 pt-4 pb-4 border-t border-neutral-900/5">
        {isZetPlusActive ? (
          <Button
            size="lg"
            color="neutral-500"
            className="w-full"
            label="Membership Active"
            disabled={true}
          />
        ) : (
          <>
            <Button
              size="lg"
              color="primary-500"
              className="w-full"
              label="Become Member at ₹1"
              onPress={handleBecomeMember}
            />
            <B4 className="text-neutral-400 text-center mt-2">
              ₹79/Month from next month
            </B4>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbe47e",
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContent: {
    paddingTop: 24,
    alignItems: "center",
  },
  logoContainer: {
    padding: 12,
    backgroundColor: "#fbe47e",
    borderRadius: 50,
    marginBottom: 16,
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerTitle: {
    textAlign: "center",
    marginHorizontal: 20,
  },
  scrollContent: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    color: colors.neutral[900],
  },
  paragraph: {
    marginBottom: 16,
    color: colors.neutral[600],
    lineHeight: 22,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  benefitText: {
    marginLeft: 12,
    color: colors.neutral[900],
    flex: 1,
  },
  bottomPadding: {
    height: 100, // Ensure content isn't hidden behind sticky button
  },
  stickyButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    paddingBottom: 34, // Extra padding for bottom safe area
  },
});
