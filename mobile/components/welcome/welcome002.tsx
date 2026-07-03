import { View, Text, ImageBackground } from "react-native";
import React from "react";

import background2 from "@/assets/background/002.jpg";

import { SafeAreaView } from "react-native-safe-area-context";
const welcome002 = () => {
  return (
    <ImageBackground
      className="h-full  w-full px-5 items-center object-cover"
      source={background2}
    >
      <SafeAreaView className="h-full">
       
      </SafeAreaView>
    </ImageBackground>
  );
};

export default welcome002;
