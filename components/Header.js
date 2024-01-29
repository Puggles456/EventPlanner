import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Drop2 from "./Drop2";

export default function Header({ navigation, Name }) {
  const [dropShow, setDropShow] = useState(false);

  const onPressButton = () => {
    setDropShow(!dropShow);
  };
  const onPressBackButton = () => {
    navigation.goBack();
  };

  return (
    <View>
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
        <TouchableOpacity onPress={onPressBackButton}>
          <Ionicons name="arrow-back-sharp" size={24} color="white" />
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 18 }}>{Name}</Text>
        </View>

        <TouchableOpacity onPress={onPressButton}>
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {dropShow && <Drop2 navigation={navigation}></Drop2>}
    </View>
  );
}
