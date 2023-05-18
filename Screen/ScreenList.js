import { Dimensions, StyleSheet, Text, View, FlatList, ToastAndroid, DrawerLayoutAndroid, StatusBar, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { deleteNote } from '../actions/noteAction';
import HyperlinkText from '../extra/HyperlinkText';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import StatusBarCostum from '../extra/StatusBarCostum';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon_Ionicons from 'react-native-vector-icons/Ionicons';



const NoteList = ({ notes, deleteNote, navigation }) => {
    const handleEditNote = (noteId) => {
        navigation.navigate('Add', { noteId });
    };
    //DELETE
    const handleDeleteNote = (noteId) => {
        deleteNote(noteId)
        ToastAndroid.show('Note have been delete!', ToastAndroid.SHORT);
    }
    const [keyword, setKeyword] = useState('')
    const drawer = useRef(null);
    const drawerPosition = 'left';
    const navigationView = () => (
        <View style={[styles.navigationContainer]}>
            <Text style={styles.paragraph}>Note.</Text>
            <TouchableOpacity style={styles.menuButton}>
                <Icon name='lightbulb-o' color={'#E2E2E3'} size={30} style={{ paddingRight: 20 }} />
                <Text style={{ color: '#E2E2E3',fontSize:20 }}>Note</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton}><Text style={{ color: '#E2E2E3', }}>Favorite</Text></TouchableOpacity>
        </View>
    );
    // SWIPEABLE
    const renderRightActions = (progress, dragX) => {
        return (
            <View
                style={{
                    margin: 0,
                    alignContent: 'center',
                    justifyContent: 'center',
                    width: 70,
                }}
            >

                <Text style={{ color: '#E2E2E3', }} onPress={handleDeleteNote}>Delete</Text>
            </View>
        );
    };
    // RENDER ITEM FLATLIST
    const renderItem = ({ item }) => (
        <View>
            <Swipeable
                renderRightActions={(progress, dragX) =>
                    renderRightActions(progress, dragX)
                }
                onSwipeableOpen={() => handleDeleteNote(item.id)}
                rightOpenValue={-100}
            >
                <TouchableWithoutFeedback
                    delayLongPress={1000}
                    onPress={() => {
                        handleEditNote(item.id)
                    }}
                >
                    <View style={[styles.card, { backgroundColor: item.color }]}>

                        <View>
                            <Text style={[styles.title, { alignSelf: 'flex-start', color: '#E2E2E3' }]}>{item.title}</Text>
                            <HyperlinkText style={styles.content} text={item.text} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Swipeable>
        </View>
    );
    // SEARCH
    const filteredNotes = notes.filter((note) =>
        note.text.trim().toLowerCase().includes(keyword.trim().toLowerCase()) ||
        note.title.trim().toLowerCase().includes(keyword.trim().toLowerCase())
    );
    return (
        <DrawerLayoutAndroid
            style={styles.container}
            ref={drawer}
            drawerWidth={250}
            drawerPosition={drawerPosition}
            renderNavigationView={navigationView}
        >
            <StatusBarCostum />
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableWithoutFeedback
                    onPress={() => drawer.current.openDrawer()}
                >
                    <Icon name="bars" size={20} color="#E2E2E3" />
                </TouchableWithoutFeedback>
                <View style={styles.searchWarp}>
                    <TextInput
                        style={styles.search}
                        placeholder='Search'
                        placeholderTextColor='#E2E2E3'
                        value={keyword}
                        onChangeText={setKeyword}
                    />
                </View>
            </View>
            {/* ----- */}
            {/* LIST */}
            <FlatList
                data={filteredNotes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            {/* ----- */}
            {/* BUTTON NAVIGATION TO ADD */}
            < View style={styles.addButton} >
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Add', Date.now())
                }}
                >
                    <Icon_Ionicons name='add' size={50} />
                </TouchableOpacity>
            </View >
            {/* ----- */}
        </DrawerLayoutAndroid >
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
        paddingLeft:20,
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
        alignContent: 'center',
        width: '90%',
        height: 50,
        paddingLeft: 20,
        borderWidth: 1,
        borderRadius: 35,
        marginBottom: 10,
        marginTop: 30
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
    addButton: {
        alignSelf: 'flex-end',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        bottom: 10,
        right: 10,
        marginLeft: Dimensions.get('window').width * 0.45,
        width: 60,
        height: 60,
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

export default connect(mapStateToProps, { deleteNote })(NoteList);
