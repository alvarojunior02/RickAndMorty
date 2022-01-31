import { useEffect } from "react";
import styled from "styled-components";
import api from "../../services/api";
import { useParams } from "react-router-dom";


export default function InfoCharacter(): JSX.Element {

    const params = useParams();

    function getCharaterById() {
        api.get(`/characters/${params.id}`)
            .then(response => {
                console.log(response);
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
            <Container>

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