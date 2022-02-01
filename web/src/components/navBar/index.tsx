import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import size from "../../config/consts";
import { useNavigate } from "react-router";


const logo = require("../../images/logo.png");
const magnifier = require("../../images/magnifier.png");

const windowMaxWidth = 800;

export default function NavBar(): JSX.Element {
    const navigate = useNavigate();

    const [search, setSearch] = useState('');

    function handleSearch() {
        if(search !== '') {
            navigate(`/character/search/${search}`, { replace: true });
            document.location.reload();
        }
    }

    return(
        <>
            <Container>
                <Link 
                    to={"/"} 
                    style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        textDecoration: 'none'
                    }
                }>
                    <Logo 
                        src={logo}
                        alt="Rick and Morty"
                    />
                </Link>
                <ContainerSearch>
                    <SearchBar 
                        type="search"
                        placeholder='Search Character'
                        value={search}
                        onChange={event => {
                            setSearch(event.target.value);
                        }}
                    />
                    <ButtonSearch
                        type="button"
                        onClick={() => {
                            handleSearch();
                        }}
                    >
                        <ButtonSearchImage
                            src={magnifier} 
                            alt="magnifier"
                        />
                    </ButtonSearch>
                </ContainerSearch>
            </Container>
        </>
    );
}

const Container = styled.div`
    max-width: 100%;
    width: 100%;
    height: 120px;
    background-color: black;
    position: fixed;

    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const Logo = styled.img`
    margin-top: 20px;
    width: ${size[0] > windowMaxWidth ? "150px" : "100px"};
    height: ${size[0] > windowMaxWidth ? "60px" : "30px"};
`;

const ContainerSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 25px;
`;

const SearchBar = styled.input`
  width: ${size[0] > windowMaxWidth ? "30vw" : "150px"};
  height: 40px;
  background-color: white;
  padding-left: 10px;
  margin-right: 10px;
`;

const ButtonSearch = styled.button`
  width: 50px;
  height: 50px;
  background-color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  cursor: pointer;
  margin-left: 10px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ButtonSearchImage = styled.img`
  width: 35px;
  height: 35px;
`;
