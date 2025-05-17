import React from 'react';
import { View, Pressable, StyleSheet, Platform, ViewStyle, TextStyle, Text } from 'react-native';
import { SH3, H4, Avatar, B3, ChevronRightIcon, HelpIcon } from '../ui';
import { colors } from '../../styles/theme';
import { Image } from 'react-native';

interface AppBarProps {
  greeting: string;
  name: string;
  avatarImageUrl: string | null;
  onAvatarPress: () => void;
  avatarVariant: 'default' | 'outline' | 'small';
  positiveChange?: boolean;
  isZetPlus?: boolean;
  // Style customization props
  containerStyle?: ViewStyle;
  greetingStyle?: TextStyle;
  nameStyle?: TextStyle;
  avatarContainerStyle?: ViewStyle;
  backgroundColor?: string;
  paddingHorizontal?: number;
  paddingTop?: number;
  paddingBottom?: number;
  greetingOpacity?: number;
  nameOpacity?: number;
}

const AppBar: React.FC<AppBarProps> = ({
  greeting,
  name,
  avatarImageUrl,
  onAvatarPress,
  avatarVariant,
  positiveChange = true,
  isZetPlus = false,
  // Style customization props with defaults
  containerStyle,
  greetingStyle,
  nameStyle,
  avatarContainerStyle,
  backgroundColor = colors.background[400],
  paddingHorizontal = 16,
  paddingTop = Platform.OS === 'android' ? 30 : 60,
  paddingBottom = 12,
  greetingOpacity = 0.5,
  nameOpacity = 0.8
}) => {
  return (
    <View style={[
      styles.appBar, 
      { 
        backgroundColor,
        paddingHorizontal,
        paddingTop,
        paddingBottom
      },
      containerStyle
    ]}
    
    >
      <Pressable 
        style={[styles.avatarContainer, avatarContainerStyle]}
        onPress={onAvatarPress}
       
      >
        <Avatar 
          source={avatarImageUrl} 
          name={name}
          borderRadius={12}
          size={48}
          className={positiveChange ? "shadow-success" : "shadow-error"}
          variant={avatarVariant}
          isZetPlus={isZetPlus}
        />
      </Pressable>
      {/* <View style={styles.greetingContainer}>
        <SH3 
          style={{
            opacity: greetingOpacity,
            color: greetingStyle?.color || 'white',
            ...greetingStyle
          }}
        >
          {greeting}
        </SH3>
        <H4 
          style={{
            opacity: nameOpacity,
            color: nameStyle?.color || 'white',
            ...nameStyle
          }}
        >
          {name}
        </H4>
      </View> */}
      <View className="flex-1 flex-row justify-end items-center">
        <View className="flex-row bg-neutral-900/50 items-center gap-1 rounded-full pl-2 pr-3 py-2 border border-neutral-0/10">
        <Image source={require('../../assets/images/rupeeRef.webp')} className="w-4 h-4" />
          <B3 className="text-white">Refer & Earn</B3>
        </View>
        <View className="bg-neutral-900/50 items-center rounded-full px-2 py-2 ml-2 border border-neutral-0/10">
        <HelpIcon size={20} color="white" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  greetingContainer: {
    flex: 1,
  },
  avatarContainer: {
    marginRight: 16,
  },
  
});

export default AppBar; 