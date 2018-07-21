import React, {Component} from "react";
import PropTypes from 'prop-types';

class Ride {

    constructor(id, start, destination) {
        this.id = id;
        this.start = start;
        this.destination = destination
    }

}

export const RIDES = [
    new Ride("0", "Munich", "Berlin"),
    new Ride("0", "Stuttgart", "Paris"),
    56
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
        return (<li key={this.props.ride.id}>{this.props.ride.start} to {this.props.ride.destination}</li>)
    }
}


RideItem.propTypes = {
    ride: PropTypes.instanceOf(Ride)
};
