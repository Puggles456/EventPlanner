import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/login";
import Create from "./screens/Create";
import Forgot from "./screens/Forgot";
import Birthday from "./screens/Birthday";
import Planner from "./screens/Planner";
import EventInput from "./screens/EventInput";

const Stack = createNativeStackNavigator();
const headerStyle = {
  backgroundColor: "darkslateblue", // Change this to your desired background color
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "darkslateblue" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerStyle }}
        />
        <Stack.Screen
          name="Create"
          component={Create}
          options={{ headerStyle }}
        />
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={{ headerStyle }}
        />

        <Stack.Screen
          name="Birthday"
          component={Birthday}
          options={{ headerStyle }}
        />
        <Stack.Screen
          name="Planner"
          component={Planner}
          options={{ headerStyle }}
        />
        <Stack.Screen
          name="EventInput"
          component={EventInput}
          options={{ headerStyle }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
