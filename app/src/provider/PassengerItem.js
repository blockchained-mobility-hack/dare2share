import React, {Component} from "react";

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
                <div>Distance<br/><span className="b f4">{this.props.passenger.km} km</span></div>
                <div>Duration<br/><span className="b f4">{this.props.passenger.time}</span></div>
                <div>Price<br/><span className="b f4">{this.props.passenger.price}</span></div>
                <div>Connection<br/><span className="b f4">{this.props.passenger.status}</span></div>
            </div>
        </div>
    }
}

