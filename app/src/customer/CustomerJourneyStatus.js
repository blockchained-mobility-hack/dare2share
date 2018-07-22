import React, {Component} from "react";
import {CheckIn} from "../CheckIn";
import {checkInPassenger} from "../network";
import CheckMarkIcon from "../icons/CheckmarkIcon";

export class CustomerJourneyStatus extends Component {


   constructor(props) {
       super(props);
       this.doCheckIn = this.doCheckIn.bind(this);
       this.state = {
           checkedIn: false
       }
   }

    doCheckIn() {
        console.log('Checking In customer')
        this.setState({
           checkedIn: true
        });
        checkInPassenger({})

    }

    render() {
        return <div>
            <h3>Munich &rarr; Berlin</h3>
            <h3>Your driver: Jessi</h3>
            {this.state.checkedIn ? <ConnectionReady/> : <CheckIn onCheckin={this.doCheckIn}/> }
        </div>
    }

}

const ConnectionReady = props => <div><CheckMarkIcon/> Ride is active</div>
