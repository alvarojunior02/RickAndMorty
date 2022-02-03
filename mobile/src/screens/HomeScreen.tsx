import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import { useAppDispatch } from '../hooks';


const HomeScreen = () => {

    const dispatch = useAppDispatch();

    const [search, setSearch] = useState('');

    //useEffect(() => {
    //    dispatch(getCharactersByPage(1));
    //}, [dispatch])


    return (
        <Container>
            <Logo source={require('../images/logo.png')}/>
            <SubContainer>
                <SearchBar 
                    placeholder='Search Character' 
                    value={search}
                    onChangeText={value => {
                        setSearch(value);
                    }}
                />
                <SearchButton>
                    <SearchButtonImage  source={require('../images/magnifier.png')}/>
                </SearchButton>
                <ButtonCharacters>
                    <TextButtonCharacters>All Characters</TextButtonCharacters>
                </ButtonCharacters>
            </SubContainer>
        </Container>
    );
};

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