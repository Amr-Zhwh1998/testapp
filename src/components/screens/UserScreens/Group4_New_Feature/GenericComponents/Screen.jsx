import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import Constants from 'expo-constants'//give us information about the current Operating System

/*
the "Screen" component will be a reusable component that will be used in all the screens 
*/


export default function Screen(props) {
    return (
        <SafeAreaView style={[styles.OperatingSystem, props.style]}>
            {/*we need <View> because 
            safeAreaView does not support Horizontal padding and we want to add padding to the screen
            */}
            <View style={[props.style, { flex: 1 }]}>{props.children}</View>
            {/* {children} */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    OperatingSystem: {
        /*
        this will make sure that the content will start below the status bar
        ("Constant" is a special object that will give us information about the current Operating System)
        */
        paddingTop: Constants.statusBarHeight,
        // backgroundColor: 'yellow',
        flex: 1,//this will make sure that the content will take the entire screen(so no cut off content on the bottom on refresh)
    }
})