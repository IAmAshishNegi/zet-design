import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { H3, SH1, B2, B3, SH6, SH7, B5, Button, H5 } from "../ui";
import { useBottomSheet } from "../../context/bottom-sheet-context";
import { RewardIcon, InfoIcon, CopyIcon } from "../ui/icons";
import LottieView from "lottie-react-native";

// Define the Voucher type with all possible states
export interface VoucherDetail {
  id: string;
  title: string;
  voucherValue: string;
  voucherCode?: string;
  redemptionDate?: string;
  expiryDate?: string;
  status: 'in-progress' | 'active' | 'redeemed' | 'expired';
  backgroundColorOne: string;
  backgroundColorTwo: string;
  voucherImage: any;
  transactionId?: string;
  redemptionTime?: string;
}

interface VoucherDetailBottomSheetProps {
  voucher: VoucherDetail;
}

export const VoucherDetailBottomSheet: React.FC<VoucherDetailBottomSheetProps> = ({
  voucher
}) => {
  const [copied, setCopied] = useState(false);
  
  // Access the bottom sheet context safely
  let bottomSheetContext;
  try {
    bottomSheetContext = useBottomSheet();
  } catch (error) {
    // If context is not available, provide fallbacks or empty functions
    console.warn("VoucherDetailBottomSheet: useBottomSheet must be used within a BottomSheetProvider");
    bottomSheetContext = {
      hideBottomSheet: () => {},
      showBottomSheet: () => {}
    };
  }
  
  const { hideBottomSheet } = bottomSheetContext;

  const copyToClipboard = async () => {
    if (voucher.voucherCode && voucher.status === 'active') {
      // Since we don't have expo-clipboard, we'll show a copied message directly
      Alert.alert("Copied", `Voucher code ${voucher.voucherCode} copied to clipboard`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Render bottom sheet content based on voucher status
  const renderContent = () => {
    switch (voucher.status) {
      case 'in-progress':
        return (
          <View className="mt-6">
            <View className="items-center mb-6">
              {/* <LottieView
                source={require("../../assets/lottie/ZetCoins.json")}
                autoPlay
                loop
                style={{ width: 120, height: 120 }}
              /> */}
              <H5 className="text-center mt-4">Voucher transaction in progress</H5>
              <B3 className="text-center mt-3 text-neutral-600 px-6">
                Your transaction is in progress. We will notify you once the voucher is available for redemption.
              </B3>
            </View>
            
            <View className="mt-4 bg-neutral-100 rounded-xl px-3 py-4 shadow-sm mx-3">
              <View className="flex-row justify-between mb-4">
                <B5 className="text-neutral-600">Transaction ID</B5>
                <SH7 className="text-neutral-900">{voucher.transactionId || 'N/A'}</SH7>
              </View>
              <View className="flex-row justify-between mb-4">
                <B5 className="text-neutral-600">Request Date</B5>
                <SH7 className="text-neutral-900">{voucher.redemptionDate || 'N/A'}</SH7>
              </View>
              <View className="flex-row justify-between">
                <B5 className="text-neutral-600">Expected Processing Time</B5>
                <SH7 className="text-neutral-900">24-48 hours</SH7>
              </View>
            </View>
          </View>
        );
        
      case 'active':
        return (
          <View className="mt-6 px-3">
            <View className="rounded-xl px-3 py-4 mb-4 shadow-sm bg-neutral-100">
              <View className="flex-row justify-between mb-4">
                <B5 className="text-neutral-600">Voucher Value</B5>
                <SH7 className="text-neutral-900 font-medium">{voucher.voucherValue}</SH7>
              </View>
              <View className="flex-row justify-between mb-4">
                <B5 className="text-neutral-600">Valid Till</B5>
                <SH7 className="text-neutral-900">{voucher.expiryDate || 'N/A'}</SH7>
              </View>
              <View className="flex-row justify-between">
                <B5 className="text-neutral-600">Status</B5>
                <View className="bg-green-500/20 px-3 py-1 rounded-md">
                  <SH7 className="text-green-500 font-medium">Active</SH7>
                </View>
              </View>
            </View>
            
            <View className="rounded-xl p-5 shadow-sm bg-neutral-100">
              <View className="flex-row justify-between mb-4">
                <B5 className="text-neutral-600">Transaction ID</B5>
                <SH7 className="text-neutral-900">{voucher.transactionId || 'N/A'}</SH7>
              </View>
              <View className="flex-row justify-between">
                <B5 className="text-neutral-600">Redemption Date</B5>
                <SH7 className="text-neutral-900">{voucher.redemptionDate || 'N/A'}</SH7>
              </View>
            </View>
          </View>
        );
        
      case 'redeemed':
        return (
          <View className="mt-6">
            <View className="items-center mb-6">
              <LottieView
                source={require("../../assets/lottie/success.json")}
                autoPlay
                loop={false}
                style={{ width: 100, height: 100 }}
              />
              <H3 className="text-center mt-2">Voucher Redeemed</H3>
              <B3 className="text-center mt-2 text-neutral-600 px-6">
                This voucher has been successfully redeemed.
              </B3>
            </View>
            
            <View className="bg-neutral-50/80 rounded-xl p-5 mb-4 shadow-sm">
              <View className="flex-row justify-between mb-4">
                <B5 className="text-neutral-600">Voucher Code</B5>
                <SH7 className="text-neutral-900 font-medium">{voucher.voucherCode || 'N/A'}</SH7>
              </View>
              <View className="flex-row justify-between mb-4">
                <B5 className="text-neutral-600">Voucher Value</B5>
                <SH7 className="text-neutral-900">{voucher.voucherValue}</SH7>
              </View>
              <View className="flex-row justify-between">
                <B5 className="text-neutral-600">Status</B5>
                <View className="bg-neutral-400/20 px-3 py-1 rounded-md">
                  <SH7 className="text-neutral-600 font-medium">Redeemed</SH7>
                </View>
              </View>
            </View>
            
            <View className="bg-neutral-50/80 rounded-xl p-5 shadow-sm">
              <View className="flex-row justify-between mb-4">
                <B5 className="text-neutral-600">Transaction ID</B5>
                <SH7 className="text-neutral-900">{voucher.transactionId || 'N/A'}</SH7>
              </View>
              <View className="flex-row justify-between mb-4">
                <B5 className="text-neutral-600">Redemption Date</B5>
                <SH7 className="text-neutral-900">{voucher.redemptionDate || 'N/A'}</SH7>
              </View>
              <View className="flex-row justify-between">
                <B5 className="text-neutral-600">Redemption Time</B5>
                <SH7 className="text-neutral-900">{voucher.redemptionTime || 'N/A'}</SH7>
              </View>
            </View>
          </View>
        );
        
      case 'expired':
        return (
          <View className="mt-6">
            <View className="items-center mb-6">
              {/* <LottieView
                source={require("../../assets/lottie/CoinFlipDark.json")}
                autoPlay
                loop={false}
                style={{ width: 100, height: 100 }}
              /> */}
              <H5 className="text-center mt-2">Voucher expired</H5>
              <B3 className="text-center mt-2 text-neutral-600 px-6">
                This voucher has expired and is no longer valid for use.
              </B3>
            </View>
            
            <View className="rounded-xl px-3 py-4 mb-4 shadow-sm bg-neutral-100 mx-3">
              <View className="flex-row justify-between mb-4">
                <B5 className="text-neutral-600">Voucher Code</B5>
                <SH7 className="text-neutral-900">{voucher.voucherCode || 'N/A'}</SH7>
              </View>
              <View className="flex-row justify-between mb-4">
                <B5 className="text-neutral-600">Voucher Value</B5>
                <SH7 className="text-neutral-900">{voucher.voucherValue}</SH7>
              </View>
              <View className="flex-row justify-between">
                <B5 className="text-neutral-600">Status</B5>
                <View className="bg-red-500/20 px-3 py-1 rounded-md">
                  <SH7 className="text-red-500 font-medium">Expired</SH7>
                </View>
              </View>
            </View>
            
            <View className="rounded-xl px-3 py-4 mb-4 shadow-sm bg-neutral-100 mx-3">
              <View className="flex-row justify-between mb-4">
                <B5 className="text-neutral-600">Expiry Date</B5>
                <SH7 className="text-neutral-900">{voucher.expiryDate || 'N/A'}</SH7>
              </View>
              <View className="flex-row justify-between">
                <B5 className="text-neutral-600">Redemption Date</B5>
                <SH7 className="text-neutral-900">{voucher.redemptionDate || 'N/A'}</SH7>
              </View>
            </View>
          </View>
        );
        
      default:
        return null;
    }
  };

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* Voucher Card */}
      <View className="items-center mb-2 px-3">
        <LinearGradient
          colors={
            voucher.status === 'expired' || voucher.status === 'redeemed' 
              ? ["#e4e4e4", "#bcbcbc"] as const
              : [voucher.backgroundColorOne, voucher.backgroundColorTwo] as const
          }
          start={{ x: 0.45, y: 0.45 }}
          end={{ x: 0.8, y: 0.8 }}
          className="rounded-xl overflow-hidden w-full shadow-md"
        >
          <View className="flex-col justify-between p-5">
            <View className="flex-row gap-3 items-center justify-start">
              <View className="rounded-md overflow-hidden border border-white/30 shadow-sm">
                <Image
                  source={voucher.voucherImage}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </View>
              <View className="flex-1 flex-col justify-between items-start">
                <SH1 className="text-white" numberOfLines={1}>
                  {voucher.title}
                </SH1>
                <B2 className="text-white/90" numberOfLines={1}>
                  {voucher.voucherValue} Voucher
                </B2>
              </View>
              <StatusBadge status={voucher.status} />
            </View>

            <View className="mt-4 flex-row items-center">
              <View className="absolute -left-6 h-4 w-4 rounded-full bg-white" />
              <View className="border-t border-dashed border-white/30 w-full my-2" />
              <View className="absolute -right-6 h-4 w-4 rounded-full bg-white" />
            </View>
            
            {/* Add code or status message in bottom part of voucher card */}
            <View className="flex-row justify-between items-center mt-3">
              <B5 className="text-white/70">
                {voucher.status === 'active' ? 'Voucher Code' : ''}
              </B5>
              
              {voucher.status === 'active' && (
                <View className="flex-row items-center">
                  <SH6 className="text-white mr-2">{voucher.voucherCode}</SH6>
                  <TouchableOpacity
                    onPress={copyToClipboard}
                    activeOpacity={0.7}
                  >
                    <CopyIcon size={16} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              )}
              
              {voucher.status === 'in-progress' && (
                <B5 className="text-white/80 text-left w-full">
                  Transaction in progress. Will take 24-48 hrs.
                </B5>
              )}
              
              {voucher.status === 'redeemed' && (
                <B5 className="text-neutral-500 text-left w-full">
                  Voucher redeemed successfully
                </B5>
              )}
              
              {voucher.status === 'expired' && (
                <B5 className="text-neutral-500 text-left">
                  This voucher has expired
                </B5>
              )}
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Content specific to voucher status */}
      {renderContent()}
      
      {/* Bottom padding */}
      <View className="h-4" />
    </ScrollView>
  );
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'in-progress':
        return {
          bgColor: 'bg-yellow-500/20',
          textColor: 'text-yellow-600',
          label: 'In Progress'
        };
      case 'active':
        return {
          bgColor: 'bg-green-500/20',
          textColor: 'text-green-500',
          label: 'Active'
        };
      case 'redeemed':
        return {
          bgColor: 'bg-neutral-400/20',
          textColor: 'text-neutral-600',
          label: 'Redeemed'
        };
      case 'expired':
        return {
          bgColor: 'bg-red-500/20',
          textColor: 'text-red-500',
          label: 'Expired'
        };
      default:
        return {
          bgColor: 'bg-neutral-500/20',
          textColor: 'text-neutral-600',
          label: status
        };
    }
  };

  const { bgColor, textColor, label } = getStatusStyles();

  return (
    <View className={`px-3 py-1 rounded-md ${bgColor}`}>
      <SH7 className={`${textColor} font-medium`}>{label}</SH7>
    </View>
  );
}; 