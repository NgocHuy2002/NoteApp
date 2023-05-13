import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux';
import { addNote } from '../actions/noteAction';


const AddNote = ({ addNote, navigation }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    // let [id, setId] = useState(10);

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
                    height: Dimensions.get('window').height * 0.7,
                    textAlignVertical: 'top',

                }}
            />

            <TouchableOpacity onPress={() => {
                if (text.trim() !== '' && title.trim() !== '') {
                    const newNote = {
                        id: Date.now(),
                        title,
                        text,
                    };
                    addNote(newNote);
                    setTitle('')
                    setText('');
                    navigation.navigate('List')
                }
            }} style={styles.addButton}>
                <Text>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    addButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 35,
        top: 10,
        marginLeft: Dimensions.get('window').width * 0.5,
        width: 150,
        height: 50,
        backgroundColor: '#219653',
    }
})
export default connect(null, { addNote })(AddNote);