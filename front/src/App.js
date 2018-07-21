import React, {Component} from "react";
import "./App.css";

import {drizzleConnect} from "drizzle-react";
import {ListOfRides, RIDES} from "./ListOfRides";

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
                       <ListOfRides rides={RIDES}/>
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
