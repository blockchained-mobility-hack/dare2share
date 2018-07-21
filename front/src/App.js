import React, {Component} from "react";
import "./App.css";

import {drizzleConnect} from "drizzle-react";

class App extends Component {
    render() {
        const {accounts} = this.props;
        console.log(accounts);

            return (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Dare2Share</h1>
                    </header>
                    <section>
                        let's share a ride
                    </section>
                </div>
            );
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
