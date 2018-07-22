import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import {DrizzleProvider} from "drizzle-react";
import {LoadingContainer} from "drizzle-react-components";
// Import contract
import RideSharing from "./contracts/RideSharing.json";


console.log(RideSharing);

const options = {
    web3: {
        block: false,
        fallback: {
            type: "ws",
            url: "ws://127.0.0.1:7545"
        }
    },
    contracts: [],
    events: {}
};


ReactDOM.render(
    <DrizzleProvider options={options}>
        <LoadingContainer>
            <App/>
        </LoadingContainer>
    </DrizzleProvider>,
    document.getElementById("root")
);
registerServiceWorker();
