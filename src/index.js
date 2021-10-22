import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/CSS/index.css';

import reportWebVitals from './reportWebVitals';

//Ht-Imports
import MainPage from './HT-MainPage/MainPage.js';
import Results from './Results/Results.js'
import HtBuilder from './HT-Builder/HtBuilder.js'


ReactDOM.render(
  <React.StrictMode>
    <MainPage/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
