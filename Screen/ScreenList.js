import { Dimensions, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { deleteNote } from '../actions/noteAction';
import HyperlinkText from '../extra/HyperlinkText';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const NoteList = ({ notes, deleteNote, navigation }) => {
    const handleEditNote = (noteId) => {
        navigation.navigate('Edit', { noteId });
    };
    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback
            onLongPress={() => {
                deleteNote(item.id)
            }}
            delayLongPress={1000}
            onPress={() => {
                setMenu(false)
                handleEditNote(item.id)
            }}
        >
            <View style={[styles.card, { backgroundColor: item.color }]}>

                <View>
                    <Text style={[styles.title, { alignSelf: 'flex-start' }]}>{item.title}</Text>
                    <HyperlinkText style={styles.content} text={item.text} />
                </View>
                <View style={{
                    alignSelf: 'flex-end',
                }}>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            {/* -------------------------------- */}
            < View style={styles.addButton} >
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Add')
                }}>
                    <Text>Add new note</Text>
                </TouchableOpacity>
            </View >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderRadius: 35,
        bottom: 10,
        right: 10,
        marginLeft: Dimensions.get('window').width * 0.45,
        width: 150,
        height: 50,
        backgroundColor: '#00FFCA',

    },
    card: {
        marginTop: 5,
        width: Dimensions.get('window').width * 0.95,
        backgroundColor: '#fff',
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