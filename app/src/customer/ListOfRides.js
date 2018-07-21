import React, {Component} from "react";
import {RideItem} from "./RideItem";

export class Ride {

    constructor(id, start, destination) {
        this.id = id;
        this.start = start;
        this.destination = destination
    }

}

export const RIDES = [
    new Ride("xxx", "Munich", "Berlin"),
    new Ride("yyy", "Stuttgart", "Paris"),
];

export class ListOfRides extends Component {

    render() {
        return (<ul>
            {this.props.rides.map(ride => <RideItem key={ride.id} ride={ride}/>)}
        </ul>)
    }

}
