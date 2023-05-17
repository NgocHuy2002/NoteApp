// NoteEdit.js
import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity,ScrollView, Text, View, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { editNote } from '../actions/noteAction';

const ScreenEdit = ({ note, editNote, navigation }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [color, setColor] = useState('#FFF')
    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setText(note.text);
            setColor(note.color)
        }
    }, [note]);

    const handleSubmit = () => {
        if (text.trim() !== '') {
            const updateNote = {
                ...note,
                title: title.trim(),
                text: text.trim(),
                color: color,
            };
            editNote(updateNote);
            navigation.navigate('List')
        }
    };

    return (
        <View style={[styles.container, {backgroundColor:color}]}>
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
            <View style={{ width: '50%', display: 'flex', alignSelf: 'flex-start', position: 'absolute', bottom: 20 }}>
                <ScrollView horizontal={true} >
                    <TouchableOpacity style={[styles.color, { backgroundColor: '#6E47E5' }]}
                        onPress={() => {
                            setColor('#6E47E5')
                        }}
                    ></TouchableOpacity>
                    <TouchableOpacity style={[styles.color, { backgroundColor: '#E5486F' }]}
                        onPress={() => {
                            setColor('#E5486F')
                        }}
                    ></TouchableOpacity>
                    <TouchableOpacity style={[styles.color, { backgroundColor: '#BEE548' }]}
                        onPress={() => {
                            setColor('#BEE548')
                        }}
                    ></TouchableOpacity>
                    <TouchableOpacity style={[styles.color, { backgroundColor: '#48E5BE' }]}
                        onPress={() => {
                            setColor('#48E5BE')
                        }}
                    ></TouchableOpacity>
                    <TouchableOpacity style={[styles.color, { backgroundColor: '#48E56F' }]}
                        onPress={() => {
                            setColor('#48E56F')
                        }}
                    ></TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.buttonWarp}>
                <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
                    <Text>Update Note</Text>
                </TouchableOpacity>
            </View>
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
    buttonWarp: {
        alignSelf: 'flex-end',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: 150,
        height: 50,
    },
    addButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        width: 150,
        height: 50,
        backgroundColor: '#00FFCA',
    },
    color: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        marginTop: 10,
        marginLeft: 10,
        width: 30,
        height: 30
    }
})

const mapStateToProps = (state, ownProps) => {
    const noteId = ownProps.route.params.noteId;
    return {
        note: state.notes.notes.find((note) => note.id === noteId),
    };
};

export default connect(mapStateToProps, { editNote })(ScreenEdit);
