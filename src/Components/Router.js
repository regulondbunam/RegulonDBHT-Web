import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import MainPage from "../HT-Web/MainPage.js";
import Builder from "../HT-Web/Builder.js";
import BuilderE  from "../HT-Web/BuilderE.js";
import Results from "../HT-Web/Results.js"
import Result from "../HT-Web/Result.js";

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/ht" component={MainPage}/>
                    <Route exact path="/ht/normalized/searchBuilder" component={Builder}/>
                    <Route exact path="/ht/contrast/searchBuilder" component={BuilderE}/>
                    <Route exact path="/ht/normalized/searchBuilder/Consulta" component={Results}/>
                    <Route exact path="/ht/normalized/sample/id" component={Result}/>
                </Switch>
            </BrowserRouter>
        );
    }
} export default Router;