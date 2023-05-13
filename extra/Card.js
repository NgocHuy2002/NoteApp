import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { deleteNote } from '../actions/noteAction';
const Card = ({ title, content }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content} >{content.substr(0, 50)}...</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNote(item.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
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
        backgroundColor: '#ff0000',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignSelf: 'flex-start',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Card;
