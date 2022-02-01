/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import api from "../../services/api";
import styled from 'styled-components';
import NavBar from '../navBar';
import CharactersType from '../../config/types';

import { useParams } from 'react-router-dom';

import size from "../../config/consts";
import Footer from '../footer';

const windowMaxWidth = 800;

export default function SearchCharactersResult(): JSX.Element {
    const params = useParams();

    const [data, setData] = useState([]);
    const [pageNumbers, setPageNumbers] = useState(0);
    const [next, setNext] = useState(2);
    const [prev, setPrev] = useState(0);

    function getCharactersByName() {
        api.get("/character", {
            params:{
                name: params.s?.toLowerCase(),
            }
        })
            .then(response => {
                setData(response.data.results);
                setPageNumbers(response.data.info.pages);
            })
            .catch(error => {
                alert(error);
            })
    }

    function getCharactersByPage(pageNumber: number, type: string) {
        api.get('/character', {
            params: {
                page: pageNumber,
                name: params.s
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
        getCharactersByName();
    }, []);

    return (
        <>
            <NavBar />
            <Container>
                <TextSearch>Searching by: "{params.s}"</TextSearch>
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
                <Footer />
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

const TextSearch = styled.h2`
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-top: 120px;
`;

const ContainerPageButtons = styled.div`
    max-width: 1080px;
    width: 100%;
    margin: 30px 0;
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

