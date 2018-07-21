import React, {Component} from "react";

export class PassengerItem extends Component {

    render() {
        return <li>
            {this.props.passenger.name}
        </li>
    }

}
