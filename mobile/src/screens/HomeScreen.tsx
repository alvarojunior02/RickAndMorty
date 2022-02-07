import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './RootStackParams';
import { StyleSheet, View } from 'react-native';

type toScreenSearchResultProp = StackNavigationProp<RootStackParamList, 'SearchResult'>;
type toCharactersProp = StackNavigationProp<RootStackParamList, 'Characters'>;

const HomeScreen = () => {

    const [search, setSearch] = useState('');

    const toSarchResult = useNavigation<toScreenSearchResultProp>();
    const toCharacters = useNavigation<toCharactersProp>();

    const navigateToSearch = () => {
        toSarchResult.navigate('SearchResult', {
            search,
        });
    }

    const navigateToCharacters = () => {
        toCharacters.navigate('Characters');
    }

    return (
        <View style={styles.container}>
            <Logo source={require('../images/logo.png')}/>
            <SubContainer>
                <SearchBar 
                    placeholder='Search Character' 
                    value={search}
                    onChangeText={value => {
                        setSearch(value);
                    }}
                />
                <SearchButton onPress={() => {
                    navigateToSearch();
                    setSearch('');
                }}>
                    <SearchButtonImage  source={require('../images/magnifier.png')}/>
                </SearchButton>
                <ButtonCharacters onPress={navigateToCharacters}>
                    <TextButtonCharacters>All Characters</TextButtonCharacters>
                </ButtonCharacters>
            </SubContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
});

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: black;
`;

const SubContainer = styled.View`
    margin-top: 50px;
    justify-content: flex-start;
    align-items: center;
    border: 2px solid white;
    border-radius: 30px;
    padding: 20px;
`;

const SearchBar = styled.TextInput`
    width: 260px;
    height: 40px;
    background-color: white;
    color: black;
    border-radius: 30px;
    padding-left: 15px;
`;

const SearchButton = styled.TouchableOpacity`
    margin-top: 15px;
    width: 60px;
    height: 60px;
    background-color: white;
    color: black;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;

const SearchButtonImage = styled.Image`
    width: 40px;
    height: 40px;
`;

const ButtonCharacters = styled.TouchableOpacity`
    margin-top: 60px;
    width: 260px;
    height: 40px;
    background-color: white;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;

const TextButtonCharacters = styled.Text`
    color: black;
    font-size: 20px;
    font-weight: bold;
`;

const Logo = styled.Image`
    width: 300px;
    height: 80px;
`;

export default HomeScreen;