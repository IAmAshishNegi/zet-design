import React from 'react';
import { View, StyleSheet, Pressable, ImageBackground, Image, ImageSourcePropType, Dimensions } from 'react-native';
import { colors } from '../../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { H5, B3, B7, Button, H6 } from '../ui';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

export interface RedemptionOption {
  id: string;
  backgroundImage: ImageSourcePropType;
  title: string;
  subtitle: string;
  showSubtitle?: boolean;
  conversionRate?: string;
  showConversionRate?: boolean;
  ctaLabel: string;
  showCta?: boolean;
  gradientColors?: [string, string] | [string, string, ...string[]];
  onPress?: () => void;
  heroImage?: ImageSourcePropType;
  showHeroImage?: boolean;
}

interface RedemptionOptionsStackProps {
  data: RedemptionOption[];
  containerStyle?: any;
  itemHeight?: number;
  onOptionSelect?: (option: RedemptionOption) => void;
}

function RedemptionOptionsStack({
  data,
  containerStyle,
  itemHeight = 180,
  onOptionSelect
}: RedemptionOptionsStackProps) {

  const handleCardPress = (option: RedemptionOption) => {
    if (onOptionSelect) {
      onOptionSelect(option);
    } else if (option.onPress) {
      option.onPress();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {data.map((item) => {
        const defaultGradientColors: [string, string] = ['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)'];
        const gradientColors = item.gradientColors || defaultGradientColors;

        return (
          <View
            key={item.id}
            style={[
              styles.cardContainer,
              { height: itemHeight }
            ]}
          >
            <Pressable
              style={styles.cardPressable}
              onPress={() => handleCardPress(item)}
            >
              <ImageBackground
                source={item.backgroundImage}
                style={styles.card}
                imageStyle={styles.backgroundImage}
              >
                <LinearGradient
                  colors={gradientColors}
                  style={styles.gradientOverlay}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                >
                  <View style={styles.contentContainer}>
                    <View style={styles.textContent}>
                      <H6 style={styles.title}>{item.title}</H6>

                      {item.showSubtitle !== false && item.subtitle && (
                        <B3 style={styles.subtitle}>{item.subtitle}</B3>
                      )}

                      {item.showConversionRate !== false &&
                        item.conversionRate && (
                          <View className="flex-row items-center pl-2 pr-3 py-1 bg-neutral-0/20 rounded-full self-start w-auto">
                             <LottieView
                              source={require("../../assets/lottie/ZetCoins.json")}
                              autoPlay
                              loop
                              style={{
                                width: 16,
                                height: 16,
                                marginRight: 4,
                              }}
                            />
                           
                           
                            <B7 style={styles.conversionRate}>
                                {item.conversionRate}
                            </B7>
                          </View>
                        )}

                      {item.showHeroImage !== false && item.heroImage && (
                        <View style={styles.heroImageContainer}>
                          <Image
                            source={item.heroImage}
                            style={styles.heroImage}
                            resizeMode="contain"
                          />
                        </View>
                      )}
                    </View>

                    {item.showCta !== false && item.ctaLabel && (
                      <View style={styles.buttonContainer}>
                        <Button
                          variant="filled"
                          size="md"
                          color="neutral-0"
                          onPress={() => handleCardPress(item)}
                          textStyle={{
                            color: colors.primary[900],
                            fontWeight: "600",
                          }}
                        >
                          {item.ctaLabel}
                        </Button>
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </ImageBackground>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 12,
  },
  cardContainer: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardPressable: {
    flex: 1,
  },
  card: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  backgroundImage: {
    borderRadius: 16,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    position: 'relative',
    paddingHorizontal: 6,
    paddingTop: 10,
  },
  textContent: {
    paddingRight: 18,
    flex: 1,
  },
  title: {
    color: colors.neutral[0],
    marginBottom: 8,
  },
  subtitle: {
    color: colors.neutral[0],
    opacity: 0.4,
    marginBottom: 20,
  },
  conversionRate: {
    color: colors.neutral[0],
    fontWeight: '600',
  },
  heroImageContainer: {
    position: 'absolute',
    right: 0,
    bottom: 40,
    width: 70,
    height: 70,
    zIndex: 1,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: 8,
    width: '100%',
  },
});

export { RedemptionOptionsStack }; 