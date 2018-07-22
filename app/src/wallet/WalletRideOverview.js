import React, {Component} from "react";
import {CreditStatus} from "./CreditStatus";
import {PastRidesList} from "./PastRidesList";

export class WalletRideOverview extends Component {

    render() {
        return <div>
            <h3 className="font-accent">Your Mobility Wallet</h3>
            <hr/>
            <CreditStatus balance={"498,37 €"}/>
            <h3 className="font-accent">Your Last Rides</h3>
            <hr/>
            <PastRidesList/>
        </div>
    }
}
