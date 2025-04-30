import React, { useRef, useEffect, useState, useMemo } from "react";
import { View, Platform, StyleSheet, NativeModules, Pressable, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Reanimated, {
  useSharedValue,
  withTiming,
  withSequence,
  useAnimatedStyle,
  Easing,
  withDelay,
  useFrameCallback,
} from "react-native-reanimated";
import {
  H1,
  H3,
  B2,
  B3,
  Button,
  H6,
  H5,
  SH1,
  SH2,
  B4,
  SH6,
  SH7,
  B7,
  SH5,
  SH4,
  SH3,
  B1,
  B5,
  OverlineSm,
  RiveAnimation,
  H2,
  ScoreDigit,
  H7,
  B6,
} from "../ui";
import { CreditScoreIcon } from "../ui/icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import AppBar from "./app-bar";
import { RiveRef, Fit, Alignment } from "rive-react-native";
import { colors } from "../../styles/theme";
import { Image } from "react-native";

interface PostActivationHomeProps {
  creditScore: number;
  creditScoreStatus: "good" | "fair" | "poor";
  lastUpdated: string;
  navigation: BottomTabNavigationProp<any>;
  greeting: string;
  name: string;
  avatarImageUrl: string | null;
  onAvatarPress: () => void;
  avatarVariant: "default" | "outline" | "small";
  positiveChange?: boolean;
}

// SlotMachineDigit Component for displaying individual digits with animation
const SlotMachineDigit = ({ 
  digit, 
  animationDelay = 0,
  style = {} 
}: { 
  digit: number, 
  animationDelay?: number,
  style?: any
}) => {
  // Create just enough digits for a convincing animation
  // The last digit will always be our target digit
  const slotDigits = useMemo(() => {
    const digits = [];
    
    // Add 10 random digits
    for (let i = 0; i < 10; i++) {
      digits.push(Math.floor(Math.random() * 10));
    }
    
    // Add our target digit at the end
    digits.push(digit);
    
    return digits;
  }, [digit]);
  
  // Track current displayed digit index
  const opacity = useSharedValue(0);
  // Shared value for bounce effect - moved to component top level
  const translateY = useSharedValue(0);
  
  // Track if animation is complete
  const [isComplete, setIsComplete] = useState(false);
  const [displayDigit, setDisplayDigit] = useState(slotDigits[0]);
  
  useEffect(() => {
    // Start animation after delay
    const startTimer = setTimeout(() => {
      // Fade in
      opacity.value = withTiming(1, { duration: 200 });
      
      // Setup timing for rapid digit changes (simulating slot machine)
      let currentStep = 0;
      const totalSteps = slotDigits.length;
      
      // Start with faster changes, then slow down
      const updateInterval = (step: number) => {
        // Start with 40ms between changes, gradually slow down
        const baseInterval = 40;
        const slowdownFactor = Math.pow(step / totalSteps, 2) * 300; // Exponential slowdown
        return baseInterval + slowdownFactor;
      };
      
      // Recursive function to update digits with variable timing
      const updateDigit = () => {
        if (currentStep < totalSteps) {
          // Update the displayed digit
          setDisplayDigit(slotDigits[currentStep]);
          
          // Calculate next update time (slowing down gradually)
          const nextUpdateTime = updateInterval(currentStep);
          currentStep++;
          
          // Schedule next update with variable timing
          setTimeout(updateDigit, nextUpdateTime);
        } else {
          // Animation complete, ensure we display the final digit
          setDisplayDigit(digit);
          setIsComplete(true);
          
          // Add a final bounce effect - apply directly to the translateY value
          translateY.value = withSequence(
            withTiming(-10, { duration: 100, easing: Easing.out(Easing.cubic) }),
            withTiming(0, { duration: 300, easing: Easing.elastic(2) })
          );
        }
      };
      
      // Start the update sequence
      updateDigit();
    }, animationDelay);
    
    return () => clearTimeout(startTimer);
  }, [digit, animationDelay, slotDigits]);
  
  // Style for the digit
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }]
    };
  });
  
  return (
    <Reanimated.View style={animatedStyle}>
      <H2
        style={{
          letterSpacing: -1,
          fontSize: 20,
          lineHeight: 24,
          fontWeight: "600",
          opacity: 0.7,
          ...style
        }}
      >
        {displayDigit}
      </H2>
    </Reanimated.View>
  );
};

