import React, { useEffect, useRef, useState } from 'react';
import { 
    Animated, 
    Dimensions, 
    Image, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native';

import api from '../services/api';
import LoaderSpinner from '../components/loaderSpinner';
import { TypeCharacter } from '../config/types';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './RootStackParams';
type toHomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
type toInfoCharacterScreenProp = StackNavigationProp<RootStackParamList, 'InfoCharacter'>;

const {width, height} = Dimensions.get('screen');

const CharactersScreen = () => {

    const xScroll = useRef(new Animated.Value(0)).current;

    const [characters, setCharacters] = useState<Array<TypeCharacter>>([]);
    const [search, setSearch] = useState('');
    const [maxPage, setMaxPage] = useState();
    const [prev, setPrev] = useState(0);
    const [next, setNext] = useState(2);

    const toHome = useNavigation<toHomeScreenProp>();
    const toInfoCharacter = useNavigation<toInfoCharacterScreenProp>();

    const navigate = () => {
        toHome.navigate('Home');
    }

    function getCharacters(page: number) {
        try {
            api.get('/character', {
                params: {
                    page,
                }
            })
            .then((response) => {
                setCharacters(response.data.results);
                setMaxPage(response.data.info.pages);
           })
        } catch (error) {
           console.log(error);
        }
    }

    useEffect(() => {
        getCharacters(1);
    }, [])


    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={navigate}>
                        <Text style={styles.textButtonBack}> {"Return"} </Text>
                    </TouchableOpacity>
                    <Image style={styles.logo} source={require('../images/logo.png')}/>
                </View>
                {
                    characters.length === 0 ?
                        <LoaderSpinner />
                    : (
                        <>
                            <Animated.FlatList
                                style={styles.flatList}
                                data={characters}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                snapToInterval={width}
                                decelerationRate={'fast'}
                                keyExtractor={(_, index) => index.toString()}
                                onScroll={Animated.event(
                                [{nativeEvent: {contentOffset: {x: xScroll}}}],
                                {useNativeDriver: true},
                                )}
                                renderItem={({item, index}) => {
                                    const inputRange = [
                                        (index - 1) * width,
                                        index * width,
                                        (index + 1) * width,
                                    ];
                                    const outputRange = ['-90deg', '0deg', '90deg'];

                                    const translateX = xScroll.interpolate({inputRange, outputRange});

                                    return (
                                        <>  
                                            
                                            <View style={styles.containerImageFlatList}>
                                                <Text style={styles.nameCharacter}>{item.name}</Text>
                                                <Animated.Image
                                                    style={[styles.image, {transform: [{rotateZ: translateX}]}]}
                                                    source={{uri: item.image}}
                                                />
                                                <TouchableOpacity 
                                                    style={styles.buttonDetails}
                                                    onPress={() => {toInfoCharacter.navigate('InfoCharacter', {id: item.id})}}
                                                >
                                                    <Text style={styles.textButton}>Details</Text>
                                                </TouchableOpacity>
                                            </View>
                                            
                                        </>
                                    );
                                }}
                            />
                        </>
                    )
                }
                <View style={styles.containerPagination}>
                    <TouchableOpacity
                        disabled={prev == 0 ? true : false}
                        onPress={() => {
                            getCharacters(prev);
                            setPrev(prev - 1);
                            setNext(next - 1);
                        }}
                        style={styles.buttonPagination}
                    >
                        <Text style={styles.textButton}>{"<--"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.textPage}>Page: {next-1} / {maxPage}</Text>
                    <TouchableOpacity 
                        disabled={(next-1) === maxPage ? true : false}
                        onPress={() => {
                            getCharacters(next);
                            setPrev(prev + 1);
                            setNext(next + 1);
                        }}
                        style={styles.buttonPagination}
                    >
                        <Text style={styles.textButton}>{"-->"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height - 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'black',
        flexDirection: 'column',
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

    flatList: {
        flexGrow: 0,
        marginTop: -20,
    },
    nameCharacter: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
    },
    containerImageFlatList: {
        width,
        height: 500,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 250,
        width: 250,
        borderRadius: 20,
        resizeMode: 'cover',
    },
    buttonDetails: {
        width: 100,
        height: 40,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },

    containerPagination: {
        flexDirection: 'row',
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    buttonPagination: {
        width: 60,
        height: 25,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textPage: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        marginRight: 20,
        marginLeft: 20,
    },
});

export default CharactersScreen;
