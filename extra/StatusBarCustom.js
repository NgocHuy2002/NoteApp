import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'

export default function StatusBarCostum() {
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