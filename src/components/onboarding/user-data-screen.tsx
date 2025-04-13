import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { H2, B3 } from '../ui/typography/typography';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ZetLogo } from '../ui/icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type UserDataScreenProps = {
  onComplete: (userData: { name: string; email: string }) => void;
};

const UserDataScreen: React.FC<UserDataScreenProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const handleSubmit = () => {
    let isValid = true;

    // Validate name
    if (!validateName(name)) {
      setNameError('Please enter a valid name');
      isValid = false;
    } else {
      setNameError('');
    }

    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!isValid) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onComplete({ name: name.trim(), email: email.trim() });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 px-4 py-8">
            <View className="flex items-center">
              <ZetLogo width={100} color="primary.500" variant="filled" />
            </View>
            
            <View className="mt-8 mb-4">
              <H2 className="text-center">
                Almost done!
              </H2>
              <B3 className="text-center text-neutral-500 mt-2">
                Please provide your details to complete your profile
              </B3>
            </View>
            
            <View className="mt-6">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                variant="outlined"
                size="xl"
                fullWidth
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (nameError) setNameError('');
                }}
                error={nameError}
                autoFocus
              />
            </View>
            
            <View className="mt-4">
              <Input
                label="Email Address"
                placeholder="Enter your email address"
                keyboardType="email-address"
                variant="outlined"
                size="xl"
                fullWidth
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError('');
                }}
                error={emailError}
                autoCapitalize="none"
              />
            </View>
            
            <View className="mt-8">
              <Button
                label="Complete Profile"
                variant="filled"
                color="primary-500"
                size="xl"
                fullWidth
                onPress={handleSubmit}
                loading={isLoading}
                disabled={!name || !email}
              />
            </View>
            
            <View className="mt-4">
              <B3 className="text-center text-neutral-500">
                We'll use this information to personalize your experience
              </B3>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default UserDataScreen; 