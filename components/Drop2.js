import { View, Text, TouchableOpacity } from "react-native";

export default function Drop2({ navigation }) {
  return (
    <View
      style={{
        top: 30,
        right: 0,
        position: "absolute",
        zIndex: 2,
        alignSelf: "flex-end",
        padding: 5,
        borderBottomLeftRadius: 10,
        borderBottomEndRadius: 10,
        backgroundColor: "darkslateblue",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Login", {})}>
        <Text style={{ color: "white" }}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={{ color: "white" }}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}
