import React, {Component} from "react";
import {PassengerList, PASSENGERS} from "./PassengerList";

export class ProviderJourneyStatus extends Component {

    render() {
        return <div>
            <h1>Passengers</h1>
            <PassengerList passengers={PASSENGERS}/>
        </div>
    }

}
