import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { deleteNote } from '../actions/noteAction';
import HyperlinkText from '../extra/HyperlinkText';


const NoteList = ({ notes, deleteNote, navigation }) => {
    const handleEditNote = (noteId) => {
        navigation.navigate('Edit', { noteId });
    };
    // const renderItem = ({ item }) => (
    //     <View>
    //         <TouchableWithoutFeedback
    //             onLongPress={() => {
    //                 deleteNote(item.id)
    //                 console.log('You long-pressed the button!');
    //             }}
    //             delayLongPress={1000}
    //             onPress={() => {
    //                 handleEditNote(item.id)
    //             }}
    //         >
    //             <View style={styles.card}>
    //                 <View>
    //                     <Text style={styles.title}>{item.title}</Text>
    //                     <Text style={styles.content} >{item.text}</Text>
    //                 </View>
    //                 <View style={{
    //                     alignSelf: 'flex-end',
    //                 }}>
    //                 </View>
    //             </View>
    //         </TouchableWithoutFeedback>
    //     </View>
    // );
    return (
        <View style={styles.container}>
            <ScrollView>
            {notes.map((note) => (
                <View key={note.id} style={styles.List}>
                    
                    <TouchableWithoutFeedback
                        onLongPress={() => {
                            deleteNote(note.id)
                            // console.log('You long-pressed the button!');
                        }}
                        delayLongPress={1000}
                        onPress={() => {
                            handleEditNote(note.id)
                        }}
                    >
                        <View style={styles.card}>
                            
                            <View> 
                                <Text style={styles.title}>{note.title}</Text>
                                <HyperlinkText style={styles.content} text={note.text}/>
                                {/* <Text style={styles.content} >{note.text}</Text> */}
                            </View>
                            <View style={{
                                alignSelf: 'flex-end',
                            }}>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            ))}
            </ScrollView>
            {/* -------------------------------- */}
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
    container:{
        flex:1,
    },
    List: {
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
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