import React, {Component} from "react";
import CheckMarkIcon from "../icons/CheckmarkIcon";

export class PassengerItem extends Component {


    render() {
        return <div className="ListItem">
            <div className="f3 b w-100 tl bb b--near-black">{this.props.passenger.name}</div>
            <div className="PassengerItem">
                <div className="w-25">Distance<br/><span className="b f4">{this.props.passenger.km} km</span></div>
                <div className="w-25">Duration<br/><span className="b f4">{this.props.passenger.time}</span></div>
                <div className="w-25">Price<br/><span className="b f4">{this.props.passenger.price}</span></div>
                <div className="w-25">Connection<br/><span className="b f4">
                    {this.props.passenger.status === "active" ? <CheckMarkIcon/> : "Waiting"}</span></div>
            </div>
        </div>
    }
}
