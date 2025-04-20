import React, { useContext, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";
import { Image } from "react-native";
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
} from "../../components/ui/typography/typography";
import { TabBarVisibilityContext } from "../index";
import { CardTabHeroSection } from "../../components/cards/card-tab-hero-section";
import { Button } from "../../components/ui/button/button";

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

const promoCards: PromoCardItem[] = [
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
 
];

export default function CardsScreen() {
  const { hideTabBar, showTabBar } = useContext(TabBarVisibilityContext);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll events to show/hide tab bar
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    // Determine scroll direction
    if (currentScrollY > lastScrollY.current + 10) {
      // Scrolling down - hide tab bar
      hideTabBar();
    } else if (currentScrollY < lastScrollY.current - 10) {
      // Scrolling up - show tab bar
      showTabBar();
    }

    lastScrollY.current = currentScrollY;

    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set a timeout to show the tab bar when scrolling stops
    scrollTimeout.current = setTimeout(() => {
      showTabBar();
    }, 1000);
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const renderCard = ({ item }: { item: CardItem }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <CreditCardIcon size={32} color="primary.500" variant="duotone" />
        <SH1 style={styles.cardName}>{item.name}</SH1>
      </View>
      <View style={styles.cardDetails}>
        <View>
          <B2 style={styles.cardLabel}>Current Balance</B2>
          <B1 style={styles.cardValue}>{item.balance}</B1>
        </View>
        <View>
          <B2 style={styles.cardLabel}>Credit Limit</B2>
          <B1 style={styles.cardValue}>{item.limit}</B1>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        <CardTabHeroSection />
        <View className="bg-neutral-100 px-3">
          <View className="bg-neutral-0 -mt-20 pt-10  rounded-2xl border border-neutral-200">
        <View>
          <View className="flex-col gap-0 w-full items-center justify-center align-middle">
            <SH1 className="text-black opacity-60">Build 750+ Credit Score with</SH1>
            <H3>SBM ZET Credit Card</H3>
          </View>
        </View>
        <View className="flex-col flex-wrap w-full pl-3 pr-1 gap-3 mt-5">
          {promoCards.map((card) => (
            <View key={card.id} className="mt-2">
            <View
             
              className="w-full flex-row gap-2 items-left  mb-1"
            >
              <View>
                <Image source={card.imageSource} className="w-10 h-10" />
              </View>
              <View className="flex-col gap-0 items-left justify-center align-middle">
                <SH1 className="text-black opacity-90">{card.title}</SH1>
                <B4 className="text-black opacity-50">{card.subtitle}</B4>
              </View>
            </View>
            </View>
          ))}
        </View>
        <View className="mt-6 w-full items-center justify-center">
        <Button variant="filled" size="lg" className="w-[60%]">Start Application</Button>
        </View>
        <View className="px-5">
        <View className="flex-row gap-2 items-center justify-center pt-3 pb-4 border-t mt-4 border-neutral-100">
          <View className="flex-row gap-2 items-center justify-center">
          <Image source={require("../../assets/images/rbi.png")} className="w-10 h-10" />
          </View>
          <View className="flex-row gap-2 items-center justify-center">
          <B2 className="text-black opacity-60">
            SBM Bank FDs are secured by RBI
          </B2>
          <InfoIcon size={20} color="neutral.700" secondaryColor="neutral.200" variant="duotone" />
          </View>
        </View>
        </View>
        </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 90,
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
});
