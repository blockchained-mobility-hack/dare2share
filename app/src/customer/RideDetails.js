import React, {Component} from "react";
import {RIDES} from "./ListOfRides";
import {AppFooter} from "../scaffold/AppFooter";
import ReactModal from 'react-modal';

import io from 'socket.io-client';
import {sendPassengerRequest} from "../network";

const socket = io('http://localhost:4200');

ReactModal.setAppElement(document.getElementById("root"));

export class RideDetails extends Component {

    constructor(props) {
        super(props);
        this.requestRide = this.requestRide.bind(this);
        this.state = {
            ride: {id: "", start: "", destination: "", price: ""},
            displayNotification: false
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.setState({
            ride: RIDES.filter(ride => ride.id === id)[0]
        });

        socket.on('check-in', data => {
           console.log("Display notification", data);

        //   this.showModal()
        });
    }

    showModal() {
        this.setState({
            displayNotification: true
        })
    }

    requestRide() {
        // Send event to driver
        console.log('Notify driver');
        sendPassengerRequest({id: "xcxc", name: "Alexander K."})
    }

    render() {
        return <div>
            <ReactModal isOpen={this.state.displayNotification} >You are accepted</ReactModal>
            <h3>{this.state.ride.start} - {this.state.ride.destination}</h3>
            <div className="bg-accent w-100 white h2 pa2 ma2">Show Map</div>
            <div>
                <h3>Details</h3>
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
                        <div className="dtc">Tolerance for passenger delay</div>
                        <div className="dtc">25 min</div>
                    </div>
                    <div className="dt-row">
                        <div className="dtc">Fee for passenger delay</div>
                        <div className="dtc">5 €</div>
                    </div>
                </div>
            </div>
            <AppFooter>
                <a onClick={this.requestRide}>Pick me up</a>
            </AppFooter>
        </div>
    }
}
