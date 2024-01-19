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
import Header from "../components/Header";
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
      <Header navigation={navigation} Name={name}></Header>

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
