import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Pressable,
} from "react-native";
import { H2, B2, B3, H3, SH2, SH1, B4 } from "../ui/typography/typography";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ZetLogo } from "../ui/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckboxIcon from "../ui/icons/CheckboxIcon";
import CheckboxEmptyIcon from "../ui/icons/CheckboxEmptyIcon";

type PhoneInputScreenProps = {
  onContinue: (phoneNumber: string) => void;
};

const PhoneInputScreen: React.FC<PhoneInputScreenProps> = ({ onContinue }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [communicationConsent, setCommunicationConsent] = useState(true);
  const [creditReportConsent, setCreditReportConsent] = useState(false);

  const validatePhoneNumber = (number: string) => {
    // Validate Indian phone number format (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const handleContinue = () => {
    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    // Check if user has agreed to credit report consent
    if (!creditReportConsent) {
      setError("Please agree to the terms for credit report access");
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate API call with a short delay
    setTimeout(() => {
      setIsLoading(false);
      onContinue(phoneNumber);
    }, 800);
  };

  const handlePhoneChange = (text: string) => {
    // Allow only numbers and restrict to 10 digits
    const cleaned = text.replace(/[^0-9]/g, "");
    setPhoneNumber(cleaned);

    // Clear error when user starts typing again
    if (error) setError("");
  };

  // Custom prefix component
  const CustomPrefix = () => (
    <View className="flex-row items-center">
      <Image
        source={require("../../assets/images/India_flag.webp")}
        style={{ height: 20, width: 20, marginRight: 4 }}
      />
      <SH1 className="text-neutral-500 ml-1 mt-1">+91</SH1>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="bg-white"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className=" bg-white">
          <View className="flex flex-col justify-between  px-4 py-8 h-full">
            {/* <View className="flex items-center">
              <ZetLogo width={100} color="primary.500" variant="filled" />
            </View> */}
<View className="flex">
            <View className="mt-8 mb-4">
              <H3 className="text-left">Enter Your Number</H3>
              <B3 className="text-left text-neutral-500 mt-1">
                We'll send sms code to verify your number
              </B3>
            </View>

            <View className="mt-4">
              <Input
                placeholder="Enter your number"
                keyboardType="phone-pad"
                variant="outlined"
                size="xl"
                fullWidth
                value={phoneNumber}
                startIcon={<CustomPrefix />}
                onChangeText={handlePhoneChange}
                error={error}
                maxLength={10}
                autoFocus
              />
            </View>
            </View>
            <View className="flex ">
            {/* Terms and Conditions Checkboxes */}
            <View className="mt-6 space-y-3">
              {/* First checkbox - checked by default */}
              <Pressable
                onPress={() => setCommunicationConsent(!communicationConsent)}
                className="flex-row items-start"
              >
                {communicationConsent ? (
                  <CheckboxIcon
                    size={24}
                    color="success.500"
                    variant="filled"
                    secondaryColor="success.100"
                    width={24}
                    height={24}
                    strokeWidth={1.5}
                    style={{}}
                  />
                ) : (
                  <CheckboxEmptyIcon
                    size={24}
                    color="neutral.400"
                    variant="stroke"
                    secondaryColor="neutral.100"
                    width={24}
                    height={24}
                    strokeWidth={1.5}
                    style={{}}
                  />
                )}
                <View className="flex-1 ml-3">
                  <B4 className="text-neutral-600">
                    I agree to the{" "}
                    <B4 className="text-primary-500">Privacy Policy</B4> and{" "}
                    <B4 className="text-primary-500">Terms of Use</B4> of ZET. I
                    also consent to receive communications via WhatsApp and SMS.
                  </B4>
                </View>
              </Pressable>

              {/* Second checkbox - user must check */}
              <Pressable
                onPress={() => setCreditReportConsent(!creditReportConsent)}
                className="flex-row items-start mt-4"
              >
                {creditReportConsent ? (
                  <CheckboxIcon
                    size={24}
                    color="success.500"
                    variant="filled"
                    secondaryColor="success.100"
                    width={24}
                    height={24}
                    strokeWidth={1.5}
                    style={{}}
                  />
                ) : (
                  <CheckboxEmptyIcon
                    size={24}
                    color="neutral.400"
                    variant="stroke"
                    secondaryColor="neutral.100"
                    width={24}
                    height={24}
                    strokeWidth={1.5}
                    style={{}}
                  />
                )}
                <View className="flex-1 ml-3">
                  <B4 className="text-neutral-600">
                    I allow ZET to access my credit report from RBI approved
                    credit bureaus on an ongoing basis for not exceeding 6
                    months. I also agree to{" "}
                    <B4 className="text-primary-500">
                      Terms & Conditions of Experian
                    </B4>
                    .
                  </B4>
                </View>
              </Pressable>
            </View>

            <View className="mt-6">
              <Button
                label="Continue"
                variant="filled"
                color="primary-500"
                size="xl"
                fullWidth
                onPress={handleContinue}
                loading={isLoading}
                disabled={phoneNumber.length < 10 || !creditReportConsent}
              />
            </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PhoneInputScreen;
