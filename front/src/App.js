import React, {Component} from "react";
import "./App.css";

import {drizzleConnect} from "drizzle-react";
import {ListOfRides, RIDES} from "./customer/ListOfRides";
import {AppHeader} from "./AppHeader";
import { Link } from 'react-router-dom'

class App extends Component {
    render() {
        const {accounts} = this.props;
        console.log(accounts);

            return (
                <div className="App">
                   <AppHeader/>
                    <Link to="/create">Create ride</Link>
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
