import React, {Component} from "react";
import {PropTypes} from "prop-types"

export class PassengerItem extends Component {

    render() {
        return <li>
            <p> {this.props.passenger.name}</p>
            <p> {this.props.passenger.status}</p>
            <p> {this.props.passenger.km} km</p>
            <p> Seit {this.props.passenger.time}</p>
            <hr/>
        </li>
    }

}

