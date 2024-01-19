import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import EventEdit from "./EventEdit";

export default function Event(props) {
  const [modalVisible, setModalIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date());
  const [dateTitle, setDateTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  function makeVisible() {
    setModalIsVisible(true);
  }
  function makeUnVisible() {
    setModalIsVisible(false);
  }
  function editEvent(title, date, time, description, image) {
    setTitle(title);
    setDate(date);
    setTime(time);
    setDescription(description);
    setImage(image);
    makeUnVisible();
  }
  function stringReturn(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const temp = month + "/" + day + "/" + year;
    return temp;
  }
  useEffect(() => {
    if (props.title != null) {
      setTitle(props.title);
    }
  }, [props.title]);
  useEffect(() => {
    if (props.time != null) {
      setTime(props.time);
    }
  }, [props.time]);
  useEffect(() => {
    if (props.date != null) {
      setDate(props.date);
    }
  }, [props.date]);
  useEffect(() => {
    if (props.description != null) {
      setDescription(props.description);
    }
  }, [props.description]);
  useEffect(() => {
    if (props.image != null) {
      setImage(props.image);
    }
  }, [props.image]);

  return (
    <View
      style={[
        {
          backgroundColor: "white",
          borderRadius: 8,
          height: 100,
          margin: 7,
        },
        styles.shadowStuff,
      ]}
    >
      <TouchableOpacity onPress={makeVisible}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              alignItems: "center",

              marginLeft: 5,
              flexDirection: "row",
              flex: 1,
            }}
          >
            <EventEdit
              visible={modalVisible}
              onCancel={makeUnVisible}
              editContent={editEvent}
              editTitle={props.title}
              editDate={props.date}
              editTime={props.time}
              editDescription={props.description}
              editImage={props.image}
            ></EventEdit>
            {!image && (
              <View style={{ marginLeft: -20 }}>
                <EvilIcons name="image" size={120} color="grey" />
              </View>
            )}

            <View style={{ marginTop: 10 }}>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 80 }}
                />
              )}
            </View>

            <View style={{ flexDirection: "column", marginLeft: 5 }}>
              <View>
                <Text style={{ color: "#31219c", fontSize: 20 }}>{title}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.container}>
                  <Text style={styles.text}>{props.date}</Text>
                </View>
                <View>
                  <Text> - </Text>
                </View>
                <View style={styles.container}>
                  <Text style={styles.text}>{time}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: -4,
                }}
              >
                <EvilIcons name="location" size={24} color="black" />
                <Text style={{ color: "black" }}>{description}</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 0.06 }}>
            <TouchableOpacity onPress={props.onDeleteItem.bind(this, props.id)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {},
  text: {
    fontSize: 14,
    color: "grey",
  },
  card: {},
  shadowStuff: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});
