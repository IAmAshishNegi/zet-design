import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  SafeAreaView 
} from 'react-native';
import Rive, { RiveRef } from 'rive-react-native';
import { Stack } from 'expo-router';

// This test page demonstrates various ways to use Rive in Expo
// NOTE: This will only work after running 'npx expo prebuild' and 'npx expo run:ios' or 'npx expo run:android'
// Rive will NOT work in Expo Go as it requires native modules

const RiveTestScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const riveRef = useRef<RiveRef>(null);

  const handlePlay = (animName: string, isStateMachine: boolean) => {
    console.log(`Animation played: ${animName}, isStateMachine: ${isStateMachine}`);
    setLoading(false);
    setError(null);
    setSuccessMessage(`Animation "${animName}" is playing`);
  };

  const handleError = (err: any) => {
    console.error('Rive error:', err);
    setLoading(false);
    setSuccessMessage(null);
    setError(err?.message || 'Unknown error with Rive animation');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Rive Animation Test',
        }}
      />
      
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Rive Animation Test Page</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Important: Rive only works in development builds</Text>
          <Text style={styles.noteText}>
            This screen requires you to run your app with:
          </Text>
          <Text style={styles.codeText}>npx expo prebuild</Text>
          <Text style={styles.codeText}>npx expo run:ios</Text>
          <Text style={styles.codeText}>or npx expo run:android</Text>
          <Text style={styles.noteText}>
            Rive will NOT work in Expo Go as it requires native modules
          </Text>
        </View>

        <View style={styles.statusContainer}>
          {error && <Text style={styles.errorText}>Error: {error}</Text>}
          {successMessage && <Text style={styles.successText}>{successMessage}</Text>}
        </View>

        <Text style={styles.sectionTitle}>Example 1: Loading from URL</Text>
        <View style={styles.animationContainer}>
          <Rive
            ref={riveRef}
            url="https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv"
            artboardName="Avatar 1"
            stateMachineName="avatar"
            style={styles.animation}
            onPlay={handlePlay}
            onError={handleError}
          />
        </View>

        <Text style={styles.sectionTitle}>Example 2: Loading Local Asset</Text>
        <View style={styles.animationContainer}>
          <Rive
            ref={riveRef}
            resourceName="slash_screen" 
            autoplay={true}
            style={styles.animation}
            onPlay={handlePlay}
            onError={handleError}
          />
        </View>

        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle}>Notes on using Rive with Expo:</Text>
          <Text style={styles.notesText}>
            1. Rive animations cannot run in Expo Go
          </Text>
          <Text style={styles.notesText}>
            2. You must run 'npx expo prebuild' to generate native code
          </Text>
          <Text style={styles.notesText}>
            3. For iOS, ensure minimum iOS version is 14.0 in Podfile
          </Text>
          <Text style={styles.notesText}>
            4. You must run on a device or simulator with 'npx expo run:ios/android'
          </Text>
          <Text style={styles.notesText}>
            5. For local assets, use 'resourceName="your_file"' (without .riv extension)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: '#f8f0ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#7F29BD',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7F29BD',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    marginBottom: 6,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    backgroundColor: '#eee',
    padding: 4,
    marginBottom: 6,
  },
  statusContainer: {
    marginBottom: 20,
    minHeight: 50,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    padding: 10,
    backgroundColor: '#ffeeee',
    borderRadius: 4,
  },
  successText: {
    color: 'green',
    fontSize: 14,
    padding: 10,
    backgroundColor: '#eeffee',
    borderRadius: 4,
  },
  animationContainer: {
    height: 250,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  animation: {
    width: 200,
    height: 200,
  },
  notesContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginVertical: 20,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notesText: {
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
});

export default RiveTestScreen; 