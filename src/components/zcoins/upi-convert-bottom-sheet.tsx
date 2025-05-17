import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useBottomSheet } from "../../context/bottom-sheet-context";
import { H3, SH1, B2, B3, H5, Button, Input, SH3, SH4 } from "../ui";
import LottieView from "lottie-react-native";
import { CheckCircleIcon, CrossCircleIcon } from "../ui/icons";

interface UpiConvertBottomSheetProps {
  amount: string;
  coinsToConvert: string;
  onConversionSuccess: () => void;
}

export const UpiConvertBottomSheet: React.FC<UpiConvertBottomSheetProps> = ({
  amount,
  coinsToConvert,
  onConversionSuccess,
}) => {
  const [isConverted, setIsConverted] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isUpiGenerallyValid, setIsUpiGenerallyValid] = useState<boolean | null>(null);
  const { hideBottomSheet } = useBottomSheet();

  const validateUpiIdInternal = (id: string): boolean => {
    if (!id) {
      return false;
    }
    // Simple UPI ID validation - this should be enhanced with proper regex if needed
    return id.includes("@");
  };

  const handleVerifyUpiId = () => {
    if (validateUpiIdInternal(upiId)) {
      setIsUpiVerified(true);
      setValidationMessage("UPI ID is valid");
      setIsUpiGenerallyValid(true);
    } else {
      setIsUpiVerified(false);
      setValidationMessage("UPI ID not valid. Please enter a valid UPI ID");
      setIsUpiGenerallyValid(false);
    }
  };

  const handleConvertNow = () => {
    if (isUpiVerified) {
      // Simulate conversion
      setIsConverted(true);
      // Call the callback to update parent component state
      onConversionSuccess();
    }
  };

  const handleClose = () => {
    hideBottomSheet();
  };

  // Render success view based on isConverted state
  if (isConverted) {
    return (
      <SuccessView 
        amount={amount}
        onClose={handleClose}
      />
    );
  }

  // UPI Input view
  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View className="flex-row justify-between items-center mb-4">
          <H5>Add UPI Details</H5>
        </View>
        
        {/* Conversion Info */}
        <View className="bg-neutral-50 rounded-xl p-4 mb-6 shadow-sm">
          <View className="flex-row justify-between items-center mb-3">
            <B3 className="text-neutral-600">Converting</B3>
            <View className="flex-row items-center">
              <SH1>{coinsToConvert}</SH1>
              <View className="ml-1">
                <LottieView
                  source={require("../../assets/lottie/ZetCoins.json")}
                  autoPlay
                  loop
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </View>
            </View>
          </View>
          <View className="flex-row justify-between items-center">
            <B3 className="text-neutral-600">Cash Amount</B3>
            <SH1>₹{amount}</SH1>
          </View>
        </View>
        
        {/* UPI ID input */}
        <View className="mb-6">
          <Input
            label="UPI ID"
            placeholder="username@bankname"
            value={upiId}
            onChangeText={(text) => {
              setUpiId(text);
              setIsUpiVerified(false);
              setValidationMessage(null);
              setIsUpiGenerallyValid(null);
            }}
            size="lg"
            variant="outlined"
            fullWidth
          />
          {validationMessage && (
            <View className={`mt-2 px-2 py-2 flex-row items-center justify-start ${isUpiGenerallyValid ? "bg-success-50/90" : "bg-error-50"} rounded-lg`}>
              {isUpiGenerallyValid ? (
                <CheckCircleIcon variant="filled" size={16} color="green" />
              ) : (
                <CrossCircleIcon variant="filled" size={16} color="red" />
              )}
              <SH4 className={`${isUpiGenerallyValid ? "text-success-500" : "text-error-500"} ml-1`}>
                {validationMessage}
              </SH4>
            </View>
          )}
        </View>
        
        {/* Information box */}
        {/* <View className="bg-blue-50 rounded-xl p-4 mb-6 flex-row">
          <View className="mr-3 mt-0.5">
            <InfoIcon size={16} color="#3b82f6" />
          </View>
          <B3 className="text-blue-700 flex-1">
            The converted amount will be transferred to your UPI ID within 24-48 hours. Please ensure you've entered the correct UPI ID.
          </B3>
        </View> */}
      </ScrollView>

      {/* Fixed Button at bottom */}
      <View style={styles.buttonContainer}>
        <Button
          variant="filled"
          size="lg"
          fullWidth
          onPress={isUpiVerified ? handleConvertNow : handleVerifyUpiId}
          disabled={!isUpiVerified && !upiId}
        >
          {isUpiVerified ? "Continue Conversion" : "Verify UPI ID"}
        </Button>
      </View>
    </View>
  );
};

// Separate component for success view
interface SuccessViewProps {
  amount: string;
  onClose: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ 
  amount,
  onClose
}) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, styles.successScrollContent]}
      >
        <View className="items-center justify-center">
          <LottieView
            source={require("../../assets/lottie/success.json")}
            autoPlay
            loop={false}
            style={{
              height: 120,
              width: 120,
            }}
          />
          <H3 className="text-center mt-2">Conversion Successful</H3>
          <B3 className="text-center text-neutral-600 mt-3 px-6">
            ₹{amount} will be transferred to your UPI ID within 24-48 hours. You can continue using the app.
          </B3>
        </View>
      </ScrollView>

      {/* Fixed Button at bottom */}
      <View style={styles.buttonContainer}>
        <Button
          variant="filled"
          size="lg"
          fullWidth
          onPress={onClose}
        >
          Done
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 80, // Add padding to ensure content isn't hidden behind fixed button
  },
  successScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    paddingTop: 12,
  },
}); 