const PostActivationHome: React.FC<PostActivationHomeProps> = ({
  creditScore,
  creditScoreStatus,
  lastUpdated,
  navigation,
  greeting,
  name,
  avatarImageUrl,
  onAvatarPress,
  avatarVariant,
  positiveChange = true,
}) => {
  const riveRef = useRef<RiveRef>(null);
  const redeemRiveRef = useRef<RiveRef>(null);
  const [playRedeemAnimation, setPlayRedeemAnimation] = useState(false);
  const [scorePanelLoaded, setScorePanelLoaded] = useState(false);

  // Use frame callback to prevent animation freezing on scroll or tab change
  // This keeps the UI thread active for Rive animations
  useFrameCallback(() => {
    // Empty callback, just to keep the animation thread active
    // This prevents the animation from freezing
  });

  // Load the first animation (redeem benefit) after initial render
  useEffect(() => {
    // Delay showing the redeem benefit animation to avoid initial load spike
    const timer = setTimeout(() => {
      setPlayRedeemAnimation(true);
    }, 300); // Short delay for initial load

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only set up text values after both animations are loaded
    if (!scorePanelLoaded || !playRedeemAnimation) return;
    
    // Sync Rive credit score
    const syncScoreWithRive = () => {
      try {
        if (riveRef.current) {
          riveRef.current?.setInputState("score_states", "credit_score", creditScore);
        }
      } catch (error) {
        console.error("Failed to set score in Rive animation:", error);
      }
    };
  
    // Delay setting text to ensure Rive is loaded
    const timeout = setTimeout(() => {
      try {
        // Try with the mini_score artboard first (for the credit score animation)
        if (riveRef.current) {
          try {
            riveRef.current.setTextRunValue("userNameCard", name);
          } catch (e1) {
            console.log("Could not set text in score animation:", e1);
          }
        }
        
        // Then try with the redeem_benefit artboard (if that's where the text field is)
        if (redeemRiveRef.current) {
          try {
            redeemRiveRef.current.setTextRunValue("userNameCard", name);
          } catch (e2) {
            // Try a few alternative formats based on common Rive naming patterns
            try {
              redeemRiveRef.current.setTextRunValue("user_name", name);
            } catch (e3) {
              try {
                // In Rive, text runs can sometimes be accessed with brackets
                redeemRiveRef.current.setTextRunValue("[userNameCard]", name);
              } catch (e4) {
                console.error("Could not set text value in redemption animation:", e2, e3, e4);
              }
            }
          }
        }
      } catch (error) {
        console.error("Failed to set name in Rive animation:", error);
      }
      
      // Always run score sync regardless of text setting success
      syncScoreWithRive();
    }, 500);
  
    return () => clearTimeout(timeout);
  }, [creditScore, name, scorePanelLoaded, playRedeemAnimation]);

  // Function to restart the animation to manually control timing
  const restartRedeemAnimation = () => {
    // Toggle the state to force a remount of the Rive animation component
    setPlayRedeemAnimation(false);
    setTimeout(() => setPlayRedeemAnimation(true), 50);
  };

  // Enhanced shadow style for cards - with greater spread for Android
  const cardShadowStyle = {
    shadowColor: '#00000063',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6, // Android elevation
    // Additional style for Android to create a more spread-out shadow effect
    ...(Platform.OS === 'android' && {
      backgroundColor: '#FFF', // Ensure background is opaque for Android shadow
    }),
  };

  return (
    <>
      {/* App Bar - Post Activation Styling */}

      {/* Background gradient section */}
      <View
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={["#6e19ab", "#2e054b", "#15021f"] as const}
          start={{ x: 0.3, y: -0.6 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.5, 1.2] as const}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            height: "100%",
            width: "100%",
          }}
        />
        <AppBar
          greeting={greeting}
          name={name}
          avatarImageUrl={avatarImageUrl}
          onAvatarPress={onAvatarPress}
          avatarVariant={avatarVariant}
          positiveChange={positiveChange}
          backgroundColor="transparent"
          paddingTop={Platform.OS === "android" ? 35 : 65}
          paddingBottom={15}
          greetingOpacity={0.6}
          nameOpacity={0.9}
          nameStyle={{ color: "#000000" }}
          greetingStyle={{ color: "#000000" }}
        />
        <View>
          {/* Post-activation Home Content */}
          <View className="mt-2 relative">
            {/* <Image
              source={require("../../assets/images/cardimageHome.webp")}
              className="w-full h-[100px] object-fit -mb-2"
            /> */}
            <View className="h-[175px] w-full relative">
              {playRedeemAnimation && (
                <RiveAnimation
                  ref={redeemRiveRef}
                  source={require("../../assets/rive/homepage_main_new.riv")}
                  artboardName="redeem_benefit"
                  stateMachineName="redeem_state"
                  autoplay={true}
                  fit={Fit.Cover}
                  alignment={Alignment.Center}
                />
              )}
              
              {/* Touch area to restart animation - covers the whole animation area */}
              <TouchableOpacity 
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1
                }} 
                activeOpacity={1}
                onPress={restartRedeemAnimation}
              />
            </View>
            {/* <View className="absolute -bottom-3 left-[25%] px-3 w-[50%] z-10">
              <Button variant="filled" size="sm" color="primary-500" className="w-fit">
                Manage Card
              </Button>
            </View> */}
          </View>
          <View className="flex-row justify-between px-3 py-1 bg-neutral-0 pt-8 pb-6 w-full">
            <View className="w-[48%]">
              <View 
                className="w-full h-[116px] relative overflow-hidden bg-neutral-0 rounded-xl py-4 px-3 border-[1.3px] border-neutral-900/5 mb-3"
                style={cardShadowStyle}
              >
                <SH7 className="text-black text-start text-sm uppercase opacity-80">
                  Your Card
                </SH7>

                <B4 className="text-black opacity-50 text-start pr-4">
                  Pay, manage and more
                </B4>
                <View className="absolute -right-6 -bottom-6">
                  <Image
                    source={require("../../assets/images/cardPodium.png")}
                    className="w-[74px] h-[74px]"
                  />
                </View>
              </View>

              <View 
                className="w-full h-[90px] relative overflow-hidden bg-neutral-0 rounded-xl py-3 px-3 border-[1.3px] border-neutral-900/5"
                style={cardShadowStyle}
              >
                <SH7 className="text-black text-start text-sm opacity-80 uppercase">
                  ZET PLUS
                </SH7>

                <B4 className="text-black opacity-50 text-start">
                  Extraaa benefits
                </B4>
                <View className="mt-2">
                  <OverlineSm className="text-[#ffffff] text-center text-sm bg-[#e5ba0d] w-[50%] rounded-md px-2 py-1">
                    LOCKED
                  </OverlineSm>
                </View>

                {/* <View className="absolute -right-4 -bottom-1 opacity-90">
                <Image
                  source={require("../../assets/images/credit_limit.webp")}
                  className="w-[56px] h-[56px]"
                />
              </View> */}
              </View>
            </View>
            
            <View 
              className="w-[48%] h-full relative overflow-hidden bg-neutral-0 rounded-xl pt-3 px-3 border-[1.3px] border-neutral-900/5"
              style={cardShadowStyle}
            >
              <SH7 className="text-black opacity-80 text-start uppercase">
                Credit Score
              </SH7>
              <B4 className="text-black opacity-50 text-start mt-1">
                Updated on: {lastUpdated}
              </B4>
             
           

                <View className="relative flex w-full justify-center items-center mt-4">
                <View className="absolute left-[37%] top-[29%] z-10 flex-row">
                {/* Replace static score with animated digits */}
                {creditScore.toString().split('').map((digit, index) => (
                  <SlotMachineDigit 
                    key={index} 
                    digit={parseInt(digit, 10)} 
                    animationDelay={index * 150} 
                  />
                ))}
              </View>
                
              <View className=" h-[90px] w-[90px] ">
            
                <RiveAnimation
                  ref={riveRef}
                  source={require("../../assets/rive/homepage_main_new.riv")}
                  artboardName="mini_score"
                  stateMachineName="score_states"
                  autoplay={true}
                 
                  onPlay={(animName, isStateMachine) => {
                    // Mark this animation as loaded to trigger loading the second animation
                    setScorePanelLoaded(true);
                    
                    // When animation starts playing, set the score input
                    const syncScoreWithRive = () => {
                      try {
                        // Update Rive with the score value
                        if (riveRef.current) {
                          riveRef.current?.setInputState(
                            "score_states",
                            "credit_score",
                            creditScore
                          );
                        }
                      } catch (error) {
                        console.error(
                          "Failed to set score in Rive animation:",
                          error
                        );
                      }
                    };

                    // Try immediately and with a delay to ensure it works
                    syncScoreWithRive();
                    setTimeout(syncScoreWithRive, 500);
                  }}
                  onError={(error) => {
                    // Suppress TextValueRun errors since we know it's working
                    if (error && error.message && error.message.includes('TextValueRun')) {
                      // Just log at debug level instead of error
                      console.debug("Non-critical Rive text error:", error.message);
                    } else {
                      console.error("Score scale animation error:", error);
                    }
                  }}
                />
              </View>
              <View className="flex justify-start items-start mt-3">
                <OverlineSm className="text-[#0c3b05] text-center text-sm bg-[#eefce7] rounded-md px-4 py-1">
                  +25 Points
                </OverlineSm>
              </View>
              {/* <View className="flex justify-start items-start mt-3">
                <B4 className="text-black opacity-50 text-start">
                  +25 Points
                </B4>
              </View> */}
              </View>
              {/* <View className="absolute -right-4 -bottom-1 opacity-90">
               <Image source={require("../../assets/images/credit_limit.webp")} className="w-[61px] h-[61px]" />
              
             </View> */}
            </View>

            {/* Credit Score Display for Post-Activation */}
          </View>
        </View>
      </View>
    </>
  );
};

export default PostActivationHome;
