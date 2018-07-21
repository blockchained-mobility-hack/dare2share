import React, {Component} from "react";


class Ride {

    constructor(id, start, destination) {
        this.id = id;
        this.start = start;
        this.destination = destination
    }

}

export const RIDES = [
    new Ride("0", "Munich", "Berlin"),
    new Ride("0", "Stuttgart", "Paris")
];


export class ListOfRides extends Component {

    render() {
        return (<ul>
            {this.props.rides.map(ride => <RideItem ride={ride}/>)}
        </ul>)
    }

}

export class RideItem extends React.Component {


    render() {
        return (<li>{this.props.ride.start} to {this.props.ride.destination}</li>)
    }
}
