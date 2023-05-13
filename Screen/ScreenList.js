import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { deleteNote } from '../actions/noteAction';


const NoteList = ({ notes, deleteNote, navigation }) => {
    const renderItem = ({ item }) => (
        <View>
            <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.content} >{item.text}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNote(item.id)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <View style={styles.List}>
                <FlatList
                    data={notes}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <View style={styles.addButton}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Add')
                }}>
                    <Text>Add new note</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    List: {
        display: 'flex',
        width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').height * 0.9,
    },
    addButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        borderRadius: 35,
        bottom: 10,
        right:10,
        marginLeft: Dimensions.get('window').width * 0.45,
        width: 150,
        height: 50,
        backgroundColor: '#00FFCA',
        
    },
    card: {
        marginTop: 10,
        width: Dimensions.get('window').width * 0.9,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginLeft:10,
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
    content: {
        fontSize: 16,
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