import React, {Component} from "react";
import {PassengerItem} from "./PassengerItem";


export const PASSENGERS = [
    {id: "a23", name: "Kai K.", status: "waiting", km: "547", time: "05:35:45", price: "22,40 €"},
];

export class PassengerList extends Component {

    render() {
        return <div className="list">
            {this.props.passengers.map(passenger =>
                <PassengerItem key={passenger.id} passenger={passenger}/>) }
        </div>
    }
}
