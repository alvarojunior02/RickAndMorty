import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Characters from './components/characters';
import SearchCharactersResult from './components/searchCharatersResult';
import InfoCharacter from './components/infoCharacter';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="characters" element={<Characters />}/>
      <Route path="/character/search/:s" element={<SearchCharactersResult />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
