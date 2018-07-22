import React, {Component} from "react";
import io from 'socket.io-client';
import CheckMarkIcon from "../icons/CheckmarkIcon";
import {sendDriverConfirmation} from "../network";

// Import contract
import RideSharing from "../contracts/RideSharing.json";
import * as ethers from "ethers";

const socket = io('http://localhost:4200');

const NoPassengers = props => <div>No passengers yet</div>;

const RedX = props => <span className="red">X</span>;

export class PassengerToConfirm extends React.Component {

    constructor(props) {
        super(props);
        this.confirmPassenger = this.confirmPassenger.bind(this)
    }

    initializeContracts() {

        const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        console.log(provider);

        const signer = provider.getSigner();

        const aggregatorContract = new ethers.Contract('0xcae98f6132a6999775e37fadeed65459ef441c52', RideSharing.abi, signer);

        const rideInfo = {
            rideId: 110,
            start_lat: 48,
            start_lng: 11,
            startTimestamp: Date.now(),
            pricePerKm: 1000000000000000,
            driver: "0x6dc1675ee2122c69c3d5fbce458d9cfae03c52a0",
            passenger: "0x469f4a3a2628b320b2f60eb627d2cca8b75a4587"
        };

        console.log('Trigger transaction');
        aggregatorContract.newRide(rideInfo)
    }

    confirmPassenger() {
        console.log("confirm passenger", this.props.passenger.name);
        this.initializeContracts();
        sendDriverConfirmation({})
    }

    render() {
        return <div>{this.props.passenger.name} <CheckMarkIcon onClick={this.confirmPassenger}/> <RedX/></div>;
    }
}

export class PassengersWithConfirmation extends React.Component {

    render() {
        return <div>
            {this.props.passengers.map(passenger => <PassengerToConfirm key={passenger.id} passenger={passenger}/>)}
        </div>
    }
}

export class RideOverview extends Component {


    constructor(props) {
        super(props);
        this.state = {
            passengers: []
        }
    }

    componentDidMount() {
        // Subscribe to websocket
        socket.on('connect', function () {
            console.log("connected")
        });
        socket.on('join', data => {
            console.log("data:", data);

            this.setState({
                passengers: [{id: "110", name: "Sascha J."}]
            });
        });

        socket.on('disconnect', function () {
            console.log("disconnected")
        });

    }


    render() {

        return <div>
            <h3 className="font-accent">your ride is online</h3>
            <h3>Passengers</h3>
            <hr/>
            {this.state.passengers.length > 0 ? <PassengersWithConfirmation passengers={this.state.passengers}/> :
                <NoPassengers/>}
        </div>
    }
}

