import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { H1, H2, H3, H4, H5, H6,
  SH1, SH2, SH3, SH4, SH5,
  B1, B2, B3, B4, B5, B6, B7, B8, B9,
  LinkText, LinkTextSm, LinkTextXs,
  ButtonLg, ButtonMd, ButtonSm,
  OverlineMd, OverlineSm,
  setAppFontScale, getAppFontScale
} from '../ui/typography/typography';
type OnboardingScreenProps = {
  onGetStarted: () => void;
};

const OnboardingScreen = ({ onGetStarted }: OnboardingScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://placekitten.com/500/500" }}
            style={styles.image}
            contentFit="contain"
            transition={1000}
          />
        </View>
        
        <View style={styles.textContainer}>
          
          <View className="flex flex-col gap-2 text-center justify-center items-center">
          <H4 className="text-center">
            The fastest way to improve your credit score
          </H4>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={onGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  image: {
    width: '100%',
    height: 300,
  },
  textContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'THICCCBOI-Bold',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
    fontFamily: 'THICCCBOI-Regular',
  },
  button: {
    backgroundColor: '#7F29BD',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'THICCCBOI-SemiBold',
  },
});

export default OnboardingScreen; 