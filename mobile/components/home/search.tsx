import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Search = ({ switchSearch }: { switchSearch: () => void }) => {
  return (
    <View className="p-3  pt-7 px-5 gap-3">
      <View className="flex-row justify-between">
        <Text className="text-2xl">Search</Text>
        <TouchableOpacity onPress={switchSearch}>
          <Ionicons name="close" size={25} />
        </TouchableOpacity>
      </View>
      <View className="flex-row  px-5 bg-white border rounded-md w-full h-[60px] items-center gap-2">
        <Ionicons size={20} name="search" />
        <TextInput
          className=" placeholder:text-gray-500 flex-1 outline-none border-none text-sm h-full"
          placeholder="Search events...."
        />
      </View>
    </View>
  );
};

export default Search;
