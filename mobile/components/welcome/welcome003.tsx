import { View, Text, ImageBackground } from "react-native";
import React from "react";

import background2 from "@/assets/background/003.jpg";

import { SafeAreaView } from "react-native-safe-area-context";
const welcome002 = () => {
  return (
    <ImageBackground
      className="h-full  w-full   items-center object-cover"
      source={background2}
    >
      <View className=" h-full w-full  " />
      {/* <SafeAreaView className="h-full">
        
      </SafeAreaView> */}
    </ImageBackground>
  );
};

export default welcome002;
