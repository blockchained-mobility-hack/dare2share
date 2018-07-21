import React, {Component} from "react";
import io from 'socket.io-client';
import CheckMarkIcon from "../icons/CheckmarkIcon";

const NoPassengers = props => <div>No passengers yet</div>;


const RedX = props => <span className="red">X</span>;

export class PassengerToConfirm extends React.Component {

    constructor(props) {
        super(props);
        this.confirmPassenger = this.confirmPassenger.bind(this)
    }

    confirmPassenger() {
        console.log("confirm passenger", this.props.passenger.name);
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

        const socket = io('http://localhost:4200');

        socket.on('connect', function () {
            console.log("connected")
        });
        socket.on('check-in', data => {
            console.log("data:", data);

            this.setState({
                passengers: [
                    {id: "xcxc", name: "Alexander K."}
                ]
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
