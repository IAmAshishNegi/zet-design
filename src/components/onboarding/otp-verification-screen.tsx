import React, { useState, useRef, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, Pressable } from 'react-native';
import { H2, B2, B3, ButtonMd, H3 } from '../ui/typography/typography';
import { Button } from '../ui/button';
import { ZetLogo } from '../ui/icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type OtpVerificationScreenProps = {
  phoneNumber: string;
  onVerificationComplete: () => void;
  onGoBack: () => void;
};

const NUM_OTP_INPUTS = 4;

const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({ 
  phoneNumber, 
  onVerificationComplete,
  onGoBack
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(NUM_OTP_INPUTS).fill(''));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef<(TextInput | null)[]>(Array(NUM_OTP_INPUTS).fill(null));
  
  // Format phone number for display - now showing full number
  const displayPhone = () => {
    const cleaned = phoneNumber.replace(/\s+/g, '').replace('+91', '');
    if (cleaned.length === 10) {
      return `+91 ${cleaned}`;
    }
    return phoneNumber;
  };
  
  // Handle countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown]);
  
  // Handle OTP input changes
  const handleOtpChange = (text: string, index: number) => {
    // Only allow digits
    if (!/^\d*$/.test(text)) return;
    
    // Update the OTP value for this position
    const newOtpValues = [...otpValues];
    newOtpValues[index] = text;
    setOtpValues(newOtpValues);
    
    // Clear error when user types
    if (error) setError('');
    
    // Auto-focus next input if there's a value
    if (text.length === 1 && index < NUM_OTP_INPUTS - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Auto-submit if all digits are filled and this is the last input
    if (text.length === 1 && index === NUM_OTP_INPUTS - 1) {
      const allFilled = newOtpValues.every(value => value.length === 1);
      if (allFilled) {
        // Small delay to allow state update
        setTimeout(() => {
          handleVerify(newOtpValues);
        }, 100);
      }
    }
  };
  
  // Handle backspace for OTP inputs
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      // If current field is empty and we're not at the first field, move to previous
      if (otpValues[index] === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };
  
  // Verify the OTP
  const handleVerify = (values = otpValues) => {
    const otpValue = values.join('');
    
    // Check if any values are empty
    const emptyValues = values.some(value => !value || value === '');
    if (emptyValues) {
      setError('Please enter all digits of the OTP');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      
      // Hardcoded check for "1234" as the correct OTP
      if (otpValue === '1234') {
        // Successful verification
        onVerificationComplete();
      } else {
        // Any other combination is invalid
        setError('Invalid OTP. Please try again.');
      }
    }, 1500);
  };
  
  // Resend OTP
  const handleResend = () => {
    if (!canResend) return;
    
    // Reset state
    setOtpValues(Array(NUM_OTP_INPUTS).fill(''));
    setError('');
    setCountdown(30);
    setCanResend(false);
    
    // Focus the first input
    inputRefs.current[0]?.focus();
    
    // Show success message (could be a toast in a real app)
    // Toast.show('OTP sent successfully');
  };
  
  // Render individual OTP input box
  const renderOtpInput = (index: number) => {
    return (
      <View 
        key={index} 
        className={`w-16 h-16 flex items-center justify-center border rounded-lg ${
          error 
            ? 'border-error-500' 
            : otpValues[index] 
              ? 'border-primary-500' 
              : 'border-neutral-300'
        }`}
        style={{ borderWidth: 1 }}
      >
        <TextInput
          ref={el => inputRefs.current[index] = el}
          value={otpValues[index]}
          placeholder='●' 
          onChangeText={text => handleOtpChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          className="w-full h-full text-center text-neutral-800 text-2xl"
          keyboardType="number-pad"
          maxLength={1}
          caretHidden
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 px-4 py-8">
           
            
            <View className="mt-8 mb-4">
              <H3 className="text-left">
                Verify your number
              </H3>
              <B3 className="text-left text-neutral-500 mt-2">
                Enter the 4-digit code sent to {displayPhone()}
              </B3>
            </View>
            
            <View className="mt-6 flex-row justify-center gap-3">
              {Array(NUM_OTP_INPUTS).fill(0).map((_, index) => renderOtpInput(index))}
            </View>
            
            {error ? (
              <B3 className="text-error-500 text-left mt-6">
                {error}
              </B3>
            ) : null}
            
            <View className="mt-8">
              <Button
                label="Verify"
                variant="filled"
                color="primary-500"
                size="xl"
                fullWidth
                onPress={() => handleVerify()}
                loading={isLoading}
                disabled={otpValues.some(value => value === '')}
              />
            </View>
            
            <View className="mt-6 flex-row justify-center">
              <B3 className="text-neutral-500">
                Didn't receive the code?{' '}
              </B3>
              <Pressable onPress={handleResend} disabled={!canResend}>
                <B3 className={canResend ? "text-primary-500" : "text-neutral-400"}>
                  {canResend ? 'Resend' : `Resend in ${countdown}s`}
                </B3>
              </Pressable>
            </View>
            
            <View className="mt-4 flex-row justify-center">
              <Pressable onPress={onGoBack}>
                <ButtonMd className="text-primary-500">
                  Change Number
                </ButtonMd>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default OtpVerificationScreen; 