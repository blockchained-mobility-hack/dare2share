import React, {Component} from "react";
import {RIDES} from "./ListOfRides";
import {AppFooter} from "../scaffold/AppFooter";
import {Link} from "react-router-dom";

export class RideDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ride: {id: "", start: "", destination: "", price: ""}
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.setState({
            ride: RIDES.filter(ride => ride.id === id)[0]
        });
    }

    render() {
        return <div>
            <h3>{this.state.ride.start} - {this.state.ride.destination}</h3>
            <div>Show Map</div>
            <div>
                <div className="dt w-100 tl">
                    <div className="dt-row">
                        <div className="dtc">Cost for ride per seat</div>
                        <div className="dtc">45 €</div>
                    </div>
                    <div className="dt-row">
                        <div className="dtc">Available passenger seats</div>
                        <div className="dtc">4</div>
                    </div>
                    <div className="dt-row">
                        <div className="dtc">Car type</div>
                        <div className="dtc">BMW i3</div>
                    </div>
                    <div className="dt-row">
                        <div className="dtc">15 km</div>
                        <div className="dtc">25 min</div>
                    </div>
                    <div className="dt-row">
                        <div className="dtc">Tolerance for passenger delay</div>
                        <div className="dtc">25 min€</div>
                    </div>
                </div>
            </div>
            <AppFooter>
                <Link to="">Pick me up</Link>
            </AppFooter>
        </div>
    }
}
