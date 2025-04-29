import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { H6, B2, B4 } from '../ui/typography/typography';
import SpotlightCarousel from '../carousel/spotlight-carousel';
import LogoMarqueeCarousel from '../carousel/logo-marquee-carousel';

// Use React.memo for frequently reused components
const MemoizedImage = React.memo(Image);

interface CardsContentProps {
  spotlightItems: any[];
  topRowLogos: any[];
  bottomRowLogos: any[];
  spotlightCarouselProps: any;
  logoCarouselProps: any;
}

const CardsContent: React.FC<CardsContentProps> = ({
  spotlightItems,
  topRowLogos,
  bottomRowLogos,
  spotlightCarouselProps,
  logoCarouselProps
}) => {
  return (
    <>
      <View className="mt-10">
        <View className="mb-4 px-4">
          <H6 className="text-left text-black">
            Why choose SBM ZET Credit Card
          </H6>
        </View>
      </View>
      
      {/* Spotlight Carousel */}
      <SpotlightCarousel {...spotlightCarouselProps} />
      
      {/* Logo Marquee Carousel Section */}
      <View className="mt-10">
        <View className="mb-0 px-4">
          <H6 className="text-left text-black">Get Offers on Top Brands</H6>
        </View>
        <LogoMarqueeCarousel {...logoCarouselProps} />
      </View>
      
      {/* Banking Partner Section */}
      <View className="mt-4 pt-7 px-4 bg-neutral-0">
        <View className="flex-row gap-2 mb-4 bg-neutral-0">
          <H6 className="text-black opacity-90">
            Know About Our Banking Partner
          </H6>
        </View>
        <View className="flex-row gap-2 mb-4 bg-neutral-0 rounded-xl">
          <MemoizedImage
            source={require("../../assets/images/sbm_bank.webp")}
            className="w-full h-36 rounded-xl"
            resizeMode="cover"
            style={{ width: '100%', height: 144 }}
          />
        </View>
        <View className="flex-row gap-2 mb-1 bg-neutral-0 rounded-xl">
          <H6 className="text-black opacity-90 text-center w-full">
            SBM Bank India
          </H6>
        </View>
        <View className="flex-row gap-2 mb-4 bg-neutral-0 rounded-xl">
          <B2 className="text-black opacity-60 text-center w-full">
            Branches in major cities like Mumbai, Chennai, Bangalore,
            Hyderabad and New Delhi.{" "}
          </B2>
        </View>
        <View className="flex-row gap-2 mb-4 py-2 bg-success-100 rounded-xl">
          <B4 className="text-success-900 text-center w-full">
            50 Lakh+ Happy Customers
          </B4>
        </View>
      </View>
      
      {/* Footer Image */}
      <View className="bg-neutral-0 pt-16">
        <MemoizedImage 
          source={require("../../assets/images/footer.webp")} 
          className="w-full h-[220px] rounded-xl" 
          resizeMode="contain"
          style={{ width: '100%', height: 220 }}
        />
      </View>
    </>
  );
};

export default CardsContent; 