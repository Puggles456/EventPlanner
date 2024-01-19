import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <Text style={{ marginLeft: 12 }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="test@gmail.com"
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={{ marginLeft: 12 }}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="*****"
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Birthday", {})}
        >
          <Text style={{ color: "white" }}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", paddingTop: 5 }}
          onPress={() => navigation.navigate("Forgot", {})}
        >
          <Text style={{ color: "cornflowerblue" }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.third}>
        <Text>Do you have an account?</Text>
        <TouchableOpacity
          style={{ marginLeft: 2 }}
          onPress={() => navigation.navigate("Create", {})}
        >
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
    backgroundColor: "grey",
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
