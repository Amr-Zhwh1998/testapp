import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import UserDrawerNavigation from './UserScreens/_index/userNavigation';

const Main = () =>
{
    const [temp_user, set_temp_user] = useState({});
    return (
        <>
            <UserDrawerNavigation />
            <StatusBar style="auto" />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Main;

