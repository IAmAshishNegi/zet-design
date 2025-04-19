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
    cblImage: require('../../assets/images/cbm.webp'),
    AIVideoImage: require('../../assets/images/AIVideo.webp'),
    checkerImage: require('../../assets/images/score_analysis.webp'),
  };
  
  // Handlers for card presses
  const handleCardPress = (cardName: string) => {
    console.log(`${cardName} card pressed`);
  };

  const buttonProps: ButtonProps = {
    label: "Learn in Detail",
    size: "sm",
    variant: "filled",
    color: "primary",
    style: { 
      backgroundColor: colors.primary[500],
      paddingHorizontal: 16
    },
    onPress: () => console.log("Card button pressed")
  };

  return (
    <View>
    
      <View>
        <Card
          title="Credit Builder Membership"
          description="A one of a kind membership that helps you build your credit score"
          showDescription={true}
          titleVariant="H5"
          imageSource={placeholderImages.cblImage}
          imageSize={{ width: 92, height: 100 }}
          variant="secondary"
          badge={{ text: "NEW ON ZET", variant: "new" }}
          onPress={() => handleCardPress('Member Benefits')}
          className="bg-neutral-0"
          showButton={true}
          buttonProps={buttonProps}
          gradientColors={['#ffffff', '#F7F2FA', '#c89cfd'] as const}
          gradientStart={{ x: 0.2, y: 0 }}
          gradientEnd={{ x: 0.8, y: 1.5 }}
          gradientLocations={[0, 0.6, 1] as const}
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