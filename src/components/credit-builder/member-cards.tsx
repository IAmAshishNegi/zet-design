import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card } from '../ui/card';
import { Button, ButtonProps } from '../ui/button/button';
import { colors } from '../../styles/theme';

// Get screen width for responsive sizing
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function CreditBuilderMemberCards() {
  // For demo purposes, use placeholder images
  const placeholderImages = {
    cblImage: require('../../assets/images/cbl.webp'),
    AIVideoImage: require('../../assets/images/AIVideo.webp'),
    checkerImage: require('../../assets/images/score_analysis.webp'),
  };
  
  // Handlers for card presses
  const handleCardPress = (cardName: string) => {
    console.log(`${cardName} card pressed`);
  };

  const buttonProps: ButtonProps = {
    label: "Start Application",
    size: "sm",
    variant: "filled",
    color: "neutral-900",
    style: { 
      backgroundColor: colors.neutral[900],
      paddingHorizontal: 16
    },
    onPress: () => console.log("Card button pressed")
  };

  return (
    <View>
      <View className='flex-row justify-between w-full gap-4'>
        <View className='flex-1'>
          <Card
            title="ZET Fraud Checker"
            description="Improve your credit score"
            showDescription={false}
            showSubheading={false}
            titleVariant="SH2"
            imageSource={placeholderImages.checkerImage}
            variant="primary"
            height={110}
            imageSize={{ width: 60, height: 60 }}
            badge={{ text: "NEW", variant: "new" }}
            onPress={() => handleCardPress('Build Credit')}
            className="bg-neutral-0"
          />
        </View>
        <View className='flex-1'>
          <Card
            title="Credit Analysis Video"
            description="Set aside funds and build your savings automatically"
            showDescription={false}
            showSubheading={false}
            titleVariant="SH2"
            height={110}
            imageSource={placeholderImages.AIVideoImage}
            variant="secondary"
            imageSize={{ width: 56, height: 56 }}
            onPress={() => handleCardPress('Save More')}
            className="bg-neutral-0"
          />
        </View>
      </View>
      <View className='mt-7'>
        <Card
          title="Credit Builder Membership"
          description="A one of a kind membership that helps you build your credit score"
          showDescription={true}
          titleVariant="H6"
          imageSource={placeholderImages.cblImage}
          imageSize={{ width: 66, height: 66 }}
          variant="secondary"
          badge={{ text: "PRE APPROVED", variant: "success" }}
          onPress={() => handleCardPress('Member Benefits')}
          className="bg-neutral-0"
          showButton={true}
          buttonProps={buttonProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  
  cardWidth: {
    // Row cards need specific width
    ...(SCREEN_WIDTH > 400 
      ? { width: SCREEN_WIDTH / 2 - 24 } // Larger screens
      : { width: SCREEN_WIDTH / 2 - 20 }), // Smaller screens
  }
}); 