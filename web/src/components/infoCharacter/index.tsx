import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../services/api";
import { useParams, /*useNavigate*/ } from "react-router-dom";
import NavBar from "../navBar";
import CharactersType from "../../config/types";
import Footer from "../footer";

export default function InfoCharacter(): JSX.Element {

    const params = useParams();
    //const navigate = useNavigate();

    const [data, setData] = useState<CharactersType>();

    function getCharaterById() {
        api.get(`/character/${params.id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                alert(error);
            })
    }

    useEffect(() => {
        getCharaterById();
    });

    return(
        <>
            <NavBar />
            <Container>
                <ContainerHeaderInfos>
                    {/*<BackButton
                        type="button"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        {"<"}
                    </BackButton>*/}
                    <NameCharacter>{data?.name}</NameCharacter>
                </ContainerHeaderInfos>
                <ContainerFirstInfos>
                    <CharacterImage 
                        src={data?.image}
                        alt={data?.name}
                    />
                    <LeftInfos>
                        <TextFirstInfos>Status: {data?.status}</TextFirstInfos>
                        <TextFirstInfos>Specie: {data?.species}</TextFirstInfos>
                        <TextFirstInfos>Origin: {data?.origin.name}</TextFirstInfos>
                        <TextFirstInfos>Location: {data?.location.name}</TextFirstInfos>
                    </LeftInfos>
                </ContainerFirstInfos>
                <ContainerLastInfos>
                    <LabelEpisodes>Episodes</LabelEpisodes>
                    <SelectEpisodes>
                        <SingleOption
                            key={0}
                            value={"selectOne"}
                        >
                            Select One
                        </SingleOption>
                        {
                            data?.episode.map((item, index) => {
                                return (
                                    <SingleOption
                                        key={index+1}
                                        value={item}
                                    >
                                        {index+1}° Episode
                                    </SingleOption>
                                )
                            })
                        }
                    </SelectEpisodes>
                </ContainerLastInfos>
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

const ContainerHeaderInfos = styled.div`
    margin-top: 120px;
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
    background-color: black;
`;

/*const BackButton = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    background-color: white;
    border-radius: 50px;
    cursor: pointer;

    color: black;
    font-weight: bold;
    font-size: 20px;
`;*/


const NameCharacter = styled.h1`
    text-align: center;
    color: white;
`;

const ContainerFirstInfos = styled.div`
    max-width: 1080px;
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
`;

const LeftInfos = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const TextFirstInfos = styled.p`
    font-size: 20px;
    color: white;
    text-align: center;
`;

const CharacterImage = styled.img`
    width: 300px;
    height: 300px;
`;

const ContainerLastInfos = styled.div`
    max-width: 1080px;
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom: 30px;
`;

const LabelEpisodes = styled.h1`
    text-align: center;
    color: white;
    font-weight: bold;
`;

const SelectEpisodes = styled.select`
    width: 300px;
    height: 40px;
    border: none;
    background-color: white;
`;

const SingleOption = styled.option`
    font-size: 16px;
    color: black;
    font-weight: bold;
`;