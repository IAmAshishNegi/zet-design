import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { RiveRef } from "rive-react-native";
import {
  ScoreDigit,
  B3,
  SH3,
  RiveAnimation,
  H6,
  B5,
  H1,
  B4,
  SH1,
  SH6,
  H2,
  SH5,
  B2,
  OverlineSm,
} from "../ui";
import { colors } from "../../styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "../ui";
import { ChevronRightIcon } from "../ui/icons";
import { Image } from "react-native";

type CreditScoreScaleProps = {
  score: number;
  status: "good" | "fair" | "poor";
  lastUpdated: string;
  change?: number;
};

// Get score rating text based on score value
const getScoreRating = (score: number): string => {
  if (score >= 0 && score < 351) {
    return "Poor";
  } else if (score >= 351 && score < 500) {
    return "Fair";
  } else if (score >= 500 && score < 700) {
    return "Good";
  } else if (score >= 700 && score <= 900) {
    return "Excellent";
  } else {
    return "";
  }
};

// Updated color logic based on score ranges
const getScoreColor = (score: number) => {
  if (score >= 0 && score < 351) {
    return colors.neutral[900]; // Red for 0-300
  } else if (score >= 300 && score < 500) {
    return colors.warning[900]; // Orange for 300-500
  } else if (score >= 500 && score < 700) {
    return colors.success[900]; // Light green for 500-700
  } else if (score >= 700 && score <= 900) {
    return colors.success[900]; // Green for 700-900
  } else {
    return colors.neutral[900]; // Default fallback
  }
};

// Get gradient colors based on score range
const getGradientConfig = (score: number) => {
  if (score >= 0 && score < 400) {
    // Red gradient for poor scores
    return {
      colors: ["#ffffff", "#ffffff", "#fefeff"] as const,
      start: { x: 0, y: -0.5 },
      end: { x: 0.5, y: 0.4 },
      locations: [0, 0.5, 0.9] as const,
    };
  } else if (score >= 400 && score < 600) {
    // Orange gradient for fair scores
    return {
      colors: ["#fff5e6", "#ffffff", "#ffe8cc"] as const,
      start: { x: 0.1, y: 0 },
      end: { x: 0.9, y: 1 },
      locations: [0, 0.5, 0.9] as const,
    };
  } else if (score >= 600) {
    // Green gradient for good scores
    return {
      colors: ["#e6fff2", "#ffffff", "#ccffe6"] as const,
      start: { x: 0.1, y: 0 },
      end: { x: 0.9, y: 1 },
      locations: [0, 0.5, 0.9] as const,
    };
  }

  // Default fallback
  return {
    colors: ["#ffffff", "#ffffff", "#ffffff"] as const,
    start: { x: 0.1, y: 0 },
    end: { x: 0.9, y: 1 },
    locations: [0, 0.5, 0.9] as const,
  };
};

const statusColors = {
  good: colors.success[500],
  fair: colors.warning[500],
  poor: colors.error[500],
};

export const CreditScoreScale: React.FC<CreditScoreScaleProps> = ({
  score,
  status,
  lastUpdated,
  change = 0,
}) => {
  const riveRef = useRef<RiveRef>(null);
  const [currentScore, setCurrentScore] = useState(score);

  // Format date to readable string
  const formattedDate = new Date(lastUpdated).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Update local state if prop changes
  useEffect(() => {
    if (score !== currentScore) {
      setCurrentScore(score);
    }
  }, [score, currentScore]);

  // Get score digits for display
  const scoreDigits = score.toString().split("");

  // Get the color based on the score range
  const scoreColor = getScoreColor(score);

  // Get gradient configuration based on score
  const gradientConfig = getGradientConfig(score);

  // Get the score rating text
  const scoreRating = getScoreRating(score);

  return (
    <View className="rounded-xl border-[1.3px] border-neutral-800/10 bg-neutral-200 overflow-hidden">
      <LinearGradient
        colors={gradientConfig.colors}
        start={gradientConfig.start}
        end={gradientConfig.end}
        locations={gradientConfig.locations}
        className="rounded-xl pt-4 pb-3"
      >
       <View className="flex-row  relative items-center justify-between px-4">
       <View className="absolute left-[10px] -top-[7px] h-[56px] w-[56px]">
          <RiveAnimation
            ref={riveRef}
            source={require("../../assets/rive/homepage_main_needle.riv")}
            artboardName="mini_score"
            stateMachineName="score_states"
            autoplay={true}
           
            onPlay={(animName, isStateMachine) => {
              // When animation starts playing, set the score input
              const syncScoreWithRive = () => {
                try {
                  // Update Rive with the score value
                  riveRef.current?.setInputState(
                    "score_states",
                    "credit_score",
                    currentScore
                  );
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
              console.error("Score scale animation error:", error);
            }}
          />
        </View>
        <View className="flex-col items-center justify-between pl-18">
        <View className="flex-row items-start justify-start align-start w-full">
          <View className="flex-row items-center">
            {scoreDigits.map((digit, index) => (
              <H2
                key={index}
                style={{
                  color: scoreColor,
                  letterSpacing: -1,
                  fontSize: 20,
                  lineHeight: 24,
                  fontWeight: "600",
                  opacity: 0.9,
                }}
              >
                {digit}
              </H2>
            ))}
          </View>
          <View className="flex-row items-center justify-center align-middle">
            {change !== 0 && (
              <View
                className="ml-2 py-1 rounded-2xl"
                style={[
                  { backgroundColor: change > 0 ? "#ffffff" : "#ffffff" },
                ]}
              >
                <OverlineSm
                  style={{
                    color: change > 0 ? "#1f951b" : "#e84589",
                  }}
                >
                  {change > 0 ? "+" : ""}
                  {change} pts
                </OverlineSm>
              </View>
            )}
          </View>
        </View>
        <View className="flex items-start justify-start align-start w-full">
          <SH3 className="text-neutral-500 mb-1 text-start w-full">
            Your Credit Score is {scoreRating}
          </SH3>
          {/* <B4 className="text-neutral-400">Last updated: {formattedDate}</B4> */}
        </View>
      
        </View>

        <View className=" p-2 bg-neutral-100 rounded-full w-fit">
            <ChevronRightIcon
              color="#2f2f2f"
              secondaryColor="#0e420c"
              width={16}
              height={16}
              strokeWidth={2}
              variant="stroke"
            />
        </View>


       
     
        </View>
       

         
      
        
        {/* <View className='absolute -right-2 -bottom-2 opacity-90'>
              <Image source={require('../../assets/images/score_podium.webp')} className='w-16 h-16' />
            </View> */}

        {/* <View className='flex-row items-center justify-center align-middle py-4 border-t border-neutral-100 mt-2'>
          <SH3 className='text-primary-500'>View Detailed Report</SH3>
        </View> */}
      </LinearGradient>
    </View>
  );
};


export default CreditScoreScale;
