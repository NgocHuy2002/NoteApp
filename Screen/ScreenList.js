import {
    Dimensions, StyleSheet, Text, View, FlatList, ToastAndroid, TextInput,
    Platform, Alert, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import React, { useState, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { deleteNote, editNote } from '../actions/noteAction';
import HyperlinkText from '../extra/HyperlinkText';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import StatusBarCostum from '../extra/StatusBarCustom';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon_Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const NoteList = ({ notes, editNote, deleteNote, navigation }) => {
    // -------------------------------State
    const [favorites, setFavorites] = useState();
    const [filterStatus, setFilterStatus] = useState(false);
    const [status, setStatus] = useState();
    const [keyword, setKeyword] = useState('')

    // -------------------------------Action
    const checkStatus = ({ item }) => {
        if (item.status === true) {
            return (
                <View style={styles.status}>
                    <BouncyCheckbox
                        size={25}
                        isChecked={true}
                        onPress={() => { changeStatus({ item }) }}
                        fillColor="#E2E2E3"
                    />
                </View>
            )
        }
        else {
            return (
                <BouncyCheckbox
                    style={styles.status}
                    size={25}
                    isChecked={false}
                    onPress={() => { changeStatus({ item }) }}
                    fillColor="#E2E2E3"
                />
            )
        }
    };
    const changeStatus = ({ item }) => {
        const updateStatus = !item.status;
        setStatus(updateStatus);
        const changeNoteStatus = {
            ...item,
            status: updateStatus,
        };
        editNote(changeNoteStatus)
        // console.log(changeNoteStatus);
    };
    const handleEditNote = (noteId) => {
        navigation.navigate('Add', { noteId });
    };
    const handleDeleteNote = (noteId) => {
        deleteNote(noteId)
        if (Platform.OS === 'android') {
            ToastAndroid.show('Note have been delete!', ToastAndroid.SHORT);
        }
        else {
            Alert.alert('Note have been delete!')
        }
    };
    const handleAddFavorite = async ({ item }) => {
        const updatedFavorite = true;
        const addToFavorite = {
            ...item,
            favorite: updatedFavorite,
        };
        editNote(addToFavorite);
        if (Platform.OS === 'android') {
            ToastAndroid.show('Note have add to favorite!', ToastAndroid.SHORT)
        }
        else {
            Alert.alert('Note have add to favorite!')
        }
    }
    const handleRemoveFavorite = async ({ item }) => {
        const updatedFavorite = false; // Toggle the favorite value
        const addToFavorite = {
            ...item,
            favorite: updatedFavorite,
        };
        editNote(addToFavorite);
        if (Platform.OS === 'android') {
            ToastAndroid.show('Note have been removed from favorite!', ToastAndroid.SHORT)
        }
        else {
            Alert.alert('Note have been removed from favorite!')
        }
    }
    const filteredNotes = notes.filter((note) =>
        note.text.trim().toLowerCase().includes(keyword.trim().toLowerCase()) ||
        note.title.trim().toLowerCase().includes(keyword.trim().toLowerCase())
    );
    const filteredStatus = notes.filter((note) =>
        note.status === true
    );
    // -------------------------------Render 
    const renderItem = ({ item }) => (
        <View>
            <Swipeable
                renderRightActions={(progress, dragX) => {
                    return (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 80,
                                height: 100,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => { handleDeleteNote(item.id) }}>
                                <Icon5 name='trash' color={'#ea4335'} size={30} />
                            </TouchableOpacity>
                        </View>
                    )
                }}
                renderLeftActions={(progress, dragX) => {
                    return (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 80,
                                height: 100,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => { item.favorite == true ? handleRemoveFavorite({ item }) : handleAddFavorite({ item }) }}>
                                <Icon5 name={item.favorite == true ? 'heart-broken' : 'heart'} color={'#ea4335'} size={30} />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            >
                <TouchableWithoutFeedback
                    delayLongPress={1000}
                    onPress={() => {
                        handleEditNote(item.id)
                    }}
                >
                    <View style={[styles.card, { backgroundColor: item.color }]}>
                        <View>
                            {checkStatus({ item })}
                            <Text style={[styles.title, { alignSelf: 'flex-start', color: '#E2E2E3' }]}>
                                {item.title}
                            </Text>
                            <HyperlinkText text={item.text} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Swipeable>
        </View>
    );
    // -------------------------------RETURN
    return (
        <SafeAreaView style={styles.container}>
            <StatusBarCostum />
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                    <Icon5 name="bars" size={20} color="#E2E2E3" />
                </TouchableWithoutFeedback>
                <View style={styles.searchWarp}>
                    <TextInput
                        style={styles.search}
                        placeholder='Search'
                        placeholderTextColor='#E2E2E3'
                        value={keyword}
                        onChangeText={setKeyword}
                    />
                    <BouncyCheckbox
                        style={styles.status}
                        size={25}
                        isChecked={false}
                        onPress={() => { setFilterStatus(!filterStatus) }}
                        fillColor="#E2E2E3"
                    />
                </View>
            </View>
            {/* ----- */}
            {/* LIST */}
            <FlatList
                data={filterStatus === false ? filteredNotes : filteredStatus}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            {/* ----- */}
            {/* BUTTON NAVIGATION TO ADD */}
            <View style={styles.footer}>
                < View style={styles.addButton} >
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Add', Date.now())
                    }}
                    >
                        <Icon_Ionicons name='add' size={50} />
                    </TouchableOpacity>
                </View >
            </View>
            {/* ----- */}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#202124',
        flex: 1,
    },
    navigationContainer: {
        flex: 1,
        borderWidth: 1,
        paddingTop: 28,
        backgroundColor: '#202124',
        color: '#E2E2E3',
        alignItems: 'flex-start',
    },
    paragraph: {
        color: '#E2E2E3',
        display: 'flex',
        paddingLeft: 20,
        alignSelf: 'flex-start',
        fontSize: 30,
        marginBottom: 20
    },
    menuButton: {
        borderColor: '#58616E',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 20,
        marginBottom: 10,
        width: '100%',
        height: 40,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    header: {
        backgroundColor: '#525355',
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 50,
        paddingLeft: 20,
        borderWidth: 1,
        borderRadius: 35,
        marginBottom: 10,
    },
    searchWarp: {
        width: '85%',
        height: 45,
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'flex-end',
    },
    search: {
        color: '#E2E2E3',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        height: 45,
    },
    List: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: Dimensions.get('window').width * 1,
    },
    status: {
        display: 'flex',
        position: 'absolute',
        right: 0,
    },
    footer: {
        backgroundColor: '#525355',
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
    },
    addButton: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        paddingLeft: 1,
        bottom: 10,
        width: 60,
        height: 60,
        borderWidth: 5,
        borderColor: '#202124',
        backgroundColor: '#00FFCA',
    },
    card: {
        marginTop: 5,
        width: Dimensions.get('window').width * 0.95,
        borderWidth: 1.5,
        borderRadius: 8,
        padding: 16,
        marginLeft: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    deleteButton: {
        backgroundColor: '#FF6D60',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignSelf: 'flex-end',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
})
const mapStateToProps = (state) => {
    return {
        notes: state.notes.notes,
    };
};

export default connect(mapStateToProps, { editNote, deleteNote })(NoteList);
