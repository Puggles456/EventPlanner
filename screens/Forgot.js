import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export default function Forgot() {
  const [email, setEmail] = useState("");

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      <View style={styles.first}>
        <Text style={{ color: "white", fontSize: 30 }}>Linear Birthday</Text>
      </View>

      <View style={styles.second}>
        <Text style={{ alignSelf: "center" }}>Enter an email</Text>
        <Text style={{ marginLeft: 12 }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="test@gmail.com"
          onChangeText={(text) => setEmail(text)}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "white" }}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.third}>
        <Text>Do you have an account?</Text>
        <TouchableOpacity style={{ marginLeft: 2 }}>
          <Text style={{ color: "cornflowerblue" }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "darkslateblue",
  },
  first: {
    flex: 1,
    backgroundColor: "darkslateblue",
    alignItems: "center",
    justifyContent: "center",
  },
  second: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  third: {
    flex: 0.1,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    borderRadius: 5,
    backgroundColor: "darkslateblue",
    padding: 10,
    margin: 12,
    alignItems: "center",
  },
});
