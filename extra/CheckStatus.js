import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { editNote, deleteNote } from '../actions/noteAction';
import BouncyCheckbox from "react-native-bouncy-checkbox";

function CheckStatus(notes,editNote) {
    const [status, setStatus] = useState(notes.status);
    const checkStatus = (check) => {
        if (check === true) {
            return (
                <View style={styles.status}>
                    <BouncyCheckbox
                        size={25}
                        isChecked={true}
                        fillColor="#E2E2E3"
                        onPress={() => {
                            setStatus(false)
                            console.log(check)
                            handleUpdate
                        }}
                        text={'Status'}
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
                    onPress={() => {
                        setStatus(true)
                        console.log(check)
                        handleUpdate
                    }}
                    text={'Status'}
                />
            )
        }
    }
  return (
    <View>
      <Text>CheckStatus</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    status: {
        display: 'flex',
        position: 'absolute',
        right: 10,
    },
})

const mapStateToProps = (state) => {
    return {
        notes: state.notes.notes,
    };
};

export default connect(mapStateToProps, { editNote })(CheckStatus);