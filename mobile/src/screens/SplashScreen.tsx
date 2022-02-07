import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

import LoaderSpinner from '../components/loaderSpinner';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './RootStackParams';

type SplashScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const SplashScreen = () => {
    const navigation = useNavigation<SplashScreenProp>();

    setTimeout(() => {
        navigation.navigate('Home');
    }, 2000)

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../images/backgroundMobile.jpg')} style={styles.imageBackground}>
                    <Image source={require('../images/logo.png')} style={styles.imageForeground}/>
                    <LoaderSpinner />
            </ImageBackground>
        </View>
    );
}

  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center"
    },
    imageForeground: {
        justifyContent: "flex-start",
        marginTop: 200,
        width: 300,
        height: 80,
    },
    text: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default SplashScreen;