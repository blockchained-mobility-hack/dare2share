import React, {Component} from "react";
import {RIDES} from "./ListOfRides";
import {AppFooter} from "../scaffold/AppFooter";
import ReactModal from 'react-modal';

import io from 'socket.io-client';
import {sendPassengerRequest} from "../network";

// Import contract
import RideSharing from "../contracts/RideSharing.json";
import * as ethers from "ethers";
import {Link} from "react-router-dom";

const socket = io('http://localhost:4200');

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        height: '20%'
    }
};

ReactModal.setAppElement(document.getElementById("root"));

 export class RideDetails extends Component {

    constructor(props) {
        super(props);
        this.requestRide = this.requestRide.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            ride: {id: "", start: "", destination: "", price: ""},
            displayNotification: true
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.setState({
            ride: RIDES.filter(ride => ride.id === id)[0]
        });


    }

    showModal() {
        this.setState({
            displayNotification: true
        })
    }

     closeModal() {
         this.setState({
             displayNotification: false
         })
     }

    requestRide() {
        // Send event to driver
        console.log('Notify driver');


        const rideInfo = {
            rideId: 110,
            start_lat: 48,
            start_lng: 11,
            startTimestamp: Date.now(),
            pricePerKm: 1000000000000000,
            driver: "0x6dc1675ee2122c69c3d5fbce458d9cfae03c52a0",
            passenger: "0x469f4a3a2628b320b2f60eb627d2cca8b75a4587"
        };

        this.initializeContracts();
        sendPassengerRequest(rideInfo)
    }

    initializeContracts() {

        const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        console.log(provider);

        const signer = provider.getSigner();

        const aggregatorContract = new ethers.Contract('0xcae98f6132a6999775e37fadeed65459ef441c52', RideSharing.abi, signer);

        aggregatorContract.onrideaccepted = (rideId, passenger) => {
            console.log("rideId: " + rideId + "    " + "passenger: " + passenger);
            signer.getAddress().then(address => {
                if(passenger === address) {
                    console.log('passenger received ethereum event');
                      this.showModal();
                }
            });
        }
    }

    render() {
        return <div>
            <ReactModal
                isOpen={this.state.displayNotification}
                style={customStyles}
                onRequestClose={this.closeModal}>
                <p>Jessi accepted your request.</p>
                <Link to="/checkin"><div className="border-accent font-accent pa2 w3 center tc">OK</div></Link>
            </ReactModal>
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
