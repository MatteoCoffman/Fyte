import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import MainScreen from "./screens/MainScreen";
import BetsScreen from "./screens/BetsScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  const [betData, setBetData] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Main"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Main") {
              iconName = "home";
            } else if (route.name === "Bets") {
              iconName = "list";
            }

            return (
              <Icon name={iconName} type="ionicon" color={color} size={size} />
            );
          },
          tabBarStyle: {
            display: "flex",
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Main" options={{ headerShown: false }}>
          {() => <MainScreen betData={betData} setBetData={setBetData} />}
        </Tab.Screen>
        <Tab.Screen name="Bets" options={{ headerShown: false }}>
          {() => <BetsScreen betData={betData} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
