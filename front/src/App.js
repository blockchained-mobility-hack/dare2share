import React, {Component} from "react";
import "./App.css";

import {drizzleConnect} from "drizzle-react";

class App extends Component {
    render() {
        const {drizzleStatus, accounts} = this.props;
        console.log(accounts);

        if (drizzleStatus.initialized) {
            return (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Dare2Share</h1>
                    </header>
                </div>
            );
        }

        return <div>Loading dapp...(Make sure you have Ganache running)</div>;
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        drizzleStatus: state.drizzleStatus,
        RideSharing: state.contracts.RideSharing
    };
};

const AppContainer = drizzleConnect(App, mapStateToProps);
export default AppContainer;
