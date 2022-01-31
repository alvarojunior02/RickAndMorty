/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import api from "../../services/api";
import styled from 'styled-components';
import NavBar from '../navBar';
import CharactersType from '../../config/types';

import size from "../../config/consts";

const windowMaxWidth = 800;

export default function Characters(): JSX.Element {
    const [data, setData] = useState([]);
    const [pageNumbers, setPageNumbers] = useState(0);
    const [next, setNext] = useState(2);
    const [prev, setPrev] = useState(0);

    function getCharacters() {
        api.get('/character')
            .then((response) => {
                setData(response.data.results);
                setPageNumbers(response.data.info.pages);
            })
            .catch(error => {
                alert(error);
            });
    }

    function getCharactersByPage(pageNumber: number, type: string) {
        api.get('/character', {
            params: {
                page: pageNumber,
            }
        })
            .then((response) => {
                setData(response.data.results);
                setPageNumbers(response.data.info.pages);
                if(type === 'next') {
                    setNext(next + 1);
                    setPrev(prev + 1);
                } else {
                    setNext(next - 1);
                    setPrev(prev - 1);
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    useEffect(() => {
        getCharacters();
    }, []);

    return (
        <>
            <Container>
                <NavBar />
                <ContainerPageButtons>
                    <PageButton
                        disabled={prev === 0 ? true : false}
                        type='button'
                        onClick={() => {
                            getCharactersByPage(prev, 'prev');
                        }}
                    >
                        {"<<<"}
                    </PageButton>
                    <TextPage>Page: {next-1} / {pageNumbers}</TextPage>
                    <PageButton
                        disabled={next > pageNumbers ? true : false}
                        type='button'
                        onClick={() => {
                            getCharactersByPage(next, 'next');
                        }}
                    >
                        {">>>"}
                    </PageButton>
                </ContainerPageButtons>
                <CharactersList>
                    {
                        data.map((item: CharactersType, index ) => {
                            return (
                                <CardCharacter key={index}>
                                    <NameCharacter>{item.name}</NameCharacter>
                                    <ClickCharacter>
                                        <ImageCharacter
                                            src={item.image}
                                        />
                                    </ClickCharacter>
                                </CardCharacter>
                            )
                        })
                    }
                </CharactersList>
                <ContainerPageButtons>
                    <PageButton
                        disabled={prev === 0 ? true : false}
                        type='button'
                        onClick={() => {
                            getCharactersByPage(prev, 'prev');
                        }}
                    >
                        {"<<<"}
                    </PageButton>
                    <TextPage>Page: {next-1} / {pageNumbers}</TextPage>
                    <PageButton
                        disabled={next > pageNumbers ? true : false}
                        type='button'
                        onClick={() => {
                            getCharactersByPage(next, 'next');
                        }}
                    >
                        {">>>"}
                    </PageButton>
                </ContainerPageButtons>
            </Container>
        </>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: black;
    padding-bottom: 50px;
`;

const ContainerPageButtons = styled.div`
    max-width: 1080px;
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const TextPage = styled.h2`
    font-size: 20px;
    color: white;
    font-weight: bold;
    margin: 0 20px;
`;

const PageButton = styled.button`
    background-color: white;
    border: none;
    width: 40px;
    height: 40px;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

const CharactersList = styled.div`
    margin-top: 30px;
    max-width: 1080px;
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const CardCharacter = styled.div`
    width: 200px;
    height: 230px;
    margin: 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;

    &:hover {
        img {
            zoom: ${size[0] > windowMaxWidth ? "110%" : "none"};
        }
        h2 {
            display: flex;
        }
    }
`;

const ClickCharacter = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ImageCharacter = styled.img`
    width: 200px;
    height: 200px;
`;

const NameCharacter = styled.h2`
    font-size: 16px;
    display: ${size[0] > windowMaxWidth ? "none" : "auto"};
    text-align: center;
    color: white;
`;
