import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RiveRef } from 'rive-react-native';
import { ScoreDigit, B3, SH3, RiveAnimation, H6, B5, H1, B4, SH1 } from '../ui';
import { colors } from '../../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../ui';

type CreditScoreScaleProps = {
  score: number;
  status: 'good' | 'fair' | 'poor';
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
      colors: ['#ffb9b992', '#ffffff', '#ffffff'] as const,
      start: { x: 0.1, y: 0 },
      end: { x: 0.5, y: 0.4 },
      locations: [0, 0.5, 0.9] as const
    };
  } else if (score >= 400 && score < 600) {
    // Orange gradient for fair scores
    return {
      colors: ['#fff5e6', '#ffffff', '#ffe8cc'] as const,
      start: { x: 0.1, y: 0 },
      end: { x: 0.9, y: 1 },
      locations: [0, 0.5, 0.9] as const
    };
  } else if (score >= 600) {
    // Green gradient for good scores
    return {
      colors: ['#e6fff2', '#ffffff', '#ccffe6'] as const,
      start: { x: 0.1, y: 0 },
      end: { x: 0.9, y: 1 },
      locations: [0, 0.5, 0.9] as const
    };
  }
  
  // Default fallback
  return {
    colors: ['#f8f8f8', '#ffffff', '#f0f0f0'] as const,
    start: { x: 0.1, y: 0 },
    end: { x: 0.9, y: 1 },
    locations: [0, 0.5, 0.9] as const
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
  const formattedDate = new Date(lastUpdated).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Update local state if prop changes
  useEffect(() => {
    if (score !== currentScore) {
      setCurrentScore(score);
    }
  }, [score, currentScore]);

  // Get score digits for display
  const scoreDigits = score.toString().split('');
  
  // Get the color based on the score range
  const scoreColor = getScoreColor(score);
  
  // Get gradient configuration based on score
  const gradientConfig = getGradientConfig(score);

  // Get the score rating text
  const scoreRating = getScoreRating(score);

  return (
    <View style={styles.containerWrapper}>
      <LinearGradient
        colors={gradientConfig.colors}
        start={gradientConfig.start}
        end={gradientConfig.end}
        locations={gradientConfig.locations}
        style={styles.container}
      >
        <View className='flex-row items-center justify-between align-middle'>
          <View className='flex-row items-center'>
            {scoreDigits.map((digit, index) => (
              <ScoreDigit 
                key={index}
                scoreWeight='scoreBold'
                style={{ color: scoreColor, letterSpacing: -1, fontSize: 28 }}
              >
                {digit}
              </ScoreDigit>
            ))}
          </View>
          {/* <View className='flex-row items-center justify-center align-middle'>
            {change !== 0 && (
              <View className='ml-2 px-2 py-1 rounded-2xl' style={[
                { backgroundColor: change > 0 ? colors.success[500] : colors.error[50] }
              ]}>
                <B4 style={{ 
                  color: change > 0 ? colors.success[700] : colors.error[700] 
                }}>
                  {change > 0 ? '+' : ''}{change} pts
                </B4>
              </View>
            )}
          </View> */}
        </View>
        <View className='mt-2'>
          <SH1 className="text-neutral-600">Your Credit Score is {scoreRating}</SH1>
          <B5 className="text-neutral-500">Last updated: {formattedDate}</B5>
        </View>
        
        <View style={styles.riveContainer}>
          <RiveAnimation
            ref={riveRef}
            source={require('../../assets/rive/score_scale_meter.riv')}
            artboardName="score_scale"
            stateMachineName="State Machine 1"
            autoplay={true}
            style={styles.riveAnimation}
            onPlay={(animName, isStateMachine) => {
              // When animation starts playing, set the score input
              const syncScoreWithRive = () => {
                try {
                  // Update Rive with the score value
                  riveRef.current?.setInputState('State Machine 1', 'score', currentScore);
                } catch (error) {
                  console.error('Failed to set score in Rive animation:', error);
                }
              };
              
              // Try immediately and with a delay to ensure it works
              syncScoreWithRive();
              setTimeout(syncScoreWithRive, 500);
            }}
            onError={(error) => {
              console.error('Score scale animation error:', error);
            }}
          />
        </View>
        
        <View className='flex-row items-center justify-center align-middle py-4 border-t border-neutral-100 mt-2'>
          <SH3 className='text-primary-500'>View Detailed Report</SH3>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  container: {
    backgroundColor: colors.neutral[0],
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riveContainer: {
    width: '100%',
    height: 50,
  },
  riveAnimation: {
    width: '100%',
  },
  scaleLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
});

export default CreditScoreScale; 