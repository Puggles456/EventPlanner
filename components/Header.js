import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ navigation, Name }) {
  return (
    <View
      style={{
        backgroundColor: "darkslateblue",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 16,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Login", {})}>
        <Ionicons name="arrow-back-sharp" size={24} color="white" />
      </TouchableOpacity>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 18 }}>{Name}</Text>
      </View>

      <TouchableOpacity>
        <Ionicons name="md-filter-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
