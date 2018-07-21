import React, {Component} from "react";
import {PassengerItem} from "./PassengerItem";




export const PASSENGERS = [
    {id: "a23", name: "David S.", status: "active", km: "234", time: "02:35:45"},
    {id: "b45", name: "Sascha J.", status: "active", km: "12", time: "00:08:23"},
];

export class PassengerList extends Component {

    render() {
        return <ul className="list">
            {this.props.passengers.map(passenger =>
                <PassengerItem key={passenger.id} passenger={passenger}/>) }
        </ul>
    }

}
