import React, { useState } from 'react';
import styled from 'styled-components';
import size from './config/consts';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './components/footer';

const background = require("./images/background.jpg");
const backgroundMobile = require("./images/backgroundMobile.jpg");
const logo = require("./images/logo.png");
const magnifier = require("./images/magnifier.png");

const windowMaxWidth = 800;

function App() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  function handleSearch() {
    if(search !== '') {
        navigate(`/character/search/${search}`, { replace: true });
    }
}

  return (
    <Container> 
      <ContainerCenter>
        <Logo 
          src={logo} 
          alt="Logo Rick and Morty"
        />
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
        <Link to={'/characters/page/1'} style={{ textDecoration: 'none' }}>
          <ButtonCharacters
            type="button"
            onClick={() => {
              handleSearch();
            }}
          >
            All Characters
          </ButtonCharacters>
        </Link>
      </ContainerCenter>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${size[0] > windowMaxWidth ? background : backgroundMobile});
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  width: 100vw;
  height: 100vh;
`;

const ContainerCenter = styled.div`
  background-color: black;
  padding: 20px;
  opacity: 0.8;
  border: 2px solid white;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 300px;
  height: 100px;
`;

const ContainerSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 25px;
`;

const SearchBar = styled.input`
  width: ${size[0] > windowMaxWidth ? "400px" : "200px"};
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

const ButtonCharacters = styled.button`
  margin-top: 50px;
  width: 200px;
  height: 40px;
  background-color: white;
  cursor: pointer;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }

  color: black;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

export default App;
