import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function Header2({ navigation, Name }) {
  return (
    <View
      style={{
        backgroundColor: "darkslateblue",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 16,
        padding: 5,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Login", {})}>
        <Ionicons name="arrow-back-sharp" size={24} color="white" />
      </TouchableOpacity>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 18 }}>{Name}</Text>
      </View>

      <TouchableOpacity>
        <Entypo name="dots-three-vertical" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
