import styled from "styled-components";

export default function Footer(): JSX.Element {

    return(
        <>
            <Container> 
                <FooterLink
                    target="_blank"
                    href="https://www.linkedin.com/in/alvaro-junior-831299183/"
                >
                    My LinkedIn
                </FooterLink>
                <FooterLink
                    target="_blank"
                    href="https://github.com/alvarojunior02"
                >
                    My GitHub
                </FooterLink>
                <FooterLink
                    target="_blank"
                    href="https://rickandmortyapi.com/"
                >
                    API Docs
                </FooterLink>
            </Container>
        </>
    );
}

const Container = styled.div`
    background-color: black;
    margin-top: 30px;
    position: fixed;
    bottom: 0;
    right: 0;
    max-width: 100%;
    width: 100%;
    height: 40px;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
`;

const FooterLink = styled.a`
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    text-align: center;
    color: white;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;
