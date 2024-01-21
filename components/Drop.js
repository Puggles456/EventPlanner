import { View, Text, TouchableOpacity } from "react-native";

export default function Drop() {
  return (
    <View
      style={{
        position: "absolute",
        top: 79,
        right: 0,
        alignSelf: "flex-end",
        marginRight: 16,
        padding: 5,
        borderBottomLeftRadius: 10,
        borderBottomEndRadius: 10,
        backgroundColor: "lightgrey",
        zIndex: 1,
      }}
    >
      <TouchableOpacity>
        <Text>Sort by date</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Sort by date</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Sort by date</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Sort by date</Text>
      </TouchableOpacity>
    </View>
  );
}
