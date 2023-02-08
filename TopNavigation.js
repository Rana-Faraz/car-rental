import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CompareCarsScreen from "./src/screens/app/CompareCarsScreen";
import HomeScreen from "./src/screens/app/HomeScreen";
import ProfileScreen from "./src/screens/app/ProfileScreen";

const Stack = createMaterialTopTabNavigator();

const TopNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: 35,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#e6a869",
        },
      }}
    >
      <Stack.Screen name="Rent" component={HomeScreen} />

      <Stack.Screen name="Compare" component={CompareCarsScreen} />
    </Stack.Navigator>
  );
};

export default TopNavigator;
