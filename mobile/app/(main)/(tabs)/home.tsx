import Filter from "@/components/home/filter";
import Search from "@/components/home/search";
import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Home = () => {
  const [isFilter, setIsFilter] = useState<boolean>(true);
  const switchSearch = () => setIsFilter((prev) => !prev);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F8FAFC",
      }}
    >
      {/* Filters & Search  */}
      {isFilter ? <Filter switchSearch={switchSearch}  /> : <Search switchSearch={switchSearch}/>}
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Home</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
