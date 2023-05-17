import { Dimensions, StyleSheet, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux';
import { addNote } from '../actions/noteAction';
// import ColorPicker from '../extra/ColorPicker';

const AddNote = ({ addNote, navigation }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [color, setColor] = useState('#FFF')
    return (
        <View style={[styles.container, { backgroundColor: color }]}>
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
            <View style={styles.colorWarp}>
                <ScrollView horizontal={true} style={{zIndex:-2}}>
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
                <TouchableOpacity onPress={() => {
                    if (text.trim() !== '') {
                        const newNote = {
                            id: Date.now(),
                            title,
                            text,
                            color,
                        };
                        addNote(newNote);
                        setTitle('')
                        setText('');
                        setColor('#FFF')
                        navigation.navigate('List')
                    }
                }} style={styles.addButton}>
                    <Text>Add</Text>
                </TouchableOpacity>
            </View>
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
    colorWarp: {
        height: 50,
        borderRadius:35,
        width: '55%',
        display: 'flex',
        alignSelf: 'flex-start',
        position: 'absolute',
        bottom: 20,
    },
    buttonWarp: {
        alignSelf: 'flex-end',
        display: 'flex',
        alignItems: 'center',
        bottom:20,
        position: 'absolute',
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
export default connect(null, { addNote })(AddNote);