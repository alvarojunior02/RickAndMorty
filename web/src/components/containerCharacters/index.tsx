import { useState, useEffect } from 'react';
import api from "../../services/api";
import styled from 'styled-components';

type Characters = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string,
    },
    location: {
        name: string,
        url: string,
    },
    image: string,
    episode: Array<string>,
    url: string,
    created: string,

};

export default function ContainerCharacters(): JSX.Element {
    const [data, setData] = useState([]);

    function getCharacters() {
        api.get('/character')
            .then(response => {
                setData(response.data.results);
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
                {
                    console.log(data)
                }
                {
                    data.map((item: Characters ) => {
                        return (
                            <CardCharacter>
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
            </Container>
        </>
    );
}

const Container = styled.div`
    max-width: 1080px;
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-around;
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

    &:hover {
        img {
            box-shadow: 4px 4px 4px #222;
            zoom: 110%;
            transform: rotate3d(20deg, 0, 0);
            cursor: pointer;
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
    border-radius: 30px;
`;

const NameCharacter = styled.h2`
    font-size: 16px;
    display: none;
    text-align: center;
`;
