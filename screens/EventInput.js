import {
  View,
  Text,
  ScrollView,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Pressable,
  Slider,
} from "react-native";
import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { EvilIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function EventInput(props) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [buttontitle, setButtonTitle] = useState("Select Date");
  const [buttontitle2, setButtonTitle2] = useState("Select Time");

  function titleInput(text) {
    setTitle(text);
  }

  function descriptionInput(text) {
    setDescription(text);
  }
  function stringReturn(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const temp = month + "/" + day + "/" + year;
    return temp;
  }
  function eventAddition() {
    const temp = stringReturn(date);
    props.addContent(title, temp, time, description, image);
    setDate(new Date());
    setTime("");
    setTitle("");
    setDescription("");
    setButtonTitle("Select Date");
    setButtonTitle2("Select Time");
    setImage(null);
  }
  const onChange = (e, selectedDate) => {
    const text = stringReturn(selectedDate);
    setDate(selectedDate);
    setShow(false);
    setButtonTitle(text);
  };
  const onChange2 = (e, selectedTime) => {
    setShow2(false);
    if (e.type !== "dismissed") {
      const formattedTime = selectedTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formattedTime);
      setButtonTitle2(formattedTime);
    }
  };
  const showMode = () => {
    setShow(true);
  };
  const showMode2 = () => {
    setShow2(true);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.main}>
        <Text style={{ fontSize: 30, marginBottom: 10 }}>
          Event Information
        </Text>
        <TouchableOpacity onPress={pickImage}>
          {!image && <EvilIcons name="image" size={400} color="grey" />}
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 300, height: 300 }}
            />
          )}
        </TouchableOpacity>
        <View style={styles.countainer}>
          <TextInput
            placeholder="Title"
            maxLength={30}
            onChangeText={titleInput}
          ></TextInput>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Pressable
            style={[styles.button, { marginRight: 15 }]}
            onPress={() => showMode()}
          >
            <Text style={{ color: "white" }}>{buttontitle}</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => showMode2()}>
            <Text style={{ color: "white" }}>{buttontitle2}</Text>
          </Pressable>
          {show && (
            <RNDateTimePicker value={date} mode="date" onChange={onChange} />
          )}
          {show2 && (
            <RNDateTimePicker
              value={date2}
              mode="time"
              onChange={onChange2}
              display="spinner"
            />
          )}
        </View>

        <View style={styles.countainer}>
          <TextInput
            placeholder="Location"
            maxLength={30}
            onChangeText={descriptionInput}
          ></TextInput>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              marginRight: 10,
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "darkslateblue",
            }}
            onPress={eventAddition}
          >
            <Text style={{ color: "white" }}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "red",
            }}
            onPress={props.onCancel}
          >
            <Text style={{ color: "white" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
    flex: 1,
  },
  countainer: {
    alignItems: "center",
    borderWidth: 1,
    borderBottomColor: "grey",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
    width: "80%",
  },
  description: {
    alignItems: "center",
    borderWidth: 1,
    borderBottomColor: "grey",
    margin: 10,
    borderRadius: 15,
    width: "80%",
    height: 40,
  },
  button: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "darkslateblue",
  },
});
