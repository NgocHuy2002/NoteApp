import {
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Keyboard,
  BackHandler,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { connect } from "react-redux";
import { addNote, editNote } from "../actions/noteAction";
import StatusBarCostum from "../extra/StatusBarCustom";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import * as yup from "yup";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { renderers } from "react-native-popup-menu";
import Icon from "react-native-vector-icons/FontAwesome";
import { Formik, ErrorMessage } from "formik";
const { SlideInMenu } = renderers;

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { SafeAreaView } from "react-native-safe-area-context";

const AddNote = ({ note, editNote, addNote, navigation }) => {
  //

  const [status, setStatus] = useState(false);
  const [color, setColor] = useState();
  const [favorite, setFavorite] = useState(false);
  const ref = useRef(null);
  //
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    if (note != null) {
      setColor(note.color);
      setStatus(note.status);
      setFavorite(note.favorite);
    } else {
      setColor("#202124");
      setStatus(false);
      setFavorite(false);
    }
  }, [note]);

  //
  const handleBackPress = () => {
    navigation.jumpTo("List");
    ref.current?.resetForm();
    return true;
  };
  const noteSchema = yup.object({
    title: yup
      .string()
      .required("Title can not empty")
      .min(0)
      .max(25, "Too long for a title!"),
    text: yup.string().required("Context can not empty"),
    color: yup.string(),
    status: yup.boolean(),
    favorite: yup.boolean(),
  });
  const handleAdd = (values, { resetForm }) => {
    const newNote = {
      id: Date.now(),
      title: values.title,
      text: values.text,
      color,
      status,
      favorite,
    };
    noteSchema
      .validate(newNote)
      .then(() => {
        addNote(newNote);
        Keyboard.dismiss();
        setColor("#202124");
        setStatus(false);
        resetForm();
        navigation.goBack();
      })
      .catch(() => {
        console.log("Error");
      });
  };
  const handleUpdate = (values, { resetForm }) => {
    const updateNote = {
      ...note,
      title: values.title.trim(),
      text: values.text.trim(),
      color: color,
      status: status,
      favorite: favorite,
    };
    noteSchema
      .validate(updateNote)
      .then(() => {
        editNote(updateNote);
        Keyboard.dismiss();
        resetForm();
        setStatus(false);
        navigation.goBack();
      })
      .catch(() => {
        navigation.goBack();
      });
  };
  const checkStatus = (check) => {
    if (check === true) {
      return (
        <View>
          <BouncyCheckbox
            size={20}
            isChecked={true}
            fillColor="#E2E2E3"
            onPress={() => {
              setStatus(false);
            }}
            // text={"Completed"}
          />
        </View>
      );
    } else {
      return (
        <View>
          <BouncyCheckbox
            size={20}
            isChecked={false}
            fillColor="#E2E2E3"
            onPress={() => {
              setStatus(true);
            }}
            // text={"Ongoing"}
          />
        </View>
      );
    }
  };
  //
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
      <StatusBarCostum />
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          gap: 20,
          margin: 10,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            if (Keyboard.isVisible(false)) {
              Keyboard.dismiss();
            } else {
              navigation.goBack();
              ref.current?.resetForm();
            }
          }}
        >
          <Icon5 name="arrow-left" color="#E2E2E3" size={20} />
        </TouchableWithoutFeedback>
        <Text style={{ color: "#E2E2E3" }}>
          {note == undefined ? "Add" : "Edit"}
        </Text>
      </View>
      <Formik
        initialValues={{
          title: note == undefined ? "" : note.title,
          text: note == undefined ? "" : note.text,
        }}
        enableReinitialize
        validationSchema={noteSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={note == undefined ? handleAdd : handleUpdate}
        innerRef={ref}
      >
        {({ handleSubmit, values, handleChange, resetForm }) => (
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder="Title"
              placeholderTextColor="#E2E2E3"
              onChangeText={handleChange("title")}
              value={values.title}
              style={styles.titleField}
            />
            <ErrorMessage
              name="title"
              component={Text}
              style={styles.errorMessage}
            />
            <ErrorMessage
              name="text"
              component={Text}
              style={styles.errorMessage}
            />
            <TextInput
              multiline={true}
              numberOfLines={1000}
              placeholder="Note"
              placeholderTextColor="#E2E2E3"
              onChangeText={handleChange("text")}
              value={values.text}
              style={styles.textField}
            />
            <View style={styles.footer}>
              <View style={styles.checkBox}>{checkStatus(status)}</View>
              <Menu name="number" renderer={SlideInMenu}>
                <MenuTrigger>
                  <Icon
                    name="paint-brush"
                    size={30}
                    color={"#E2E2E3"}
                    style={{
                      borderWidth: 1,
                      marginRight: 20,
                      borderRadius: 50,
                      borderColor: "#E2E2E3",
                    }}
                  />
                </MenuTrigger>
                <MenuOptions style={{ backgroundColor: color, borderWidth: 1 }}>
                  <ScrollView style={{ height: 100 }} horizontal={true}>
                    <MenuOption
                      style={[styles.color, { backgroundColor: "#202124" }]}
                      onSelect={() => {
                        setColor("#202124");
                      }}
                    />
                    <MenuOption
                      style={[styles.color, { backgroundColor: "#5C2B29" }]}
                      onSelect={() => {
                        setColor("#5C2B29");
                      }}
                    />
                    <MenuOption
                      style={[styles.color, { backgroundColor: "#614A19" }]}
                      onSelect={() => {
                        setColor("#614A19");
                      }}
                    />
                    <MenuOption
                      style={[styles.color, { backgroundColor: "#345920" }]}
                      onSelect={() => {
                        setColor("#345920");
                      }}
                    />
                    <MenuOption
                      style={[styles.color, { backgroundColor: "#2D555E" }]}
                      onSelect={() => {
                        setColor("#2D555E");
                      }}
                    />
                    <MenuOption
                      style={[styles.color, { backgroundColor: "#5B2245" }]}
                      onSelect={() => {
                        setColor("#5B2245");
                      }}
                    />
                    <MenuOption
                      style={[styles.color, { backgroundColor: "#3C3F43" }]}
                      onSelect={() => {
                        setColor("#3C3F43");
                      }}
                    />
                  </ScrollView>
                </MenuOptions>
              </Menu>
              <View style={[styles.buttonWarp, { alignSelf: "flex-end" }]}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[styles.addButton, { borderColor: color }]}
                >
                  <Text>{note == undefined ? "Add" : "Edit"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "#525355",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  checkBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    width: "35%",
    alignItems: "center",
    zIndex: 20,
  },
  colorWarp: {
    height: 50,
    borderRadius: 35,
    width: "55%",
    display: "flex",
    alignSelf: "flex-start",
  },
  buttonWarp: {
    right: 20,
    marginLeft: "auto",
    width: 75,
    height: 75,
  },
  titleField: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.1,
    marginBottom: 15,
    borderBottomColor: "black",
    color: "#E2E2E3",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textField: {
    height: Dimensions.get("window").height * 0.91,
    textAlignVertical: "top",
    color: "#E2E2E3",
  },
  addButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: 65,
    height: 65,
    borderWidth: 5,
    backgroundColor: "#00FFCA",
  },
  color: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    marginTop: 10,
    marginLeft: 10,
    width: 50,
    height: 50,
  },
  errorMessage: {
    color: "red",
  },
});

const mapStateToProps = (state, ownProps) => {
  const noteId = ownProps.route.params.noteId;
  if ((note) => note.id === noteId) {
    return {
      note: state.notes.notes.find((note) => note.id === noteId),
    };
  } else {
    return null;
  }
};

export default connect(mapStateToProps, { editNote, addNote })(AddNote);
