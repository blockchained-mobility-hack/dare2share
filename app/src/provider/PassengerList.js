import React, {Component} from "react";
import {PassengerItem} from "./PassengerItem";

export class PassengerList extends Component {

    render() {
        return <ul>
            {this.props.passengers.map(passenger =>
                <PassengerItem key={passenger.id} passenger={passenger}/>) }
        </ul>
    }

}
