import React from 'react';
import { View, Pressable, StyleSheet, Platform, ViewStyle, TextStyle, Text } from 'react-native';
import { SH3, H4, Avatar } from '../ui';
import { colors } from '../../styles/theme';

interface AppBarProps {
  greeting: string;
  name: string;
  avatarImageUrl: string | null;
  onAvatarPress: () => void;
  avatarVariant: 'default' | 'outline' | 'small';
  positiveChange?: boolean;
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
    ]}>
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
        />
      </Pressable>
      <View style={styles.greetingContainer}>
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