import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { H4, B3, Button, H3 } from "../components/ui";
import { useUser } from "../context/user-context";
import LottieView from "lottie-react-native";

export default function ZPlusPaymentSuccessScreen() {
  const router = useRouter();
  const { activateZetPlus } = useUser();

  // Ensure membership is activated when this screen is shown
  useEffect(() => {
    // Set Zet Plus membership to active
    activateZetPlus();
  }, []);

  const handleContinue = () => {
    // Navigate to home page
    router.push("/");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      
      <View className="flex-1 items-center justify-center">
        <LottieView
          source={require("../assets/lottie/success.json")}
          autoPlay
          loop={false}
          style={{
            width: 260,
            height: 260,
          }}
        />
        <H3 className="text-neutral-900 text-center mb-2 -mt-16">Payment Successful</H3>
        <B3 className="text-neutral-600 text-center mb-5">Your Zet Plus is Active Now</B3>
        
        {/* <View style={styles.featuresContainer}>
          <View style={styles.featureIconWrapper}>
            <Image
              source={require("../assets/images/dispute3dNew.webp")}
              style={styles.featureIcon}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.featureIconWrapper}>
            <Image
              source={require("../assets/images/zCoin3d.webp")}
              style={styles.featureIcon}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.featureIconWrapper}>
            <Image
              source={require("../assets/images/chat3d.webp")}
              style={styles.featureIcon}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.featureIconWrapper}>
            <Image
              source={require("../assets/images/video3d.webp")}
              style={styles.featureIcon}
              resizeMode="contain"
            />
          </View>
        </View> */}
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          size="lg"
          color="primary-500"
          className="w-full"
          label="Continue"
          onPress={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 40,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: 280,
    marginTop: 16,
  },
  featureIconWrapper: {
    width: "50%",
    aspectRatio: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  featureIcon: {
    width: 60,
    height: 60,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.05)",
  },
}); 