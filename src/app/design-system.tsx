import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '../styles/theme';
import { Button } from '../components/ui/button';
import { 
  Typography,
  H1, H2, H3, H4, H5, H6,
  SH1, SH2, SH3, SH4, SH5,
  B1, B2, B3, B4, B5, B6, B7, B8, B9,
  LinkText, LinkTextSm, LinkTextXs,
  ButtonLg, ButtonMd, ButtonSm,
  OverlineMd, OverlineSm,
  setAppFontScale, getAppFontScale
} from '../components/ui/typography/typography';

export default function DesignSystemScreen() {
  const [scale, setScale] = useState(getAppFontScale());
  
  // Function to change the app-wide font scale
  const changeScale = (newScale: number) => {
    setAppFontScale(newScale);
    setScale(newScale);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <H2>Design System</H2>
        
        {/* Responsive Font Scaling Controls */}
        <View className="my-6 p-4 bg-neutral-50 rounded-lg">
          <H4 className="mb-3">Font Scaling</H4>
          <View className="flex-row justify-between items-center mb-2">
            <Typography>Current scale: {scale.toFixed(2)}x</Typography>
          </View>
          <View className="flex-row justify-between mt-2">
            <Button 
              size="sm" 
              variant="filled" 
              onPress={() => changeScale(0.8)} 
              className="flex-1 mr-2"
              color="primary-100"
            >
              Small (0.8x)
            </Button>
            <Button 
              size="sm" 
              variant="filled" 
              onPress={() => changeScale(1.0)} 
              className="flex-1 mx-1"
              color="primary-100"
            >
              Normal (1.0x)
            </Button>
            <Button 
              size="sm" 
              variant="filled" 
              onPress={() => changeScale(1.2)} 
              className="flex-1 ml-2"
              color="primary-100"
            >
              Large (1.2x)
            </Button>
          </View>
          <View className="mt-4 p-2 bg-white rounded">
            <Typography className="mb-1">Sample text at current scale</Typography>
            <Typography weight="bold" className="mb-1">This is bold text</Typography>
            <Typography variant="2xl" className="mb-1">This is larger text (2xl)</Typography>
            <Typography variant="sm" className="mb-1">This is smaller text (sm)</Typography>
          </View>
        </View>
        
        <H3 className="mb-3">Colors</H3>
        <View className="flex-row flex-wrap mb-6">
          {Object.entries(colors).map(([colorName, colorValues]) => {
            if (typeof colorValues === 'object') {
              return Object.entries(colorValues).map(([shade, hexValue]) => (
                <View 
                  key={`${colorName}-${shade}`} 
                  className="w-16 h-16 mr-2 mb-2 justify-center items-center rounded"
                  style={{ backgroundColor: hexValue }}
                >
                  <Typography variant="xs" weight="bold" style={{ color: parseInt(shade) > 500 ? 'white' : 'black' }}>
                    {colorName}
                  </Typography>
                  <Typography variant="10" style={{ color: parseInt(shade) > 500 ? 'white' : 'black' }}>
                    {shade}
                  </Typography>
                </View>
              ));
            }
            return null;
          })}
        </View>

        <H3 className="mb-3">Typography</H3>
        
        <View className="mb-6">
          <H4 className="mb-2">Headings</H4>
          <H1>Heading 1</H1>
          <H2>Heading 2</H2>
          <H3>Heading 3</H3>
          <H4>Heading 4</H4>
          <H5>Heading 5</H5>
          <H6>Heading 6</H6>
        </View>
        
        <View className="mb-6">
          <H4 className="mb-2">Subheadings</H4>
          <SH1>Subheading 1</SH1>
          <SH2>Subheading 2</SH2>
          <SH3>Subheading 3</SH3>
          <SH4>Subheading 4</SH4>
          <SH5>Subheading 5</SH5>
        </View>
        
        <View className="mb-6">
          <H4 className="mb-2">Body Text</H4>
          <B1>Body 1 - Medium 16</B1>
          <B2>Body 2 - Medium 14</B2>
          <B3>Body 3 - Regular 14</B3>
          <B4>Body 4 - Medium 12</B4>
          <B5>Body 5 - Regular 12</B5>
          <B6>Body 6 - Regular 16</B6>
          <B7>Body 7 - Medium 13</B7>
          <B8>Body 8 - Regular 13</B8>
          <B9>Body 9 - Medium 11</B9>
        </View>
        
        <View className="mb-6">
          <H4 className="mb-2">Links</H4>
          <LinkText>Link Text (16px)</LinkText>
          <LinkTextSm>Link Text Small (14px)</LinkTextSm>
          <LinkTextXs>Link Text Extra Small (12px)</LinkTextXs>
        </View>
        
        <View className="mb-6">
          <H4 className="mb-2">Button Text</H4>
          <ButtonLg>Button Large (16px)</ButtonLg>
          <ButtonMd>Button Medium (14px)</ButtonMd>
          <ButtonSm>Button Small (12px)</ButtonSm>
        </View>
        
        <View className="mb-6">
          <H4 className="mb-2">Overlines</H4>
          <OverlineMd>Overline Medium (12px)</OverlineMd>
          <OverlineSm>Overline Small (10px)</OverlineSm>
        </View>

        <H3 className="mb-3">Font Weights</H3>
        <View className="mb-6">
          <Typography variant="xl" weight="regular" className="mb-1">Regular Weight</Typography>
          <Typography variant="xl" weight="medium" className="mb-1">Medium Weight</Typography>
          <Typography variant="xl" weight="semibold" className="mb-1">Semibold Weight</Typography>
          <Typography variant="xl" weight="bold" className="mb-1">Bold Weight</Typography>
        </View>

        <H3 className="mb-3">Letter Spacing</H3>
        <View className="mb-6">
          <Typography variant="xl" tracking="tight" className="mb-1">Tight Letter Spacing</Typography>
          <Typography variant="xl" tracking="normal" className="mb-1">Normal Letter Spacing</Typography>
          <Typography variant="xl" tracking="wide" className="mb-1">Wide Letter Spacing</Typography>
        </View>
        
        <H3 className="mb-3">Custom Text</H3>
        <View className="mb-6">
          <Typography 
            variant="2xl" 
            weight="bold" 
            tracking="wide"
            className="mb-1 text-secondary-600"
          >
            Custom Text Styling
          </Typography>
          
          <Typography 
            variant="lg" 
            weight="medium"
            className="mb-1 text-primary-800"
          >
            With color and different size
          </Typography>
        </View>
        
        <H3 className="mb-6">Individual Responsive Controls</H3>
        <View className="mb-6">
          <Typography 
            variant="xl" 
            responsive={true} 
            minScale={0.8} 
            maxScale={1.5}
            className="mb-2"
          >
            This text uses responsive scaling (default)
          </Typography>
          
          <Typography 
            variant="xl" 
            responsive={false}
            className="mb-2" 
          >
            This text has responsive scaling disabled
          </Typography>
          
          <Typography 
            variant="xl" 
            responsive={true}
            minScale={0.7}
            maxScale={2.0}
            className="mb-2"
          >
            This text has custom scaling parameters (0.7-2.0)
          </Typography>
        </View>

        {/* Components Navigation Section */}
        <View className="mb-8 mt-6">
          <H3 className="mb-3">Components</H3>
          <View className="mb-4">
            <Typography className="mb-2">View all the UI components with interactive examples.</Typography>
            <Link href="/components" asChild>
              <Pressable className="bg-primary-100 p-3 rounded-lg">
                <Typography variant="lg" weight="medium" className="text-center text-primary-900">
                  Go to Components Screen
                </Typography>
              </Pressable>
            </Link>
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
} 