// React
import React, { useState, useMemo, useEffect } from "react";
// Redux
import { connect } from "react-redux";
import { deleteNote, editNote } from "../actions/noteAction";
// React Native
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  ToastAndroid,
  TextInput,
  Platform,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { useNavigationState } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// Third-party Libraries
import moment from "moment";
import Swipeable from "react-native-gesture-handler/Swipeable";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import HyperlinkText from "../extra/HyperlinkText";
import StatusBarCustom from "../extra/StatusBarCustom";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import Icon_Ionicons from "react-native-vector-icons/Ionicons";
// Custom Components
import { getFilteredItems } from "../extra/Selecter";
import ButtonCustom from "../extra/ButtonCustom";

const NoteList = ({
  filteredItems,
  editNote,
  deleteNote,
  navigation,
}) => {
  // -------------------------------State
  const [keyword, setKeyword] = useState("");
  const [filterStatus, setFilterStatus] = useState();
  const [favorite, setFavorite] = useState();
  const [filterDate, setFilterDate] = useState([]);
  const [status, setStatus] = useState();
  const navigationState = useNavigationState((state) => state);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
    // Constants
  // const { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } = useMemo(() => {
  //   const now = Date.now();
  //   return {
  //     startOfDay: moment(now).startOf("day"),
  //     endOfDay: moment(now).endOf("day"),
  //     startOfWeek: moment(now).startOf("week"),
  //     endOfWeek: moment(now).endOf("week"),
  //     startOfMonth: moment().startOf("month"),
  //     endOfMonth: moment().endOf("month"),
  //   };
  // }, []);
  // ----------------------
  const filterOptions = [
    {
      text: "All",
      onPress: () => {
        setFilterStatus();
        setFilterDate([]);
        setSelectedButton(null);
      },
    },
    {
      text: "Today",
      onPress: () => handleOptionPress([moment().startOf("day"), moment().endOf("day")], "T"),
      active: selectedButton === "T",
    },
    {
      text: "This week",
      onPress: () => handleOptionPress([moment().startOf("week"), moment().endOf("week")], "TW"),
      active: selectedButton === "TW",
    },
    {
      text: "Last week",
      onPress: () => handleOptionPress([moment().startOf("week")], "LW"),
      active: selectedButton === "LW",
    },
    {
      text: "This month",
      onPress: () => handleOptionPress([moment().startOf("month"), moment().endOf("month")], "TM"),
      active: selectedButton === "TM",
    },
  ];

  // -------------------------------useEffect
  useEffect(() => {
    setFavorite();
  }, [navigationState, favorite]);
  // -------------------------------Event handlers
  const handleOptionPress = (dateRange, button) => {
    setFilterDate(dateRange);
    setSelectedButton(button);
  };
  const checkStatus = ({ item }) => {
    if (item.status === true) {
      return (
        <View style={styles.status}>
          <BouncyCheckbox
            size={25}
            isChecked={true}
            onPress={() => {
              changeStatus({ item });
            }}
            fillColor="#E2E2E3"
          />
        </View>
      );
    } else {
      return (
        <BouncyCheckbox
          style={styles.status}
          size={25}
          isChecked={false}
          onPress={() => {
            changeStatus({ item });
          }}
          fillColor="#E2E2E3"
        />
      );
    }
  };
  const changeStatus = ({ item }) => {
    const updateStatus = !item.status;
    setStatus(updateStatus);
    const changeNoteStatus = {
      ...item,
      status: updateStatus,
    };
    editNote(changeNoteStatus);
  };
  const handleEditNote = (noteId) => {
    navigation.navigate("Add", { noteId });
  };
  const handleDeleteNote = (noteId) => {
    deleteNote(noteId);
    if (Platform.OS === "android") {
      ToastAndroid.show("Note have been delete!", ToastAndroid.SHORT);
    } else {
      Alert.alert("Note have been delete!");
    }
  };
  const handleAddFavorite = async ({ item }) => {
    const updatedFavorite = true;
    const addToFavorite = {
      ...item,
      favorite: updatedFavorite,
    };
    editNote(addToFavorite);
    if (Platform.OS === "android") {
      ToastAndroid.show("Note have add to favorite!", ToastAndroid.SHORT);
    } else {
      Alert.alert("Note have add to favorite!");
    }
  };
  const handleRemoveFavorite = async ({ item }) => {
    const updatedFavorite = false; // Toggle the favorite value
    const addToFavorite = {
      ...item,
      favorite: updatedFavorite,
    };
    editNote(addToFavorite);
    if (Platform.OS === "android") {
      ToastAndroid.show(
        "Note have been removed from favorite!",
        ToastAndroid.SHORT
      );
    } else {
      Alert.alert("Note have been removed from favorite!");
    }
  };
  const handleDateFomat = (id) => {
    // console.log(moment(id).format("Do MMMM YYYY, h:mm:ss a"));
    return moment(id).from(Date.now());
    // var a = moment(id);
    // console.log(a.from(Date.now()));
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  // -------------------------------Render
  const renderItem = ({ item }) => (
    <View>
      <Swipeable
        renderRightActions={(progress, dragX) => {
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 100,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  handleDeleteNote(item.id);
                }}
              >
                <Icon5 name="trash" color={"#ea4335"} size={30} />
              </TouchableOpacity>
            </View>
          );
        }}
        renderLeftActions={(progress, dragX) => {
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 100,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  item.favorite == true
                    ? handleRemoveFavorite({ item })
                    : handleAddFavorite({ item });
                }}
              >
                <Icon5
                  name={item.favorite == true ? "heart-broken" : "heart"}
                  color={"#ea4335"}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      >
        <TouchableWithoutFeedback
          delayLongPress={1000}
          onPress={() => {
            handleEditNote(item.id);
          }}
        >
          <View style={[styles.card, { backgroundColor: item.color }]}>
            <View>
              {checkStatus({ item })}
              <Text
                style={[
                  styles.title,
                  { alignSelf: "flex-start", color: "#E2E2E3" },
                ]}
              >
                {item.title}
              </Text>
              <HyperlinkText text={item.text} />
            </View>
            <Text
              style={{
                fontSize: 10,
                display: "flex",
                alignSelf: "flex-end",
                color: "#E2E2E3",
              }}
            >
              {handleDateFomat(item.id)}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Swipeable>
    </View>
  );
  // -------------------------------RETURN
  return (
    <SafeAreaView style={styles.container}>
      <StatusBarCustom />
      {/* MODAL VIEW */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPressOut={closeModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {filterOptions.map((option, index) => (
                <ButtonCustom
                  key={index}
                  text={option.text}
                  onPress={option.onPress}
                  active={option.active}
                />
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      {/* ------------------------------------ */}
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
          <Icon5 name="bars" size={20} color="#E2E2E3" />
        </TouchableWithoutFeedback>
        <View style={styles.searchWarp}>
          <TextInput
            style={styles.search}
            placeholder="Search"
            placeholderTextColor="#E2E2E3"
            value={keyword}
            onChangeText={setKeyword}
          />
          <BouncyCheckbox
            style={[styles.status, { padding: 25 }]}
            size={25}
            isChecked={false}
            onPress={() => {
              filterStatus == undefined
                ? setFilterStatus(true)
                : setFilterStatus();
            }}
            fillColor="#E2E2E3"
          />
          <TouchableOpacity
            style={styles.status}
            onPress={() => setModalVisible(true)}
          >
            <Icon5
              name="filter"
              size={18}
              style={[styles.textStyle, { width: 30 }]}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* ----- */}
      {/* LIST */}
      <FlatList
        data={filteredItems(
          (options = { keyword, filterStatus, favorite, filterDate })
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* ------------------------------------ */}
      {/* BUTTON NAVIGATION TO ADD */}
      <View style={styles.footer}>
        <View style={styles.addButton}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Add", Date.now());
            }}
          >
            <Icon_Ionicons name="add" size={50} />
          </TouchableOpacity>
        </View>
      </View>
      {/* ----- */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#2F2F2F",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    position: "relative",
    color: "#E2E2E3",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    backgroundColor: "#202124",
    flex: 1,
  },
  navigationContainer: {
    flex: 1,
    borderWidth: 1,
    paddingTop: 28,
    backgroundColor: "#202124",
    color: "#E2E2E3",
    alignItems: "flex-start",
  },
  paragraph: {
    color: "#E2E2E3",
    display: "flex",
    paddingLeft: 20,
    alignSelf: "flex-start",
    fontSize: 30,
    marginBottom: 20,
  },
  menuButton: {
    borderColor: "#58616E",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 20,
    marginBottom: 10,
    width: "100%",
    height: 40,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    backgroundColor: "#525355",
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
    height: 50,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 35,
    marginBottom: 10,
  },
  searchWarp: {
    width: "85%",
    height: 45,
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "flex-end",
  },
  search: {
    color: "#E2E2E3",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    height: 45,
  },
  List: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    width: Dimensions.get("window").width * 1,
  },
  status: {
    display: "flex",
    position: "absolute",
    right: 0,
  },
  footer: {
    backgroundColor: "#525355",
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
  },
  addButton: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    paddingLeft: 1,
    bottom: 10,
    width: 60,
    height: 60,
    borderWidth: 5,
    borderColor: "#202124",
    backgroundColor: "#00FFCA",
  },
  card: {
    marginTop: 5,
    width: Dimensions.get("window").width * 0.95,
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 16,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 16,
  },
  title: {
    width: "80%",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: "#FF6D60",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "flex-end",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
const mapStateToProps = (state) => {
  return {
    filteredItems: (options) => getFilteredItems(state, options),
  };
};

export default connect(mapStateToProps, {
  editNote,
  deleteNote,
})(NoteList);
