import React, {Component} from "react";
import {PassengerList, PASSENGERS} from "./PassengerList";
import io from "socket.io-client";

const socket = io('http://localhost:4200');

export class ProviderJourneyStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            passengers: PASSENGERS,
            presence: {}
        }
    }

    componentDidMount() {
        // Register on websocket
        // Subscribe to websocket
        socket.on('connect', function () {
            console.log("connected")
        });
        socket.on('presence', data => {
            console.log("data:", data);

            this.setState({
                presence: data
            });
        });
        socket.on('check-in', data => {
            const passenger = PASSENGERS[0];
            passenger.status = "active";
            this.setState({
                passengers: [passenger]
            });
        });

        socket.on('disconnect', function () {
            console.log("disconnected")
        });
    }

    render() {
        return <div>
            <h3>Munich &rarr; Berlin</h3>
            <h3 className="font-accent">Your passengers</h3>
            <PassengerList passengers={this.state.passengers}/>
        </div>
    }

}
