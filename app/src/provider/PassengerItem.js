import React, {Component} from "react";
import {PropTypes} from "prop-types"
import CheckMarkIcon from "../icons/CheckmarkIcon";

export class PassengerItem extends Component {

    passenger;

    constructor(props) {
        super(props)
        this.passenger = props.passenger
    }

    render() {
        return <div className="ListItem">
            <div className="b w-100 tl bb b--near-black">{this.props.passenger.name}</div>
            <div className="PassengerItem">
                <div className="w-25">Distance<br/><span className="b f4">{this.props.passenger.km} km</span></div>
                <div className="w-25">Duration<br/><span className="b f4">{this.props.passenger.time}</span></div>
                <div className="w-25">Price<br/><span className="b f4">{this.props.passenger.price}</span></div>
                <div className="w-25">Connection<br/><span className="b f4">{this.props.passenger.status ? <CheckMarkIcon/> : "Error"}</span></div>
            </div>
        </div>
    }
}
