import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Month from "../components/Month";
import Header from "../components/Header";
import { AntDesign } from "@expo/vector-icons";

const HorizontalTimeline = ({ navigation }) => {
  return (
    <View>
      <Header navigation={navigation} Name={"Home"}></Header>

      <ScrollView
        vertical={true}
        contentContainerStyle={{}}
        showsHorizontalScrollIndicator={false}
      >
        <Month navigation={navigation} name={"January"}></Month>
        <Month navigation={navigation} name={"February"}></Month>
        <Month navigation={navigation} name={"March"}></Month>
        <Month navigation={navigation} name={"April"}></Month>
        <Month navigation={navigation} name={"May"}></Month>
        <Month navigation={navigation} name={"June"}></Month>
        <Month navigation={navigation} name={"July"}></Month>
        <Month navigation={navigation} name={"August"}></Month>
        <Month navigation={navigation} name={"September"}></Month>
        <Month navigation={navigation} name={"October"}></Month>
        <Month navigation={navigation} name={"November"}></Month>
        <Month navigation={navigation} name={"December"}></Month>
        {/* Add more timeline items as needed */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: "darkslateblue",
    padding: 10,
    margin: 12,
    alignItems: "center",
  },
});

export default HorizontalTimeline;
