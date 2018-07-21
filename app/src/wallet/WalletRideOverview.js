import React, {Component} from "react";
import {CreditStatus} from "./CreditStatus";
import {PastRidesList} from "./PastRidesList";

export class WalletRideOverview extends Component {

    render() {
        return <div>
            <CreditStatus balance={"498,37 €"}/>
            <PastRidesList/>

        </div>
    }

}
