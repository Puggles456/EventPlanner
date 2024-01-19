import { View, Text, StyleSheet } from "react-native";

export default function EventHeader() {
  return (
    <View
      style={{
        margin: 7,
        borderBottomWidth: 1,
        borderColor: "grey",
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={[styles.container, { marginLeft: 5 }]}>
          <Text>Title</Text>
        </View>

        <View style={styles.container}>
          <Text>Date</Text>
        </View>

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>Time</Text>
        </View>
      </View>
      <View style={{ flex: 0.06 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    borderRightWidth: 1,
    borderColor: "grey",
    alignItems: "center",
  },
});
