import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card } from '../ui/card';
import { Button, ButtonProps } from '../ui/button/button';
import { colors } from '../../styles/theme';

// Get screen width for responsive sizing
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function ZetPlusCard() {
  // For demo purposes, use placeholder images
  const placeholderImages = {
   
    zetPlusImage: require('../../assets/images/2xNew.webp'),
  };
  
  // Handlers for card presses
  const handleCardPress = (cardName: string) => {
    console.log(`${cardName} card pressed`);
  };

  const buttonProps: ButtonProps = {
    label: "Learn in Detail",
    size: "md",
    variant: "filled",
    color: "primary-900",
    style: { 
      backgroundColor: colors.primary[900],
      paddingHorizontal: 16
    },
    onPress: () => console.log("Card button pressed")
  };

  return (
    <View className='mt-5'>
    
      <View>
        <Card
          title="2x Cashback with Zet Plus"
          description="Get 2x Cashback on all your Zet Plus purchases"
          showDescription={true}
          titleVariant="H5"
          imageSource={placeholderImages.zetPlusImage}
          imageSize={{ width: 120, height: 120 }}
          imageStyle={{ bottom: -16, right: -8 }}
        
          variant="secondary"
          badge={{ text: "NEW ON ZET", variant: "new" }}
          onPress={() => handleCardPress('Member Benefits')}
          className="bg-neutral-0"
          showButton={true}
          buttonProps={buttonProps}
          gradientColors={['#ffffff', '#d1ffd3', '#83ff87'] as const}
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