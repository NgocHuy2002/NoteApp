import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonCustom = ({ onPress, text, active }) => (
    <TouchableOpacity
      style={[styles.button, styles.buttonClose]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.textStyle,
          { color: active ? "#3D71BF" : "#E2E2E3" },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
  
const styles = StyleSheet.create({
    button: {
        padding: 10,
      },
      buttonClose: {
        backgroundColor: "#2F2F2F",
      },
})

export default ButtonCustom