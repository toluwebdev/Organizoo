import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const filter = ({ switchSearch }: { switchSearch: () => void }) => {
  return (
    <View className="p-3 pt-7 px-5 gap-3">
      <TouchableOpacity className="flex-row gap-2 items-center">
        <Ionicons name="location-outline" color="black" size={21} />
        <Text className="text-xl font-normal">Lagos</Text>
        <Ionicons name="chevron-down" color="black" size={21} />
      </TouchableOpacity>
      <View className=" shadow-md shadow-gray-200/50 rounded-full justify-between flex-row items-center px-5 bg-white w-full h-[60px]">
        <TouchableOpacity
          className=" active:bg-gray-400/10  rounded-full p-2"
          activeOpacity={0.2}
          onPress={switchSearch}
        >
          <Ionicons name="search" size={20} />
        </TouchableOpacity>
        <Text className="flex-1 px-5 text-gray-500 text-sm">
          Find Things to do
        </Text>
        <View className="rounded-full border p-2.5 border-gray-300 justify-center items-center">
          <Ionicons name="filter" size={20} />
        </View>
      </View>
    </View>
  );
};

export default filter;
