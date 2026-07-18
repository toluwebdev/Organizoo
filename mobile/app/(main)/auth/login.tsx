import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "@/components/auth/Input";
import GlobalButton from "@/components/global/GlobalButton";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useAppContext } from "@/context/AppContext";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
WebBrowser.maybeCompleteAuthSession();
const Login = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "228677396218-3ter8fohpdmm41kmaipbnl8dbkk9smqg.apps.googleusercontent.com",
    iosClientId:
      "228677396218-h7jvdrgnf4554up7ek3v7pofqqc9h1cu.apps.googleusercontent.com",
    androidClientId:
      "228677396218-5j14728jnoq2i2qek157n6dkou2i56s9.apps.googleusercontent.com",
  });
  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication?.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }
  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);
  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {}
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSocialLogin = (platform: string) => {
    // Handle social login logic here based on the platform (Google, Facebook, Apple)
    if (platform.toLocaleLowerCase() === "google") {
      promptAsync();
    }
    console.log(`Logging in with ${platform}`);
  };
  const {
    login,
    loginLoading,
    isLoginEmailError,
    setIsLoginEmailError,
    isLoginPasswordError,
    setIsLoginPasswordError,
  } = useAppContext();
  // 1. Intercept email typing to clear its error state
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (isLoginEmailError) {
      setIsLoginEmailError(false);
    }
  };

  // 2. Intercept password typing to clear its error state
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (isLoginPasswordError) {
      setIsLoginPasswordError(false);
    }
  };
  // handle login button press
  const handleLogin = () => {
    if (!email || !password) {
      console.log("Email and password are required");
    } else {
      login({ email, password });
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-[#f4f7fd] p-5">
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, backgroundColor: "#f4f7fd" }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Text className="text-3xl font-medium ">Welcome Back!</Text>
          <Text className="text-[#a8a8a8] leading-6 mt-1 font-light">
            Glad to have you here again, Lets get started!
          </Text>
          <View className="mt-10 gap-5 flex-1 justify-between">
            <View className="gap-4">
              <Input
                label="Email"
                placeholder="Enter Your Email"
                errorMessage={
                  isLoginEmailError && isLoginPasswordError
                    ? "Email and Password is incorrect"
                    : isLoginEmailError
                      ? "Email is incorrect"
                      : ""
                }
                keyboardType="email-address"
                value={email}
                error={isLoginEmailError}
                setValue={handleEmailChange}
              />
              <Input
                label="Password"
                placeholder="••••••••"
                isPassword={true}
                error={isLoginPasswordError}
                errorMessage={
                  isLoginEmailError && isLoginPasswordError
                    ? "Email and Password is incorrect"
                    : isLoginPasswordError
                      ? "Password is incorrect"
                      : ""
                }
                value={password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                setValue={handlePasswordChange}
              />
              <TouchableOpacity className="self-end ">
                <Text className=" leading-6 mt-1 font-light text-[#100a30]">
                  Forgot password?
                </Text>
              </TouchableOpacity>
              <View>
                <GlobalButton
                  text="Log In"
                  lessBorder={true}
                  isDisabled={!email || !password || loginLoading}
                  onPress={() => handleLogin()}
                  loading={loginLoading}
                />
              </View>
              {/* Divider */}
              <View className="flex-row items-center mb-3">
                <View className="flex-1 h-px bg-gray-200" />
                <Text
                  style={{ fontFamily: "Poppins_400Regular" }}
                  className="mx-4  text-[#a8a8a8]  font-light"
                >
                  Or continue with
                </Text>
                <View className="flex-1 h-px bg-gray-200" />
              </View>

              {/* Social Login Buttons */}
              <View className="flex-row justify-center gap-4 mb-10">
                <TouchableOpacity
                  onPress={() => handleSocialLogin("google")}
                  activeOpacity={0.8}
                  className="w-14 h-14 rounded-2xl border border-gray-200 items-center justify-center bg-white"
                >
                  <FontAwesome name="google" size={22} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSocialLogin("facebook")}
                  activeOpacity={0.8}
                  className="w-14 h-14 rounded-2xl border border-gray-200 items-center justify-center bg-white"
                >
                  <FontAwesome name="facebook" size={22} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSocialLogin("apple")}
                  activeOpacity={0.8}
                  className="w-14 h-14 rounded-2xl border border-gray-200 items-center justify-center bg-white"
                >
                  <FontAwesome name="apple" size={24} color="#000000" />
                </TouchableOpacity>
              </View>
            </View>
            {/* Sign Up Link */}
            <View className="flex-row align-bottom justify-center mt-auto">
              <Text className="text-[#a8a8a8]  font-light">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/auth/signup")}>
                <Text className="font-normal text-[#100a30]">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
