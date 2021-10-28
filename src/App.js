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
                <Route path={["/:collection","/"]}>
                    <HT />
                </Route>
            </Switch>
        </BrowserRouter>
      </HelmetProvider>
  );
};

export default App;