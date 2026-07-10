import { Text, View } from "react-native";
import { Redirect } from "expo-router";
import Swiper from "react-native-swiper";
import { useAppContext } from "@/context/AppContext";
const App = () => {
  const { user } = useAppContext();
  if (user) {
    return <Redirect href={"/(main)/(tabs)/(home)/home"} />;
  }
  return <Redirect href={"/auth/welcome"} />;
};
export default App;
