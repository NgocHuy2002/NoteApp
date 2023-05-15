// NoteEdit.js
import React, { useState, useEffect } from 'react';
import { Dimensions,TouchableOpacity,Text,View,StyleSheet, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { editNote } from '../actions/noteAction';

const ScreenEdit = ({ note, editNote, navigation }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setText(note.text);
        }
    }, [note]);

    const handleSubmit = () => {
        if (text.trim() !== '') {
            const updateNote = {
                ...note,
                title: title.trim(),
                text: text.trim(),
            };
            editNote(updateNote);
            navigation.navigate('List')
        }
    };

    return (
        <View style={styles.container}>
        <TextInput
            placeholder='Title'
            value={title}
            onChangeText={setTitle}
            style={{
                width: Dimensions.get('window').width * 0.9,
                height: Dimensions.get('window').width * 0.1,
                marginBottom: 15,
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
            }}
        />
        <TextInput
            multiline={true}
            numberOfLines={1000}
            placeholder='Note'
            value={text}
            onChangeText={setText}
            scrollEnabled={true}
            style={{
                height: Dimensions.get('window').height * 0.74,
                textAlignVertical: 'top',

            }}
        />
        
        <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
            <Text>Update Note</Text>
        </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    addButton: {
        alignSelf: 'flex-end',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 35,
        right: 10,
        marginLeft: Dimensions.get('window').width * 0.45,
        width: 150,
        height: 50,
        backgroundColor: '#00FFCA',
    }
})

const mapStateToProps = (state, ownProps) => {
    const noteId = ownProps.route.params.noteId;
    return {
        note: state.notes.notes.find((note) => note.id === noteId),
    };
};

export default connect(mapStateToProps, { editNote })(ScreenEdit);
