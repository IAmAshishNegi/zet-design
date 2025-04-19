import React, { useContext, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { colors } from '../../styles/theme';
import { ScoreIcon } from '../../components/ui/icons';
import { H1, H3, H5, B2 } from '../../components/ui/typography/typography';
import { TabBarVisibilityContext } from '../index';

export default function ScoreScreen() {
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

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <H3 style={styles.title}>Credit Score</H3>
        <View style={styles.content}>
          <View style={styles.scoreContainer}>
            <ScoreIcon size={48} color="primary.500" variant="duotone" />
            <H1 style={styles.scoreValue}>780</H1>
            <H5 style={styles.scoreLabel}>Excellent</H5>
          </View>
          <B2 style={styles.subtitle}>Your credit score has improved by 15 points this month</B2>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    color: colors.primary[500],
    marginVertical: 16,
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 90,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreValue: {
    color: colors.primary[500],
    marginTop: 16,
  },
  scoreLabel: {
    color: colors.success[500],
  },
  subtitle: {
    color: colors.neutral[500],
    textAlign: 'center',
  }
}); 