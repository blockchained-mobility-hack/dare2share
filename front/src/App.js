import React, {Component} from "react";
import "./App.css";

import {drizzleConnect} from "drizzle-react";
import {ListOfRides, RIDES} from "./ListOfRides";
import {AppHeader} from "./AppHeader";

class App extends Component {
    render() {
        const {accounts} = this.props;
        console.log(accounts);

            return (
                <div className="App">
                   <AppHeader/>
                    <section>
                       <ListOfRides rides={RIDES}/>
                    </section>
                    <section className="Footer">
                        Create Ride
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
