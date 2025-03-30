import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Switch, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  H1, H2, B3, Typography, 
  setAppFontScale, getAppFontScale 
} from '../components/ui/typography/typography';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function ComponentsScreen() {
  const [inputValue, setInputValue] = useState('');
  const [errorInputValue, setErrorInputValue] = useState('');
  const [responsiveEnabled, setResponsiveEnabled] = useState(true);
  const [fontScale, setFontScale] = useState(getAppFontScale());

  // Function to change the app-wide font scale
  const changeScale = (newScale: number) => {
    setAppFontScale(newScale);
    setFontScale(newScale);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <H1 className="mb-6">UI Components</H1>

        {/* Responsive Controls Section */}
        <H2 className="mb-4 mt-6">Responsive Controls</H2>
        
        <View className="mb-6 p-4 bg-neutral-50 rounded-lg">
          <View className="flex-row justify-between items-center mb-3">
            <B3>Responsive Scaling</B3>
            <Switch 
              value={responsiveEnabled}
              onValueChange={setResponsiveEnabled}
            />
          </View>
          
          <View className="flex-row items-center mb-3">
            <B3 className="mr-2">Font Scale: {fontScale.toFixed(2)}x</B3>
          </View>
          
          <View className="flex-row justify-between gap-2 mb-3">
            <Button 
              size="sm" 
              variant="filled" 
              onPress={() => changeScale(0.8)} 
              responsive={responsiveEnabled}
              color="primary-100"
              label="Small (0.8x)"
            />
            <Button 
              size="sm" 
              variant="filled" 
              onPress={() => changeScale(1.0)} 
              responsive={responsiveEnabled}
              color="primary-100"
              label="Normal (1.0x)"
            />
            <Button 
              size="sm" 
              variant="filled" 
              onPress={() => changeScale(1.2)} 
              responsive={responsiveEnabled}
              color="primary-100"
              label="Large (1.2x)"
            />
          </View>
          
          <View className="mb-3">
            <Input 
              label="Responsive Input Example"
              placeholder="Try typing here..."
              responsive={responsiveEnabled}
              value={inputValue}
              onChangeText={setInputValue}
            />
          </View>
          
          <Typography className="mt-2 p-2 bg-white rounded">
            This UI is {responsiveEnabled ? 'responsive' : 'fixed'} with font scale at {fontScale.toFixed(2)}x
          </Typography>
        </View>

        {/* Buttons Section */}
        <H2 className="mb-4 mt-6">Buttons</H2>
        
        {/* Button Variants */}
        <View className="mb-6">
          <B3 className="mb-2">Variants</B3>
          <View className="flex-row flex-wrap gap-2">
            <Button label="Filled (Default)" responsive={responsiveEnabled} />
            <Button variant="outlined" label="Outlined" responsive={responsiveEnabled} />
            <Button variant="text" label="Text" responsive={responsiveEnabled} />
          </View>
        </View>

        {/* Button Colors */}
        <View className="mb-6">
          <B3 className="mb-2">Color Base</B3>
          <View className="flex-row flex-wrap gap-2">
            <Button color="primary-600" label="Primary" responsive={responsiveEnabled} />
            <Button color="secondary-600" label="Secondary" responsive={responsiveEnabled} />
            <Button color="accent-600" label="Accent" responsive={responsiveEnabled} />
            <Button color="success-600" label="Success" responsive={responsiveEnabled} />
            <Button color="warning-600" label="Warning" responsive={responsiveEnabled} />
            <Button color="error-600" label="Error" responsive={responsiveEnabled} />
            <Button color="info-600" label="Info" responsive={responsiveEnabled} />
            <Button color="neutral-600" label="Neutral" responsive={responsiveEnabled} />
          </View>
        </View>

        {/* Button Color Shades */}
        <View className="mb-6">
          <B3 className="mb-2">Color Shades (Primary)</B3>
          <View className="flex-row flex-wrap gap-2">
            <Button color="primary-100" label="100" responsive={responsiveEnabled} />
            <Button color="primary-200" label="200" responsive={responsiveEnabled} />
            <Button color="primary-300" label="300" responsive={responsiveEnabled} />
            <Button color="primary-400" label="400" responsive={responsiveEnabled} />
            <Button color="primary-500" label="500" responsive={responsiveEnabled} />
            <Button color="primary-600" label="600" responsive={responsiveEnabled} />
            <Button color="primary-700" label="700" responsive={responsiveEnabled} />
            <Button color="primary-800" label="800" responsive={responsiveEnabled} />
            <Button color="primary-900" label="900" responsive={responsiveEnabled} />
          </View>
        </View>

        {/* Other Button Color Variants */}
        <View className="mb-6">
          <B3 className="mb-2">Other Color Variants</B3>
          <View className="flex-row flex-wrap gap-2">
            <Button variant="outlined" color="primary-600" label="Primary Outlined" responsive={responsiveEnabled} />
            <Button variant="outlined" color="error-600" label="Error Outlined" responsive={responsiveEnabled} />
            <Button variant="text" color="primary-600" label="Primary Text" responsive={responsiveEnabled} />
            <Button variant="text" color="error-600" label="Error Text" responsive={responsiveEnabled} />
          </View>
        </View>

        {/* Button Sizes */}
        <View className="mb-6">
          <B3 className="mb-2">Sizes</B3>
          <View className="flex-row flex-wrap items-center gap-2">
            <Button size="sm" label="Small" responsive={responsiveEnabled} />
            <Button size="md" label="Medium" responsive={responsiveEnabled} />
            <Button size="lg" label="Large" responsive={responsiveEnabled} />
            <Button size="xl" label="X-Large" responsive={responsiveEnabled} />
          </View>
        </View>

        {/* Button States */}
        <View className="mb-6">
          <B3 className="mb-2">States</B3>
          <View className="flex-row flex-wrap gap-2">
            <Button label="Default" responsive={responsiveEnabled} />
            <Button disabled label="Disabled" responsive={responsiveEnabled} />
            <Button loading label="Loading" responsive={responsiveEnabled} />
          </View>
        </View>

        {/* Button Width */}
        <View className="mb-6">
          <B3 className="mb-2">Full Width</B3>
          <Button fullWidth label="Full Width Button" responsive={responsiveEnabled} />
        </View>

        {/* Compare Responsive vs Non-Responsive */}
        <View className="mb-6">
          <B3 className="mb-2">Responsive Comparison</B3>
          <View className="flex-row flex-wrap gap-2">
            <Button label="Responsive" responsive={true} />
            <Button label="Fixed Size" responsive={false} />
          </View>
        </View>

        {/* Inputs Section */}
        <H2 className="mb-4 mt-8">Inputs</H2>
        
        {/* Input Variants */}
        <View className="mb-6">
          <B3 className="mb-2">Variants</B3>
          <View className="gap-2">
            <Input 
              label="Outlined (Default)" 
              placeholder="Enter text"
              variant="outlined"
              value={inputValue}
              onChangeText={setInputValue}
              responsive={responsiveEnabled}
            />
            <Input 
              label="Filled" 
              placeholder="Enter text"
              variant="filled"
              value={inputValue}
              onChangeText={setInputValue}
              responsive={responsiveEnabled}
            />
            <Input 
              label="Underlined" 
              placeholder="Enter text"
              variant="underlined"
              value={inputValue}
              onChangeText={setInputValue}
              responsive={responsiveEnabled}
            />
          </View>
        </View>

        {/* Input Sizes */}
        <View className="mb-6">
          <B3 className="mb-2">Sizes</B3>
          <View className="gap-2">
            <Input 
              label="Small" 
              placeholder="Small input"
              size="sm"
              value={inputValue}
              onChangeText={setInputValue}
              responsive={responsiveEnabled}
            />
            <Input 
              label="Medium" 
              placeholder="Medium input"
              size="md"
              value={inputValue}
              onChangeText={setInputValue}
              responsive={responsiveEnabled}
            />
            <Input 
              label="Large" 
              placeholder="Large input"
              size="lg"
              value={inputValue}
              onChangeText={setInputValue}
              responsive={responsiveEnabled}
            />
            <Input 
              label="X-Large" 
              placeholder="X-Large input"
              size="xl"
              value={inputValue}
              onChangeText={setInputValue}
              responsive={responsiveEnabled}
            />
          </View>
        </View>

        {/* Input States */}
        <View className="mb-6">
          <B3 className="mb-2">States</B3>
          <View className="gap-2">
            <Input 
              label="Default" 
              placeholder="Default input"
              value={inputValue}
              onChangeText={setInputValue}
              responsive={responsiveEnabled}
            />
            <Input 
              label="Disabled" 
              placeholder="Disabled input"
              disabled
              value="Disabled input value"
              responsive={responsiveEnabled}
            />
            <Input 
              label="With Error" 
              placeholder="Input with error"
              error="This field has an error"
              value={errorInputValue}
              onChangeText={setErrorInputValue}
              responsive={responsiveEnabled}
            />
            <Input 
              label="With Hint" 
              placeholder="Input with hint"
              hint="This is a helpful hint"
              value={inputValue}
              onChangeText={setInputValue}
              responsive={responsiveEnabled}
            />
          </View>
        </View>

        {/* Input Multiline */}
        <View className="mb-6">
          <B3 className="mb-2">Multiline</B3>
          <Input 
            label="Multiline Input" 
            placeholder="Type multiple lines of text here..."
            multiline
            numberOfLines={4}
            value={inputValue}
            onChangeText={setInputValue}
            responsive={responsiveEnabled}
          />
        </View>

        {/* Full Width Input */}
        <View className="mb-8">
          <B3 className="mb-2">Full Width</B3>
          <Input 
            label="Full Width Input" 
            placeholder="Full width input"
            fullWidth
            value={inputValue}
            onChangeText={setInputValue}
            responsive={responsiveEnabled}
          />
        </View>

        {/* Compare Responsive vs Non-Responsive */}
        <View className="mb-8">
          <B3 className="mb-2">Responsive Comparison</B3>
          <View className="gap-2">
            <Input 
              label="Responsive Input" 
              placeholder="Responsive sizing"
              responsive={true}
              value={inputValue}
              onChangeText={setInputValue}
            />
            <Input 
              label="Fixed Size Input" 
              placeholder="Fixed size (non-responsive)"
              responsive={false}
              value={inputValue}
              onChangeText={setInputValue}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
}); 