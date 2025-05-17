import React from 'react';
import { View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ApplicationStatusCard } from '../ui/application';
import { APPLICATION_STATUS } from '../../context/application-state-context';
import AppBar from './app-bar';
import { colors } from '../../styles/theme';

interface InProcessHomeProps {
  status: string;
  handleApplicationContinue: () => void;
  greeting: string;
  name: string;
  avatarImageUrl: string | null;
  onAvatarPress: () => void;
  avatarVariant: 'default' | 'outline' | 'small';
  positiveChange?: boolean;
  isZetPlus?: boolean;
}

const InProcessHome: React.FC<InProcessHomeProps> = ({
  status,
  handleApplicationContinue,
  greeting,
  name,
  avatarImageUrl,
  onAvatarPress,
  avatarVariant,
  positiveChange = true,
  isZetPlus = false
}) => {
  return (
    <>
      {/* App Bar - In Process Styling */}
      <AppBar
        greeting={greeting}
        name={name}
        avatarImageUrl={avatarImageUrl}
        onAvatarPress={onAvatarPress}
        avatarVariant={avatarVariant}
        positiveChange={positiveChange}
        isZetPlus={isZetPlus}
        backgroundColor={colors.background[400]}
        paddingTop={Platform.OS === 'android' ? 32 : 62}
        paddingBottom={14}
        greetingOpacity={0.55}
        nameOpacity={0.85}
        nameStyle={{ fontWeight: '600' }}
        containerStyle={{ 
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(255,255,255,0.08)'
        }}
      />
      
      {/* Background gradient section */}
      <View style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}>
        <LinearGradient
          colors={['#190125', '#190125', '#b351fd79'] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1.5 }}
          locations={[0, 0.5, 1] as const}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            height: '100%',
            width: '100%',
          }}
        />
        <View className='px-3'>
          <View className='px-3 py-10'>
            <ApplicationStatusCard 
              status={status}
              theme="dark"
              onStartApplication={handleApplicationContinue}
              onTrackApplication={handleApplicationContinue}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default InProcessHome; 