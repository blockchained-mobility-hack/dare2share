import React, {Component} from "react";
import {PassengerList, PASSENGERS} from "./PassengerList";
import io from "socket.io-client";

import ReactModal from 'react-modal';
import {AppFooter} from "../scaffold/AppFooter";
import * as ethers from "ethers";
import {DriverAddress, PassengerAddress, SmartContractAddress} from "../ethereum";


import RideSharing from "../contracts/RideSharing.json";
import {SocketAdress} from "../network";
import Link from "react-router-dom/es/Link";


ReactModal.setAppElement(document.getElementById("root"));

const socket = io(SocketAdress);

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
            paymentActive: false,
            paymentComplete: false
        };
        this.doCheckout = this.doCheckout.bind(this);
        this.collectPayment = this.collectPayment.bind(this);
        this.showCheckoutModal = this.showCheckoutModal.bind(this);
        this.showPaymentCompleteModal = this.showPaymentCompleteModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    showCheckoutModal() {
        this.setState({
            showCheckout: true
        })
    }

    showPaymentCompleteModal() {
        this.setState({
            paymentComplete: true
        })
    }

    closeModal() {
        this.setState({
            showCheckout: false,
            paymentComplete: false
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

            this.showCheckoutModal()
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
        console.log(signer);
        const contract = new ethers.Contract(SmartContractAddress, RideSharing.abi, signer);
        console.log(contract);


        const checkinMessage = {
            rideId: 110,
            start_lat: 48,
            start_lng: 11,
            startTimestamp: 1532253530999,
            km: 585,
            pricePerKm: 2500000000000000,
            driver: DriverAddress,
            passenger: PassengerAddress,
            waivePenalty: false
        };

        const lastPop = {
            lat: 49,
            lng: 12,
            timestamp: Date.now(),
            rideId: 110,
            km: 572
        };

        contract.oncashoutcomplete = (address, balance) => {
            console.log('cashout complete', 'address', address, 'balance', balance);
          if (address.toLowerCase() === DriverAddress.toLowerCase()) {
              console.log('new balance', balance);
              this.showPaymentCompleteModal()
          }
        };

        contract.rideCashout(checkinMessage, lastPop)
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
            <ReactModal
                isOpen={this.state.paymentComplete}
                style={customStyles}
                onRequestClose={this.closeModal}>
                <p>Payment completed</p>
                <Link to="/wallet"><div className="border-accent font-accent pa2 w3 center tc">Go to wallet</div></Link>
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

