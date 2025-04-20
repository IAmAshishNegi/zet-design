import React, { useContext, useRef, useEffect, useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { colors } from "../../styles/theme";
import { CreditCardIcon, InfoIcon } from "../../components/ui/icons";
import {
  H3,
  B1,
  B2,
  B3,
  SH1,
  SH2,
  SH3,
  H6,
  SH4,
  B4,
  H7,
  H5,
  SH5,
  SH6,
} from "../../components/ui/typography/typography";
import { TabBarVisibilityContext } from "../index";
import { CardTabHeroSection } from "../../components/cards/card-tab-hero-section";
import { Button } from "../../components/ui/button/button";
import { useBottomSheet } from '../../context/bottom-sheet-context';
import SpotlightCarousel from "../../components/carousel/spotlight-carousel";
import LogoMarqueeCarousel from "../../components/carousel/logo-marquee-carousel";
import ChevronCircleRightIcon from "../../components/ui/icons/ChevronCircleRightIcon";

// Use React.memo for frequently reused components
const MemoizedButton = React.memo(Button);
const MemoizedImage = React.memo(Image);

interface CardItem {
  id: string;
  name: string;
  balance: string;
  limit: string;
}

const cards: CardItem[] = [
  {
    id: "1",
    name: "Platinum Credit Card",
    balance: "$2,450.00",
    limit: "$5,000.00",
  },
  {
    id: "2",
    name: "Gold Rewards Card",
    balance: "$1,285.75",
    limit: "$3,000.00",
  },
  {
    id: "3",
    name: "Travel Miles Card",
    balance: "$780.50",
    limit: "$2,500.00",
  },
];

interface PromoCardItem {
  id: string;
  title: string;
  subtitle: string;
  imageSource: any;
}

// PromoCard as a memoized component
const PromoCard = React.memo(({ card }: { card: PromoCardItem }) => (
  <View key={card.id} className="mt-2">
    <View className="w-full flex-row gap-2 items-start mb-1">
      <View>
        <MemoizedImage 
          source={card.imageSource} 
          className="w-10 h-10" 
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      </View>
      <View className="flex-col gap-0 items-start justify-center align-middle">
        <SH6 className="text-black opacity-90">{card.title}</SH6>
        <B4 className="text-black opacity-50">{card.subtitle}</B4>
      </View>
    </View>
  </View>
));

export default function CardsScreen() {
  const { hideTabBar, showTabBar } = useContext(TabBarVisibilityContext);
  const { showBottomSheet } = useBottomSheet();
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isScrolling = useRef(false);

  // Optimize scroll handling to reduce unnecessary updates
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isScrolling.current && event && event.nativeEvent) {
      isScrolling.current = true;
      requestAnimationFrame(() => {
        if (!event || !event.nativeEvent || !event.nativeEvent.contentOffset) {
          isScrolling.current = false;
          return;
        }
        
        const currentScrollY = event.nativeEvent.contentOffset.y;

        if (currentScrollY > lastScrollY.current + 20) {
          hideTabBar();
        } else if (currentScrollY < lastScrollY.current - 20) {
          showTabBar();
        }

        lastScrollY.current = currentScrollY;

        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }

        scrollTimeout.current = setTimeout(() => {
          showTabBar();
          isScrolling.current = false;
        }, 200);
      });
    }
  }, [hideTabBar, showTabBar]);

  // Use a more aggressive cleanup
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // Define the content for the bottom sheet
  const renderBottomSheetContent = useCallback(() => (
    <View style={styles.bottomSheetContentContainer}>
      <View className="flex-row items-center gap-3 mb-4">
        <MemoizedImage 
          source={require("../../assets/images/rbi.png")} 
          className="w-12 h-12" 
          style={{ width: 48, height: 48 }}
          resizeMode="contain"
        />
        <SH1 className="text-black flex-1">SBM Bank FD is secured by RBI</SH1>
      </View>
      <B2 className="text-black opacity-70 mb-6">
        Your FD is insured upto ₹5 lakh by the DIGC under the DICGC Act 1961.
      </B2>
      <MemoizedButton 
        variant="filled" 
        size="lg" 
        className="w-full"
        onPress={() => {
          console.log("Start Application pressed from bottom sheet");
          // Add navigation or action logic here
        }}
      >
        Start Application
      </MemoizedButton>
    </View>
  ), []);

  // Open bottom sheet using the context
  const openRbiInfoSheet = useCallback(() => {
    console.log('Triggering bottom sheet from CardsScreen');
    showBottomSheet(renderBottomSheetContent(), ['40%']); // Pass content and snap points
  }, [showBottomSheet, renderBottomSheetContent]);

  // Memoize static data
  const promoCards: PromoCardItem[] = useMemo(() => [
    {
      id: "1",
      title: "100% Guaranteed Approval",
      subtitle: "No income proof required",
      imageSource: require("../../assets/images/approval.webp"),
    },
    {
      id: "2",
      title: "FD Backed Credit Card",
      subtitle: "Secured Card, FD starts from ₹5000",
      imageSource: require("../../assets/images/fd.webp"),
    },
    {
      id: "3",
      title: "UPI Credit Card",
      subtitle: "Do UPI transactions with rupay card",
      imageSource: require("../../assets/images/upi_card.webp"),
    },
    {
      id: "4",
      title: "Rewards upto ₹25,000",
      subtitle: "Joining bonus, discounts, cashbacks & more",
      imageSource: require("../../assets/images/gift.webp"),
    },
  ], []);

  // Memoize spotlight items
  const spotlightItems = useMemo(() => [
    {
      id: "1",
      backgroundImage: require("../../assets/images/cibil_loan.webp"),
      title: "Fastest Way to Build Credit Score",
      subtitle: "80% of SBM ZET Credit Card holders have built their credit score with 3 months of card usage",
      showDescription: false,
      description: "Regular usage and timely payments help build your credit profile quickly",
      ctaLabel: "Learn More",
      gradientColors: ['rgba(11, 74, 58, 0.7)', 'rgba(2, 29, 25, 0.9)'] as [string, string],
      onPress: () => console.log("Credit Score card pressed")
    },
    {
      id: "2",
      backgroundImage: require("../../assets/images/fd.webp"),
      title: "45 Days Interest Free Credit",
      subtitle: "Manage your finances better",
      description: "Get up to 45 days of interest-free credit on all your purchases",
      ctaLabel: "Learn More",
      onPress: () => console.log("Interest Free card pressed")
    },
    {
      id: "3",
      backgroundImage: require("../../assets/images/fd.webp"),
      title: "Avail Discounts on Top Brands",
      subtitle: "Exclusive offers year-round",
      description: "Enjoy special discounts and cashbacks on popular brands and services",
      ctaLabel: "See Offers",
      onPress: () => console.log("Discounts card pressed")
    },
    {
      id: "4",
      backgroundImage: require("../../assets/images/fd.webp"),
      title: "Earn up to 7% Interest on FD",
      subtitle: "Grow your money while you spend",
      description: "Your security deposit earns high interest rates while backing your credit card",
      ctaLabel: "Calculate Returns",
      onPress: () => console.log("Interest FD card pressed")
    },
    {
      id: "5",
      backgroundImage: require("../../assets/images/fd.webp"),
      title: "Lifetime Free Credit Card",
      subtitle: "No annual charges ever",
      description: "Enjoy all benefits with zero annual or renewal fees for the lifetime of your card",
      ctaLabel: "Apply Now",
      onPress: () => console.log("Lifetime Free card pressed")
    },
    {
      id: "6",
      backgroundImage: require("../../assets/images/fd.webp"),
      title: "Easy Application Process",
      subtitle: "Minimal documentation required",
      description: "Simple digital application with quick approval and minimal paperwork",
      ctaLabel: "Start Now",
      onPress: () => console.log("Easy Application card pressed")
    },
  ], []);

  // Logo carousel data - memoize to prevent recreations
  const topRowLogos = useMemo(() => [
    {
      id: "1",
      source: require("../../assets/images/partners/amazon.webp"),
      label: "Amazon"
    },
    {
      id: "2",
      source: require("../../assets/images/partners/flipkart.webp"),
      label: "Flipkart"
    },
    {
      id: "3",
      source: require("../../assets/images/partners/myntra.webp"),
      label: "Myntra"
    },
    {
      id: "4",
      source: require("../../assets/images/partners/swiggy_one.webp"),
      label: "Swiggy"
    },
    {
      id: "5",
      source: require("../../assets/images/partners/zomato.webp"),
      label: "Zomato"
    },
    {
      id: "6",
      source: require("../../assets/images/partners/jiomart.webp"),
      label: "JioMart"
    },
    {
      id: "7",
      source: require("../../assets/images/partners/zepto.webp"),
      label: "Zepto"
    },
    {
      id: "8",
      source: require("../../assets/images/partners/prime.webp"),
      label: "Amazon Prime"
    },
    {
      id: "9",
      source: require("../../assets/images/partners/pizzahut.webp"),
      label: "Pizza Hut"
    },
    {
      id: "10",
      source: require("../../assets/images/partners/dominos.webp"),
      label: "Dominos"
    }
  ], []);

  const bottomRowLogos = useMemo(() => [
    {
      id: "7",
      source: require("../../assets/images/partners/amazon.webp"),
      label: "Amazon"
    },
    {
      id: "8",
      source: require("../../assets/images/partners/cleartrip.webp"),
      label: "Cleartrip"
    },
    {
      id: "9",
      source: require("../../assets/images/partners/uber.webp"),
      label: "Uber"
    },
    {
      id: "10",
      source: require("../../assets/images/partners/dominos.webp"),
      label: "Dominos"
    },
    {
      id: "11", 
      source: require("../../assets/images/partners/flipkart.webp"),
      label: "Flipkart"
    },
    {
      id: "12",
      source: require("../../assets/images/partners/healthkart.webp"),
      label: "Healthkart"
    },
    {
      id: "13",
      source: require("../../assets/images/partners/jiomart.webp"),
      label: "JioMart"
    },
    {
      id: "14",
      source: require("../../assets/images/partners/makemytrip.webp"),
      label: "MakeMyTrip"
    },
    {
      id: "15",
      source: require("../../assets/images/partners/mcdonald.webp"),
      label: "McDonalds"
    },
    {
      id: "16",
      source: require("../../assets/images/partners/myntra.webp"),
      label: "Myntra"
    },
    {
      id: "17",
      source: require("../../assets/images/partners/pizzahut.webp"),
      label: "Pizza Hut"
    },
    {
      id: "18",
      source: require("../../assets/images/partners/prime.webp"),
      label: "Amazon Prime"
    },
    {
      id: "19",
      source: require("../../assets/images/partners/zomato.webp"),
      label: "Zomato"
    },
    {
      id: "20",
      source: require("../../assets/images/partners/swiggy_one.webp"),
      label: "Swiggy"
    },
    {
      id: "21",
      source: require("../../assets/images/partners/zepto.webp"),
      label: "Zepto"
    },
  ], []);

  // Memoize the logo carousel props
  const logoCarouselProps = useMemo(() => ({
    topRowLogos,
    bottomRowLogos,
    logoSize: 74,
    speed: 30,
    gapBetweenRows: 16,
    containerStyle: { 
      paddingVertical: 24,
    },
    logoStyle: {
      width: 74,
      height: 74,
      resizeMode: 'contain'
    }
  }), [topRowLogos, bottomRowLogos]);

  // Memoize the spotlight carousel props
  const spotlightCarouselProps = useMemo(() => ({
    data: spotlightItems,
    itemHeight: 240,
    autoPlay: false,
    showIndicators: false,
    imageStyle: {
      resizeMode: 'cover',
      height: 240,
      borderRadius: 8
    }
  }), [spotlightItems]);

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={32}
        contentContainerStyle={styles.scrollContent}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
      >
        <CardTabHeroSection />
        <View className="bg-neutral-100 px-3">
          <View className="bg-neutral-0 -mt-20 pt-10 rounded-2xl border border-neutral-200">
            <View>
              <View className="flex-col gap-0 w-full items-center justify-center align-middle">
                <SH1 className="text-black opacity-60">
                  Build 750+ Credit Score with
                </SH1>
                <H3>SBM ZET Credit Card</H3>
              </View>
            </View>
            <View className="flex-col flex-wrap w-full pl-3 pr-1 gap-3 mt-5">
              {promoCards.map(card => (
                <PromoCard key={card.id} card={card} />
              ))}
            </View>
            <View className="mt-6 w-full items-center justify-center">
              <MemoizedButton variant="filled" size="lg" className="w-[60%]">
                Start Application
              </MemoizedButton>
            </View>
            <View className="px-5">
              <View className="flex-row gap-2 items-center justify-center pt-3 pb-4 border-t mt-4 border-neutral-100">
                <View className="flex-row gap-2 items-center justify-center">
                  <MemoizedImage
                    source={require("../../assets/images/rbi.png")}
                    className="w-10 h-10"
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain"
                  />
                </View>
                <View className="flex-row gap-2 items-center justify-center">
                  <B2 className="text-black opacity-60">
                    SBM Bank FDs are secured by RBI
                  </B2>
                  <Pressable onPress={openRbiInfoSheet}>
                    <InfoIcon
                      size={20}
                      color="neutral.700"
                      secondaryColor="neutral.200"
                      variant="duotone"
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="mt-10">
              <View className="mb-4 px-4">
                <H6 className="text-left text-black">
                  Why choose SBM ZET Credit Card
                </H6>
              </View>
            </View>
          {/* Use memoized props */}
          <SpotlightCarousel {...spotlightCarouselProps} />
          
          {/* Logo Marquee Carousel Section */}
          <View className="mt-10">
            <View className="mb-0 px-4">
              <H6 className="text-left text-black">Get Offers on Top Brands</H6>
            </View>
            {/* Use memoized props */}
            <LogoMarqueeCarousel {...logoCarouselProps} />
          </View>
         {/* <View className="mt-10 px-4">
               <View className="flex-row gap-2 mb-4 bg-neutral-0 rounded-xl border border-neutral-200">
                 <View className="flex-row gap-2 items-center justify-center">
                 <Image source={require("../../assets/images/joining_voucher.webp")} className="w-16 h-16" />
                  <View className="flex-row gap-2 items-center justify-center">
                    <SH6 className="text-black opacity-90">Joining Benefits worth ₹25,000</SH6>
                  </View>
                 </View>
                  <View className="flex-row gap-2 items-center justify-center">
                    <ChevronCircleRightIcon 
                      size={20} 
                      color="neutral.700" 
                      secondaryColor="neutral.200" 
                      variant="duotone"
                      width={20}
                      height={20}
                      strokeWidth={2}
                      style={{}}
                    />
                  </View>
           </View> */}
 
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
             <SH1 className="text-black opacity-90 text-center w-full">
               SBM Bank India
             </SH1>
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
         <View className=" bg-neutral-0 pt-16">
           <MemoizedImage 
             source={require("../../assets/images/footer.webp")} 
             className="w-full h-[220px] rounded-xl" 
             resizeMode="contain"
             style={{ width: '100%', height: 220 }}
           />
         </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  title: {
    color: colors.primary[500],
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 90,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardName: {
    color: colors.neutral[800],
    marginLeft: 12,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLabel: {
    color: colors.neutral[500],
    marginBottom: 4,
  },
  cardValue: {
    color: colors.neutral[900],
  },
  bottomSheetContentContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
});
