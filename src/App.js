import React from 'react'
import {
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import HT from "./apps/ht/ht";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Switch>
          <Route path={["/:datasetType/:site/:info", "/:datasetType/:site/", "/:datasetType/", "/"]}>
            <HT />
          </Route>
        </Switch>
      </BrowserRouter>
    </HelmetProvider>
  );
};

//hola

export default App;