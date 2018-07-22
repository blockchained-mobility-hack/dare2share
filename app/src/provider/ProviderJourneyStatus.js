import React, {Component} from "react";
import {PassengerList, PASSENGERS} from "./PassengerList";
import io from "socket.io-client";

import ReactModal from 'react-modal';
import {AppFooter} from "../scaffold/AppFooter";
import * as ethers from "ethers";
import {SmartContractAddress} from "../ethereum";


import RideSharing from "../contracts/RideSharing.json";


ReactModal.setAppElement(document.getElementById("root"));

const socket = io('http://localhost:4200');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '40%'
    }
};

export class ProviderJourneyStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            passengers: PASSENGERS,
            presence: {},
            showCheckout: true,
            paymentActive: false
        };
        this.doCheckout = this.doCheckout.bind(this);
        this.collectPayment = this.collectPayment.bind(this);
    }

    showModal() {
        this.setState({
            showCheckout: true
        })
    }

    closeModal() {
        this.setState({
            showCheckout: false
        })
    }

    componentDidMount() {
        // Register on websocket
        // Subscribe to websocket
        socket.on('connect', function () {
            console.log("connected")
        });
        socket.on('presence', data => {
            console.log("data:", data);

            this.setState({
                presence: data,
            });

            this.showModal()
        });

        socket.on('check-in', data => {
            const passenger = PASSENGERS[0];
            passenger.status = "active";
            this.setState({
                passengers: [passenger]
            });
        });

        socket.on('disconnect', function () {
            console.log("disconnected")
        });
    }

    doCheckout() {
        console.log('do checkout');
        this.setState({
            paymentActive: true
        });
        this.closeModal();
    }

    collectPayment() {
        console.log('collect payment');

        const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        console.log(provider);
        const signer = provider.getSigner();
        console.log(signer)
        const contract = new ethers.Contract(SmartContractAddress, RideSharing.abi, signer);
        console.log(contract)
    }

    render() {
        return <div>
            <ReactModal
                isOpen={this.state.showCheckout}
                style={customStyles}
                onRequestClose={this.closeModal}>
                <p>Sascha wasn't connected for more than 5 minutes</p>
                <div className="border-accent font-accent pa2 w3 center tc" onClick={this.doCheckout}>Finish trip</div>
                <div className="border-accent pa2 w3 center tc" onClick={this.closeModal}>Pause trip</div>

            </ReactModal>
            <h3>Munich &rarr; Berlin</h3>
            <h3 className="font-accent">Your passengers</h3>
            <PassengerList passengers={this.state.passengers}/>
            <AppFooter className={this.state.paymentActive ? "db" : "dn"}>
                <a onClick={this.collectPayment}>Collect payment</a>
            </AppFooter>
        </div>
    }


}

