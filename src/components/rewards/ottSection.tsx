import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Card } from "../ui/card";
import { Button, ButtonProps } from "../ui/button/button";
import { colors } from "../../styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import {
  B2,
  B3,
  B4,
  B5,
  H3,
  H6,
  H7,
  SH1,
  SH2,
  SH3,
  SH4,
  SH6,
  SH7,
  SH8,
} from "../ui/typography/typography";

// Get screen width for responsive sizing
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.65;

interface OttCardProps {
  logo: any;
  coverImage: any;
  title: string;
  subtitle: string;
  price: string;
  discount?: string;
  onPress?: () => void;
}

const OttCard = ({
  logo,
  coverImage,
  title,
  subtitle,
  price,
  discount,
  onPress,
}: OttCardProps) => {
  return (
    <View
      style={styles.cardContainer}
      className="mr-4 rounded-xl overflow-hidden border-2 border-neutral-0/5"
    >
      <LinearGradient colors={["#170b1d", "#170b1d"]} className="rounded-xl ">
        <View className="p-0 relative h-[300px] ">
          <View className="h-[35%] rounded-t-xl overflow-hidden">
            <View className="absolute z-10 top-0 left-0 w-full h-full bg-neutral-900/50" />
            <Image
              source={coverImage}
              className="w-full h-full"
              resizeMode="cover"
            />
            {discount && (
              <View className="absolute top-2 right-2 bg-[#d6365b] px-2 py-1 rounded-md z-20">
                <B5 className="text-white">Upto {discount} off</B5>
              </View>
            )}
          </View>

          <View className="absolute top-[28%] left-5 h-20 w-20 rounded-xl border-2 border-neutral-0/10 bg-neutral-900 justify-center items-center overflow-hidden">
            <Image
              source={logo}
              className="w-[80%] h-[80%]"
              resizeMode="contain"
            />
          </View>
          {/* <View className='pl-26 pt-4'>
          
          </View> */}
          <View className="px-4 mt-18">
            <H7 className="text-neutral-300">{title}</H7>
            {/* <B5 className="text-neutral-0/50 mt-0.5">
              {subtitle}
            </B5> */}
            <B3 className="text-white mt-1">starts at {price}</B3>
          </View>

          <Button className="absolute bottom-4 left-4 right-4">Buy Now</Button>
        </View>
      </LinearGradient>
    </View>
  );
};

export function OttSection() {
  // OTT platform data with images from ott folder
  const ottPlatforms = [
    {
      id: 1,
      logo: require("../../assets/images/ott/JioHotstar.png"),
      coverImage: require("../../assets/images/ott/iplNew.webp"), // You'll need to create these cover images
      title: "Jio Hotstar",
      subtitle: "IPL, Cricket, TV Shows, Movies and more",
      price: "₹199",
      discount: "10%",
    },
    {
      id: 2,
      logo: require("../../assets/images/ott/Primevideo.png"),
      coverImage: require("../../assets/images/ott/amazonPrimeCover.webp"),
      title: "Amazon Prime Video",
      subtitle: "movies, originals & more",
      price: "₹299",
      discount: "8%",
    },
    {
      id: 3,
      logo: require("../../assets/images/ott/Zee5.png"),
      coverImage: require("../../assets/images/ott/zeeCover.webp"),
      title: "Zee5",
      subtitle: "movies & web series",
      price: "₹149",
      discount: "15%",
    },
    {
      id: 4,
      logo: require("../../assets/images/ott/SonyLiv.png"),
      coverImage: require("../../assets/images/ott/sonyLiveCover.webp"),
      title: "SonyLiv",
      subtitle: "movies & web series",
      price: "₹179",
      discount: "12%",
    },
  ];

  // Handle buy now button press
  const handleBuyNow = (platform: string) => {
    console.log(`Buy Now clicked for ${platform}`);
  };

  return (
    <View>
      <LinearGradient
        colors={["#190224", "#2c0641"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
        className="py-5"
      >
        <View>
          <SH6 className="text-white ml-3 mb-5">
            Your Favourite Shows @ Lower Prices
          </SH6>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + 12} // Card width + margin
          snapToAlignment="start"
          scrollEventThrottle={16}
        >
          {ottPlatforms.map((platform) => (
            <OttCard
              key={platform.id}
              logo={platform.logo}
              coverImage={platform.coverImage}
              title={platform.title}
              subtitle={platform.subtitle}
              price={platform.price}
              discount={platform.discount}
              onPress={() => handleBuyNow(platform.title)}
            />
          ))}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 15,
  },
  cardContainer: {
    width: CARD_WIDTH,
  },
});
