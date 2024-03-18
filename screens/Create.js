import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { auth, storage } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, uploadBytesResumable } from "firebase/storage";

export default function Create({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const signUp = async () => {
    if (password === password2) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

        alert("Account created succesfully");

        navigation.navigate("Birthday", {});
      } catch (error) {
        console.log(error);
        alert("Registration failed " + error.message);
      }
    } else {
      alert("Passwords do not match");
    }
  };

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
        <Text style={{ color: "white", fontSize: 30 }}>Create Page</Text>
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

        <Text style={{ marginLeft: 12 }}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="*****"
          onChangeText={(text) => setPassword2(text)}
        />

        <TouchableOpacity style={styles.button} onPress={() => signUp()}>
          <Text style={{ color: "white" }}>Create Account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.third}>
        <Text>Already have an account?</Text>
        <TouchableOpacity
          style={{ marginLeft: 2 }}
          onPress={() => navigation.navigate("Login", {})}
        >
          <Text style={{ color: "cornflowerblue" }}>Login</Text>
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
    flex: 2,
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
