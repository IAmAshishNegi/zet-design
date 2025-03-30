import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Typography } from '../components/ui/typography/typography';

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <Typography variant="3xl" weight="semibold" className="mb-8">
          Hello from Expo!
        </Typography>
        
        <Link href="/design-system" asChild>
          <Pressable style={styles.button}>
            <Typography variant="lg" weight="medium" className="text-neutral-50">
              Go to Design System
            </Typography>
          </Pressable>
        </Link>
        
        <Link href="/components" asChild>
          <Pressable style={[styles.button, { marginTop: 16, backgroundColor: '#3b82f6' }]}>
            <Typography variant="lg" weight="medium" className="text-neutral-50">
              Go to Components
            </Typography>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
});

export default HomeScreen; 