import { StyleSheet, FlatList, Text,ScrollView,TouchableOpacity, View } from 'react-native'
import React from 'react'



export default function ColorPicker() {

    return (
        <View style={{width:'50%', display:'flex',alignSelf:'flex-start',position:'absolute',bottom:20}}>
            <ScrollView horizontal={true} >
            <TouchableOpacity style={[styles.color, { backgroundColor: '#6E47E5' }]} ></TouchableOpacity>
            <TouchableOpacity style={[styles.color, { backgroundColor: '#E5486F' }]}></TouchableOpacity>
            <TouchableOpacity style={[styles.color, { backgroundColor: '#BEE548' }]}></TouchableOpacity>
            <TouchableOpacity style={[styles.color, { backgroundColor: '#48E5BE' }]}></TouchableOpacity>
            <TouchableOpacity style={[styles.color, { backgroundColor: '#48E56F' }]}></TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    color: {
        marginTop:10,
        marginLeft:10,
        width: 30,
        height: 30
    }
})