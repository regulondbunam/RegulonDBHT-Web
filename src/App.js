import React from 'react'
import {
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import HT from "./apps/ht/HighThroughput";

//Static Global Variable

window.IN_URL = {
  main: "/ht",
  finder: "/ht/finder/",
  dataset: "/ht/dataset/"
} 


function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Switch>
          <Route path={["/ht/:site/:datasetType/:info", "/ht/:site/:datasetType", "/ht/:site/", "/ht", "/"]}>
            <HT />
          </Route>
        </Switch>
      </BrowserRouter>
    </HelmetProvider>
  );
};

//hola

export default App;