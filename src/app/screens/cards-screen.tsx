import React, { useContext, useRef, useEffect, useCallback, useMemo, useState } from "react";
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
  H4,
} from "../../components/ui/typography/typography";
import { TabBarVisibilityContext } from "../index";
import { CardTabHeroSection, PreActivationCards, InProcessCards, PostActivationCards, CardsContent } from "../../components/cards";
import { Button } from "../../components/ui/button/button";
import { useBottomSheet } from '../../context/bottom-sheet-context';
import SpotlightCarousel from "../../components/carousel/spotlight-carousel";
import LogoMarqueeCarousel from "../../components/carousel/logo-marquee-carousel";
import ChevronCircleRightIcon from "../../components/ui/icons/ChevronCircleRightIcon";
import { useApplicationState, APPLICATION_STATUS } from '../../context/application-state-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApplicationStatusCard } from '../../components/ui/application';

// Use React.memo for frequently reused components
const MemoizedButton = React.memo(Button);
const MemoizedImage = React.memo(Image);

// Constants

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
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const { applicationStatus, setApplicationStatus, isApplicationStarted } = useApplicationState();
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isScrolling = useRef(false);
  const [isPostActivation, setIsPostActivation] = useState(false);

  // Optimize scroll handling to reduce unnecessary updates
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isScrolling.current && event && event.nativeEvent) {
      isScrolling.current = true;
      
      // Store values from the event before the async call
      const currentScrollY = event.nativeEvent.contentOffset.y;
      
      requestAnimationFrame(() => {
        // Don't try to access event inside requestAnimationFrame
        // as the synthetic event is nullified by then
        
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

  // Define the application start bottom sheet content
  const renderApplicationStartContent = useCallback(() => (
    <View style={styles.bottomSheetContentContainer}>
      <SH1 className="text-black text-center mb-2">Start SBM ZET Credit Card Application</SH1>
      <B2 className="text-black opacity-70 text-center mb-6">
        You are starting your application for SBM ZET Credit Card. This process will take about 2 minutes to complete.
      </B2>
      <MemoizedButton 
        variant="filled" 
        size="lg" 
        className="w-full"
        onPress={async () => {
          console.log("Continue Application pressed from bottom sheet");
          // Update application status to IN_PROGRESS
          await setApplicationStatus(APPLICATION_STATUS.IN_PROGRESS);
          // Hide the bottom sheet
          hideBottomSheet();
        }}
      >
        Continue Application
      </MemoizedButton>
    </View>
  ), [hideBottomSheet, setApplicationStatus]);

  // Open bottom sheet using the context
  const openRbiInfoSheet = useCallback(() => {
    console.log('Triggering bottom sheet from CardsScreen');
    showBottomSheet(renderBottomSheetContent(), ['40%']); // Pass content and snap points
  }, [showBottomSheet, renderBottomSheetContent]);

  // Open application start bottom sheet
  const openApplicationStartSheet = useCallback(() => {
    console.log('Opening application start bottom sheet');
    showBottomSheet(renderApplicationStartContent(), ['45%']); // Pass content and snap points
  }, [showBottomSheet, renderApplicationStartContent]);

  // Handle application continue or track
  const handleApplicationContinue = useCallback(() => {
    console.log("Continue Application pressed from status card");
    // Add logic for continuing application
  }, []);

  const handleTrackApplication = useCallback(() => {
    console.log("Track application status pressed");
    // Add logic for tracking application
  }, []);

  const handleManageCard = useCallback(() => {
    console.log("Manage card pressed");
    // Add logic for managing card
  }, []);

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

  // Watch for application status changes to update post-activation state
  useEffect(() => {
    if (applicationStatus === APPLICATION_STATUS.COMPLETED) {
      console.log("ApplicationStatus is COMPLETED, setting isPostActivation to true");
      setIsPostActivation(true);
    } else {
      setIsPostActivation(false);
    }
  }, [applicationStatus]);

  // Add handlers for new post-activation card actions
  const handleViewAllTransactions = useCallback(() => {
    console.log("View all transactions pressed");
    // Add navigation to transactions screen
  }, []);

  const handleViewPaymentSummary = useCallback(() => {
    console.log("View payment summary pressed");
    // Add navigation to payment summary screen
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={32}
        contentContainerStyle={styles.scrollContent}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
      >
        {/* Only show CardTabHeroSection for non-post-activation states */}
        {!isPostActivation && <CardTabHeroSection />}
        
        <View className="bg-neutral-100">
          {isPostActivation ? (
            <PostActivationCards 
              onManageCard={handleManageCard}
              onViewAllTransactions={handleViewAllTransactions}
              onViewPaymentSummary={handleViewPaymentSummary}
            />
          ) : isApplicationStarted ? (
            <InProcessCards 
                status={applicationStatus}
              onContinueApplication={handleApplicationContinue}
              onTrackApplication={handleTrackApplication} 
              />
          ) : (
            <PreActivationCards 
              promoCards={promoCards}
              openApplicationStartSheet={openApplicationStartSheet}
              openRbiInfoSheet={openRbiInfoSheet}
            />
          )}
        </View>
        
        {/* Shared content section - only show for non-post-activation states */}
        {!isPostActivation && (
          <CardsContent 
            spotlightItems={spotlightItems}
            topRowLogos={topRowLogos}
            bottomRowLogos={bottomRowLogos}
            spotlightCarouselProps={spotlightCarouselProps}
            logoCarouselProps={logoCarouselProps}
           />
        )}
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
