import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/auth/Input";
import GlobalButton from "@/components/global/GlobalButton";
import { useAppContext, User } from "@/context/AppContext";
import RNPickerSelect from "react-native-picker-select";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [onboardingLoading, setOnboardingLoading] = useState(false);

  // Step 1: Account Type & Basics
  const { user } = useAppContext();
  const [data, setData] = useState<User | null>(null);

  // Safely sync context user data once it's loaded
  useEffect(() => {
    console.log(user);
    if (user) {
      setData(user);
    }
  }, []);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      // handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleUpdateField = (field: keyof User, value: string) => {
    setData((prev) => {
      if (!prev) return { [field]: value } as unknown as User;
      return { ...prev, [field]: value };
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f4f7fd] p-5">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          {step > 1 ? (
            <TouchableOpacity onPress={handleBack} className="p-2 -ml-2">
              <Ionicons name="arrow-back" size={24} color="#100a30" />
            </TouchableOpacity>
          ) : (
            <View className="w-10" />
          )}
          <Text className="text-gray-400 font-medium">
            Step {step} of {totalSteps}
          </Text>
        </View>

        {/* Progress Bar */}
        <View className="h-1.5 w-full bg-gray-200 rounded-full mb-8 overflow-hidden">
          <View
            className="h-full bg-[#100a30]"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* STEP 1: ACCOUNT TYPE & BIOLOGY */}
          {step === 1 && (
            <View className="gap-y-4">
              <Input
                label="First Name"
                placeholder="Enter your first name"
                value={data?.firstName || ""}
                setValue={(text) => handleUpdateField("firstName", text)}
              />
              <Input
                label="Last Name"
                placeholder="Enter your last name"
                value={data?.lastName || ""}
                setValue={(text) => handleUpdateField("lastName", text)}
              />

              {/* Gender Picker Container */}
              <View className="flex-col">
                <Text className="text-gray-700 font-medium mb-2 text-sm">
                  Gender
                </Text>
                <View className="relative w-full bg-white border border-gray-200 rounded-xl">
                  <RNPickerSelect
                    placeholder={{
                      label: "Select your gender",
                      value: null,
                      color: "#9ca3af",
                    }}
                    items={genderOptions}
                    value={data?.gender || null}
                    onValueChange={(value) =>
                      handleUpdateField("gender", value)
                    }
                    darkTheme
                    style={pickerStyles}
                    useNativeAndroidPickerStyle={false} // Crucial for custom Android styling
                    Icon={() => {
                      return (
                        <View style={styles.iconContainer}>
                          <Ionicons
                            name="chevron-down"
                            size={20}
                            color="#9ca3af"
                          />
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </View>
          )}

          {/* Footer Navigation Button */}
          <View className="mt-auto pt-6">
            <GlobalButton
              text={step === totalSteps ? "Finish" : "Continue"}
              loading={onboardingLoading}
              onPress={handleNext}
              lessBorder
              isDisabled={step === 2 && (!city || !country)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Custom Stylesheet for the picker components since RNPickerSelect requires direct objects
const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    color: "#111827",
    paddingRight: 40, // Ensures text doesn't overlap the chevron icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: "#111827",
    paddingRight: 40,
  },
});

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    right: 16,
    top: Platform.OS === "ios" ? 18 : 16, // Centers the drop arrow perfectly vertically
  },
});

export default Onboarding;
