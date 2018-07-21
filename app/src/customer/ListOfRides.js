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
    new Ride("a", "Munich", "Berlin", Math.random()),
    new Ride("b", "Stuttgart", "Paris", Math.random()),
    new Ride("c", "Stuttgart", "Paris", Math.random()),
    new Ride("d", "Munich", "Paris", Math.random()),
    new Ride("e", "Stuttgart", "Paris", Math.random()),
    new Ride("f", "Stuttgart", "Paris", Math.random()),
    new Ride("g", "Stuttgart", "Paris", Math.random()),
    new Ride("h", "Stuttgart", "Paris", Math.random()),
];

export class ListOfRides extends Component {

    render() {
        return (<div>
            {this.props.rides.map(ride => <RideItem key={ride.id} ride={ride}/>)}
        </div>)
    }

}
