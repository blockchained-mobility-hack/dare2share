import React, {Component} from "react";
import {PassengerList, PASSENGERS} from "./PassengerList";

export class ProviderJourneyStatus extends Component {


    constructor(props) {
        super(props);
        this.state = {
            passengers: PASSENGERS
        }
    }

    componentDidMount() {
        // Register on websocket

        setTimeout(() => {

            const passenger = PASSENGERS[0];
            passenger.status = "active";
            this.setState({
                passengers: [passenger]
            })
        }, 2000);
    }

    render() {
        return <div>
            <h3>Munich &rarr; Berlin</h3>
            <h3 className="font-accent">Your passengers</h3>
            <PassengerList passengers={this.state.passengers}/>
        </div>
    }

}
