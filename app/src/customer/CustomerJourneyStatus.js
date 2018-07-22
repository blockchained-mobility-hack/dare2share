import React, {Component} from "react";
import {CheckIn} from "../CheckIn";
import {checkInPassenger} from "../network";

export class CustomerJourneyStatus extends Component {


   constructor(props) {
       super(props);
       this.doCheckIn = this.doCheckIn.bind(this);
   }

    doCheckIn() {
        console.log('Checking In customer')
        checkInPassenger({})
    }

    render() {
        return <div>
            <h3>Munich &rarr; Berlin</h3>
            <h3>Your driver: Jessi</h3>
            <CheckIn onCheckin={this.doCheckIn}/>
        </div>
    }

}





