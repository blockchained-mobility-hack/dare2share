import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import {DrizzleProvider} from "drizzle-react";
import {LoadingContainer} from "drizzle-react-components";
import createBrowserHistory from 'history/createBrowserHistory'
import {Route, Router, Switch} from "react-router";

// Import contract
import RideSharing from "./contracts/RideSharing.json";
import {CreateRide} from "./CreateRide";
import {ProviderJourneyStatus} from "./provider/ProviderJourneyStatus";


console.log(RideSharing);

const options = {
    web3: {
        block: false,
        fallback: {
            type: "ws",
            url: "ws://127.0.0.1:7545"
        }
    },
    contracts: [RideSharing],
    events: {}
};

const history = createBrowserHistory();

ReactDOM.render(
    <DrizzleProvider options={options}>
        <LoadingContainer>
            <Router history={history}>
               <Switch>
                <Route exact path="/" component={App}/>
                   <Route path="/create" component={CreateRide}/>
                   <Route path="/journey" component={ProviderJourneyStatus}/>
               </Switch>
            </Router>
        </LoadingContainer>
    </DrizzleProvider>,
    document.getElementById("root")
);
registerServiceWorker();
