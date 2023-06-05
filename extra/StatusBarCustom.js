import { StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'

export default function StatusBarCustom() {
    return (
        <SafeAreaView>
            <StatusBar
                animated={true}
                backgroundColor="transparent"
                translucent={true}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})