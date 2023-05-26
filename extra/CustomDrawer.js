import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, drawerContentOption, DrawerItem } from '@react-navigation/drawer';

const CustomDrawer = (props) => {
  return (
    <SafeAreaView style={{flex:1}}>
    <DrawerContentScrollView style={{ backgroundColor: '#181C1F', }}>
        <Text style={styles.name}>NOTE.</Text>
        <DrawerItemList {...props} />
    </DrawerContentScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  name:{
    display: 'flex', 
    alignSelf: 'flex-start', 
    paddingLeft: 10, 
    fontSize: 25, 
    color: '#E2E2E3',
    marginBottom:20,
  }
})

export default CustomDrawer