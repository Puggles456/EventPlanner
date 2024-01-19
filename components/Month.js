import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Month({ navigation, name }) {
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Planner", { name })}
      >
        <Text style={{ color: "white", fontSize: 30 }}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    backgroundColor: "darkslateblue",
    padding: 25,
    margin: 12,
    alignItems: "center",
  },
});
