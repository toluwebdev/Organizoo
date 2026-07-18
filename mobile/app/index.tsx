import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { useAppContext } from "@/context/AppContext";

const App = () => {
  const { user, authLoading } = useAppContext();

  // Show a native loading spinner while verifying AsyncStorage & fetching profile
  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Once loading is false, safely route the user
  if (user) {
    return <Redirect href={"/(main)/(tabs)/(home)/home"} />;
  }

  return <Redirect href={"/auth/welcome"} />;
};

export default App;
