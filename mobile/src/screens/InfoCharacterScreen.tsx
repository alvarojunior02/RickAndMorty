import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { TypeCharacter } from '../config/types';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './RootStackParams';
import api from '../services/api';
import LoaderSpinner from '../components/loaderSpinner';
type toHomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

import ModalDropdown from 'react-native-modal-dropdown';

const InfoCharacterScreen = ({route}: any) => { 

    const [character, setCharacter] = useState<TypeCharacter>();
    const [episodeSelected, setEpisodeSelected] = useState<any>('Select One');

    const toBack = useNavigation<toHomeScreenProp>();

    function getSingleCharacter(id: number) {
        try {
            api.get(`/character/${id}`)
            .then((response) => {
               setCharacter(response.data);
           })
        } catch (error) {
           console.log(error);
        }
    }

    useEffect(() => {
        getSingleCharacter(route.params.id);
    }, []);

    return(
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => toBack.goBack()}>
                        <Text style={styles.textButtonBack}> {"Return"} </Text>
                    </TouchableOpacity>
                    <Image style={styles.logo} source={require('../images/logo.png')}/>
                </View>
                {
                    !character ? (
                        <LoaderSpinner /> 
                    ) : (
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.containerTopInfo}>
                                <Text style={styles.nameCharacter}>{character?.name}</Text>
                                <Image style={styles.image} source={{ uri: character?.image }}/>
                            </View>
                            <View style={styles.containerInfos}>
                                <Text style={styles.textInfos}>Status: {character?.status}</Text>
                                <Text style={styles.textInfos}>Gender: {character?.gender}</Text>
                                <Text style={styles.textInfos}>Origin: {character?.origin.name}</Text>
                                <Text style={styles.textInfos}>Location: {character?.location.name}</Text>
                            </View>
                            <Text style={styles.textEpisodes}>Episodes:</Text>
                            <View style={styles.selectContainer}>
                                <ModalDropdown
                                    style={styles.select}
                                    options={character?.episode}
                                    onSelect={value => {
                                        setEpisodeSelected(value);
                                        console.log(value);
                                    }}
                                    dropdownTextStyle={{fontSize: 12, fontWeight: 'bold'}}
                                />
                                <TouchableOpacity style={styles.goToEpisodeInfos}>
                                    <Text style={styles.textGoTo}> {">"} </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    )
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'black',
    },

    textTip: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        marginTop: 25,
    },

    header: {
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 30,
    },
    backButton: {
        width: 60,
        height: 40,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
    },
    textButtonBack: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
    logo: {
        width: 200,
        height: 50,
    },
    
    scrollView: {
        width: 300,
        marginTop: 40,
    },
    containerTopInfo: {
        borderRadius: 15,
        width: 300,
        height: 300,
    },
    nameCharacter: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    image: {
        marginTop: 30,
        width: 300,
        height: 300,
        borderRadius: 30,
    },
    containerInfos: {
        borderRadius: 30,
        width: 300,
        height: 160,
        marginTop: 120,
        borderColor: 'white',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInfos: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
    },

    textEpisodes: {
        marginTop: 30,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
    },
    selectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 50,
    },
    select: {
        width: 250,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 10,
    },
    goToEpisodeInfos: {
        width: 40,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 30,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textGoTo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
    },
});
export default InfoCharacterScreen;
