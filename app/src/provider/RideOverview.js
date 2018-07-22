import React, {Component} from "react";
import io from 'socket.io-client';
import CheckMarkIcon from "../icons/CheckmarkIcon";
// Import contract
import RideSharing from "../contracts/RideSharing.json";
import * as ethers from "ethers";
import {CheckIn} from "../CheckIn";
import {Link} from "react-router-dom";
import {DriverAddress, PassengerAddress, SmartContractAddress} from "../ethereum";
import {sendDriverConfirmation, SocketAdress} from "../network";

const socket = io(SocketAdress);

const NoPassengers = props => <div>No passengers yet</div>;

const RedX = props => <span className="red">X</span>;

export class PassengerToConfirm extends React.Component {

    constructor(props) {
        super(props);
        this.confirmPassenger = this.confirmPassenger.bind(this)
        this.state = {
            passengerConfirmed: false
        }
    }

    initializeContracts() {

        const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        console.log(provider);
        const signer = provider.getSigner();
        const aggregatorContract = new ethers.Contract(SmartContractAddress, RideSharing.abi, signer);

        const rideInfo = {
            rideId: 110,
            start_lat: 48,
            start_lng: 11,
            startTimestamp: Date.now(),
            km: 366,
            pricePerKm: 2500000000000000,
            driver: DriverAddress,
            passenger: PassengerAddress,
            rules: {
                late_tolerance: 900,              // 15min.
                late_punishment_driver: 0,        // No punishment for being late
                late_punishment_passenger: 0,     // No punishment for being late
                noshow_tolerance: 2700,           // 45min.
                noshow_punishment_driver: 20,     // 20% of the price as guarantee
                noshow_punishment_passenger: 100  // Everything if doesnt show up
            },
            driverPenalty: 0,
            driverCheckedIn: false
        };

        console.log('Trigger transaction');
        aggregatorContract.newRide(rideInfo)
    }

    confirmPassenger() {
        console.log("confirm passenger", this.props.passenger.name);
        this.initializeContracts();
        sendDriverConfirmation({});
        this.setState({
            passengerConfirmed: true
        })
    }

    render() {
        return <div>{this.props.passenger.name} {this.state.passengerConfirmed ? <Link to="/journey"><CheckIn/></Link> :
            <AcceptDecline onConfirm={this.confirmPassenger}/>}</div>;
    }
}

const AcceptDecline = props => <div><CheckMarkIcon onClick={props.onConfirm}/> <RedX/></div>


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

