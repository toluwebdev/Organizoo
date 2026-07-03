import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  error?: boolean;
  errorMessage?: string;
  setValue: any;
  keyboardType?: any;
  isPassword?: boolean;
  showPassword?: boolean;
  setShowPassword?: any;
  icon?: React.ReactNode;
}
const Input = ({
  label,
  placeholder,
  value,
  error,
  keyboardType,
  showPassword,
  setShowPassword,
  setValue,
  errorMessage,
  isPassword,
}: InputProps) => {
  return (
    <View className="flex-col gap-1">
      <Text>{label}</Text>
      <View
        className={`flex-row h-[48px] items-center bg-gray-50 border ${error ? "border-red-500" : "border-gray-200"} rounded-2xl px-4`}
      >
        <TextInput
          className={`flex-1 h-full ${error ? "text-red-500" : "text-gray-900"} font-extralight`}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType || "default"}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          onChangeText={setValue}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && errorMessage && (
        <Text className="text-red-500 text-sm ">{errorMessage}</Text>
      )}
    </View>
  );
};

export default Input;
