import React, {Component} from "react";
import {RideItem} from "./RideItem";

export class Ride {

    constructor(id, start, destination, price) {
        this.id = id;
        this.start = start;
        this.destination = destination
        this.price = price * 100;
    }

}

export const RIDES = [
    new Ride("xxx", "Munich", "Berlin", Math.random()),
    new Ride("yyy", "Stuttgart", "Paris", Math.random()),
    new Ride("yyy", "Stuttgart", "Paris", Math.random()),
    new Ride("yyy", "Munich", "Paris", Math.random()),
    new Ride("yyy", "Stuttgart", "Paris", Math.random()),
    new Ride("yyy", "Stuttgart", "Paris", Math.random()),
    new Ride("yyy", "Stuttgart", "Paris", Math.random()),
    new Ride("yyy", "Stuttgart", "Paris", Math.random()),
];

export class ListOfRides extends Component {

    render() {
        return (<ul>
            {this.props.rides.map(ride => <RideItem key={ride.id} ride={ride}/>)}
        </ul>)
    }

}
