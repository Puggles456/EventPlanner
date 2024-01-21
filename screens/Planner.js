import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Header from "../components/Header";
import Event from "../components/Event";
import EventInput from "./EventInput";
import Drop from "../components/Drop";

export default function Planner({ navigation }) {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalIsVisible] = useState(false);
  const [dropShow, setDropShow] = useState(false);
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
  const onPressButton = () => {
    // Toggle the value between true and false on each press
    setDropShow(!dropShow);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} Name={name}></Header>
      <View style={styles.searchContainer}>
        <View style={!dropShow ? styles.search : styles.pressedSearch}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign name="search1" size={15} color="grey" />
            <TextInput style={styles.input} placeholder="Search"></TextInput>
          </View>
          <TouchableOpacity onPress={onPressButton}>
            <Ionicons name="md-filter-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {dropShow && <Drop></Drop>}

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

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 5,
  },
  search: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "lightgrey",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  pressedSearch: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "lightgrey",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 5,
  },
  input: {
    borderRadius: 10,
    borderColor: "grey",
    padding: 5,
  },
});
