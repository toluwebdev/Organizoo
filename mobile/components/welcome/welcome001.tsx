import { View, Text, ImageBackground } from "react-native";
import React from "react";
import background1 from "@/assets/background/001.jpg";
import GlobalButton from "../global/GlobalButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
const welcome001 = () => {
  return (
    <>
      <ImageBackground
        className="h-full w-full  pb-10 px-5  object-cover"
        source={background1}
      >
        <SafeAreaView className="flex-1 justify-end items-start ">
          <Text className="text-3xl  leading-10 mb-1">
            Step into adventure-one delightful journey at a time.
          </Text>
          <Text className="text-[#a8a8a8] leading-6 font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi  sit amet consectetur adipisicing elit. </Text>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default welcome001;
