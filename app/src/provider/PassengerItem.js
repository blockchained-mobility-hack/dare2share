import React, {Component} from "react";
import {PropTypes} from "prop-types"

export class PassengerItem extends Component {

    passenger;

    constructor(props) {
        super(props)
        this.passenger = props.passenger
    }

    render() {
        return <li>
            <p className="b">{this.props.passenger.name}</p>
            <p>Connection: {this.props.passenger.status}</p>
            <p>Distance: {this.props.passenger.km} km</p>
            <p>Duration: {this.props.passenger.time}</p>
            <p>Price: {this.props.passenger.price}</p>
            <hr/>
        </li>
    }
}

