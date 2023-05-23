import { Dimensions, StyleSheet, ScrollView, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux';
import { addNote } from '../actions/noteAction';
import { editNote } from '../actions/noteAction';
import StatusBarCostum from '../extra/StatusBarCostum';
import * as yup from 'yup';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { renderers } from 'react-native-popup-menu';
const { SlideInMenu } = renderers;
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';



const AddNote = ({ note, editNote, addNote, navigation }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState('#202124')
    const [favorite, setFavorite] = useState(false);
    useEffect(() => {
        if (note != null) {
            setTitle(note.title);
            setText(note.text);
            setColor(note.color)
            setStatus(note.status)
            setFavorite(note.favorite)
        }
    }, [note]);
    
    const noteSchema = yup.object({
        title: yup.string().min(0).max(100),
        text: yup.string().required('Context is none'),
        color: yup.string().required(''),
        status: yup.boolean().required(),
        favorite: yup.boolean().required('Something wrong!!'),
    });
    const handleAdd = () => {
        const newNote = {
            id: Date.now(),
            title,
            text,
            color,
            status,
            favorite,
        };
        noteSchema.validate(newNote).then(() => {
            addNote(newNote);
            // console.log('add')
            setTitle('');
            setText('');
            setColor('#FFF');
            setStatus(false);
            navigation.goBack();
        }).catch(() => {
            // console.log('addF')
            navigation.navigate('List')
        })
    };
    const handleUpdate = () => {
        const updateNote = {
            ...note,
            title: title.trim(),
            text: text.trim(),
            color: color,
            status: status,
            favorite:favorite,
        };
        noteSchema.validate(updateNote).then(() => {
            editNote(updateNote);
            setStatus(false)
            navigation.goBack()
        }).catch(() => {
            navigation.navigate('List')
        })
    };
    const checkStatus = (check) => {
        if (check === true) {
            return (
                <View style={styles.status}>
                    <BouncyCheckbox
                        size={25}
                        isChecked={true}
                        fillColor="#E2E2E3"
                        onPress={() => { setStatus(false) }}
                        text={'Done'}
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
                    fillColor="#E2E2E3"
                    onPress={() => { setStatus(true) }}
                    text={'Ongoing'}
                />
            )
        }
    }
    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <StatusBarCostum />
            <TextInput
                placeholder='Title'
                placeholderTextColor='#E2E2E3'
                value={title}
                onChangeText={setTitle}
                style={{
                    width: Dimensions.get('window').width * 0.9,
                    height: Dimensions.get('window').width * 0.1,
                    marginBottom: 15,
                    borderBottomColor: 'black',
                    color: '#E2E2E3',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
            <TextInput
                multiline={true}
                numberOfLines={1000}
                placeholder='Note'
                placeholderTextColor='#E2E2E3'
                value={text}
                onChangeText={setText}
                scrollEnabled={true}
                style={{
                    height: Dimensions.get('window').height * 0.74,
                    textAlignVertical: 'top',
                    color: '#E2E2E3'
                }}
            />
            <View style={styles.footer}>
                <View style={styles.checkBox}>
                    {checkStatus(status)}
                </View>
                <Menu name='number' renderer={SlideInMenu}>
                    <MenuTrigger>
                        <Icon name='paint-brush' size={30} color={'#E2E2E3'} style={{ borderWidth: 1, marginRight: 20, borderRadius: 50, borderColor: '#E2E2E3' }} />
                    </MenuTrigger>
                    <MenuOptions style={{ backgroundColor: color, borderWidth: 1 }}>
                        <ScrollView style={{ height: 100 }} horizontal={true}>
                            <MenuOption style={[styles.color, { backgroundColor: '#202124' }]} onSelect={() => { setColor('#202124') }} />
                            <MenuOption style={[styles.color, { backgroundColor: '#5C2B29' }]} onSelect={() => { setColor('#5C2B29') }} />
                            <MenuOption style={[styles.color, { backgroundColor: '#614A19' }]} onSelect={() => { setColor('#614A19') }} />
                            <MenuOption style={[styles.color, { backgroundColor: '#345920' }]} onSelect={() => { setColor('#345920') }} />
                            <MenuOption style={[styles.color, { backgroundColor: '#2D555E' }]} onSelect={() => { setColor('#2D555E') }} />
                            <MenuOption style={[styles.color, { backgroundColor: '#5B2245' }]} onSelect={() => { setColor('#5B2245') }} />
                            <MenuOption style={[styles.color, { backgroundColor: '#3C3F43' }]} onSelect={() => { setColor('#3C3F43') }} />
                        </ScrollView>
                    </MenuOptions>
                </Menu>
                <View style={[styles.buttonWarp, { alignSelf: 'flex-end' }]}>
                    <TouchableOpacity onPress={note == undefined ? handleAdd : handleUpdate} style={[styles.addButton,{borderColor:color}]}>
                        <Text>{note == undefined ? ("Add") : ("Edit")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: '#525355',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '106%',
        height: 45,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    checkBox: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '35%',
        alignItems: 'center',
        zIndex: 20,
    },
    colorWarp: {
        height: 50,
        borderRadius: 35,
        width: '55%',
        display: 'flex',
        alignSelf: 'flex-start',
    },
    buttonWarp: {
        right: 20,
        marginLeft: 'auto',
        width: 65,
        height: 65,
    },
    addButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: 65,
        height: 65,
        borderWidth: 5,
        backgroundColor: '#00FFCA',
    },
    color: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        marginTop: 10,
        marginLeft: 10,
        width: 50,
        height: 50
    }
})

const mapStateToProps = (state, ownProps) => {
    const noteId = ownProps.route.params.noteId;
    if ((note) => note.id === noteId) {
        return {
            note: state.notes.notes.find((note) => note.id === noteId),
        };
    }
    else {
        return null
    }
};

export default connect(mapStateToProps, { editNote, addNote })(AddNote);