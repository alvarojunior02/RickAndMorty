/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../../services/api";
import styled from 'styled-components';
import NavBar from '../navBar';
import CharactersType from '../../config/types';

import size from "../../config/consts";
import { Link } from 'react-router-dom';
import Footer from '../footer';

const windowMaxWidth = 800;

export default function Characters(): JSX.Element {
    const params = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [pageNumbers, setPageNumbers] = useState(0);
    const [prev, setPrev] = useState<any>();
    const [page, setPage] = useState<any>();
    const [next, setNext] = useState<any>();

    function getCharacters() {
        api.get('/character', {
            params: {
                page: params?.page,
            }
        })
            .then((response) => {
                const pageNumber = (parseInt(params?.page || '1'));
                setPrev(pageNumber - 1);
                setPage(pageNumber);
                setNext(pageNumber + 1);
                setData(response.data.results);
                setPageNumbers(response.data.info.pages);
            })
            .catch(error => {
                alert(error);
            });
    }

    useEffect(() => {
        getCharacters();
    }, [params?.page]);

    return (
        <>
            <NavBar />
            <Container>
                <CharactersList>
                    {
                        data.map((item: CharactersType, index ) => (
                            <CardCharacter key={index}>
                                <NameCharacter>{item.name}</NameCharacter>
                                <Link to={`/character/info/${item.id}`}>
                                    <ClickCharacter>
                                        <ImageCharacter
                                            src={item.image} />
                                    </ClickCharacter>
                                </Link>
                            </CardCharacter>
                        ))
                    }
                </CharactersList>
                <ContainerPageButtons>
                    <PageButton
                        disabled={prev === 0 ? true : false}
                        type='button'
                        onClick={() => {
                            navigate(`/characters/page/${prev}`);
                            setNext(next - 1);
                            setPrev(prev - 1);
                        }}
                    >
                        {"<<<"}
                    </PageButton>
                    <TextPage>Page: {page} / {pageNumbers}</TextPage>
                    <PageButton
                        disabled={next > pageNumbers ? true : false}
                        type='button'
                        onClick={() => {
                            navigate(`/characters/page/${next}`);
                            setNext(next + 1);
                            setPrev(prev + 1);
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
    margin-top: 120px;
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

