import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { DocStackIcon, BankIcon, SecureIcon, CreditCardIcon } from '../icons';
import { APPLICATION_STATUS, useApplicationState } from '../../../context/application-state-context';
import { useRouter } from 'expo-router';
import { B1, B2, B3, H5, SH2 } from '../typography/typography';
import { Button } from '../button/button';

interface ApplicationStatusCardProps {
  status: string;
  onStartApplication?: () => void;
  onTrackApplication?: () => void;
  theme?: 'light' | 'dark';
}

const ApplicationStatusCard: React.FC<ApplicationStatusCardProps> = ({
  status,
  onStartApplication,
  onTrackApplication,
  theme = 'light'
}) => {
  const router = useRouter();
  const { setApplicationStatus } = useApplicationState();
  const isCompleted = status === APPLICATION_STATUS.COMPLETED;
  
  const textColorClass = theme === 'dark' ? 'text-white' : 'text-black';
  const textOpacityClass = 'opacity-90';
  const subTextOpacityClass = 'opacity-40';
  
  const handlePress = () => {
    if (isCompleted) {
      onTrackApplication?.();
    } else {
      onStartApplication?.();
    }
  };

  const handleLongPress = async () => {
    // For testing: Toggle between states
    if (isCompleted) {
      await setApplicationStatus(APPLICATION_STATUS.IN_PROGRESS);
    } else {
      await setApplicationStatus(APPLICATION_STATUS.COMPLETED);
    }
  };

  // Get the current step based on application status
  const getCurrentStep = () => {
    switch (status) {
      case APPLICATION_STATUS.NOT_STARTED:
        return 0; // First step active
      case APPLICATION_STATUS.IN_PROGRESS:
        return 1; // First and second steps active
      case APPLICATION_STATUS.COMPLETED:
        return 3; // All steps active
      default:
        return 0;
    }
  };

  const currentStep = getCurrentStep();

  return (
    <View className={`${theme === 'dark' ? 'bg-transparent' : 'bg-neutral-0'} rounded-xl px-5 w-full`}>
      {/* Progress Steps */}
      <View className="flex-row justify-between items-center mb-8">
        {/* Step 1: Document */}
        <View className="items-center z-10">
          <View className={`rounded-full ${currentStep >= 0 ? 'bg-success-500' : 'bg-neutral-200'} p-2`}>
            <DocStackIcon 
              color={currentStep >= 0 ? 'white' : 'neutral.500'} 
              variant="filled" 
              size={20} 
            />
          </View>
        </View>
        
        {/* Connector Line 1 */}
        <View className={`h-[3px] flex-1 ${currentStep >= 1 ? 'bg-success-500' : 'bg-neutral-200'} -mx-2`} />
        
        {/* Step 2: Bank */}
        <View className="items-center z-10">
          <View className={`rounded-full ${currentStep >= 1 ? 'bg-success-500' : 'bg-neutral-200'} p-2`}>
            <BankIcon 
              color={currentStep >= 1 ? 'white' : 'neutral.500'} 
              variant="filled" 
              size={20}
            />
          </View>
        </View>
        
        {/* Connector Line 2 */}
        <View className={`h-[3px] flex-1 ${currentStep >= 2 ? 'bg-success-500' : 'bg-neutral-200'} -mx-2`} />
        
        {/* Step 3: Secure */}
        <View className="items-center z-10">
          <View className={`rounded-full ${currentStep >= 2 ? 'bg-success-500' : 'bg-neutral-200'} p-2`}>
            <SecureIcon 
              color={currentStep >= 2 ? 'white' : 'neutral.500'} 
              variant="filled" 
              size={20}
            />
          </View>
        </View>

        {/* Connector Line 3 */}
        <View className={`h-[3px] flex-1 ${currentStep >= 3 ? 'bg-success-500' : 'bg-neutral-200'} -mx-2`} />
        
        {/* Step 4: Credit Card */}
        <View className="items-center z-10">
          <View className={`rounded-full ${currentStep >= 3 ? 'bg-success-500' : 'bg-neutral-200'} p-2`}>
            <CreditCardIcon 
              color={currentStep >= 3 ? 'white' : 'neutral.500'} 
              variant="filled" 
              size={20}
            />
          </View>
        </View>
      </View>
      
      {/* Content */}
      <View className="items-center">
        <H5 className={`text-2xl font-semibold ${textColorClass} ${textOpacityClass} mb-3`}>
          Complete your Card Application
        </H5>
        
        <B3 className={`text-base ${textColorClass} ${subTextOpacityClass} text-center mb-8`}>
          {isCompleted 
            ? "Your application for SBM ZET Credit Card has been completed. Your card will be delivered shortly."
            : "start your application by filling the credit card application form"
          }
        </B3>
        
        {/* Action Button */}
        <Pressable
        
          onPress={handlePress}
          onLongPress={handleLongPress}
        >
          <Button variant='filled' size='lg'>
            {isCompleted ? 'Track Application' : 'Continue Application'}
          </Button>
        </Pressable>
      </View>
    </View>
  );
};

export default ApplicationStatusCard; 