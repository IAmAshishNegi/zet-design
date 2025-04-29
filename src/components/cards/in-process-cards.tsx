import React from 'react';
import { View } from 'react-native';
import { APPLICATION_STATUS } from '../../context/application-state-context';
import { ApplicationStatusCard } from '../ui/application';

interface InProcessCardsProps {
  status: string;
  onContinueApplication: () => void;
  onTrackApplication: () => void;
}

const InProcessCards: React.FC<InProcessCardsProps> = ({
  status,
  onContinueApplication,
  onTrackApplication
}) => {
  return (
    <View className="bg-neutral-0 -mt-2 pt-10">
      <ApplicationStatusCard 
        status={status}
        theme="light"
        onStartApplication={onContinueApplication}
        onTrackApplication={onTrackApplication}
      />
    </View>
  );
};

export default InProcessCards; 