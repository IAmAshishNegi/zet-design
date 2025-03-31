import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { 
  Typography, 
  H1, H2, H3, H4, H5, H6, H7,
  SH1, SH2, SH3, SH4, SH5,
  B1, B2, B3, B4, B5, B6, B7, B8, B9,
  ButtonLg, ButtonMd, ButtonSm,
  LinkText, LinkTextSm, LinkTextXs,
  OverlineMd, OverlineSm,
  ScoreDigit
} from '../../components/ui/typography/typography';
import { colors } from '../../styles/theme';

export default function TypographyDebug() {
  // Add debug logs on component mount
  useEffect(() => {
    // Log important component definitions
    // console.log('SH2 component:', SH2);
    
    // Log all component functions to check if they're defined correctly
    const components = {
      Typography, H1, H2, H3, H4, H5, H6, H7,
      SH1, SH2, SH3, SH4, SH5,
      B1, B2, B3, B4, B5, B6, B7, B8, B9,
      ButtonLg, ButtonMd, ButtonSm
    };
    
    // console.log('Typography components available:', Object.keys(components));
    
    // Check fontFamilyMap from imported Typography
    try {
      // This is a dynamic attempt to access the internal fontFamilyMap
      const typographyModule = require('../../components/ui/typography/typography');
      // console.log('fontFamilyMap:', typographyModule.fontFamilyMap);
    } catch (error) {
      // console.error('Error getting fontFamilyMap:', error);
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diagnosing Typography Issues</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>SH2 Component Tests</Text>
          
          {/* Test 1: Standard SH2 */}
          <View style={styles.testCase}>
            <Text style={styles.testLabel}>Standard SH2:</Text>
            <SH2>This is SH2 text</SH2>
          </View>
          
          {/* Test 2: SH2 with style */}
          <View style={styles.testCase}>
            <Text style={styles.testLabel}>SH2 with style:</Text>
            <SH2 style={{color: colors.primary[500]}}>SH2 with custom style</SH2>
          </View>
          
          {/* Test 3: SH2 with className */}
          <View style={styles.testCase}>
            <Text style={styles.testLabel}>SH2 with className:</Text>
            <SH2 className="text-primary-500">SH2 with className</SH2>
          </View>
          
          {/* Test 4: SH2 with both */}
          <View style={styles.testCase}>
            <Text style={styles.testLabel}>SH2 with both:</Text>
            <SH2 style={{fontFamily: 'THICCCBOI-Bold'}} className="text-primary-700">
              SH2 with explicit fontFamily and className
            </SH2>
          </View>
        </View>
        
        {/* Other component tests */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Other Component Tests</Text>
          
          <View style={styles.testCase}>
            <Text style={styles.testLabel}>H3:</Text>
            <H3>H3 Component</H3>
          </View>
          
          <View style={styles.testCase}>
            <Text style={styles.testLabel}>SH3:</Text>
            <SH3>SH3 Component</SH3>
          </View>
          
          <View style={styles.testCase}>
            <Text style={styles.testLabel}>B2:</Text>
            <B2>B2 Component</B2>
          </View>
          
          <View style={styles.testCase}>
            <Text style={styles.testLabel}>ButtonLg:</Text>
            <ButtonLg>ButtonLg Component</ButtonLg>
          </View>
          
          <View style={styles.testCase}>
            <Text style={styles.testLabel}>ScoreDigit:</Text>
            <ScoreDigit>5</ScoreDigit>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.primary[700],
  },
  card: {
    backgroundColor: colors.neutral[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.primary[600],
  },
  testCase: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    paddingBottom: 8,
  },
  testLabel: {
    fontSize: 14,
    color: colors.neutral[500],
    marginBottom: 4,
  },
}); 