import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks';
import Client from './webServices/apollo_client';
import "./styleSheet_regulonDB.css"

const main = document.getElementById('root');
const renderOrHydrate = main.innerHTML.trim().length ? 'hydrate' : 'render';

ReactDOM[renderOrHydrate](
    <React.StrictMode>
        <HashRouter>
            <ApolloProvider client={Client}>
                <App />
            </ApolloProvider>
        </HashRouter>
    </React.StrictMode>,
    main
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
