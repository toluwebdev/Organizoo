import { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import Welcome1 from "@/components/welcome/welcome001";
import Welcome2 from "@/components/welcome/welcome002";
import Welcome3 from "@/components/welcome/welcome003";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalButton from "@/components/global/GlobalButton";
import { router } from "expo-router";
const Welcome = () => {
  const onboardingSwiperData = [<Welcome1 />, <Welcome2 />, <Welcome3 />];
  const swipeRef = useRef<Swiper>(null);
  const [swiperIndex, setSwiperIndex] = useState<number>(0);
  useEffect(() => {
    if (swiperIndex >= onboardingSwiperData.length - 1) return;

    const interval = setInterval(() => {
      swipeRef.current?.scrollBy(1);
    }, 2000);

    return () => clearInterval(interval);
  }, [swiperIndex, onboardingSwiperData.length]);
  const isLastSlide = swiperIndex === onboardingSwiperData.length - 1;
  return (
    <View className="h-screen bg-transparent relative flex-1">
      <Swiper
        ref={swipeRef}
        onIndexChanged={(index) => setSwiperIndex(index)}
        loop={false}
        activeDot={
          <View className={`w-7 h-2 m-0.5 bg-[#100a30]  rounded-full`} />
        }
        dot={<View className="w-2 h-2 m-0.5 rounded-full bg-[#a8a8a8]" />}
      >
        {onboardingSwiperData.map((t, index) => (
          <View key={index}>{t}</View>
        ))}
      </Swiper>
      <View className=" w-full pb-10 gap-3 px-5 bg-white ">
        <GlobalButton
          text={isLastSlide ? "Get Started" : "Continue"}
          onPress={() => {
            isLastSlide
              ? router.push("/(main)/auth/login")
              : swipeRef.current?.scrollBy(1);
          }}
        />
        <View className="text-center flex gap-0.5 font-light flex-row justify-center  items-center">
          <Text className="font-light">Don't have an account ?</Text>
          <TouchableOpacity
            onPress={() => router.push("/(main)/auth/signup")}
            className="flex justify-center items-center"
          >
            <Text className="text-[#100a30] font-normal">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
