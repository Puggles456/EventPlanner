import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Header from "../components/Header";
import Event from "../components/Event";
import EventInput from "./EventInput";
import Drop from "../components/Drop";
import { auth, storage } from "../Firebase";
import {
  ref,
  uploadBytesResumable,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export default function Planner({ navigation }) {
  const [input, setInput] = useState("");
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalIsVisible] = useState(false);
  const [dropShow, setDropShow] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const route = useRoute();
  const { name } = route.params;

  async function getEvent() {
    const filePath = currentUser + "/" + name;
    const folderRef = ref(storage, filePath);
    try {
      const result = await listAll(folderRef);
      const fileNames = result.items.map((item) => item.name);
      const subfolderNames = result.prefixes.map((prefix) => prefix.fullPath);
      console.log("Files:", fileNames);
      console.log("Subfolders:", subfolderNames);
      // Set the file names and subfolder names to state or use them as needed in your component
    } catch (error) {
      console.error("Error fetching folder contents:", error);
    }
  }

  function makeVisible() {
    setModalIsVisible(true);
  }
  function makeUnVisible() {
    setModalIsVisible(false);
  }

  async function addEvent(title, date, time, description, image) {
    const response = await fetch(image);
    const blob = await response.blob();

    const uniqueId = uuidv4(); // Generate a UUID
    const filename = `${uniqueId}.jpeg`;
    const dateSender = date.replace(/\//g, "-");

    const storageRef = ref(
      storage,
      `${currentUser}/${name}/${title}/${filename}`
    );
    const storageRef2 = ref(
      storage,
      `${currentUser}/${name}/${title}/${dateSender}.txt`
    );
    const storageRef3 = ref(
      storage,
      `${currentUser}/${name}/${title}/${time}.txt`
    );
    const storageRef4 = ref(
      storage,
      `${currentUser}/${name}/${title}/${description}.txt`
    );

    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadBytesResumable(storageRef2);
    uploadBytesResumable(storageRef3);
    uploadBytesResumable(storageRef4);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress tracking here if needed
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error(error);
      },
      () => {
        // Handle successful uploads on complete
        console.log("Upload successful");
      }
    );

    await uploadBytesResumable(storageRef);

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
  function ascending() {
    if (sortOrder != "asc") {
      setSortOrder("asc");
      sortDate();
    }
  }
  function descending() {
    if (sortOrder != "desc") {
      setSortOrder("desc");
      sortDate();
    }
  }
  const onPressButton = () => {
    setDropShow(!dropShow);
  };

  const filterData = ({ item }) => {
    if (input === "") {
      return (
        <Event
          id={item.id}
          title={item.Title}
          date={item.Date}
          time={item.Time}
          description={item.Description}
          image={item.images}
          onDeleteItem={deleteEvent}
        />
      );
    }
    if (item.Title.toLowerCase().includes(input.toLowerCase())) {
      return (
        <Event
          id={item.id}
          title={item.Title}
          date={item.Date}
          time={item.Time}
          description={item.Description}
          image={item.images}
          onDeleteItem={deleteEvent}
        />
      );
    }
    // Handle the case when input is not empty, you can return null or an empty component
    return null;
  };

  const sortDate = () => {
    const sortedEvents = [...events];
    sortedEvents.sort((a, b) => {
      const dateA = parseDate(a.Date);
      const dateB = parseDate(b.Date);

      if (sortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setEvents(sortedEvents);
  };

  const parseDate = (dateString) => {
    const [month, day, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setCurrentUser(user.email);
      } else {
        // No user is signed in.
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (currentUser != null) {
      getEvent();
    }
  }, [currentUser]);

  //checkCurrentUser();
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
            <TextInput
              style={styles.input}
              placeholder="Search"
              onChangeText={(text) => setInput(text)}
            ></TextInput>
          </View>
          <TouchableOpacity onPress={onPressButton}>
            <Ionicons name="md-filter-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {dropShow && <Drop filterAsc={ascending} filterDesc={descending}></Drop>}

      <EventInput
        visible={modalVisible}
        onCancel={makeUnVisible}
        addContent={addEvent}
      ></EventInput>

      <View style={{ flex: 2 }}>
        <FlatList
          data={events}
          renderItem={({ item, index }) => filterData({ item, index })}
          keyExtractor={(item) => item.id.toString()}
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
