import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import Background from "../assets/peakpx.jpg";

export default function Time({ Name, background }) {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (result) {
      console.log("we ballin");
    } else if (!result.cancelled) {
      setImage(result.uri); // Access the URI directly from the result
    }
  };

  return (
    <View style={styles.timelineItem}>
      <ImageBackground
        style={{
          resizeMode: "cover",
          justifyContent: "center",
          borderRadius: 15,
        }}
        source={background}
      >
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            padding: 10,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "black" }}>{Name}</Text>
        </View>
      </ImageBackground>

      <View style={styles.timelineLine} />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        {!image ? (
          <MaterialIcons name="add-a-photo" size={24} color="black" />
        ) : (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </TouchableOpacity>
      <View style={styles.timelineLine2} />
      <View
        style={{
          width: 100,
          height: 100,
          borderWidth: 1,
          backgroundColor: "#3498db",
          padding: 10,
        }}
      >
        <TextInput
          placeholder="Enter Text"
          placeholderTextColor="white"
          color="white"
          multiline={true}
          numberOfLines={4}
          style={{ flex: 1 }}
          onChangeText={setText}
          value={text}
        />
      </View>
    </View>
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
    marginRight: 50,
  },
  timelineLine: {
    flex: 0.1,
    width: 1,
    backgroundColor: "black",
  },
  timelineLine2: {
    flex: 0.03,
    width: 1,
    backgroundColor: "black",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db", // Example background color
    padding: 10,
    borderRadius: 5,
  },
});
