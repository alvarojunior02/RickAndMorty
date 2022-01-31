import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Characters from './components/characters';

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
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
