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
import { useState, useEffect } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { EvilIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function EventEdit(props) {
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
  function eventEditor() {
    const temp = stringReturn(date);
    props.editContent(title, temp, time, description, image);
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

  useEffect(() => {
    if (props.editTitle != null) {
      setTitle(props.editTitle);
    }
  }, [props.editTitle]);
  useEffect(() => {
    if (props.editDate != null) {
      //const temp = stringReturn(props.editDate);
      //setDate(props.editDate);
      setButtonTitle(props.editDate);
    }
  }, [props.editDate]);
  useEffect(() => {
    if (props.editTime != "") {
      setTime(props.editTime);
      setButtonTitle2(props.editTime);
    }
  }, [props.editTime]);
  useEffect(() => {
    if (props.editDescription != null) {
      setDescription(props.editDescription);
    }
  }, [props.editDescription]);
  useEffect(() => {
    if (props.editImage != null) {
      setImage(props.editImage);
    }
  }, [props.editImage]);

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
            placeholder="title"
            value={title}
            maxLength={30}
            onChangeText={titleInput}
          ></TextInput>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Pressable
            style={[
              styles.button,
              { marginRight: 10, backgroundColor: "darkslateblue" },
            ]}
            onPress={() => showMode()}
          >
            <Text style={{ color: "white" }}>{buttontitle}</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: "darkslateblue" }]}
            onPress={() => showMode2()}
          >
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
            value={description}
          ></TextInput>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "darkslateblue", marginRight: 10 },
            ]}
            onPress={eventEditor}
          >
            <Text style={{ color: "white" }}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
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
    alignItems: "center",
    width: 100,
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
  },
});
