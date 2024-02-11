import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { auth, storage, firebase } from "../Firebase";
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
        const storageRef1 = ref(storage, `${email}/January/placeholder.txt`);
        const storageRef2 = ref(storage, `${email}/February/placeholder.txt`);
        const storageRef3 = ref(storage, `${email}/March/placeholder.txt`);
        const storageRef4 = ref(storage, `${email}/April/placeholder.txt`);
        const storageRef5 = ref(storage, `${email}/May/placeholder.txt`);
        const storageRef6 = ref(storage, `${email}/June/placeholder.txt`);
        const storageRef7 = ref(storage, `${email}/July/placeholder.txt`);
        const storageRef8 = ref(storage, `${email}/August/placeholder.txt`);
        const storageRef9 = ref(storage, `${email}/September/placeholder.txt`);
        const storageRef10 = ref(storage, `${email}/October/placeholder.txt`);
        const storageRef11 = ref(storage, `${email}/November/placeholder.txt`);
        const storageRef12 = ref(storage, `${email}/December/placeholder.txt`);

        await uploadBytesResumable(storageRef1);
        await uploadBytesResumable(storageRef2);
        await uploadBytesResumable(storageRef3);
        await uploadBytesResumable(storageRef4);
        await uploadBytesResumable(storageRef5);
        await uploadBytesResumable(storageRef6);
        await uploadBytesResumable(storageRef7);
        await uploadBytesResumable(storageRef8);
        await uploadBytesResumable(storageRef9);
        await uploadBytesResumable(storageRef10);
        await uploadBytesResumable(storageRef11);
        await uploadBytesResumable(storageRef12);

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
