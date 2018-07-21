import React, {Component} from "react";
import {RIDES} from "./ListOfRides";

export class RideDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ride: {id: "", start: "", destination: "", price: ""}
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({
            ride: RIDES.filter(ride => ride.id === id)[0]
        });
    }

    render() {
        return <div>
            <div>{this.state.ride.start} - {this.state.ride.destination}</div>
            <div>Show Map</div>
            <div>
                <div className="dt">
                    <div className="dt-row">
                        <div className="dtc">Cost for ride per sieat</div>
                        <div className="dtc">45 €</div>
                    </div>
                </div>
            </div>
        </div>
    }
}
