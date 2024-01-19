import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Horizontal() {
  return (
    <View
      style={{
        flex: 1,
        borderBottomColor: "black",
        borderBottomWidth: 2,
        marginVertical: 10, // Adjust the margin as needed
      }}
    />
  );
}

const styles = StyleSheet.create({
  timelineContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  timelineItem: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 20,
  },
  timelineLine: {
    flex: 1,
    width: 1,
    backgroundColor: "black",
  },
});
