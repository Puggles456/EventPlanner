import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Header from "../components/Header";
import Header2 from "../components/Header2";
import Event from "../components/Event";
import EventInput from "./EventInput";

import EventHeader from "../components/EventHeader";

export default function Planner({ navigation }) {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalIsVisible] = useState(false);
  const route = useRoute();
  const { name } = route.params;

  function makeVisible() {
    setModalIsVisible(true);
  }
  function makeUnVisible() {
    setModalIsVisible(false);
  }

  function addEvent(title, date, time, description, image) {
    setEvents((prevEvents) => [
      ...prevEvents,
      {
        id: events.length,
        Title: title,
        Date: date,
        Time: time,
        Description: description,
        images: image,
      },
    ]);
    makeUnVisible();
  }
  function deleteEvent(id) {
    setEvents((currentEvents) => {
      return currentEvents.filter((event) => event.id !== id);
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <Header2 navigation={navigation} Name={name}></Header2>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          marginTop: 5,
        }}
      >
        <View
          style={{
            flex: 0.95,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "lightgrey",
            borderRadius: 10,
            paddingHorizontal: 5,
          }}
        >
          <AntDesign name="search1" size={15} color="grey" />
          <TextInput
            style={{
              borderRadius: 10,
              borderColor: "grey",
              padding: 5,
            }}
            placeholder="Search"
          ></TextInput>
        </View>

        <TouchableOpacity>
          <Ionicons name="md-filter-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <EventInput
        visible={modalVisible}
        onCancel={makeUnVisible}
        addContent={addEvent}
      ></EventInput>

      <View style={{ flex: 2 }}>
        <FlatList
          data={events}
          renderItem={(itemData) => {
            return (
              <Event
                id={itemData.item.id}
                title={itemData.item.Title}
                date={itemData.item.Date}
                time={itemData.item.Time}
                description={itemData.item.Description}
                image={itemData.item.images}
                onDeleteItem={deleteEvent}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        ></FlatList>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity onPress={makeVisible}>
          <Ionicons name="add-circle-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
