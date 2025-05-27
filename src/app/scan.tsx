import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H4, Button } from '../components/ui';
import { CrossIcon } from '../components/ui/icons';
import { colors } from '../styles/theme';

export default function ScanScreen() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Close button at top right */}
      <View style={styles.closeButtonContainer}>
        <Button
          size="sm"
          color="transparent"
          onPress={handleClose}
          startIcon={<CrossIcon size={24} color={colors.neutral[900]} />}
          className="p-0"
        />
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <H4 style={styles.text}>Scan Screen Comes here</H4>
        <Button
          label="Close"
          size="lg"
          color="primary-600"
          className="mt-6"
          onPress={handleClose}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  text: {
    color: colors.neutral[900],
    textAlign: 'center',
  }
}); 