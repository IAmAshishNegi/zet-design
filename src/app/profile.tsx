import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Avatar, 
  H4, 
  H5, 
  B2, 
  B3, 
  SH5, 
  Button,
  Divider
} from '../components/ui';
import { 
  CrossIcon, 
  CreditCardIcon,
  ZetCoinLogoIcon,
  HelpIcon,
  ChevronRightIcon
} from '../components/ui/icons';
import { colors } from '../styles/theme';
import { useUser } from '../context/user-context';
import { useBottomSheet } from '../context/bottom-sheet-context';

// Additional custom icon imports or components
const UserProfileIcon = (props: { size: number, color: string }) => (
  <CrossIcon {...props} />
);

const RightArrowIcon = ChevronRightIcon;

const LogoutIcon = (props: { size: number, color: string }) => (
  <CrossIcon {...props} />
);

const StarIcon = (props: { size: number, color: string }) => (
  <CreditCardIcon {...props} />
);

const ShareIcon = (props: { size: number, color: string }) => (
  <HelpIcon {...props} />
);

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showDivider?: boolean;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ 
  icon, 
  title, 
  subtitle, 
  onPress,
  showDivider = true
}) => {
  return (
    <>
      <Pressable 
        className="flex-row items-center py-4" 
        onPress={onPress}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgba(0,0,0,0.05)' : 'transparent'
          }
        ]}
      >
        <View className="w-12 items-center">
          {icon}
        </View>
        <View className="flex-1">
          <B2 className="text-neutral-900">{title}</B2>
          {subtitle && <B3 className="text-neutral-500">{subtitle}</B3>}
        </View>
        <RightArrowIcon size={20} color={colors.neutral[400]} />
      </Pressable>
      {showDivider && <Divider />}
    </>
  );
};

export default function ProfileScreen() {
  const router = useRouter();
  const { userInfo, activateZetPlus } = useUser();
  const { showBottomSheet } = useBottomSheet();

  const handleLogout = () => {
    // Show confirmation bottom sheet
    showBottomSheet(
      <View className="p-4">
        <H5 className="text-center mb-4">Logout Confirmation</H5>
        <B3 className="text-center text-neutral-500 mb-6">Are you sure you want to logout from your account?</B3>
        <View className="flex-row gap-3">
          <Button 
            label="Cancel" 
            size="md"
            color="neutral-200"
            className="flex-1"
            onPress={() => showBottomSheet(null)}
          />
          <Button 
            label="Logout" 
            size="md"
            color="error-500"
            className="flex-1"
            onPress={() => {
              // Handle logout logic here
              showBottomSheet(null);
              // Navigate to login or home
              router.replace('/');
            }}
          />
        </View>
      </View>,
      ['30%']
    );
  };

  const navigateToZetPlus = () => {
    router.push('/zplus-landing');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['left', 'right']}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView className="flex-1">
        {/* User Profile Section */}
        <View className="px-4 py-6 bg-neutral-50 mb-4">
          <View className="flex-row items-center">
            <Avatar 
              source={userInfo.avatarImageUrl} 
              name={userInfo.name}
              size={60}
              variant="default"
              isZetPlus={userInfo.zetPlus.isActive}
            />
            <View className="ml-4">
              <H4>{userInfo.name}</H4>
              <B3 className="text-neutral-500">+91 9876543210</B3>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        <View className="mb-6">
          <SH5 className="px-4 mb-2 text-neutral-500">ACCOUNT</SH5>
          
          <ProfileMenuItem 
            icon={<UserProfileIcon size={24} color={colors.neutral[700]} />}
            title="Personal Details"
            subtitle="Manage your personal information"
            onPress={() => console.log('Navigate to personal details')}
          />
          
          <ProfileMenuItem 
            icon={<CreditCardIcon size={24} color={colors.neutral[700]} />}
            title="My Cards"
            subtitle="View and manage your cards"
            onPress={() => router.push('/cards')}
          />
          
          <ProfileMenuItem 
            icon={<ZetCoinLogoIcon width={24} height={24} />}
            title="Zcoins"
            subtitle={`${userInfo.zcoins.balance} Zcoins available`}
            onPress={() => router.push('/zcoins-screen')}
          />
          
          <ProfileMenuItem 
            icon={<StarIcon size={24} color={colors.primary[500]} />}
            title="Zet Plus"
            subtitle={userInfo.zetPlus.isActive ? "Membership active" : "Upgrade to premium features"}
            onPress={navigateToZetPlus}
          />
        </View>

        <View className="mb-6">
          <SH5 className="px-4 mb-2 text-neutral-500">MORE</SH5>
          
          <ProfileMenuItem 
            icon={<ShareIcon size={24} color={colors.neutral[700]} />}
            title="Refer & Earn"
            subtitle="Invite friends and earn rewards"
            onPress={() => console.log('Navigate to refer & earn')}
          />
          
          <ProfileMenuItem 
            icon={<HelpIcon size={24} color={colors.neutral[700]} />}
            title="Help & Support"
            subtitle="Get help with your account"
            onPress={() => console.log('Navigate to help & support')}
            showDivider={false}
          />
        </View>

        {/* Logout Button */}
        <View className="px-4 mb-8">
          <Button
            label="Logout"
            size="lg"
            color="neutral-100"
            textStyle={{ color: colors.error[500] }}
            startIcon={<LogoutIcon size={20} color={colors.error[500]} />}
            onPress={handleLogout}
          />
        </View>

        {/* App Version */}
        <View className="items-center mb-8">
          <B3 className="text-neutral-400">App Version 1.0.0</B3>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 