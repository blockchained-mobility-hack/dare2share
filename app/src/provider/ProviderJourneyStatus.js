import React, {Component} from "react";
import {PassengerList, PASSENGERS} from "./PassengerList";
import {AppFooter} from "../scaffold/AppFooter";
import {Link} from "react-router-dom";

export class ProviderJourneyStatus extends Component {

    render() {
        return <div>
            <h3>Munich &rarr; Berlin</h3>
            <h3>Passengers</h3>
            <PassengerList passengers={PASSENGERS}/>
            <AppFooter>
                <Link to="/wallet">Checkout</Link>
            </AppFooter>
        </div>
    }

}
